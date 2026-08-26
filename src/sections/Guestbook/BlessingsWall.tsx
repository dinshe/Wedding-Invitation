import React, { useState } from 'react';
import { initialWishes, submitWishApi } from '../../services/api';
import { WishItem } from '../../types/wedding';

export const BlessingsWall: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(initialWishes);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSendWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    setIsSending(true);
    const res = await submitWishApi({ name: author, message });
    if (res.item) {
      setWishes([res.item, ...wishes]);
    }
    setAuthor('');
    setMessage('');
    setIsSending(false);
  };

  return (
    <section id="wishes" className="py-16 sm:py-24 px-4 bg-[#FAF6EF]/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[4px] text-[#8E6D67] uppercase mb-2">
            Words of Love
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B2623]">
            Blessings & Wishes
          </h2>
          <div className="botanical-divider">
            <span className="text-[#8E6D67] text-sm">✦</span>
          </div>
        </div>

        {/* Wishes Input Card */}
        <div className="stationery-card p-6 sm:p-8 max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSendWish} className="space-y-4">
            <div>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#8E6D67] outline-none text-sm text-slate-800 bg-[#FDFBF7]"
              />
            </div>
            <div>
              <textarea
                required
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your blessing for Mayurika & Yashodha..."
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-[#8E6D67] outline-none text-sm text-slate-800 bg-[#FDFBF7]"
              />
            </div>
            <button
              type="submit"
              disabled={isSending}
              className="btn-luxury-secondary text-xs w-full sm:w-auto"
            >
              {isSending ? 'Posting...' : 'Send Blessing ✨'}
            </button>
          </form>
        </div>

        {/* Wishes Display Wall */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="stationery-card p-6 flex flex-col justify-between"
            >
              <p className="font-serif italic text-sm text-slate-700 mb-4 leading-relaxed">
                "{wish.message}"
              </p>
              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs">
                <span className="font-cinzel font-semibold text-[#8E6D67]">
                  {wish.name}
                </span>
                <span className="text-slate-400">{wish.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlessingsWall;
