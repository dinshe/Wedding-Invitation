import React from 'react';
import { weddingConfig } from '../../config/wedding';

interface WaxSealProps {
  onSealClick: () => void;
  isFlapOpen: boolean;
  isBroken: boolean;
}

export const WaxSeal: React.FC<WaxSealProps> = ({
  onSealClick,
  isFlapOpen,
  isBroken,
}) => {
  if (isFlapOpen && isBroken) return null;

  return (
    <button
      className={`wax-seal-wrapper ${isBroken ? 'seal-broken' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        if (!isFlapOpen && !isBroken) {
          onSealClick();
        }
      }}
      aria-label="Tap to open the wedding invitation envelope"
      tabIndex={isFlapOpen ? -1 : 0}
    >
      <div className="wax-seal-btn">
        <span className="seal-monogram-text">
          {weddingConfig.couple.monogram}
        </span>
      </div>

      {!isBroken && (
        <div className="seal-prompt-badge">
          Tap seal to open
        </div>
      )}
    </button>
  );
};

export default WaxSeal;
