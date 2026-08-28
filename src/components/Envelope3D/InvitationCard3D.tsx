import React from 'react';
import { weddingConfig } from '../../config/wedding';
import { InviteeInfo } from '../../types/wedding';

interface InvitationCard3DProps {
  invitee: InviteeInfo;
  isEmerged: boolean;
  isZooming: boolean;
  onCardClick: () => void;
}

export const InvitationCard3D: React.FC<InvitationCard3DProps> = ({
  invitee,
  isEmerged,
  isZooming,
  onCardClick,
}) => {
  return (
    <div
      className={`envelope-card-container ${isEmerged ? 'card-emerged' : ''} ${
        isZooming ? 'card-zooming' : ''
      }`}
      onClick={isEmerged ? onCardClick : undefined}
      role={isEmerged ? 'button' : undefined}
      tabIndex={isEmerged ? 0 : -1}
      aria-label="Invitation card. Tap to enter website"
      onKeyDown={(e) => {
        if (isEmerged && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onCardClick();
        }
      }}
    >
      <div className="invitation-stationery-card">
        <div className="card-border-line" />

        {/* 1. Personalized Salutation / Guest Name at the top */}
        <p className="font-cinzel text-[0.65rem] tracking-[2px] text-[#A82E4E] font-semibold uppercase mb-1">
          {invitee.isPersonalized ? `Dear ${invitee.name}` : 'Dear Honoured Guest'}
        </p>

        {/* 2. The Celebration of Marriage */}
        <p className="font-cinzel text-[0.55rem] tracking-[2.5px] text-[#9E737F] uppercase mb-1">
          The Celebration of Marriage
        </p>

        {/* 3. Couple Names with elegant serif italic ampersand */}
        <h2 className="font-serif text-2xl sm:text-3xl text-[#421824] tracking-wide my-0.5 leading-tight">
          {weddingConfig.couple.bride}
          <span className="font-serif italic font-normal text-2xl text-[#C93E64] mx-1">&amp;</span>
          {weddingConfig.couple.groom}
        </h2>

        {/* 4. Date & Venue */}
        <div className="mt-2 pt-1.5 border-t border-[#FCD8E3] w-full max-w-[200px]">
          <p className="font-serif text-xs text-[#613944] font-medium">
            {weddingConfig.date.fullDisplay}
          </p>
          <p className="font-sans text-[0.65rem] text-[#9E737F] mt-0.5">
            {weddingConfig.venue.hall}, {weddingConfig.venue.city}
          </p>
        </div>

        {/* Tap to enter website prompt when card is out */}
        {isEmerged && !isZooming && (
          <div className="card-tap-prompt">
            Tap Card to Enter ✨
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitationCard3D;
