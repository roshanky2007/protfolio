import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ScrollProgress } from './components/common/ScrollProgress';
import { CustomCursor } from './components/common/CustomCursor';
import { ParticleBackground } from './components/common/ParticleBackground';
import { BackToTop } from './components/common/BackToTop';
import { HomePage } from './pages/HomePage';
import { AdminGallery } from './features/admin/AdminGallery';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#08090d] text-slate-200 selection:bg-purple-500/30 selection:text-purple-200 font-sans overflow-x-hidden">
        {/* Dynamic interactive elements */}
        <ScrollProgress />
        <CustomCursor />
        <ParticleBackground />

        {/* Navigation Bar */}
        <Navbar />

        {/* Application Routes */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminGallery />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>

        {/* Footer & Back to top button */}
        <Footer />
        <BackToTop />
      </div>
    </BrowserRouter>
  );
};

export default App;
