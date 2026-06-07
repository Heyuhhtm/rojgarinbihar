# SarkariNaukri — sarkariresults.com

India's #1 Government Job Portal built with React + Vite.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed on your machine
- npm (comes with Node.js)

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open your browser → **http://localhost:5173**

---

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` folder.  
Upload the `dist/` folder to your hosting provider (Vercel, Netlify, cPanel, etc.)

---

## 📁 Project Structure

```
sarkarinaukri/
├── index.html            # Entry HTML
├── package.json          # Dependencies
├── vite.config.js        # Vite config
├── README.md
└── src/
    ├── main.jsx          # React root
    ├── App.jsx           # All components + data
    └── App.css           # All styles
```

---

## ✨ Features

- ✅ **Latest Online Forms** — 25 active job listings with Apply Now buttons
- ✅ **Sarkari Results** — 20 recent results with View Result buttons
- ✅ **Admit Cards** — 12 admit cards with Download buttons
- ✅ **Answer Keys** — 10 answer keys
- ✅ **Syllabus** — 10 exam syllabi with PDF buttons
- ✅ **Search** — Real-time search across all sections
- ✅ **Category Filter** — Filter by Railway, Bank, SSC, UPSC, Police, etc.
- ✅ **Live Ticker** — Scrolling news ticker at the top
- ✅ **Stats Banner** — Live vacancy count stats
- ✅ **Sidebar** — Upcoming exams, latest results, app download links
- ✅ **Contact Page** — Site info & social links
- ✅ **Responsive Design** — Works on mobile & desktop
- ✅ **NEW / HOT Badges** — Blinking badges for fresh listings

---

## 🌐 Deployment on Vercel (Free)

1. Push this project to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Vercel auto-detects Vite — just click **Deploy**
4. Add your domain `sarkariresults.com` in Vercel → Domains

---

## 🛠️ Customization

To add or edit job listings, open `src/App.jsx` and find the `JOBS` array at the top.  
Each entry looks like:

```js
{
  id: 1,
  title: "RRB ALP CEN 01/2026 Online Form",
  category: "Railway",
  date: "23 May 2026",
  lastDate: "15 Jun 2026",
  posts: "9,144",
  isNew: true,
  isHot: true
}
```

Similarly edit `RESULTS`, `ADMIT_CARDS`, `ANSWER_KEYS`, `SYLLABI` arrays.

---

## 📞 Support

Website: sarkariresults.com  
Email: info@sarkariresults.com
