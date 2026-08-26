import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const VenueLocation: React.FC = () => {
  return (
    <section id="venue" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase mb-2">
            Location &amp; Directions
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#421824]">
            The Wedding Venue
          </h2>
          <div className="botanical-divider">
            <span className="text-[#C93E64]">✦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Venue Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="stationery-card p-6 sm:p-8 border border-[#F5BCCB]">
              <span className="inline-block px-3 py-1 bg-[#FFF0F4] border border-[#FCD8E3] rounded-full font-cinzel text-[0.65rem] tracking-[2px] text-[#892640] font-semibold uppercase mb-3">
                Celebration Venue
              </span>
              
              <h3 className="font-serif text-2xl sm:text-3xl text-[#421824] mb-1">
                {weddingConfig.venue.hall}
              </h3>
              <h4 className="font-serif text-lg text-[#C93E64] mb-4">
                {weddingConfig.venue.hotel}
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-[#613944] border-t border-[#FEEBF0] pt-4">
                <div className="flex items-start gap-2.5">
                  <span className="text-base mt-0.5">📍</span>
                  <p className="leading-relaxed">
                    {weddingConfig.venue.fullAddress}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🕒</span>
                  <p>8:00 A.M. – 4:00 P.M.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🚗</span>
                  <p>Ample guest parking available on premises</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#FEEBF0]">
                <a
                  href={weddingConfig.venue.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary w-full text-center"
                >
                  <span>📍</span> View Location on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Map Embed Frame */}
          <div className="lg:col-span-7">
            <div className="stationery-card overflow-hidden h-[340px] sm:h-[400px] border border-[#F5BCCB] shadow-md p-0">
              <iframe
                title="Hotel Green Court Homagama Map"
                src={weddingConfig.venue.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VenueLocation;
