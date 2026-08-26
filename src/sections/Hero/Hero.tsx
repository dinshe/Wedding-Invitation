import React from 'react';
import { weddingConfig } from '../../config/wedding';

interface HeroProps {
  onScrollToRsvp: () => void;
  onScrollToDetails: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToRsvp, onScrollToDetails }) => {
  return (
    <section id="home" className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Background Soft Rose Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-radial from-rose-200/50 via-pink-100/30 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Floating Rose Petals */}
      <div className="floating-petal left-[10%]" style={{ animationDelay: '0s' }}>🌸</div>
      <div className="floating-petal left-[25%]" style={{ animationDelay: '3s' }}>🌹</div>
      <div className="floating-petal left-[75%]" style={{ animationDelay: '6s' }}>🌸</div>
      <div className="floating-petal left-[88%]" style={{ animationDelay: '2s' }}>✨</div>

      {/* Decorative Botanical Corner SVG lines */}
      <div className="absolute top-8 left-8 w-24 h-24 opacity-40 pointer-events-none hidden sm:block">
        <svg viewBox="0 0 100 100" fill="none" stroke="#C93E64" strokeWidth="1">
          <path d="M0 0 C50 0, 100 50, 100 100" />
          <path d="M0 20 C40 20, 80 60, 80 100" />
          <path d="M0 40 C30 40, 60 70, 60 100" />
        </svg>
      </div>

      <div className="absolute top-8 right-8 w-24 h-24 opacity-40 pointer-events-none hidden sm:block transform scale-x-[-1]">
        <svg viewBox="0 0 100 100" fill="none" stroke="#C93E64" strokeWidth="1">
          <path d="M0 0 C50 0, 100 50, 100 100" />
          <path d="M0 20 C40 20, 80 60, 80 100" />
          <path d="M0 40 C30 40, 60 70, 60 100" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-16 h-16 rounded-full bg-white/95 shadow-md border border-[#F5BCCB] flex items-center justify-center mb-6">
          <span className="font-cinzel text-base font-semibold text-[#892640] tracking-wider">
            {weddingConfig.couple.monogram}
          </span>
        </div>

        {/* Header Tag */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[5px] text-[#A82E4E] font-semibold uppercase mb-4">
          The Celebration of Marriage
        </p>

        {/* Couple Names */}
        <div className="my-2 sm:my-4">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#421824] font-normal tracking-wide leading-tight">
            {weddingConfig.couple.bride}
          </h1>
          <div className="font-script text-4xl sm:text-5xl text-[#C93E64] my-1 sm:my-2">
            &
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-[#421824] font-normal tracking-wide leading-tight">
            {weddingConfig.couple.groom}
          </h1>
        </div>

        {/* Botanical Divider */}
        <div className="botanical-divider">
          <span className="text-[#C93E64]">✦</span>
        </div>

        {/* Date & Location Line */}
        <p className="font-serif text-xl sm:text-2xl text-[#613944] tracking-wide mb-2">
          {weddingConfig.date.fullDisplay}
        </p>
        <p className="font-sans text-xs sm:text-sm tracking-[2.5px] uppercase text-[#9E737F] mb-8 max-w-md">
          {weddingConfig.venue.hall} • {weddingConfig.venue.hotel} • {weddingConfig.venue.city}
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button onClick={onScrollToRsvp} className="btn-luxury-primary">
            Kindly RSVP
          </button>
          <button onClick={onScrollToDetails} className="btn-luxury-secondary">
            View Schedule
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
