export type GalleryCategory =
  | 'Photography'
  | 'Portraits'
  | 'Sketches'
  | 'Editing'
  | 'Personal'
  | 'Other';

export interface GalleryItem {
  id: string;
  created_at: string;
  title: string;
  caption?: string;
  category: GalleryCategory;
  image_url: string;
  storage_path?: string;
  is_featured: boolean;
  display_order: number;
  date_taken?: string;
  tags?: string[];
  aspect_ratio?: 'portrait' | 'landscape' | 'square';
  local_file?: boolean;
}

export interface GalleryFilterState {
  category: GalleryCategory | 'All';
  searchQuery?: string;
}
