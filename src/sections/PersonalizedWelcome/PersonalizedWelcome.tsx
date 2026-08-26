import React from 'react';
import { InviteeInfo } from '../../types/wedding';
import { weddingConfig } from '../../config/wedding';

interface PersonalizedWelcomeProps {
  invitee: InviteeInfo;
}

export const PersonalizedWelcome: React.FC<PersonalizedWelcomeProps> = ({ invitee }) => {
  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="stationery-card p-8 sm:p-12 relative overflow-hidden bg-white/95 border border-[#F5BCCB]">
          {/* Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#F5BCCB] pointer-events-none" />

          {/* Subtitle */}
          <p className="font-cinzel text-xs tracking-[3px] text-[#A82E4E] font-semibold uppercase mb-3">
            Personal Invitation
          </p>

          {/* Salutation */}
          <h2 className="font-serif text-3xl sm:text-4xl text-[#421824] mb-4">
            {invitee.isPersonalized ? `Dear ${invitee.name},` : 'Dear Family & Friends,'}
          </h2>

          {/* Official Invitation Message from Original Reference */}
          <p className="font-serif italic text-lg sm:text-xl text-[#613944] leading-relaxed max-w-xl mx-auto my-4">
            "{weddingConfig.invitationMessage}"
          </p>

          {/* Reserved Seats Pill */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-[#FFF0F4] border border-[#FCD8E3] text-xs font-sans text-[#892640] font-medium">
            <span>🌸</span>
            <span>
              {invitee.allowedGuests === 1
                ? 'We have reserved 1 seat in your honour'
                : `We have reserved ${invitee.allowedGuests} seats in your honour`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedWelcome;
