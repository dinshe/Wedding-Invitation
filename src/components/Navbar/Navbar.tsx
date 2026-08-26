import React, { useState, useEffect } from 'react';
import { weddingConfig } from '../../config/wedding';

interface NavbarProps {
  onReplayEnvelope: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReplayEnvelope }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#F5BCCB]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Monogram / Brand */}
        <a
          href="#home"
          className="font-serif text-xl sm:text-2xl text-[#421824] tracking-wide flex items-center gap-2"
        >
          <span className="font-cinzel text-sm font-semibold border border-[#F5BCCB] bg-[#FFF0F4] w-8 h-8 rounded-full flex items-center justify-center text-[#892640]">
            {weddingConfig.couple.monogram}
          </span>
          <span className="hidden sm:inline font-serif">
            {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-cinzel tracking-[2px] uppercase text-[#613944] font-semibold">
          <a href="#home" className="hover:text-[#C93E64] transition-colors">
            Home
          </a>
          <a href="#details" className="hover:text-[#C93E64] transition-colors">
            Schedule
          </a>
          <a href="#ceremony" className="hover:text-[#C93E64] transition-colors">
            Poruwa
          </a>
          <a href="#venue" className="hover:text-[#C93E64] transition-colors">
            Venue
          </a>
          <a href="#countdown" className="hover:text-[#C93E64] transition-colors">
            Countdown
          </a>
          <a href="#gallery" className="hover:text-[#C93E64] transition-colors">
            Gallery
          </a>
          <a href="#rsvp" className="text-[#C93E64] font-bold hover:underline">
            RSVP
          </a>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReplayEnvelope}
            title="Re-open 3D Envelope"
            className="text-xs font-cinzel px-3 py-1.5 rounded-full border border-[#F5BCCB] bg-white text-[#892640] hover:bg-[#FFF5F7] transition-colors font-semibold"
          >
            ✉️ Envelope
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#421824]"
            aria-label="Toggle Navigation Menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 border-b border-[#F5BCCB] px-6 py-4 space-y-3 font-cinzel text-xs uppercase tracking-wider text-[#613944] font-semibold">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Home
          </a>
          <a
            href="#details"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Schedule
          </a>
          <a
            href="#ceremony"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Poruwa
          </a>
          <a
            href="#venue"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Venue
          </a>
          <a
            href="#countdown"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Countdown
          </a>
          <a
            href="#gallery"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 hover:text-[#C93E64]"
          >
            Gallery
          </a>
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 font-bold text-[#C93E64]"
          >
            RSVP
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
