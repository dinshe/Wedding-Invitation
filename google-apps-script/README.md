# 💍 Google Sheets Backend Setup & Auto-Configuration Guide

This guide explains how to set up the free Google Sheets backend and connect both your **Digital Wedding Invitation** and your **Password-Protected Admin Portal**.

---

## 🚀 1-Click Auto Configuration (No Manual Table Setup Needed!)

You don't need to manually create columns, tabs, or colors. The Apps Script does it automatically!

### Step 1: Create a Blank Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Title it: **`Mayurika & Yashodha Wedding Database`**.

### Step 2: Paste the Apps Script Code
1. In your Google Sheet, click **Extensions** > **Apps Script** in the top menu.
2. Delete everything in the code editor, and paste the code from [`Code.gs`](Code.gs).
3. Click the **Save** (💾) icon.

### Step 3: Run the Auto-Setup
1. In the Apps Script toolbar at the top, select the function **`setupSpreadsheet`** from the dropdown and click **Run ▶️**.
2. Google will ask you for permission once (*Click Advanced > Go to Untitled project*).
3. Switch back to your Google Sheet tab — all sheets (`RSVP`, `WISHES`, `INVITEES`), styled burgundy-rose headers, column widths, and conditional formatting have been generated automatically!
4. *(Bonus)* A custom menu named **`💍 Wedding Admin`** will now appear on your Google Sheet whenever you open it.

---

## 🌐 Deploy the Web App API

1. In Apps Script, click the blue **Deploy** button (top right) > **New deployment**.
2. Click the gear icon next to "Select type" and select **Web app**.
3. Configure settings:
   - **Description**: `Wedding RSVP API v2`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial so guests can submit RSVPs without logging into Google)*
4. Click **Deploy** and copy your **Web App URL** (`https://script.google.com/macros/s/.../exec`).

---

## 🔗 Connect to the Frontend & Admin Portal

1. Open `src/config/wedding.ts` or the Admin Portal (`admin.html`).
2. Paste your Web App URL into the `appsScriptUrl` field.
3. In `admin.html`, you can also paste this URL directly into the **⚙️ Connection Settings** modal to instantly sync real-time RSVPs with your Google Sheet!

---

## 🔒 Admin Portal Default Credentials

- **Admin Portal URL**: `admin.html` (e.g. `https://dinshe.github.io/Wedding-Invitation/admin.html`)
- **Default PIN / Passcode**: `141026` *(You can also use `wedding2026` or `admin123`)*
