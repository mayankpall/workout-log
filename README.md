# Training Ledger

Your training log app, converted to a plain static website so it can be
hosted for free on GitHub Pages and used on your iPhone.

**What changed from the original:** the app used to save data through a
Claude-artifact-only API (`window.storage`). It now saves everything to your
browser's `localStorage` instead (see `src/storage.js`), so all your logged
sets, history, and body-weight entries live **only on the device/browser you
use** — nothing is sent to a server. This means:

- It works fully offline once loaded.
- Data does **not** sync between your phone and a laptop — each browser has
  its own copy.
- Clearing Safari's website data (or using Private Browsing) will erase it,
  so it's worth occasionally exporting/backing up if the data matters a lot
  (see "Backing up your data" below).

## 1. Push this to GitHub

```bash
cd training-log
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

(Create the empty repo on GitHub first if you haven't — no need to add a
README/.gitignore there, this folder already has them.)

## 2. Turn on GitHub Pages

In your repo on GitHub: **Settings → Pages → Build and deployment → Source →
GitHub Actions**.

That's it — the included workflow (`.github/workflows/deploy.yml`) will
build and deploy the site automatically on every push to `main`. Check the
**Actions** tab for progress; once it's green, your app is live at:

```
https://<your-username>.github.io/<repo-name>/
```

## 3. Add it to your iPhone Home Screen

1. Open the URL above in **Safari** on your iPhone (must be Safari, not
   Chrome, for the install to work).
2. Tap the **Share** icon → **Add to Home Screen**.
3. It'll now open full-screen like a real app, and keep working offline.

## Local development (optional)

Requires [Node.js](https://nodejs.org) installed on your computer.

```bash
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build, output in dist/
```

## Backing up your data

Since data lives in `localStorage`, you can export a full backup from your
phone's browser: open the site, then in Safari's address bar go to
`javascript:` and run a small snippet, or simpler — open the site on a
computer where you can use the browser console:

```js
copy(JSON.stringify(Object.fromEntries(
  Object.entries(localStorage).filter(([k]) => k.startsWith('training-log:'))
)))
```

This copies a JSON backup to your clipboard, which you can paste into a text
file and save somewhere safe. To restore it later, paste the JSON back in
via the console with a small loop over `localStorage.setItem`.
