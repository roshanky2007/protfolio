import type { PortfolioConfig } from '../types/portfolio';
import type { GalleryItem } from '../types/gallery';

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: 'Roshan Kumar Yadav',
    givenName: 'Roshan',
    surName: 'Kumar Yadav',
    tagline: 'Bridging the worlds of systems engineering, creative code, visual storytelling, and lenscraft.',
    roleTitles: [
      'Creative Developer',
      'CSE Student',
      'Photographer',
      'Sketch Artist',
    ],
    shortBio:
      'Computer Science & Engineering student passionate about crafting sleek web applications, exploring algorithms, capturing moments through street & portrait photography, and creating detailed graphite sketches inspired by anime and futuristic aesthetics.',
    detailedBio: {
      paragraphs: [
        'I am a Computer Science & Engineering student driven by a dual fascination for logical systems and visual aesthetics. Whether I am architecting a database schema, developing responsive web apps in React, or refining a backend in Python and Flask, I obsess over fluidity, structure, and user experience.',
        'Beyond the code editor, I spend hours behind the viewfinder of a camera capturing the quiet drama of night streets and portraits, and in front of an open sketchbook rendering detailed pencil drawings and anime-inspired compositions. Visual storytelling connects everything I do.',
        'I believe that the best software is not just functional—it is an art form that feels intuitive, cinematic, and responsive. I am always exploring emerging web standards, experimenting with creative coding, and expanding my engineering horizons.',
      ],
      currentFocus: 'Building AI-assisted civic tools & immersive web platforms',
      quote: 'Code provides the architecture, light provides the emotion, and the pencil captures the soul.',
      interests: [
        {
          title: 'Computer Science',
          desc: 'Data structures, algorithm design, relational & NoSQL databases, scalable full-stack development.',
          icon: 'Code2',
        },
        {
          title: 'Pencil Sketching',
          desc: 'Graphite character studies, anime/manga art, architectural perspectives, and cross-hatching.',
          icon: 'PenTool',
        },
        {
          title: 'Photography & Editing',
          desc: 'Cinematic street photography, moody portraits, and precise color grading in Adobe Lightroom.',
          icon: 'Camera',
        },
        {
          title: 'Anime & Visual Storytelling',
          desc: 'Narrative pacing, cyberpunk worldbuilding, and emotional character design.',
          icon: 'Sparkles',
        },
      ],
    },
    location: 'India',
    avatarUrl: '/images/hero_portrait.jpg',
    social: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      email: 'roshan.dev.contact@gmail.com',
    },
  },

  skills: [
    {
      id: 'programming',
      name: 'Programming Languages',
      description: 'Core logic, data structures, and algorithmic foundations',
      skills: [
        { name: 'C', level: 'Core Language', color: '#6366f1' },
        { name: 'C++', level: 'DSA & Systems', color: '#8b5cf6' },
        { name: 'Python', level: 'Scripting & AI', color: '#06b6d4' },
        { name: 'Java (Basic)', level: 'Object-Oriented', color: '#f59e0b' },
      ],
    },
    {
      id: 'webdev',
      name: 'Web & Backend Development',
      description: 'Building interactive user experiences and resilient server backends',
      skills: [
        { name: 'HTML5', level: 'Semantic Markup', color: '#f97316' },
        { name: 'CSS3 / Tailwind', level: 'Modern Styling', color: '#38bdf8' },
        { name: 'JavaScript', level: 'Interactive Logic', color: '#facc15' },
        { name: 'PHP', level: 'Server-side Web', color: '#818cf8' },
        { name: 'Flask', level: 'Python Web Microframework', color: '#10b981' },
        { name: 'SQL', level: 'Relational DB Queries', color: '#ec4899' },
      ],
    },
    {
      id: 'tools',
      name: 'Tools & Technologies',
      description: 'Developer workflow, version control, and database environments',
      skills: [
        { name: 'GitHub', level: 'Version Control & CI/CD', color: '#f3f4f6' },
        { name: 'VS Code', level: 'Primary Development IDE', color: '#0284c7' },
        { name: 'Android Studio', level: 'Mobile App Tooling', color: '#34d399' },
        { name: 'MongoDB', level: 'Document Store DB', color: '#10b981' },
        { name: 'MS Office', level: 'Documentation & Presentation', color: '#f43f5e' },
      ],
    },
    {
      id: 'creative',
      name: 'Creative & Visual Arts',
      description: 'Design sensibilities, visual composition, and analog art forms',
      skills: [
        { name: 'Photography', level: 'Street, Portrait & Low-Light', color: '#a855f7' },
        { name: 'Lightroom Editing', level: 'Color Grading & RAW Processing', color: '#06b6d4' },
        { name: 'Pencil Sketching', level: 'Graphite Anime & Realism', color: '#e2e8f0' },
        { name: 'UI/UX Exploration', level: 'Design Systems & Motion', color: '#f472b6' },
      ],
    },
  ],

  projects: [
    {
      id: 'smart-study-planner',
      title: 'Smart Study Planner',
      shortDescription:
        'An intelligent academic productivity hub featuring dynamic schedule optimization, pomodoro session tracking, and visual study analytics.',
      longDescription:
        'Smart Study Planner is an academic productivity web application designed to help university students organize course workloads, schedule revision blocks intelligently, and eliminate cognitive overload. It integrates an interactive Pomodoro focus timer with automated rest intervals, deadline prioritization algorithms, and graphical progress tracking across subjects.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'LocalStorage / Supabase'],
      coverImage: '/images/project_study_planner.jpg',
      status: 'Featured',
      isFeatured: true,
      category: 'Web App',
      highlights: [
        'Automated study block generation based on exam deadlines and task weights',
        'Integrated Pomodoro focus timer with session logs and break alerts',
        'Visual progress analytics and subject-wise mastery distribution',
        'Responsive dark-mode UI with customizable study reminders',
      ],
      githubUrl: 'https://github.com',
      demoUrl: '#',
    },
    {
      id: 'medico-web-application',
      title: 'MEDICO Web Application',
      shortDescription:
        'A comprehensive healthcare portal unifying doctor appointment booking, patient telemetry monitoring, and medical record management.',
      longDescription:
        'MEDICO is a modern medical portal created to bridge patients and healthcare providers. It provides an intuitive interface for discovering doctors by specialty, reserving consultation slots, and accessing patient medical histories. Features interactive appointment management, emergency contact shortcuts, and a clean, accessible layout designed for quick clinical lookups.',
      technologies: ['PHP', 'JavaScript', 'HTML5', 'CSS3', 'MySQL'],
      coverImage: '/images/project_medico.jpg',
      status: 'Completed',
      isFeatured: true,
      category: 'Web App',
      highlights: [
        'Doctor-patient appointment scheduling workflow with conflict resolution',
        'Patient history records with diagnostic notes and medication reminders',
        'Role-based access control for patients and clinic staff',
        'Clean, accessible UI built with healthcare accessibility standards in mind',
      ],
      githubUrl: 'https://github.com',
    },
    {
      id: 'cityvoice-crosssense-ai',
      title: 'CityVoice / CrossSense AI',
      shortDescription:
        'A civic engagement platform enabling citizens to report community issues with automated categorization and municipal resolution tracking.',
      longDescription:
        'CityVoice (CrossSense AI) addresses urban civic governance by providing residents with a direct channel to report infrastructure hazards, sanitation issues, and road damage. Using AI categorization pipelines, reports are automatically tagged, assigned priority, geolocated on an interactive municipality map, and tracked from submission to verification.',
      technologies: ['Python', 'Flask', 'AI / NLP', 'React', 'Leaflet Maps', 'PostgreSQL'],
      coverImage: '/images/project_cityvoice.jpg',
      status: 'In Development',
      isFeatured: true,
      category: 'AI / Civic Tech',
      highlights: [
        'Automated issue categorization and priority triage from citizen descriptions',
        'Interactive map visualization with geographic clustering of civic reports',
        'Real-time status updates from pending to municipal review and resolution',
        'Transparent civic accountability metrics and public reporting dashboard',
      ],
      githubUrl: 'https://github.com',
    },
    {
      id: 'student-management-system',
      title: 'Student Management System',
      shortDescription:
        'A streamlined academic administration system managing student records, attendance analytics, course enrollment, and grade reporting.',
      longDescription:
        'Student Management System is an institutional records platform built to handle student lifecycle data. From enrollment verification to semester grade calculation and attendance percentage tracking, the system delivers structured reporting tables and quick search filters for department administrators and faculty.',
      technologies: ['Java', 'SQL', 'Database Design', 'JDBC / Swing'],
      coverImage: '/images/project_student_mgmt.jpg',
      status: 'Completed',
      isFeatured: false,
      category: 'System / Education',
      highlights: [
        'Comprehensive student profile repository with searchable enrollment data',
        'Automated attendance threshold calculation and eligibility warnings',
        'Grade entry and GPA report card generator with PDF export capability',
        'Normalized relational database structure ensuring strict data integrity',
      ],
      githubUrl: 'https://github.com',
    },
  ],

  journey: [
    {
      id: 'cse-degree',
      year: 'Present',
      period: 'Undergraduate',
      title: 'B.Tech in Computer Science & Engineering',
      subtitle: 'Engineering College',
      description:
        'Pursuing foundational and advanced coursework in Data Structures, Algorithms, Database Management Systems, Computer Networks, and Software Engineering.',
      type: 'education',
      icon: 'GraduationCap',
    },
    {
      id: 'civic-tech-hackathon',
      year: '2024',
      period: 'Innovation Track',
      title: 'CityVoice / CrossSense AI Civic Initiative',
      subtitle: 'Hackathon & Civic Innovation Project',
      description:
        'Designed an AI-assisted community issue reporting platform that connects citizens directly with municipal response units, incorporating NLP classification and geolocation mapping.',
      type: 'hackathon',
      icon: 'Trophy',
    },
    {
      id: 'creative-milestone',
      year: '2023',
      period: 'Visual Arts',
      title: 'Photography & Sketching Portfolio Launch',
      subtitle: 'Creative Exploration',
      description:
        'Expanded creative practice into cinematic 35mm street photography, low-light long exposures, and dedicated character sketch studies.',
      type: 'milestone',
      icon: 'Camera',
    },
    {
      id: 'web-engineering',
      year: '2022',
      period: 'Foundational Phase',
      title: 'First Full-Stack Web Implementations',
      subtitle: 'Self-Directed Projects',
      description:
        'Engineered early web applications with PHP, SQL, JavaScript, and Python, mastering core database normalization and user session handling.',
      type: 'project',
      icon: 'Code2',
    },
  ],

  creativeLab: {
    title: 'Creative Lab & Universe',
    subtitle: 'Where logic yields to imagination',
    description:
      'An experimental sandbox showcasing analog pencil sketches, low-light photography, Lightroom color grading explorations, and creative canvas shaders.',
    experiments: [
      {
        id: 'cyber-sketch-01',
        title: 'Neo-Tokyo Streetwalker',
        category: 'Sketch',
        image: '/images/gallery_sketch.jpg',
        description: 'Detailed graphite study of a futuristic anime protagonist against a dense cyberpunk cityscape.',
        tags: ['Pencil', 'Graphite', 'Anime Art', 'Cyberpunk'],
      },
      {
        id: 'night-neon-01',
        title: 'Shinjuku After Rain',
        category: 'Photography',
        image: '/images/gallery_street.jpg',
        description: 'Cinematic rain reflections and neon signage captured under dramatic low-light conditions.',
        tags: ['Photography', 'Night Street', '35mm', 'Neon'],
      },
      {
        id: 'lightroom-portrait-01',
        title: 'Chiaroscuro Contemplation',
        category: 'Lightroom Edit',
        image: '/images/gallery_portrait.jpg',
        description: 'Atmospheric window lighting graded with subtle teal shadows and warm amber skin tones in Lightroom.',
        tags: ['Lightroom', 'Color Grading', 'Portrait', 'Moody'],
      },
    ],
  },
};

