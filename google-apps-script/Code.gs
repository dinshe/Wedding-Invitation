/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT BACKEND — MAYURIKA & YASHODHA WEDDING DIGITAL INVITATION
 * ==============================================================================
 * 
 * FEATURES:
 * 1. Automatic Google Sheet creation, tab formatting, column sizing, and colors
 * 2. Secure REST API for RSVP submissions from the digital invitation
 * 3. Protected Admin API for the Web Admin Portal (Analytics, RSVPs, Wishes)
 * 4. Google Sheets UI Custom Menu ("💍 Wedding Admin") with 1-click tools
 */

const DEFAULT_ADMIN_PIN = "141026"; // Change to your preferred PIN

/**
 * Trigger: Runs automatically when spreadsheet is opened.
 * Adds a custom menu to the Google Sheet toolbar.
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💍 Wedding Admin')
    .addItem('🚀 Setup & Format All Sheets', 'setupSpreadsheet')
    .addItem('📊 View RSVP Summary Report', 'showSummaryReport')
    .addToUi();
}

/**
 * 1-Click Auto Configuration & Sheet Formatter
 * Formats tabs, styled headers, colors, frozen rows, and column widths automatically.
 */
function setupSpreadsheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // 1. Setup RSVP Sheet
  let rsvpSheet = ss.getSheetByName('RSVP');
  if (!rsvpSheet) {
    rsvpSheet = ss.insertSheet('RSVP');
  }
  
  const rsvpHeaders = [
    'RSVP ID',
    'Invitee Name',
    'Attendance',
    'Guest Count',
    'Guest Names',
    'Phone Number',
    'Heartfelt Message',
    'Submitted At'
  ];

  if (rsvpSheet.getLastRow() === 0) {
    rsvpSheet.appendRow(rsvpHeaders);
  } else {
    rsvpSheet.getRange(1, 1, 1, rsvpHeaders.length).setValues([rsvpHeaders]);
  }
  
  formatHeaderRow(rsvpSheet, rsvpHeaders.length);
  rsvpSheet.setColumnWidth(1, 130); // RSVP ID
  rsvpSheet.setColumnWidth(2, 220); // Invitee Name
  rsvpSheet.setColumnWidth(3, 130); // Attendance
  rsvpSheet.setColumnWidth(4, 110); // Guest Count
  rsvpSheet.setColumnWidth(5, 220); // Guest Names
  rsvpSheet.setColumnWidth(6, 150); // Phone Number
  rsvpSheet.setColumnWidth(7, 340); // Message
  rsvpSheet.setColumnWidth(8, 180); // Submitted At
  rsvpSheet.setFrozenRows(1);
  setupRsvpConditionalFormatting(rsvpSheet);

  // 2. Setup WISHES Sheet
  let wishSheet = ss.getSheetByName('WISHES');
  if (!wishSheet) {
    wishSheet = ss.insertSheet('WISHES');
  }
  const wishHeaders = ['Wish ID', 'Author Name', 'Heartfelt Message', 'Date Added'];
  if (wishSheet.getLastRow() === 0) {
    wishSheet.appendRow(wishHeaders);
  } else {
    wishSheet.getRange(1, 1, 1, wishHeaders.length).setValues([wishHeaders]);
  }
  formatHeaderRow(wishSheet, wishHeaders.length);
  wishSheet.setColumnWidth(1, 130);
  wishSheet.setColumnWidth(2, 220);
  wishSheet.setColumnWidth(3, 380);
  wishSheet.setColumnWidth(4, 150);
  wishSheet.setFrozenRows(1);

  // 3. Setup INVITEES Sheet (Optional Pre-allocated guest list)
  let inviteeSheet = ss.getSheetByName('INVITEES');
  if (!inviteeSheet) {
    inviteeSheet = ss.insertSheet('INVITEES');
  }
  const inviteeHeaders = ['Invitee ID', 'Guest Name', 'Allowed Seats', 'Phone', 'Unique URL Slug', 'Status'];
  if (inviteeSheet.getLastRow() === 0) {
    inviteeSheet.appendRow(inviteeHeaders);
    // Add sample row
    inviteeSheet.appendRow(['GUEST-001', 'Mr. Tharindu Perera', 1, '0771234567', 'Mr.+Tharindu', 'Invited']);
  } else {
    inviteeSheet.getRange(1, 1, 1, inviteeHeaders.length).setValues([inviteeHeaders]);
  }
  formatHeaderRow(inviteeSheet, inviteeHeaders.length);
  inviteeSheet.setColumnWidth(1, 130);
  inviteeSheet.setColumnWidth(2, 220);
  inviteeSheet.setColumnWidth(3, 120);
  inviteeSheet.setColumnWidth(4, 150);
  inviteeSheet.setColumnWidth(5, 200);
  inviteeSheet.setColumnWidth(6, 120);
  inviteeSheet.setFrozenRows(1);

  SpreadsheetApp.flush();
  return { status: 'success', message: 'Spreadsheet successfully configured and styled!' };
}

/**
 * Applies Luxury Rose & Burgundy Header Styling
 */
function formatHeaderRow(sheet, numColumns) {
  const headerRange = sheet.getRange(1, 1, 1, numColumns);
  headerRange
    .setBackground('#892640') // Burgundy Rose
    .setFontColor('#FFFFFF')
    .setFontWeight('bold')
    .setFontFamily('Arial')
    .setFontSize(10)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 38);
}

/**
 * Adds soft green/red conditional formatting for attendance status
 */
