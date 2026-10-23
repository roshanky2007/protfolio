import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Creative Lab', href: '#creativelab' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Track scroll position to enhance background blur and detect active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      if (isAdminRoute) return;

      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminRoute]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (isAdminRoute) {
      window.location.href = '/' + href;
      return;
    }

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08090d]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-400 rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-500 p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-all">
              <div className="w-full h-full bg-[#08090d] rounded-xl flex items-center justify-center font-display font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                R
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-base sm:text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-cyan-300 transition-all">
                ROSHAN <span className="text-violet-400 font-light">YADAV</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">
                Portfolio & Gallery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d1224]/70 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 bg-gradient-to-r from-violet-600/70 to-cyan-600/70 rounded-full -z-10 shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Admin & Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/admin"
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border transition-all ${
                isAdminRoute
                  ? 'bg-violet-600/20 border-violet-500 text-violet-300 shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10'
              }`}
              title="Admin Gallery Management (Owner Only)"
            >
              <Shield className="w-3.5 h-3.5 text-violet-400" />
              <span>Admin</span>
            </Link>

            <button
              onClick={() => handleNavClick('#contact')}
              className="relative group overflow-hidden rounded-lg p-[1px] font-medium text-xs focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-500 transition-all duration-300 group-hover:opacity-90" />
              <span className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#08090d] text-white transition-all duration-300 group-hover:bg-transparent">
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/admin"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4 text-violet-400" />
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0a0d1a]/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-violet-600/10 flex items-center justify-between transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-mono text-slate-500">→</span>
                </button>
              ))}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:bg-violet-500/20 hover:text-violet-300"
                >
                  <Shield className="w-4 h-4 text-violet-400" />
                  <span>Admin Gallery Portal</span>
                </Link>

                <button
                  onClick={() => handleNavClick('#contact')}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-sm font-medium shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
