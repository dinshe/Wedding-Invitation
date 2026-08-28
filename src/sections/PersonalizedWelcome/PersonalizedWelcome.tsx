import React from 'react';
import { InviteeInfo } from '../../types/wedding';

interface PersonalizedWelcomeProps {
  invitee: InviteeInfo;
}

export const PersonalizedWelcome: React.FC<PersonalizedWelcomeProps> = ({ invitee }) => {
  const seatsText = invitee.allowedGuests === 1
    ? 'One seat has been reserved especially for you.'
    : `${invitee.allowedGuests} seats have been reserved especially for you.`;

  return (
    <section className="py-12 sm:py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="stationery-card p-8 sm:p-12 relative overflow-hidden bg-white/95 border border-[#F5BCCB]">
          {/* Corner Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#F5BCCB] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#F5BCCB] pointer-events-none" />

          {/* Salutation */}
          <h2 className="font-serif text-3xl sm:text-4xl text-[#421824] mb-4">
            {invitee.isPersonalized ? `Dear ${invitee.name},` : 'Dear Family & Friends,'}
          </h2>

          {/* Romantic Quote */}
          <p className="font-serif italic text-xl sm:text-2xl text-[#421824] leading-relaxed max-w-xl mx-auto mb-4">
            “Two hearts, one beautiful promise, and a lifetime of love ahead…”
          </p>

          {/* Invitation Stanza */}
          <p className="font-serif text-base sm:text-lg text-[#613944] leading-relaxed max-w-lg mx-auto mb-6">
            We would be delighted to have you with us<br className="hidden sm:inline" />
            as we celebrate the beginning of our forever.
          </p>

          {/* Reserved Seats Pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFF0F4] border border-[#FCD8E3] text-xs sm:text-sm font-sans text-[#892640] font-medium mb-5">
            <span>🌸</span>
            <span>{seatsText}</span>
          </div>

          {/* Closing Warm Blessing */}
          <p className="font-serif italic text-base sm:text-lg text-[#892640] font-medium">
            With love, we look forward to celebrating with you!
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonalizedWelcome;
