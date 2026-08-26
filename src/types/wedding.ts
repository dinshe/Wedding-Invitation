// Types for Wedding Digital Invitation

export interface InviteeInfo {
  name: string;
  rawName: string;
  allowedGuests: number;
  isPersonalized: boolean;
}

export interface ParentsInfo {
  bride: string[];
  groom: string[];
}

export interface CoupleInfo {
  bride: string;
  groom: string;
  brideShort: string;
  groomShort: string;
  monogram: string;
}

export interface WeddingTime {
  event: string;
  poruwa: string;
  lunch: string;
  photos: string;
  farewell: string;
}

export interface WeddingDate {
  day: string;
  date: string;
  month: string;
  year: string;
  fullDisplay: string;
  isoString: string;
}

export interface VenueInfo {
  hall: string;
  hotel: string;
  city: string;
  fullAddress: string;
  googleMapsUrl: string;
  googleMapsEmbedUrl?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface RsvpContact {
  name: string;
  phone: string;
  formattedPhone: string;
  whatsappUrl: string;
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  tag?: string;
}

export interface MemoryItem {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl: string;
  caption: string;
  category?: string;
  date?: string;
  visible: boolean;
  sortOrder: number;
}

export interface WishItem {
  id: string;
  name: string;
  message: string;
  date: string;
  relation?: string;
}

export interface RsvpPayload {
  inviteeName: string;
  attendance: 'attending' | 'declining';
  guestCount: number;
  guestNames?: string;
  phone?: string;
  email?: string;
  dietaryRestrictions?: string;
  message?: string;
  submittedAt?: string;
}

export interface WeddingConfig {
  couple: CoupleInfo;
  parents: ParentsInfo;
  date: WeddingDate;
  time: WeddingTime;
  venue: VenueInfo;
  invitationMessage: string;
  rsvpContacts: RsvpContact[];
  schedule: Array<{
    time: string;
    title: string;
    description: string;
    icon: string;
  }>;
  story: StoryMilestone[];
  api: {
    appsScriptUrl: string;
  };
  audio: {
    src: string;
    title: string;
    artist: string;
  };
}
