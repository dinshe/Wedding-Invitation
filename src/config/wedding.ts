import { WeddingConfig } from '../types/wedding';

export const weddingConfig: WeddingConfig = {
  couple: {
    bride: "Mayurika",
    groom: "Yashodha",
    brideShort: "Mayu",
    groomShort: "Yash",
    monogram: "M & Y",
  },

  parents: {
    groom: [
      "Mrs. P. D. Hemali",
      "&",
      "(Late) Mr. Mahinda Salgado"
    ],
    bride: [
      "Mr. & Mrs. Liyana Wanniarachchi"
    ]
  },

  date: {
    day: "Wednesday",
    date: "14",
    month: "October",
    year: "2026",
    fullDisplay: "Wednesday, 14 October 2026",
    isoString: "2026-10-14T08:00:00+05:30",
  },

  time: {
    event: "8:00 A.M. – 4:00 P.M.",
    poruwa: "8:50 A.M.",
    lunch: "12:30 P.M.",
    photos: "2:00 P.M.",
    farewell: "4:00 P.M.",
  },

  venue: {
    hall: "Dukes Lounge",
    hotel: "Hotel Green Court",
    city: "Homagama",
    fullAddress: "Dukes Lounge, Hotel Green Court, High Level Road, Homagama, Sri Lanka",
    googleMapsUrl: "https://maps.google.com/?q=Hotel+Green+Court+Homagama+Sri+Lanka",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.579469795152!2d80.0016!3d6.8411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae252277d337f77%3A0x6a0c5b3648c66e2c!2sHotel%20Green%20Court!5e0!3m2!1sen!2slk!4v1700000000000",
    coordinates: {
      lat: 6.8411,
      lng: 80.0016,
    },
  },

  invitationMessage: "WITH JOYOUS HEARTS, WE INVITE YOU TO CELEBRATE OUR LOVE STORY! JOIN US AS WE TIE THE KNOT.",

  rsvpContacts: [
    {
      name: "Yashodha",
      phone: "0778368435",
      formattedPhone: "+94 77 836 8435",
      whatsappUrl: "https://wa.me/94778368435?text=Hello%20Yashodha,%20regarding%20the%20wedding%20invitation",
    },
    {
      name: "Mayurika",
      phone: "0712818260",
      formattedPhone: "+94 71 281 8260",
      whatsappUrl: "https://wa.me/94712818260?text=Hello%20Mayurika,%20regarding%20the%20wedding%20invitation",
    },
  ],

  schedule: [
    {
      time: "8:00 A.M.",
      title: "Arrival of Guests",
      description: "Welcome drink and gathering at Dukes Lounge",
      icon: "🥂",
    },
    {
      time: "8:50 A.M.",
      title: "Traditional Poruwa Ceremony",
      description: "The sacred traditional Sri Lankan matrimonial rituals and blessings",
      icon: "✨",
    },
    {
      time: "10:30 A.M.",
      title: "Registration & Cake Cutting",
      description: "Signing the marriage registry and celebrating with champagne",
      icon: "🎂",
    },
    {
      time: "12:30 P.M.",
      title: "Wedding Banquet",
      description: "Grand lunch buffet with family, friends, and live acoustic music",
      icon: "🍽️",
    },
    {
      time: "2:00 P.M.",
      title: "Photographs & Mingling",
      description: "Capturing timeless memories with the bride, groom, and loved ones",
      icon: "📸",
    },
    {
      time: "4:00 P.M.",
      title: "Farewell & Departure",
      description: "Sending the newly married couple off with love and warmest wishes",
      icon: "🕊️",
    },
  ],

  story: [
    {
      year: "The Beginning",
      title: "Serendipity",
      description: "Two souls brought together by destiny, sharing conversations that felt like home from the very first moment.",
      tag: "First Chapter",
    },
    {
      year: "Growing Together",
      title: "Endless Adventures",
      description: "Years of shared laughter, supporting each other's dreams, and creating memories across every sunset.",
      tag: "Our Journey",
    },
    {
      year: "The Promise",
      title: "A Heartfelt Forever",
      description: "A magical moment filled with love and promises, sealed with a joyful 'Yes' to spending a lifetime together.",
      tag: "The Engagement",
    },
    {
      year: "14 October 2026",
      title: "The Celebration of Marriage",
      description: "Surrounded by our dearest family and friends, we step into forever as husband and wife.",
      tag: "Wedding Day",
    },
  ],

  api: {
    // Configurable Google Apps Script Web App URL
    appsScriptUrl: "https://script.google.com/macros/s/AKfycbx_SAMPLE_DEPLOYMENT_ID/exec",
  },

  audio: {
    src: "./assets/audio/wedding-music.mp3",
    title: "A Thousand Years (Acoustic Wedding Serenade)",
    artist: "Mayurika & Yashodha Wedding Theme",
  },
};

export default weddingConfig;
