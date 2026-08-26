import React, { useState } from 'react';
import { useInvitee } from './hooks/useInvitee';
import { useMusic } from './hooks/useMusic';
import { EnvelopeScene } from './components/Envelope3D/EnvelopeScene';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './sections/Hero/Hero';
import { PersonalizedWelcome } from './sections/PersonalizedWelcome/PersonalizedWelcome';
import { ParentsBlessings } from './sections/Parents/ParentsBlessings';
import { WeddingDetails } from './sections/WeddingDetails/WeddingDetails';
import { PoruwaCeremony } from './sections/Ceremony/PoruwaCeremony';
import { VenueLocation } from './sections/Venue/VenueLocation';
import { Countdown } from './sections/Countdown/Countdown';
import { LoveStory } from './sections/LoveStory/LoveStory';
import { MemoriesGallery } from './sections/Memories/MemoriesGallery';
import { RsvpForm } from './sections/RSVP/RsvpForm';
import { BlessingsWall } from './sections/Guestbook/BlessingsWall';
import { Footer } from './sections/Footer/Footer';
import { MusicPlayer } from './components/MusicPlayer/MusicPlayer';

export const App: React.FC = () => {
  const invitee = useInvitee();
  const { isPlaying, playMusic, toggleMusic } = useMusic();
  const [envelopeDismissed, setEnvelopeDismissed] = useState(false);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative paper-texture selection:bg-[#EADAD5] selection:text-[#2B2623]">
      {/* 3D Cinematic Envelope Entry Viewport */}
      {!envelopeDismissed && (
        <EnvelopeScene
          invitee={invitee}
          onExperienceComplete={() => setEnvelopeDismissed(true)}
          onPlayMusic={playMusic}
        />
      )}

      {/* Main Digital Invitation Web App */}
      <div className={`transition-opacity duration-1000 ${envelopeDismissed ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar onReplayEnvelope={() => setEnvelopeDismissed(false)} />

        <main>
          {/* 01: Hero */}
          <Hero
            onScrollToRsvp={() => handleScrollToSection('rsvp')}
            onScrollToDetails={() => handleScrollToSection('details')}
          />

          {/* 02: Personalized Welcome */}
          <PersonalizedWelcome invitee={invitee} />

          {/* 03: Parents Blessings */}
          <ParentsBlessings />

          {/* 04: Wedding Details & Itinerary */}
          <WeddingDetails />

          {/* 05: Sacred Poruwa Ceremony */}
          <PoruwaCeremony />

          {/* 06: Venue & Directions */}
          <VenueLocation />

          {/* 07: Live Countdown */}
          <Countdown />

          {/* 08: Love Story */}
          <LoveStory />

          {/* 09: Photo Gallery / Memories */}
          <MemoriesGallery />

          {/* 10: RSVP Form */}
          <RsvpForm invitee={invitee} />

          {/* 11: Blessings & Guestbook */}
          <BlessingsWall />
        </main>

        {/* 12: Footer & RSVP Contacts */}
        <Footer />

        {/* Floating Audio Controller */}
        <MusicPlayer isPlaying={isPlaying} onToggle={toggleMusic} />
      </div>
    </div>
  );
};

export default App;
