import { supabase, isSupabaseConfigured } from './supabase';
import type { GalleryItem } from '../types/gallery';
import { defaultGalleryItems } from '../config/portfolio';

const LOCAL_STORAGE_KEY = 'roshan_portfolio_gallery_items_v1';
const BUCKET_NAME = 'gallery-images';

// Helper to seed or load local gallery items
function getLocalItems(): GalleryItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultGalleryItems));
      return defaultGalleryItems;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read from localStorage:', err);
    return defaultGalleryItems;
  }
}

function saveLocalItems(items: GalleryItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

// Allowed MIME types and max size (10 MB)
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type (${file.type}). Allowed types: JPEG, PNG, WebP.`,
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 10MB limit (File is ${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
    };
  }
  return { valid: true };
}

/**
 * Fetch all gallery items, ordered by display_order ascending, then created_at descending
 */
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured) {
    return getLocalItems();
  }

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase query error, falling back to local items:', error.message);
      return getLocalItems();
    }

    if (!data || data.length === 0) {
      // If the cloud DB is empty, return default starter items
      return getLocalItems();
    }

    return data as GalleryItem[];
  } catch (err) {
    console.warn('Network error fetching gallery, using local cache:', err);
    return getLocalItems();
  }
}

/**
 * Upload an image and create its gallery database record
 */
export async function uploadGalleryPhoto(
  file: File,
  metadata: {
    title: string;
    caption?: string;
    category: GalleryItem['category'];
    date_taken?: string;
    is_featured: boolean;
    tags?: string[];
  },
  onProgress?: (progress: number) => void
): Promise<GalleryItem> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  onProgress?.(10);

  // If Supabase is NOT configured, store in localStorage as data URL for live preview
  if (!isSupabaseConfigured) {
    onProgress?.(40);
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    onProgress?.(80);

    const newItem: GalleryItem = {
      id: 'local-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      created_at: new Date().toISOString(),
      title: metadata.title,
      caption: metadata.caption || '',
      category: metadata.category,
      image_url: dataUrl,
      is_featured: metadata.is_featured,
      display_order: 1, // put at the front
      date_taken: metadata.date_taken || new Date().toISOString().split('T')[0],
      tags: metadata.tags || [],
      aspect_ratio: 'portrait',
      local_file: true,
    };

    const current = getLocalItems();
    const updated = [newItem, ...current.map((item, idx) => ({ ...item, display_order: idx + 2 }))];
    saveLocalItems(updated);

    onProgress?.(100);
    return newItem;
  }

  // --- Real Supabase Upload Flow ---
  onProgress?.(25);

  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'webp';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  // 1. Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    throw new Error(`Storage upload failed: ${uploadError.message}`);
  }

  onProgress?.(70);

  // 2. Get Public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  const publicUrl = urlData.publicUrl;

  onProgress?.(85);

  // 3. Insert record into PostgreSQL table
  const newRow = {
    title: metadata.title,
    caption: metadata.caption || '',
    category: metadata.category,
    image_url: publicUrl,
    storage_path: filePath,
    is_featured: metadata.is_featured,
    display_order: 1,
    date_taken: metadata.date_taken || new Date().toISOString().split('T')[0],
    tags: metadata.tags || [],
  };

  const { data: inserted, error: insertError } = await supabase
    .from('gallery_items')
    .insert([newRow])
    .select()
    .single();

  if (insertError) {
    // Attempt rollback of storage file
    await supabase.storage.from(BUCKET_NAME).remove([filePath]);
    throw new Error(`Database insert failed: ${insertError.message}`);
  }

  onProgress?.(100);
  return inserted as GalleryItem;
}

/**
 * Update an existing gallery item
 */
export async function updateGalleryItem(
  id: string,
  updates: Partial<Omit<GalleryItem, 'id' | 'created_at'>>
): Promise<GalleryItem> {
  if (!isSupabaseConfigured) {
    const items = getLocalItems();
    const index = items.findIndex((it) => it.id === id);
    if (index === -1) throw new Error('Item not found');
    const updated = { ...items[index], ...updates };
    items[index] = updated;
    saveLocalItems(items);
    return updated;
  }

  const { data, error } = await supabase
    .from('gallery_items')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update item: ${error.message}`);
  }

  return data as GalleryItem;
}

/**
 * Delete a gallery item and its storage object safely
 */
export async function deleteGalleryItem(id: string, storagePath?: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const items = getLocalItems().filter((it) => it.id !== id);
    saveLocalItems(items);
    return;
  }

  // 1. Delete database record
  const { error: dbError } = await supabase
    .from('gallery_items')
    .delete()
    .eq('id', id);

  if (dbError) {
    throw new Error(`Failed to delete record: ${dbError.message}`);
  }

  // 2. Delete storage object if path is recorded
  if (storagePath) {
    try {
      await supabase.storage.from(BUCKET_NAME).remove([storagePath]);
    } catch (err) {
      console.warn('Could not remove file from storage bucket:', err);
    }
  }
}

/**
 * Reorder gallery items
 */
export async function reorderGalleryItems(items: GalleryItem[]): Promise<void> {
  if (!isSupabaseConfigured) {
    saveLocalItems(items);
    return;
  }

  // Update order in Supabase
  const updates = items.map((item, index) => ({
    id: item.id,
    display_order: index + 1,
  }));

  for (const u of updates) {
    await supabase
      .from('gallery_items')
      .update({ display_order: u.display_order })
      .eq('id', u.id);
  }
}

/**
 * Submit contact message
 */
export async function submitContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  if (!isSupabaseConfigured) {
    // Store in localStorage for owner review
    try {
      const raw = localStorage.getItem('roshan_contact_messages') || '[]';
      const messages = JSON.parse(raw);
      messages.unshift({ ...message, created_at: new Date().toISOString() });
      localStorage.setItem('roshan_contact_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn('LocalStorage error saving message:', e);
    }
    return {
      success: true,
      message: 'Message sent successfully! (Saved in local mailbox preview mode).',
    };
  }

  const { error } = await supabase.from('contact_messages').insert([
    {
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
    },
  ]);

  if (error) {
    throw new Error(`Failed to deliver message: ${error.message}`);
  }

  return {
    success: true,
    message: 'Thank you! Your message has been received.',
  };
}
