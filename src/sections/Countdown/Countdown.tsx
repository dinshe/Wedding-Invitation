import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { weddingConfig } from '../../config/wedding';

export const Countdown: React.FC = () => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(weddingConfig.date.isoString);

  return (
    <section id="countdown" className="py-16 sm:py-20 px-4 bg-[#FEEBF0]/60">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase mb-2">
          Waiting for Forever
        </p>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#421824] mb-4">
          Counting Down to Our Day
        </h2>
        <div className="botanical-divider">
          <span className="text-[#C93E64]">✦</span>
        </div>

        {isExpired ? (
          <div className="stationery-card p-8 sm:p-12 max-w-xl mx-auto border border-[#F5BCCB]">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#C93E64] mb-2">
              Today is the Day! 💍
            </h3>
            <p className="font-serif italic text-lg text-[#613944]">
              We are celebrating our marriage today. Welcome to our special celebration!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {/* Days */}
            <div className="stationery-card p-4 sm:p-6 text-center border border-[#FCD8E3] hover:border-[#F5BCCB] transition-colors">
              <span className="font-serif text-4xl sm:text-5xl text-[#421824] font-light block leading-none mb-2">
                {String(days).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[0.65rem] sm:text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="stationery-card p-4 sm:p-6 text-center border border-[#FCD8E3] hover:border-[#F5BCCB] transition-colors">
              <span className="font-serif text-4xl sm:text-5xl text-[#421824] font-light block leading-none mb-2">
                {String(hours).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[0.65rem] sm:text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="stationery-card p-4 sm:p-6 text-center border border-[#FCD8E3] hover:border-[#F5BCCB] transition-colors">
              <span className="font-serif text-4xl sm:text-5xl text-[#421824] font-light block leading-none mb-2">
                {String(minutes).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[0.65rem] sm:text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="stationery-card p-4 sm:p-6 text-center border border-[#FCD8E3] hover:border-[#F5BCCB] transition-colors">
              <span className="font-serif text-4xl sm:text-5xl text-[#C93E64] font-light block leading-none mb-2">
                {String(seconds).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[0.65rem] sm:text-xs tracking-[2px] text-[#A82E4E] font-semibold uppercase">
                Seconds
              </span>
            </div>
          </div>
        )}

        <p className="font-serif italic text-base text-[#7A4B56] mt-8">
          Wednesday, 14 October 2026 • Dukes Lounge, Homagama
        </p>
      </div>
    </section>
  );
};

export default Countdown;
