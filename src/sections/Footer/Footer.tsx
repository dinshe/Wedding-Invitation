import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 sm:py-20 px-4 text-center bg-gradient-to-b from-transparent to-[#FEEBF0]/80 border-t border-[#F5BCCB]">
      <div className="max-w-2xl mx-auto">
        {/* Monogram */}
        <div className="w-12 h-12 rounded-full border border-[#F5BCCB] bg-[#FFF0F4] mx-auto flex items-center justify-center mb-4">
          <span className="font-cinzel text-xs font-semibold text-[#892640]">
            {weddingConfig.couple.monogram}
          </span>
        </div>

        {/* Couple Names */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#421824] mb-2">
          {weddingConfig.couple.bride}
          <span className="font-script text-2xl text-[#C93E64] mx-2">&</span>
          {weddingConfig.couple.groom}
        </h3>

        <p className="font-serif italic text-base sm:text-lg text-[#613944] mb-8">
          "Thank you for being a meaningful part of our special day and our story."
        </p>

        {/* Direct RSVP Contacts Box */}
        <div className="inline-block p-6 rounded-xl bg-white/95 border border-[#F5BCCB] shadow-sm max-w-md w-full mb-8">
          <p className="font-cinzel text-xs tracking-[2px] uppercase text-[#A82E4E] font-semibold mb-3">
            RSVP Contact Inquiries
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {weddingConfig.rsvpContacts.map((c, idx) => (
              <div key={idx} className="p-3 bg-[#FFF5F7] rounded-lg border border-[#FCD8E3]">
                <p className="font-cinzel font-semibold text-xs text-[#421824]">
                  {c.name}
                </p>
                <a
                  href={`tel:${c.phone}`}
                  className="font-sans text-xs text-[#C93E64] font-medium hover:underline block mt-0.5"
                >
                  📞 {c.phone}
                </a>
                <a
                  href={c.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[0.7rem] text-emerald-700 hover:underline block mt-0.5 font-medium"
                >
                  💬 WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Closing details */}
        <p className="font-sans text-xs text-[#9E737F]">
          Wednesday, 14 October 2026 • Dukes Lounge, Hotel Green Court, Homagama
        </p>
      </div>
    </footer>
  );
};

export default Footer;
