import React, { useState, useRef } from 'react';
import { InviteeInfo } from '../../types/wedding';
import { EnvelopeStructure } from './EnvelopeStructure';

interface EnvelopeSceneProps {
  invitee: InviteeInfo;
  onExperienceComplete: () => void;
  onPlayMusic: () => void;
}

export const EnvelopeScene: React.FC<EnvelopeSceneProps> = ({
  invitee,
  onExperienceComplete,
  onPlayMusic,
}) => {
  const [isBroken, setIsBroken] = useState(false);
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [isCardEmerged, setIsCardEmerged] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Subtle Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isZooming) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 14;
    const y = (clientY / innerHeight - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    if (!isZooming) {
      setTilt({ x: 0, y: 0 });
    }
  };

  // Step 1: User taps the wax seal -> opens flap and reveals card
  const handleSealClick = () => {
    if (isBroken || isFlapOpen) return;
    setIsBroken(true);
    setTilt({ x: 0, y: 0 });

    // Start background wedding music
    onPlayMusic();

    // 1. Open Top Flap
    setTimeout(() => {
      setIsFlapOpen(true);
    }, 300);

    // 2. Emerge the Invitation Card
    setTimeout(() => {
      setIsCardEmerged(true);
    }, 800);
  };

  // Step 2: User taps the emerged invitation card -> zooms into full website
  const handleCardClick = () => {
    if (!isCardEmerged || isZooming) return;
    setIsZooming(true);

    setTimeout(() => {
      setIsDismissed(true);
      onExperienceComplete();
    }, 800);
  };

  if (isDismissed) return null;

  return (
    <div
      ref={containerRef}
      className={`envelope-scene-wrapper ${isZooming ? 'scene-dismissed' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="3D Wedding Envelope"
    >
      {/* 3D Envelope with interactive tilt */}
      <div
        style={{
          transform: isZooming
            ? 'rotateX(0deg) rotateY(0deg)'
            : `rotateX(${tilt.y + 3}deg) rotateY(${tilt.x - 1}deg)`,
          transition: isZooming ? 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' : 'transform 0.12s ease-out',
        }}
      >
        <EnvelopeStructure
          invitee={invitee}
          isFlapOpen={isFlapOpen}
          isCardEmerged={isCardEmerged}
          isZooming={isZooming}
          isBroken={isBroken}
          onSealClick={handleSealClick}
          onCardClick={handleCardClick}
        />
      </div>

      {/* Accessible skip button if needed */}
      <button
        onClick={() => {
          if (!isCardEmerged) handleSealClick();
          else handleCardClick();
        }}
        className="fixed bottom-6 text-[0.7rem] font-cinzel tracking-[2px] uppercase text-slate-400 hover:text-slate-700 transition-colors bg-white/70 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-300"
      >
        {!isCardEmerged ? 'Open Envelope' : 'View Website'}
      </button>
    </div>
  );
};

export default EnvelopeScene;
