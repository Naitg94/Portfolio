# NAITIK.OS — Futuristic Interactive Portfolio & Gemini AI Assistant

**NAITIK.OS** is an immersive, futuristic, gamified AI/developer portfolio built for **Naitik Goyal** (AI/ML Student & Developer).

---

## 🌟 Architecture & User Flow

### 1. Boot & Home Experience Flow
- **Boot Sequence**: Initializes system logs (`Developer Profile`, `Project Database`, `Skill Matrix`, `Interactive Systems`).
- **Enter NAITIK.OS**: Clicking `[ ENTER NAITIK.OS → ]` or `[ SKIP INTRO ]` immediately closes the boot screen and opens the **Main Home / Hero Page at the very top of the page (`window.scrollTo(0, 0)`)**.
- **No Auto Scrolling**: The system does **not** automatically scroll to lower sections upon boot or when interacting with the chatbot.

### 2. NAITIK.OS Gemini AI Chatbot (`ContactTerminal.tsx` & `api/chat.ts`)
- Genuine conversational AI Chatbot powered by Google Gemini AI model via secure serverless route `POST /api/chat`.
- Supports natural questions (*"Who is Naitik?"*, *"Tell me about his projects"*, *"Which project uses Supabase?"*, *"Compare Tree Plantation and Expense Tracker"*, *"What is he currently studying?"*, *"Why should I hire Naitik?"*).
- **Dynamic Connection Status**:
  - `AI CONNECTED`: Gemini AI server endpoint responding cleanly.
  - `LOCAL MODE`: Server running locally without a `GEMINI_API_KEY`.
  - `AI UNAVAILABLE`: Connection error fallback.
- **Session Context Memory**: Retains recent conversation turns for multi-turn follow-ups.
- **Inline Action Buttons**: Returns contextual external links (`[ TREE PLANTATION (LIVE) ]`, `[ SEND EMAIL ]`, `[ CONNECT ON LINKEDIN ]`, `[ OPEN GITHUB ]`, `[ DOWNLOAD RESUME ]`) without scrolling the main website page.

---

## 🔒 Secure Gemini AI Backend Integration Setup

### Required Environment Variable

Set `GEMINI_API_KEY` in `.env.local` for local dev or in your hosting provider's dashboard (e.g., Vercel / Netlify):

```env
# Secure Gemini AI API Key (Server-side ONLY - Never exposed in React bundle)
GEMINI_API_KEY=your_secret_gemini_api_key_here
```

> [!IMPORTANT]
> **Security Rule**: The frontend React app communicates only with `POST /api/chat`. Secret API keys (`GEMINI_API_KEY`) are read via `process.env.GEMINI_API_KEY` on the server and are **never** exposed to client-side code, GitHub repositories, or browser bundles.

---

## 🚀 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Resume PDF**:
   ```bash
   node scripts/generate-pdf.js
   ```

3. **Start Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 🌐 Secure Deployment (Vercel)

1. Push your repository to GitHub (ensure `.env` / `.env.local` are in `.gitignore`).
2. Import project into **Vercel**.
3. Under **Settings → Environment Variables**, add:
   - Key: `GEMINI_API_KEY`
   - Value: Your Gemini API Key
4. Deploy! Vercel automatically hosts the frontend and the `api/chat.ts` serverless function.
