import { InviteeInfo } from '../types/wedding';

/**
 * Sanitizes input string to prevent XSS and HTML injection
 */
export function sanitizeString(input: string | null | undefined): string {
  if (!input) return '';
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Decodes URL parameters properly handling Unicode, Sinhala, Tamil, spaces, and punctuation
 */
export function parseInviteeParams(searchQuery?: string): InviteeInfo {
  const query = searchQuery !== undefined ? searchQuery : (typeof window !== 'undefined' ? window.location.search : '');
  const params = new URLSearchParams(query);
  
  const rawInvitee = params.get('invitee') || params.get('guest') || params.get('name') || '';
  const rawGuests = params.get('guests') || params.get('seats') || params.get('count') || '1';
  
  // Cleanly decode
  let decodedInvitee = '';
  try {
    decodedInvitee = decodeURIComponent(rawInvitee.replace(/\+/g, ' ')).trim();
  } catch (e) {
    decodedInvitee = rawInvitee.replace(/\+/g, ' ').trim();
  }

  // Parse allowed guest count
  let parsedGuests = parseInt(rawGuests, 10);
  if (isNaN(parsedGuests) || parsedGuests < 1) {
    parsedGuests = 1;
  } else if (parsedGuests > 10) {
    parsedGuests = 10;
  }

  const isPersonalized = decodedInvitee.length > 0;
  
  // Format display name
  const displayName = isPersonalized ? decodedInvitee : 'Honoured Guest';

  return {
    name: displayName,
    rawName: decodedInvitee,
    allowedGuests: parsedGuests,
    isPersonalized,
  };
}

/**
 * Generates personalized invitation link
 */
export function generateGuestUrl(baseUrl: string, inviteeName: string, guestCount: number = 1): string {
  const url = new URL(baseUrl, typeof window !== 'undefined' ? window.location.href : 'https://dinshe.github.io/engagement-invitation-and-RSVP/');
  url.searchParams.set('invitee', inviteeName);
  url.searchParams.set('guests', guestCount.toString());
  return url.toString();
}
