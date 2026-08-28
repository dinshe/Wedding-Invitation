import React, { useState } from 'react';
import { InviteeInfo, RsvpPayload } from '../../types/wedding';
import { submitRsvpApi } from '../../services/api';

interface RsvpFormProps {
  invitee: InviteeInfo;
}

export const RsvpForm: React.FC<RsvpFormProps> = ({ invitee }) => {
  const [name, setName] = useState(invitee.rawName || '');
  const [attendance, setAttendance] = useState<'attending' | 'declining'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [guestNames, setGuestNames] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedAttendance, setSubmittedAttendance] = useState<'attending' | 'declining'>('attending');

  const maxGuests = invitee.allowedGuests || 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload: RsvpPayload = {
      inviteeName: name || invitee.name,
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      guestNames: attendance === 'attending' && guestCount > 1 ? guestNames : undefined,
      phone,
      message,
    };

    setSubmittedAttendance(attendance);
    await submitRsvpApi(payload);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-cinzel text-xs tracking-[4px] text-[#A82E4E] font-semibold uppercase mb-2">
            Kindly Reply
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#421824]">
            Will You Join Us?
          </h2>
          <div className="botanical-divider">
            <span className="text-[#C93E64]">✦</span>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#7A4B56] max-w-md mx-auto">
            Please respond by 15 September 2026 to help us ensure your presence is celebrated with warmth.
          </p>
        </div>

        <div className="stationery-card p-8 sm:p-12 relative border border-[#F5BCCB]">
          {isSubmitted ? (
            <div className="text-center py-8">
              {/* Conditional Success Icon */}
              <div className="w-16 h-16 rounded-full bg-[#FFF0F4] border border-[#FCD8E3] text-[#C93E64] flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
                {submittedAttendance === 'attending' ? '💍' : '🕊️'}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#421824] mb-2">
                Thank You, {name || invitee.name || 'Honoured Guest'}!
              </h3>
              
              {submittedAttendance === 'attending' ? (
                <>
                  <p className="font-serif italic text-base sm:text-lg text-[#613944] max-w-md mx-auto mb-4 leading-relaxed">
                    We are thrilled that you will be joining us to celebrate our wedding. We look forward to seeing you on Wednesday, 14 October 2026 at Dukes Lounge!
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#FFF0F4] rounded-full border border-[#FCD8E3] text-xs font-sans text-[#892640] font-medium">
                    Attendance: <strong className="text-[#C93E64]">Joyfully Attending</strong> ({guestCount} Guest{guestCount > 1 ? 's' : ''})
                  </div>
                </>
              ) : (
                <>
                  <p className="font-serif italic text-base sm:text-lg text-[#7A4B56] max-w-md mx-auto mb-4 leading-relaxed">
                    We will miss your presence on our special day, but we truly appreciate your heartfelt wishes and warm blessings from afar!
                  </p>
                  <div className="inline-block px-4 py-2 bg-slate-100 rounded-full border border-slate-300 text-xs font-sans text-slate-700 font-medium">
                    Attendance: <strong>Regretfully Declining</strong>
                  </div>
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold mb-1.5">
                  Your Full Name <span className="text-[#C93E64]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mr. Tharindu Perera"
                  className="w-full px-4 py-3 rounded-lg border border-[#FCD8E3] focus:border-[#C93E64] focus:ring-1 focus:ring-[#C93E64] outline-none text-sm text-[#421824] bg-[#FFF5F7]"
                />
              </div>

              {/* Attendance Selection */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold mb-2">
                  Will You Attend? <span className="text-[#C93E64]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`py-3 px-4 rounded-lg border text-xs sm:text-sm font-sans flex items-center justify-center gap-2 transition-all ${
                      attendance === 'attending'
                        ? 'border-[#C93E64] bg-[#FFF0F4] text-[#C93E64] font-semibold shadow-sm'
                        : 'border-[#FCD8E3] text-[#7A4B56] hover:bg-[#FFF5F7]'
                    }`}
                  >
                    <span>💍</span> Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttendance('declining')}
                    className={`py-3 px-4 rounded-lg border text-xs sm:text-sm font-sans flex items-center justify-center gap-2 transition-all ${
                      attendance === 'declining'
                        ? 'border-slate-400 bg-slate-100 text-slate-800 font-semibold shadow-sm'
                        : 'border-[#FCD8E3] text-[#7A4B56] hover:bg-[#FFF5F7]'
                    }`}
                  >
                    <span>🕊️</span> Decline
                  </button>
                </div>
              </div>

              {/* Number of Guests (Only visible if attending) */}
              {attendance === 'attending' && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold">
                      Number of Guests Attending
                    </label>
                    <span className="text-[0.7rem] text-[#9E737F]">
                      (Max: {maxGuests})
                    </span>
                  </div>

                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border border-[#FCD8E3] focus:border-[#C93E64] outline-none text-sm text-[#421824] bg-[#FFF5F7]"
                  >
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest (You)' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Guest Names if more than 1 and attending */}
              {attendance === 'attending' && guestCount > 1 && (
                <div>
                  <label className="block font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold mb-1.5">
                    Accompanying Guest Names
                  </label>
                  <input
                    type="text"
                    value={guestNames}
                    onChange={(e) => setGuestNames(e.target.value)}
                    placeholder="e.g. Mrs. Anoma Perera"
                    className="w-full px-4 py-3 rounded-lg border border-[#FCD8E3] focus:border-[#C93E64] outline-none text-sm text-[#421824] bg-[#FFF5F7]"
                  />
                </div>
              )}

              {/* Contact Phone */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold mb-1.5">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 077 123 4567"
                  className="w-full px-4 py-3 rounded-lg border border-[#FCD8E3] focus:border-[#C93E64] outline-none text-sm text-[#421824] bg-[#FFF5F7]"
                />
              </div>

              {/* Personal Message / Wishes */}
              <div>
                <label className="block font-cinzel text-xs uppercase tracking-wider text-[#421824] font-semibold mb-1.5">
                  Warm Wishes for Mayurika &amp; Yashodha (Optional)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave a heartfelt message or blessing for the couple..."
                  className="w-full px-4 py-3 rounded-lg border border-[#FCD8E3] focus:border-[#C93E64] outline-none text-sm text-[#421824] bg-[#FFF5F7]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-luxury-primary w-full py-4 text-center justify-center text-sm tracking-[3px]"
              >
                {isSubmitting ? 'Recording RSVP...' : 'Submit RSVP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RsvpForm;
