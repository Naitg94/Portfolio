# Naitik Goyal — Portfolio Website

A clean, modern, and production-grade developer portfolio built with React 19, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

Designed with inspiration from the restrained, polished aesthetics of Linear, Vercel, and Stripe.

---

## 🚀 Features

- **Linear / Vercel Aesthetic**: Near-black dark mode (`#09090b`), high-contrast typography, and a tailored light mode.
- **Single Source of Truth**: All website content (bio, facts, skills, projects, timeline, contact) lives in `src/data/content.ts`. Zero hardcoded copy in components.
- **Zero-Latency Search & Navigation**: Sticky navbar with blur backdrop, scroll spy active-section indicator, and smooth anchor scrolling.
- **Accessible & Responsive**: Fully responsive from mobile (375px) to ultrawide, semantic HTML5, visible focus rings, and WCAG AA contrast.
- **Working Contact Form**: Supports Web3Forms or Formspree via environment variables with an instant fallback to `mailto:` when no API key is provided.
- **Zero Extra Config on Vercel**: Deploy straight to Vercel with zero serverless bloat.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler**: [Vite 6](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting**: [Oxlint](https://oxc.rs/)

---

## 💻 Getting Started Locally

All commands must be run from inside the `Port/` folder:

```bash
# 1. Navigate into the Port folder
cd Port

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build production bundle
npm run build

# 5. Run linter
npm run lint
```

The app will be accessible at `http://localhost:5173/`.

---

## 📝 How to Update Content

All content is managed in **`src/data/content.ts`**:

1. **Personal Information**:
   - Edit `name`, `role`, `tagline`, `shortBio`, `location`, `email`, and `socials`.
2. **Projects**:
   - Add, remove, or modify items in the `projects` array.
   - Set `featured: true` to highlight your flagship projects (they span full width on desktop).
   - Update `liveUrl` and `githubUrl`.
3. **Skills**:
   - Edit the 4 categories (`Languages`, `AI & Intelligent Systems`, `Web & Full-Stack`, `Tools & Platforms`).
4. **Experience & Education**:
   - Add new entries to the `timeline` array with appropriate `type` (`education`, `certification`, `experience`, `event`).
5. **Headshot & Screenshots**:
   - Place your profile photo in `public/assets/avatar.jpg` and set `avatarUrl: '/assets/avatar.jpg'`.
   - Place screenshots in `public/assets/projects/`.

---

## 🎨 How to Change the Accent Color

The default accent color is Indigo (`#6366f1`). To customize the accent color:

1. In **`src/index.css`**, adjust the focus outline or custom gradient colors:
   ```css
   :focus-visible {
     outline: 2px solid #6366f1; /* Replace with your color (e.g. #3b82f6 for blue, #10b981 for emerald) */
   }
   ```
2. Replace Tailwind accent classes in components (e.g., `text-indigo-500`, `bg-indigo-600`) with your desired color (e.g., `blue-500`, `emerald-500`).
3. In `src/data/content.ts`, adjust each project's `accentColor` hex code to personalize individual project glows.

---

## 📬 Contact Form Configuration (Optional)

The contact form is pre-configured with a direct `mailto:` fallback so it works immediately without any external services.

To receive submissions via Formspree or Web3Forms instead:

1. Create a `.env.local` file inside `Port/`:
   ```env
   # Option A: Formspree (https://formspree.io)
   VITE_FORMSPREE_KEY=your_formspree_form_id

   # Option B: Web3Forms (https://web3forms.com)
   VITE_WEB3FORMS_KEY=your_web3forms_access_key
   ```
2. If neither key is provided, clicking "Send Message" automatically opens the user's default email client with the subject and message prefilled.

---

## 🌐 Deploying to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. In the **Project Settings**:
   - **Root Directory**: Click `Edit` and select **`Port`**.
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `dist` (default).
4. Click **Deploy**. Vercel will build and deploy the site with zero additional configuration!
