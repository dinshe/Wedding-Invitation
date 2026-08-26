import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const LoveStory: React.FC = () => {
  if (!weddingConfig.story || weddingConfig.story.length === 0) {
    return null;
  }

  return (
    <section id="story" className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-cinzel text-xs tracking-[4px] text-[#8E6D67] uppercase mb-2">
            Our Journey
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B2623]">
            Two Hearts, One Story
          </h2>
          <div className="botanical-divider">
            <span className="text-[#8E6D67] text-sm">✦</span>
          </div>
        </div>

        {/* Elegant Timeline */}
        <div className="relative pl-6 sm:pl-0">
          {/* Central Line */}
          <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent sm:-translate-x-1/2" />

          <div className="space-y-12 sm:space-y-16">
            {weddingConfig.story.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 sm:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-2 border-[#8E6D67] shadow-sm z-10" />

                  {/* Content Box */}
                  <div
                    className={`w-full sm:w-[calc(50%-2.5rem)] pl-8 sm:pl-0 ${
                      isEven ? 'sm:text-left' : 'sm:text-right'
                    }`}
                  >
                    <div className="stationery-card p-6 inline-block w-full text-left">
                      <span className="inline-block px-2.5 py-0.5 bg-[#FAF6EF] rounded text-[0.65rem] font-cinzel text-[#8E6D67] uppercase tracking-wider mb-2">
                        {item.tag || item.year}
                      </span>
                      <h3 className="font-serif text-xl text-[#2B2623] mb-1">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
