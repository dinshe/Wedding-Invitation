import React from 'react';
import { InviteeInfo } from '../../types/wedding';
import { WaxSeal } from './WaxSeal';
import { InvitationCard3D } from './InvitationCard3D';

interface EnvelopeStructureProps {
  invitee: InviteeInfo;
  isFlapOpen: boolean;
  isCardEmerged: boolean;
  isZooming: boolean;
  isBroken: boolean;
  onSealClick: () => void;
  onCardClick: () => void;
}

export const EnvelopeStructure: React.FC<EnvelopeStructureProps> = ({
  invitee,
  isFlapOpen,
  isCardEmerged,
  isZooming,
  isBroken,
  onSealClick,
  onCardClick,
}) => {
  return (
    <div className="envelope-3d-stage">
      {/* Dynamic Base Shadow underneath */}
      <div
        className="envelope-base-shadow"
        style={{
          transform: isCardEmerged
            ? 'scale(1.12) translateY(18px) translateZ(-70px)'
            : 'scale(1) translateZ(-60px)',
          opacity: isFlapOpen ? 0.7 : 0.85,
        }}
      />

      {/* Layer 1: Envelope Back Panel */}
      <div className="envelope-back-panel">
        {/* Layer 2: Envelope Inner Lining */}
        <div className="envelope-inner-lining" />
      </div>

      {/* Layer 3: Physical Invitation Card inside pocket (Only revealed after seal is tapped) */}
      <InvitationCard3D
        invitee={invitee}
        isEmerged={isCardEmerged}
        isZooming={isZooming}
        onCardClick={onCardClick}
      />

      {/* Layer 4: Front Pocket (Left, Right, Bottom Folded Paper Flaps) */}
      <div className="envelope-front-pocket">
        <svg
          viewBox="0 0 460 310"
          className="pocket-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="pocketLeftGradRose" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF2F5" />
              <stop offset="100%" stopColor="#FCE0E8" />
            </linearGradient>
            <linearGradient id="pocketRightGradRose" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFF2F5" />
              <stop offset="100%" stopColor="#FCE0E8" />
            </linearGradient>
            <linearGradient id="pocketBottomGradRose" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#FBD3DE" />
              <stop offset="100%" stopColor="#F8C0D0" />
            </linearGradient>
            <filter id="pocketShadowRose" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="-3" stdDeviation="4" floodColor="#782E3E" floodOpacity="0.12" />
            </filter>
          </defs>

          {/* Left Paper Fold */}
          <path d="M 0,0 L 230,175 L 0,310 Z" fill="url(#pocketLeftGradRose)" />
          
          {/* Right Paper Fold */}
          <path d="M 460,0 L 230,175 L 460,310 Z" fill="url(#pocketRightGradRose)" />

          {/* Bottom Paper Fold */}
          <path
            d="M 0,310 L 230,145 L 460,310 Z"
            fill="url(#pocketBottomGradRose)"
            filter="url(#pocketShadowRose)"
          />
        </svg>
      </div>

      {/* Layer 5: Top Flap (Hinged at top edge) */}
      <div
        className={`envelope-top-flap-wrapper ${isFlapOpen ? 'flap-opened' : ''}`}
      >
        {/* Front Face (Closed, pointing down) */}
        <div className="flap-face-front">
          <svg viewBox="0 0 460 180" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="topFlapGradRose" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF5F8" />
                <stop offset="100%" stopColor="#FCE3EB" />
              </linearGradient>
            </defs>
            <path
              d="M 0,0 L 230,175 L 460,0 Z"
              fill="url(#topFlapGradRose)"
            />
          </svg>
        </div>

        {/* Back Face (Opened, shows inner lining pattern) */}
        <div className="flap-face-back">
          <svg viewBox="0 0 460 180" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M 0,0 L 230,175 L 460,0 Z"
              fill="#FFF0F4"
            />
          </svg>
        </div>
      </div>

      {/* Layer 6: Wax Seal Button on Flap Closure */}
      <WaxSeal
        onSealClick={onSealClick}
        isFlapOpen={isFlapOpen}
        isBroken={isBroken}
      />
    </div>
  );
};

export default EnvelopeStructure;
