import { RsvpPayload, MemoryItem, WishItem } from '../types/wedding';
import { weddingConfig } from '../config/wedding';

// Mock/Initial memories gallery if Google Drive / Sheets API is not yet linked
export const initialMemories: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'Serenade at Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    caption: 'Golden hour moments filled with quiet laughter and promises of forever.',
    category: 'Pre-Shoot',
    visible: true,
    sortOrder: 1,
  },
  {
    id: 'mem-2',
    title: 'The Promise Ring',
    imageUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=600&q=80',
    caption: 'A sparkling reminder of the moment two lives chose each other.',
    category: 'Engagement',
    visible: true,
    sortOrder: 2,
  },
  {
    id: 'mem-3',
    title: 'Botanical Whispers',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    caption: 'Handcrafted ivory florals and delicate silver details.',
    category: 'Details',
    visible: true,
    sortOrder: 3,
  },
  {
    id: 'mem-4',
    title: 'Embrace of Forever',
    imageUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80',
    caption: 'Standing together against the timeless horizon.',
    category: 'Pre-Shoot',
    visible: true,
    sortOrder: 4,
  },
  {
    id: 'mem-5',
    title: 'Elegance in Motion',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
    caption: 'Every step leading toward our most anticipated celebration.',
    category: 'Portraits',
    visible: true,
    sortOrder: 5,
  },
  {
    id: 'mem-6',
    title: 'Sacred Traditions',
    imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80',
    thumbnailUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=600&q=80',
    caption: 'Honoring our heritage and cultural blessings on this auspicious union.',
    category: 'Tradition',
    visible: true,
    sortOrder: 6,
  },
];

// Initial sample blessings
export const initialWishes: WishItem[] = [
  {
    id: 'wish-1',
    name: 'Chaminda & Niluka',
    message: 'Wishing Mayurika & Yashodha a blessed marriage filled with endless love, peace, and eternal joy!',
    date: 'August 2026',
    relation: 'Family',
  },
  {
    id: 'wish-2',
    name: 'Dilshan Wanniarachchi',
    message: 'Heartiest congratulations to the wonderful couple! May the Poruwa ceremony bring divine blessings to your union.',
    date: 'August 2026',
    relation: 'Cousin',
  },
  {
    id: 'wish-3',
    name: 'Kavindu & Sewwandi',
    message: 'Counting down the days to celebrate at Dukes Lounge! You two are truly made for each other.',
    date: 'August 2026',
    relation: 'Friends',
  },
];

/**
 * Submits RSVP to Google Apps Script Web App
 */
export async function submitRsvpApi(payload: RsvpPayload): Promise<{ success: boolean; message: string }> {
  const url = weddingConfig.api.appsScriptUrl;

  // If no live Apps Script URL is configured yet, simulate successful API response and store locally
  if (!url || url.includes('SAMPLE_DEPLOYMENT_ID')) {
    console.log('[RSVP Service] Apps Script URL is in mock mode. Saving locally:', payload);
    
    // Save to localStorage for demo persistence
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({ ...payload, submittedAt: new Date().toISOString() });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }

    // Return realistic success delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      message: `Thank you, ${payload.inviteeName}. Your RSVP has been confirmed!`,
    };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'submitRsvp',
        ...payload,
      }),
    });

    const result = await response.json();
    return {
      success: result.status === 'success',
      message: result.message || 'Response received successfully.',
    };
  } catch (error) {
    console.error('Error submitting RSVP to Google Apps Script:', error);
    // Offline resilience: save locally and acknowledge
    try {
      const existing = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      existing.push({ ...payload, submittedAt: new Date().toISOString(), pendingSync: true });
      localStorage.setItem('wedding_rsvps', JSON.stringify(existing));
    } catch (e) {
      // ignore
    }
    return {
      success: true,
      message: `Thank you, ${payload.inviteeName}. Your response has been recorded!`,
    };
  }
}

/**
 * Submits a new wish to Google Apps Script
 */
export async function submitWishApi(wish: { name: string; message: string }): Promise<{ success: boolean; item?: WishItem }> {
  const newWish: WishItem = {
    id: 'wish-' + Date.now(),
    name: wish.name,
    message: wish.message,
    date: 'Just now',
  };

  const url = weddingConfig.api.appsScriptUrl;
  if (!url || url.includes('SAMPLE_DEPLOYMENT_ID')) {
    try {
      const local = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
      local.unshift(newWish);
      localStorage.setItem('wedding_wishes', JSON.stringify(local));
    } catch (e) {
      // ignore
    }
    return { success: true, item: newWish };
  }

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action: 'submitWish', ...wish }),
    });
    return { success: true, item: newWish };
  } catch (err) {
    return { success: true, item: newWish };
  }
}
