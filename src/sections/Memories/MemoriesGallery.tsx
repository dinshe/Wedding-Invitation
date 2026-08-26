import React, { useState, useEffect } from 'react';
import { initialMemories } from '../../services/api';
import { MemoryItem } from '../../types/wedding';

export const MemoriesGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories);
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openLightbox = (memory: MemoryItem, index: number) => {
    setSelectedMemory(memory);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedMemory(null);
    document.body.style.overflow = 'auto';
  };

  const showNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextIdx = (currentIndex + 1) % memories.length;
    setCurrentIndex(nextIdx);
    setSelectedMemory(memories[nextIdx]);
  };

  const showPrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const prevIdx = (currentIndex - 1 + memories.length) % memories.length;
    setCurrentIndex(prevIdx);
    setSelectedMemory(memories[prevIdx]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMemory) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMemory, currentIndex]);

  return (
    <section id="gallery" className="py-16 sm:py-24 px-4 bg-[#FAF6EF]/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-cinzel text-xs tracking-[4px] text-[#8E6D67] uppercase mb-2">
            Moments in Time
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#2B2623]">
            Our Memories
          </h2>
          <div className="botanical-divider">
            <span className="text-[#8E6D67] text-sm">✦</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {memories.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item, idx)}
              className="stationery-card group overflow-hidden cursor-pointer rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white">
                    <p className="font-cinzel text-xs tracking-wider uppercase opacity-80">
                      {item.category}
                    </p>
                    <h4 className="font-serif text-lg font-normal">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMemory && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-3xl p-2 z-50"
            aria-label="Close photo preview"
          >
            ✕
          </button>

          {/* Prev button */}
          <button
            onClick={showPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-4 z-50"
            aria-label="Previous photo"
          >
            ‹
          </button>

          {/* Next button */}
          <button
            onClick={showNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl p-4 z-50"
            aria-label="Next photo"
          >
            ›
          </button>

          {/* Lightbox Content */}
          <div
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedMemory.imageUrl}
              alt={selectedMemory.title}
              className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-white">
              <h3 className="font-serif text-2xl mb-1">
                {selectedMemory.title}
              </h3>
              <p className="font-sans text-xs text-white/70 max-w-md mx-auto">
                {selectedMemory.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemoriesGallery;
