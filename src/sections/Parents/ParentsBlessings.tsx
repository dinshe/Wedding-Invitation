import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const ParentsBlessings: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-transparent via-[#FEEBF0]/60 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <p className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase mb-2">
          Together with their families
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#421824] mb-8">
          With the Blessings of Parents
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-6 text-center">
          {/* Groom's Parents */}
          <div className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-[#F5BCCB] shadow-sm">
            <span className="font-cinzel text-[0.7rem] tracking-[2px] text-[#9E737F] uppercase block mb-2 font-semibold">
              Groom's Parents
            </span>
            <div className="font-serif text-lg sm:text-xl text-[#421824] leading-snug">
              {weddingConfig.parents.groom.map((line, idx) => (
                <p key={idx} className={line === '&' ? 'font-serif italic text-base text-[#C93E64] my-0.5' : ''}>
                  {line}
                </p>
              ))}
            </div>
            <p className="font-sans text-xs text-[#9E737F] mt-2">
              Son of Mrs. Hemali &amp; (Late) Mr. Salgado
            </p>
          </div>

          {/* Bride's Parents */}
          <div className="p-6 rounded-xl bg-white/90 backdrop-blur-sm border border-[#F5BCCB] shadow-sm">
            <span className="font-cinzel text-[0.7rem] tracking-[2px] text-[#9E737F] uppercase block mb-2 font-semibold">
              Bride's Parents
            </span>
            <div className="font-serif text-lg sm:text-xl text-[#421824] leading-snug">
              <p>Mrs. Krishanthi Amarasena</p>
              <p className="font-serif italic text-base text-[#C93E64] my-0.5">and</p>
              <p>Mr. Jayantha Liyana Wanniarachchi</p>
            </div>
            <p className="font-sans text-xs text-[#9E737F] mt-2">
              Daughter of Mrs. Krishanthi Amarasena &amp; Mr. Jayantha Liyana Wanniarachchi
            </p>
          </div>
        </div>

        <p className="font-serif italic text-sm text-[#7A4B56] max-w-lg mx-auto mt-6">
          Request the honour of your presence to witness the auspicious union of their beloved children.
        </p>
      </div>
    </section>
  );
};

export default ParentsBlessings;