// Initial default gallery items for the public gallery before user uploads their own
export const defaultGalleryItems: GalleryItem[] = [
  {
    id: 'starter-sketch-1',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    title: 'Neo-Tokyo Streetwalker',
    caption: 'Graphite pencils (2B-6B) on heavyweight Bristol paper. Detailed exploration of cyberpunk perspective and anime character design.',
    category: 'Sketches',
    image_url: '/images/gallery_sketch.jpg',
    is_featured: true,
    display_order: 1,
    date_taken: '2024-03-15',
    tags: ['Graphite', 'Anime Art', 'Cyberpunk', 'Hand Drawn'],
    aspect_ratio: 'landscape',
  },
  {
    id: 'starter-photo-1',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    title: 'Neon Rain Mirage',
    caption: '35mm prime lens, f/1.8, 1/125s, ISO 800. Reflections on rain-slicked asphalt under neon signage.',
    category: 'Photography',
    image_url: '/images/gallery_street.jpg',
    is_featured: true,
    display_order: 2,
    date_taken: '2024-04-02',
    tags: ['Night Street', 'Rain', 'Neon', 'Urban'],
    aspect_ratio: 'portrait',
  },
  {
    id: 'starter-portrait-1',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    title: 'Quiet Light & Shadows',
    caption: 'Natural window lighting paired with subtle Lightroom color split-toning (teal shadows, warm amber highlights).',
    category: 'Portraits',
    image_url: '/images/gallery_portrait.jpg',
    is_featured: true,
    display_order: 3,
    date_taken: '2024-04-18',
    tags: ['Portrait', 'Natural Light', 'Mood', 'Editorial'],
    aspect_ratio: 'portrait',
  },
  {
    id: 'starter-study-1',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    title: 'Smart Study Planner UI Architecture',
    caption: 'Product design and interface study for university student schedule optimization.',
    category: 'Editing',
    image_url: '/images/project_study_planner.jpg',
    is_featured: false,
    display_order: 4,
    date_taken: '2024-05-10',
    tags: ['UI Design', 'Product', 'Dark Theme'],
    aspect_ratio: 'landscape',
  },
  {
    id: 'starter-hero-1',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    title: 'The Creator in His Element',
    caption: 'Intersection of computer science, photography lenses, and physical sketchbooks.',
    category: 'Personal',
    image_url: '/images/hero_portrait.jpg',
    is_featured: true,
    display_order: 5,
    date_taken: '2024-05-20',
    tags: ['Creator', 'Personal', 'Studio', 'Aesthetic'],
    aspect_ratio: 'landscape',
  },
];
