import React from 'react';
import { weddingConfig } from '../../config/wedding';

interface MusicPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onToggle }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Floating Audio Control Button */}
      <button
        onClick={onToggle}
        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg border transition-all duration-300 ${
          isPlaying
            ? 'bg-white/95 border-[#C93E64] text-[#892640]'
            : 'bg-white/80 border-[#F5BCCB] text-[#9E737F] hover:bg-white/95'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
        aria-label="Toggle background wedding music"
      >
        {/* Animated sound waves */}
        <div className="flex items-end gap-0.5 h-3.5 w-3.5">
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3.5 animate-pulse' : 'h-1.5'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-2.5 animate-bounce' : 'h-1'
            }`}
          />
          <span
            className={`w-0.5 bg-current rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3 animate-pulse' : 'h-2'
            }`}
          />
        </div>

        <span className="font-cinzel text-[0.7rem] tracking-wider uppercase font-semibold">
          {isPlaying ? 'Music On' : 'Music Off'}
        </span>
      </button>
    </div>
  );
};

export default MusicPlayer;
