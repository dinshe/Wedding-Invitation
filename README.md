<<<<<<< HEAD
# Wedding-Invitation
=======
# Luxury 3D Interactive Wedding Digital Invitation
### Mayurika & Yashodha — Wednesday, 14 October 2026

A production-ready, ultra-premium, cinematic 3D digital wedding invitation built with modern web technologies. The experience replicates the tactile luxury of physical wedding stationery transformed into an interactive 3D digital world.

---

## 💍 Official Wedding Information (Source of Truth)

- **Bride**: Mayurika
- **Groom**: Yashodha
- **Bride's Parents**: Mr. & Mrs. Liyana Wanniarachchi
- **Groom's Parents**: Mrs. P. D. Hemali & (Late) Mr. Mahinda Salgado
- **Event**: The Celebration of their Marriage
- **Date**: Wednesday, 14 October 2026
- **Time**: 8:00 A.M. – 4:00 P.M.
- **Poruwa Ceremony**: 8:50 A.M.
- **Venue**: Dukes Lounge, Hotel Green Court, Homagama
- **RSVP Contacts**:
  - Yashodha – 0778368435
  - Mayurika – 0712818260
- **Official Invitation Message**:
  > *"WITH JOYOUS HEARTS, WE INVITE YOU TO CELEBRATE OUR LOVE STORY! JOIN US AS WE TIE THE KNOT."*

---

## 🌟 Key Features

1. **Signature 3D Envelope Experience**:
   - Realistic 3D perspective (`perspective: 1400px`) with multi-layered stationery (back plate, inner lining, folded side pockets, hinged top flap).
   - Interactive embossed silver & blush wax seal with "M & Y" monogram, light sheen sweep, and tactile press response.
   - 3D flap opening physics (`rotateX(-180deg)`), card rising emergence, and seamless zoom transition into the main invitation.
   - "Replay Envelope" floating action button to re-experience the 3D opening anytime.

2. **Personalized URL Guest Engine**:
   - Dynamically parses `invitee` and `guests` query parameters from the URL.
   - Robust Unicode decoding supporting spaces, punctuation, Sinhala, and Tamil.
   - Enforces seat limit in the RSVP form matching the guest's allocated quota.
   - XSS sanitization preventing script injection.
   - Graceful fallback for direct/generic visitors.

3. **Curated Editorial Sections**:
   - **Hero**: Mayurika & Yashodha monogram, typography, date, and venue.
   - **Personalized Welcome**: Guest salutation + official invitation message.
   - **Parents Blessings**: Honors both families with formal Sri Lankan reverence.
   - **Wedding Details**: Schedule timeline + Add-to-Calendar (Google Calendar & Apple/Outlook `.ics` download).
   - **Sacred Poruwa Ceremony**: Auspicious 8:50 AM spotlight.
   - **Venue & Map**: Dukes Lounge at Hotel Green Court, Homagama + Google Maps navigation.
   - **Live Countdown**: Precision days, hours, minutes, seconds timer to 14 October 2026.
   - **Love Story**: Romantic timeline milestones.
   - **Memories Gallery**: Masonry photo gallery with full-screen lightbox modal.
   - **RSVP Form**: Dynamic attendee fields + animated luxury confirmation.
   - **Blessings Wall**: Guestbook for friends and family.
   - **Footer & Direct Contacts**: One-tap phone call and WhatsApp buttons for Yashodha & Mayurika.

4. **Ambient Audio Experience**:
   - Floating audio widget with animated sound wave bars.
   - Starts gracefully upon the guest's first interaction (seal tap).
   - Embedded Web Audio API harmonic harp synth fallback ensuring beautiful music even without external MP3 files.

5. **Serverless Backend (Google Sheets + Apps Script)**:
   - Free, zero-cost Google Apps Script backend (`Code.gs`) saving RSVPs and wishes directly into Google Sheets in real-time.

---

## 🚀 How to Run & Test Locally

### Option 1: Standalone Instant Preview (Zero Dependencies)
You can test the entire experience immediately with Python's built-in HTTP server:

```powershell
python -m http.server 8000
```

Then visit:
- **Sample Invitee URL**: `http://localhost:8000/standalone.html?invitee=Mr.%20Tharindu&guests=1`
- **Multiple Guests URL**: `http://localhost:8000/standalone.html?invitee=Ms.%20Nethmi&guests=2`
- **Family Guest URL**: `http://localhost:8000/standalone.html?invitee=Mr.%20Kavindu&guests=4`
- **Generic URL**: `http://localhost:8000/standalone.html`

### Option 2: Vite React Development
If Node.js / npm is installed:

```bash
cd wedding-invitation
npm install
npm run dev
```

To create a production build:
```bash
npm run build
```

---

## 🌐 Personalized Guest URL Generation

To generate personalized links for guests, use the format:

```text
https://dinshe.github.io/engagement-invitation-and-RSVP/?invitee=<GUEST_NAME>&guests=<SEAT_COUNT>
```

### Examples:
| Guest | URL |
| :--- | :--- |
| **Mr. Tharindu (1 guest)** | `https://dinshe.github.io/engagement-invitation-and-RSVP/?invitee=Mr.%20Tharindu&guests=1` |
| **Ms. Nethmi (2 guests)** | `https://dinshe.github.io/engagement-invitation-and-RSVP/?invitee=Ms.%20Nethmi&guests=2` |
| **Mr. Kavindu (4 guests)** | `https://dinshe.github.io/engagement-invitation-and-RSVP/?invitee=Mr.%20Kavindu&guests=4` |
| **Generic Link** | `https://dinshe.github.io/engagement-invitation-and-RSVP/` |

---

## 📊 Google Sheets & Google Apps Script Setup

See the complete guide in [`google-apps-script/README.md`](google-apps-script/README.md) for step-by-step instructions to create the Google Sheet database and connect the RSVP Web App.

---

## 🚢 Deployment to GitHub Pages

This repository is pre-configured with a GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy Mayurika & Yashodha Wedding Digital Invitation"
   git push origin main
   ```
2. On GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The site will automatically build and deploy to:
   `https://dinshe.github.io/engagement-invitation-and-RSVP/`
>>>>>>> 4bc6b04 (feat: Add 3D luxury interactive wedding digital invitation for Mayurika & Yashodha)
