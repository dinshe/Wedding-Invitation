import React from 'react';
import { weddingConfig } from '../../config/wedding';

export const WeddingDetails: React.FC = () => {
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Wedding Celebration: Mayurika & Yashodha'
  )}&dates=20261014T023000Z/20261014T103000Z&details=${encodeURIComponent(
    'The Celebration of Marriage of Mayurika & Yashodha at Dukes Lounge, Hotel Green Court, Homagama. Poruwa Ceremony at 8:50 AM.'
  )}&location=${encodeURIComponent(weddingConfig.venue.fullAddress)}`;

  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mayurika & Yashodha Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-mayurika-yashodha-2026@dinshe.github.io',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20261014T023000Z',
      'DTEND:20261014T103000Z',
      'SUMMARY:Wedding of Mayurika & Yashodha',
      `DESCRIPTION:The Celebration of Marriage of Mayurika & Yashodha at Dukes Lounge, Hotel Green Court, Homagama. Poruwa Ceremony: 8:50 AM.`,
      `LOCATION:${weddingConfig.venue.fullAddress}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Mayurika-Yashodha-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="details" className="py-16 sm:py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase mb-2">
            Programme &amp; Schedule
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#421824]">
            Wedding Details
          </h2>
          <div className="botanical-divider">
            <span className="text-[#C93E64]">✦</span>
          </div>
        </div>

        {/* Date & Time Overview Box */}
        <div className="stationery-card p-6 sm:p-10 mb-12 text-center border border-[#F5BCCB]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FCD8E3]">
            {/* Date */}
            <div className="pt-2 md:pt-0">
              <p className="font-cinzel text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase mb-1">
                Date
              </p>
              <h3 className="font-serif text-2xl text-[#421824]">
                {weddingConfig.date.day}
              </h3>
              <p className="font-serif text-xl text-[#C93E64] font-semibold">
                {weddingConfig.date.date} {weddingConfig.date.month} {weddingConfig.date.year}
              </p>
            </div>

            {/* Time */}
            <div className="pt-4 md:pt-0 md:px-4">
              <p className="font-cinzel text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase mb-1">
                Time
              </p>
              <h3 className="font-serif text-2xl text-[#421824]">
                {weddingConfig.time.event}
              </h3>
              <p className="font-sans text-xs text-[#7A4B56] mt-1">
                Poruwa Ceremony: <strong className="text-[#C93E64] font-serif text-sm">8:50 A.M.</strong>
              </p>
            </div>

            {/* Venue */}
            <div className="pt-4 md:pt-0 md:pl-4">
              <p className="font-cinzel text-xs tracking-[2px] text-[#9E737F] font-semibold uppercase mb-1">
                Venue
              </p>
              <h3 className="font-serif text-xl text-[#421824]">
                {weddingConfig.venue.hall}
              </h3>
              <p className="font-sans text-xs text-[#7A4B56]">
                {weddingConfig.venue.hotel}, {weddingConfig.venue.city}
              </p>
            </div>
          </div>

          {/* Add to Calendar Action Buttons */}
          <div className="mt-8 pt-6 border-t border-[#FEEBF0] flex flex-wrap justify-center gap-3">
            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F5BCCB] text-xs font-cinzel tracking-wider text-[#892640] hover:bg-[#FFF0F4] transition-colors font-semibold"
            >
              <span>📅</span> Add to Google Calendar
            </a>
            <button
              onClick={handleDownloadIcs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F5BCCB] text-xs font-cinzel tracking-wider text-[#892640] hover:bg-[#FFF0F4] transition-colors font-semibold"
            >
              <span>📥</span> Apple / Outlook (.ics)
            </button>
          </div>
        </div>

        {/* Timeline Itinerary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {weddingConfig.schedule.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-xl bg-white border border-[#FCD8E3] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{item.icon}</span>
                <span className="font-cinzel text-xs font-semibold text-[#892640] bg-[#FFF0F4] px-2.5 py-1 rounded-full border border-[#FCE2E9]">
                  {item.time}
                </span>
              </div>
              <h4 className="font-serif text-lg text-[#421824] mb-1">
                {item.title}
              </h4>
              <p className="font-sans text-xs text-[#7A4B56] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
