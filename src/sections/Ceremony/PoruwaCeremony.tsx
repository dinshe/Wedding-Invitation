import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const PoruwaCeremony: React.FC = () => {
  return (
    <section id="ceremony" className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFF5F7] via-[#FEEBF0] to-[#FFF5F7]">
      <div className="max-w-3xl mx-auto text-center">
        <span className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase block mb-2">
          Sacred Tradition
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#421824] mb-4">
          The Poruwa Ceremony
        </h2>
        <div className="botanical-divider">
          <span className="text-[#C93E64]">✦</span>
        </div>

        <div className="stationery-card p-8 sm:p-12 relative my-6 border border-[#F5BCCB]">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFF0F4] border border-[#FCD8E3] flex items-center justify-center">
            <span className="text-2xl">✨</span>
          </div>

          <p className="font-cinzel text-xs tracking-[3px] text-[#9E737F] font-semibold uppercase mb-2">
            Auspicious Time (Nekatha)
          </p>
          <div className="font-serif text-4xl sm:text-5xl text-[#C93E64] font-semibold mb-6">
            {weddingConfig.time.poruwa}
          </div>

          <p className="font-serif text-lg sm:text-xl text-[#613944] leading-relaxed max-w-xl mx-auto mb-6">
            We invite you to be present and bless us as we step onto the traditional Sri Lankan Poruwa,
            uniting our lives with sacred chants, custom rings, and ancestral blessings.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#FEEBF0] text-left sm:text-center text-xs text-[#7A4B56]">
            <div className="p-3 bg-[#FFF5F7] rounded-lg border border-[#FCD8E3]">
              <p className="font-cinzel font-semibold text-[#421824] mb-1">Auspicious Moment</p>
              <p className="font-sans text-[#9E737F]">8:50 A.M. sharp</p>
            </div>
            <div className="p-3 bg-[#FFF5F7] rounded-lg border border-[#FCD8E3]">
              <p className="font-cinzel font-semibold text-[#421824] mb-1">Jayamangala Gatha</p>
              <p className="font-sans text-[#9E737F]">Chanting of sacred blessings</p>
            </div>
            <div className="p-3 bg-[#FFF5F7] rounded-lg border border-[#FCD8E3]">
              <p className="font-cinzel font-semibold text-[#421824] mb-1">Kiri-Bath &amp; Feast</p>
              <p className="font-sans text-[#9E737F]">Traditional celebratory sharing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoruwaCeremony;
