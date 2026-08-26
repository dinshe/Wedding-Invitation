# Google Apps Script & Google Sheets Backend Setup

This guide explains how to set up the free Google Sheets backend for **Mayurika & Yashodha's Wedding Digital Invitation**.

---

## 1. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Title the spreadsheet: `Mayurika & Yashodha Wedding Database`.
3. Create the following sheets (tabs) with their corresponding column headers in row 1:

### Sheet 1: `RSVP`
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `rsvp_id` | `invitee_name` | `attendance` | `guest_count` | `guest_names` | `phone` | `message` | `submitted_at` |

### Sheet 2: `INVITEES` (Optional Guestlist Verification)
| Column A | Column B | Column C | Column D | Column E | Column F |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `invitee_id` | `invitee_name` | `allowed_guests` | `phone` | `status` | `created_at` |

### Sheet 3: `WISHES`
| Column A | Column B | Column C | Column D |
| :--- | :--- | :--- | :--- |
| `wish_id` | `author_name` | `message` | `date_added` |

### Sheet 4: `MEMORIES` (Photo Gallery)
| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `id` | `title` | `imageUrl` | `thumbnailUrl` | `caption` | `category` | `visible` | `sortOrder` |

---

## 2. Deploy Google Apps Script

1. In your Google Sheet, click **Extensions** > **Apps Script**.
2. Replace all existing code in `Code.gs` with the content from [Code.gs](Code.gs).
3. Click the **Save** (💾) icon.
4. Click **Deploy** > **New deployment**.
5. Select type: **Web app**.
6. Set the configuration:
   - **Description**: `Wedding RSVP API v1`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` (essential for accepting RSVPs from wedding guests)
7. Click **Deploy**.
8. Grant permissions when prompted.
9. Copy the **Web App URL** (it will look like: `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 3. Link to Wedding Website

Open `src/config/wedding.ts` and paste your Web App URL in `api.appsScriptUrl`:

```typescript
api: {
  appsScriptUrl: "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
}
```

Now all RSVPs and wishes will be saved directly into your private Google Sheet in real-time!
