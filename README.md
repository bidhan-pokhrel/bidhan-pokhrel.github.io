# Bidhan Pokhrel — Developer Portfolio

A fully static personal developer portfolio built with vanilla HTML, CSS, and JavaScript.  
Designed for **GitHub Pages** hosting — no backend, no build step required.

---

## 🚀 Quick Start (GitHub Pages)

1. **Fork or clone** this repository.
2. Push to a branch named `main` (or `gh-pages`).
3. Go to **Settings → Pages** and set the source to `main / (root)`.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🔑 Default Login Credentials

| Field    | Value       |
|----------|-------------|
| Username | `bidhan`    |
| Password | `Admin@2024`|

> ⚠️ **Change these immediately** after first login:  
> Login → ⚙ Settings → scroll to **Security** section → enter new username/password → confirm with current password.

---

## 📁 Project Structure

```
bidhan-portfolio/
│
├── index.html          ← Single-page app shell (all modals, sections, nav)
│
├── css/
│   ├── style.css       ← Core cyberpunk theme, layout, all component styles
│   └── effects.css     ← fx-* text effect classes (neon, glitch, gradient, etc.)
│
├── js/
│   ├── auth.js         ← Login/logout, SHA-256 hashing, credential change
│   ├── profile.js      ← Profile CRUD, avatar, skills marquee
│   ├── editor.js       ← Quill rich-text editor + custom effect blots
│   ├── posts.js        ← Post/App CRUD, card rendering, reading view
│   └── app.js          ← Main init, event wiring, tab switching, toast utility
│
├── assets/
│   └── .gitkeep        ← Placeholder; put static images here if needed
│
└── README.md
```

---

## 📝 How to Use

### Posting to Dev Log
1. Click **Login** → enter your credentials.
2. The **+ New Post** button appears in the header and in the Dev Log tab.
3. Write your post using the Quill editor.
4. Select any text → click an effect button in the toolbar to add neons/animations.
5. Click **Publish** or **Save Draft**.

### Publishing an App
1. Log in, then click on the **Published Apps** tab.
2. Click **+ New App**.
3. Fill in the app details: version, platform, download link, privacy policy URL, terms URL.
4. Click **Publish**.

### Editing / Deleting a Post
1. Log in, then click any post card to open it in reading view.
2. Use the **Edit** or **Delete** buttons that appear at the top of the reading modal.

### Updating Your Profile
1. Log in, then click the **⚙** settings icon in the header (or the **Edit Profile** button on your card).
2. Change name, bio, photo, skills, social links — anything.
3. Click **Save Changes**.
4. The page updates immediately.

---

## 🎨 Text Effects Reference

Select text in the editor → click a button in the **FX toolbar**:

| Button | Effect |
|--------|--------|
| Cyan Neon | Glowing cyan text shadow |
| Magenta Neon | Glowing magenta text shadow |
| Green Neon | Glowing green text shadow |
| 🔥 Fire | Animated fire gradient |
| 🌊 Ocean | Animated ocean gradient |
| 🌌 Aurora | Animated aurora gradient |
| ⚡ Cyber | Animated cyan-green gradient |
| ⚡ Glitch | Chromatic aberration effect |
| 💓 Pulse | Breathing glow |
| 🌈 Rainbow | Hue-rotate animation |
| 🎈 Float | Slow vertical bob |
| Highlight | Cyan highlight block |
| Hard Shadow | Offset magenta drop-shadow |
| `Code` | Inline code style |
| ✕ Remove FX | Strips all effects from selection |

---

## 💾 Data Storage

All data is stored in your **browser's localStorage** — no server needed.

| Key | Contents |
|-----|----------|
| `bp_auth_setup` | Flag: credentials initialised |
| `bp_auth_username` | Your username |
| `bp_auth_password_hash` | SHA-256 hash of your password |
| `bp_profile` | Your profile data (JSON) |
| `bp_posts` | All posts and apps (JSON array) |

**⚠️ Important:**
- Data is stored **per browser / per device**. It won't sync between devices.
- localStorage has a ~5 MB limit per origin. Large cover images (base64) eat into this quickly — keep images under ~400 KB.
- To back up your data: open DevTools → Application → Local Storage → copy the values.

---

## 🛠️ Manual Customisation

### Change default profile values
Edit the `DEFAULTS` object at the top of `js/profile.js`.

### Change default credentials
Edit `DEFAULT_USERNAME` and `DEFAULT_PASSWORD` at the top of `js/auth.js`.  
After changing, clear `bp_auth_setup` from localStorage to force re-initialisation,  
or just use the Settings modal while logged in.

### Add / remove text effects
1. Add a new `.fx-yourstyle { ... }` class to `css/effects.css`.
2. Add the name (`'yourstyle'`) to the `EFFECT_NAMES` array in `js/editor.js`.
3. Add a `<button class="fx-btn" data-effect="yourstyle">` to `index.html` inside `#effects-toolbar`.

### Add a new social link icon
1. Add `<a id="social-yourplatform" ...>` inside `.social-links` in `index.html`.
2. Add `'yourplatform'` to the `socials` array and a matching input field (`#pf-yourplatform`) in the profile form.
3. Add the platform key to `ProfileManager` in `js/profile.js`.

---

## 📦 Dependencies (CDN — no npm install)

| Library | Version | Purpose |
|---------|---------|---------|
| [Quill.js](https://quilljs.com) | 1.3.7 | Rich text editor |
| [Font Awesome](https://fontawesome.com) | 6.5 | Icons |
| [Google Fonts](https://fonts.google.com) | — | Space Mono + Syne |

All loaded via CDN in `index.html`. No build tools required.

---

## 🙏 Built by

**Bidhan Pokhrel** · Data & AI Engineer · Dubai, UAE · Built in Nepal 🇳🇵  
© 2026 Bidhan Pokhrel. All rights reserved.