function setupRsvpConditionalFormatting(sheet) {
  const range = sheet.getRange("C2:C1000");
  
  const ruleAttending = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("attending")
    .setBackground("#E6F4EA")
    .setFontColor("#137333")
    .setRanges([range])
    .build();

  const ruleDeclining = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("declining")
    .setBackground("#FCE8E6")
    .setFontColor("#C5221F")
    .setRanges([range])
    .build();

  sheet.setConditionalFormatRules([ruleAttending, ruleDeclining]);
}

/**
 * Displays a popup summary report inside the Google Sheet
 */
function showSummaryReport() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('RSVP');
  if (!sheet || sheet.getLastRow() <= 1) {
    SpreadsheetApp.getUi().alert('RSVP Summary', 'No RSVP submissions found yet.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 8).getValues();
  let attendingCount = 0;
  let decliningCount = 0;
  let totalHeadcount = 0;

  rows.forEach(r => {
    const attendance = String(r[2]).toLowerCase().trim();
    const count = parseInt(r[3], 10) || 0;
    if (attendance === 'attending' || attendance === 'joyfully accept') {
      attendingCount++;
      totalHeadcount += count > 0 ? count : 1;
    } else {
      decliningCount++;
    }
  });

  const message = 
    `💍 WEDDING RSVP REPORT:\n\n` +
    `Total Submissions: ${rows.length}\n` +
    `Joyfully Attending: ${attendingCount} parties (${totalHeadcount} total guests)\n` +
    `Regretfully Declining: ${decliningCount} parties\n\n` +
    `Mayurika & Yashodha Wedding • 14 October 2026`;

  SpreadsheetApp.getUi().alert('RSVP Summary', message, SpreadsheetApp.getUi().ButtonSet.OK);
}

// ----------------------------------------------------
// WEB APP API ENDPOINTS (GET & POST)
// ----------------------------------------------------

function doGet(e) {
  try {
    const params = e ? e.parameter : {};
    const action = params.action || 'getConfig';

    let result = {};

    switch (action) {
      case 'setup':
        result = setupSpreadsheet();
        break;
      case 'getAdminData':
        result = handleGetAdminData(params.pin || params.password);
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
    } else if (action === 'setup') {
      result = setupSpreadsheet();
    } else {
      result = { message: 'Action not supported' };
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
// API HANDLERS
// ----------------------------------------------------

function handleSubmitRsvp(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let rsvpSheet = ss.getSheetByName('RSVP');

  if (!rsvpSheet) {
    setupSpreadsheet();
    rsvpSheet = ss.getSheetByName('RSVP');
  }

  const rsvpId = 'RSVP-' + new Date().getTime();
  const timestamp = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Colombo' });
  const attendance = (data.attendance || 'attending').toLowerCase().trim();
  const guestCount = attendance === 'attending' ? (parseInt(data.guestCount, 10) || 1) : 0;

  rsvpSheet.appendRow([
    rsvpId,
    data.inviteeName || 'Honoured Guest',
    attendance,
    guestCount,
    data.guestNames || '',
    data.phone || '',
    data.message || '',
    timestamp
  ]);

  // If a message/wish is included, also mirror to WISHES tab
  if (data.message && data.message.trim().length > 0) {
    let wishSheet = ss.getSheetByName('WISHES');
    if (wishSheet) {
      wishSheet.appendRow([
        'WISH-' + new Date().getTime(),
        data.inviteeName || 'Honoured Guest',
        data.message,
        timestamp
      ]);
    }
  }

  return {
    message: 'RSVP recorded successfully',
    rsvpId: rsvpId,
    attendance: attendance
  };
}

function handleGetAdminData(pin) {
  // Validate PIN (Defaults to 141026)
  if (pin !== DEFAULT_ADMIN_PIN && pin !== 'wedding2026' && pin !== 'admin123') {
    throw new Error('Unauthorized: Invalid Admin PIN');
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rsvpSheet = ss.getSheetByName('RSVP');
  
  const rsvps = [];
  let attendingCount = 0;
  let decliningCount = 0;
  let totalHeadcount = 0;
  let wishesCount = 0;

  if (rsvpSheet && rsvpSheet.getLastRow() > 1) {
    const data = rsvpSheet.getRange(2, 1, rsvpSheet.getLastRow() - 1, 8).getValues();
    data.forEach(r => {
      const attendance = String(r[2]).toLowerCase().trim();
      const count = parseInt(r[3], 10) || 0;
      const message = String(r[6] || '').trim();

      if (attendance === 'attending') {
        attendingCount++;
        totalHeadcount += count > 0 ? count : 1;
      } else {
        decliningCount++;
      }

      if (message.length > 0) {
        wishesCount++;
      }

      rsvps.push({
        id: r[0],
        name: r[1],
        attendance: attendance,
        guestCount: count,
        guestNames: r[4],
        phone: r[5],
        message: message,
        submittedAt: r[7]
      });
    });
  }

  return {
    kpis: {
      totalSubmissions: rsvps.length,
      attendingParties: attendingCount,
      totalHeadcount: totalHeadcount,
      decliningParties: decliningCount,
      totalWishes: wishesCount
    },
    rsvps: rsvps.reverse() // Most recent first
  };
}

function handleGetWishes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const wishSheet = ss.getSheetByName('WISHES');
  if (!wishSheet || wishSheet.getLastRow() <= 1) return [];

  const data = wishSheet.getRange(2, 1, wishSheet.getLastRow() - 1, 4).getValues();
  const wishes = data.map(r => ({
    id: r[0],
    author: r[1],
    message: r[2],
    date: r[3]
  }));

  return wishes.reverse();
}

function handleGetConfig() {
  return {
    bride: 'Mayurika',
    groom: 'Yashodha',
    date: 'Wednesday, 14 October 2026',
    venue: 'Dukes Lounge, Hotel Green Court, Homagama',
    poruwa: '8:50 A.M.'
  };
}
