import React from 'react';
import { HeroSection } from '../features/hero/HeroSection';
import { AboutSection } from '../features/about/AboutSection';
import { SkillsSection } from '../features/skills/SkillsSection';
import { ProjectsSection } from '../features/projects/ProjectsSection';
import { GallerySection } from '../features/gallery/GallerySection';
import { CreativeLabSection } from '../features/creativelab/CreativeLabSection';
import { JourneySection } from '../features/journey/JourneySection';
import { ContactSection } from '../features/contact/ContactSection';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10 w-full overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <GallerySection />
      <CreativeLabSection />
      <JourneySection />
      <ContactSection />
    </main>
  );
};
