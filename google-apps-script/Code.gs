/**
 * Google Apps Script Web App for Mayurika & Yashodha Wedding Invitation
 * Supports RSVP submissions, dynamic guest verification, memories gallery, and wishes wall.
 */

function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    const action = params.action || 'getConfig';

    let result = {};

    switch (action) {
      case 'getInvitee':
        result = handleGetInvitee(params.id || params.name);
        break;
      case 'getMemories':
        result = handleGetMemories();
        break;
      case 'getWishes':
        result = handleGetWishes();
        break;
      case 'getConfig':
      default:
        result = handleGetConfig();
        break;
    }

    return createJsonResponse({ status: 'success', data: result });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter;
    }

    const action = payload.action || 'submitRsvp';
    let result = {};

    if (action === 'submitRsvp') {
      result = handleSubmitRsvp(payload);
    } else if (action === 'submitWish') {
      result = handleSubmitWish(payload);
    } else {
      result = { message: 'Unknown action' };
    }

    return createJsonResponse({ status: 'success', ...result });
  } catch (error) {
    return createJsonResponse({ status: 'error', message: error.toString() });
  }
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ----------------------------------------------------
// HANDLERS
// ----------------------------------------------------

function handleSubmitRsvp(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let rsvpSheet = ss.getSheetByName('RSVP');

  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet('RSVP');
    rsvpSheet.appendRow([
      'rsvp_id',
      'invitee_name',
      'attendance',
      'guest_count',
      'guest_names',
      'phone',
      'message',
      'submitted_at'
    ]);
  }

  const rsvpId = 'RSVP-' + new Date().getTime();
  const timestamp = new Date().toISOString();

  rsvpSheet.appendRow([
    rsvpId,
    data.inviteeName || 'Anonymous',
    data.attendance || 'attending',
    data.guestCount || 1,
    data.guestNames || '',
    data.phone || '',
    data.message || '',
    timestamp
  ]);

  return {
    message: 'RSVP received successfully for ' + (data.inviteeName || 'guest') + '!',
    rsvpId: rsvpId
  };
}

function handleSubmitWish(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let wishSheet = ss.getSheetByName('WISHES');

  if (!wishSheet) {
    wishSheet = ss.insertSheet('WISHES');
    wishSheet.appendRow(['wish_id', 'author_name', 'message', 'date_added']);
  }

  const wishId = 'WISH-' + new Date().getTime();
  wishSheet.appendRow([
    wishId,
    data.name || 'Well-wisher',
    data.message || '',
    new Date().toLocaleDateString('en-GB')
  ]);

  return {
    message: 'Wish posted successfully',
    wishId: wishId
  };
}

function handleGetMemories() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('MEMORIES');
  if (!sheet) return [];

  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const memories = [];
  for (let i = 1; i < rows.length; i++) {
    const [id, title, imageUrl, thumbnailUrl, caption, category, visible, sortOrder] = rows[i];
    if (visible === true || String(visible).toUpperCase() === 'TRUE') {
      memories.push({
        id: id,
        title: title,
        imageUrl: imageUrl,
        thumbnailUrl: thumbnailUrl || imageUrl,
        caption: caption,
        category: category,
        sortOrder: sortOrder || i
      });
    }
  }

  return memories.sort((a, b) => a.sortOrder - b.sortOrder);
}

function handleGetWishes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('WISHES');
  if (!sheet) return [];

  const rows = sheet.getDataRange().getValues();
  if (rows.length <= 1) return [];

  const wishes = [];
  for (let i = 1; i < rows.length; i++) {
    const [id, name, message, date] = rows[i];
    wishes.push({
      id: id,
      name: name,
      message: message,
      date: date
    });
  }

  return wishes.reverse();
}

function handleGetConfig() {
  return {
    bride: 'Mayurika',
    groom: 'Yashodha',
    weddingDate: '2026-10-14T08:00:00+05:30',
    venue: 'Dukes Lounge, Hotel Green Court, Homagama',
    poruwa: '8:50 A.M.'
  };
}
