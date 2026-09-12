// Vercel Serverless Function: Real Gemini AI Integration (/api/chat)
// SECURITY RULE: Reads process.env.GEMINI_API_KEY on the server ONLY. Never exposes keys to browser.

import type { IncomingMessage, ServerResponse } from 'http';
import { PORTFOLIO_KNOWLEDGE } from '../src/data/knowledgeBase';

export default async function handler(
  req: IncomingMessage & { body?: any },
  res: ServerResponse & { statusCode: number; setHeader: (name: string, val: string) => void; end: (chunk: string) => void }
) {
  // 1. Health / Status check endpoint GET
  if (req.method === 'GET') {
    const apiKey = process.env.GEMINI_API_KEY;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        configured: !!apiKey,
        provider: apiKey ? 'gemini' : null,
      })
    );
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  // 2. Read GEMINI_API_KEY securely from server environment
  const apiKey = process.env.GEMINI_API_KEY;

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const userMessage = (body?.message || '').trim();
  const history: Array<{ role: 'user' | 'assistant'; text: string }> = body?.history || [];

  if (!userMessage) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'User message is required.' }));
    return;
  }

  // If Gemini API key is missing on server, signal frontend to use local fallback
  if (!apiKey) {
    console.log('[AI-Vercel] GEMINI_API_KEY not configured on server. Using LOCAL MODE.');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        response: null,
        source: 'local',
        message: 'GEMINI_API_KEY not configured on server. Using local fallback engine.'
      })
    );
    return;
  }

  console.log('[AI-Vercel] GEMINI_API_KEY configured: YES');
  console.log(`[AI-Vercel] Incoming chat request: "${userMessage}"`);

  try {
    // 3. Construct Strict Gemini System Instructions
    const systemInstructionText = `You are NAITIK.OS, an intelligent AI portfolio assistant for Naitik Goyal.
Your job is to answer visitor questions naturally, intelligently, and accurately using ONLY verified information from Naitik's portfolio.

STRICT KNOWLEDGE & LANGUAGE RULES:
1. Do NOT invent or exaggerate facts. Avoid unsupported statements like "he is an expert", "he has extensive professional experience", or "senior developer".
2. Use careful, portfolio-supported phrasing such as "Naitik's portfolio demonstrates work with...", "Naitik is currently learning and building...", "Based on his listed projects...".
3. If a question asks for something not in the portfolio, say: "I don't have verified information about that in Naitik's portfolio."
4. For questions like "Why should I hire Naitik?", "What project should he build next?", or "Is he suitable for this opportunity?", provide a thoughtful, portfolio-based assessment highlighting his AI/ML academic studies, hands-on projects (REVORA autonomous AI revenue recovery platform, Tree Plantation full-stack, Expense Tracker UI/charts, Goyal Traders business site), and quick-learning attitude without claiming senior employment experience.
5. Answer conversationally INSIDE the chatbot. Do NOT tell users to scroll or navigate.
6. Understand context from previous messages in conversation history.
7. Regarding Tree Plantation: The source code repository for Tree Plantation is PRIVATE. NEVER provide a GitHub link or source code button for Tree Plantation. If asked for Tree Plantation's source code or repository, explain that it is private and not publicly available, but provide its live project link.
8. Regarding Shiftly: Naitik built an AI communication intelligence platform named Shiftly (Live: https://shiftly-woad.vercel.app | GitHub: https://github.com/Naitg94/Shiftly).

VERIFIED PORTFOLIO KNOWLEDGE BASE:
${JSON.stringify(PORTFOLIO_KNOWLEDGE, null, 2)}`;

    // 4. Format Conversation History for Gemini REST API
    const geminiContents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    const recentHistory = history.slice(-6);
    recentHistory.forEach((turn) => {
      geminiContents.push({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.text }]
      });
    });

    geminiContents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // 5. Send request to Gemini API (supports model fallbacks)
    const primaryModel = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    const modelsToTry = [primaryModel, 'gemini-2.0-flash', 'gemini-2.5-flash'];

    let candidateText: string | null = null;
    let usedModel = '';

    for (const model of modelsToTry) {
      try {
        console.log(`[AI-Vercel] Sending request to Gemini using model: ${model}`);
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const geminiRes = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: {
              parts: [{ text: systemInstructionText }]
            },
            contents: geminiContents,
            generationConfig: {
              temperature: 0.6,
              maxOutputTokens: 450
            }
          })
        });

        if (geminiRes.ok) {
          const data = await geminiRes.json();
          candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
          if (candidateText) {
            usedModel = model;
            break;
          }
        } else {
          const errBody = await geminiRes.text();
          console.error(`[AI-Vercel] Model ${model} returned HTTP ${geminiRes.status}:`, errBody);
        }
      } catch (e: any) {
        console.error(`[AI-Vercel] Model ${model} failed:`, e?.message);
      }
    }

    if (!candidateText) {
      throw new Error('Gemini models failed to return content.');
    }

    console.log(`[AI-Vercel] Gemini response successful from model: ${usedModel}`);

    // 6. Return real Gemini AI response with metadata
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        response: candidateText.trim(),
        source: 'gemini',
        model: usedModel,
        actions: generateContextualActions(candidateText.toLowerCase() + ' ' + userMessage.toLowerCase())
      })
    );
  } catch (error: any) {
    console.error('[AI-Vercel] Gemini API Error:', error?.message);
    res.statusCode = 200; // Return local fallback signal if Gemini API call fails
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        response: null,
        source: 'local',
        error: 'Gemini service connection failed. Switched to local fallback.'
      })
    );
  }
}

// Generate contextual action buttons based on response text
function generateContextualActions(combinedText: string) {
  const actions = [];
  if (combinedText.includes('email') || combinedText.includes('hire') || combinedText.includes('contact') || combinedText.includes('collaborate')) {
    actions.push({ label: 'SEND EMAIL', actionType: 'email', url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}` });
  }
  if (combinedText.includes('linkedin')) {
    actions.push({ label: 'CONNECT ON LINKEDIN', actionType: 'linkedin', url: PORTFOLIO_KNOWLEDGE.contact.linkedin });
  }
  if (combinedText.includes('shiftly')) {
    actions.push({ label: 'VIEW LIVE PROJECT', actionType: 'external', url: 'https://shiftly-woad.vercel.app' });
    actions.push({ label: 'VIEW SOURCE CODE', actionType: 'github', url: 'https://github.com/Naitg94/Shiftly' });
  } else if (combinedText.includes('github') || combinedText.includes('source code') || combinedText.includes('repository')) {
    if (!combinedText.includes('tree plantation') && !combinedText.includes('tree-plantation')) {
      actions.push({ label: 'OPEN GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.contact.github });
    }
  }
  if (combinedText.includes('resume') || combinedText.includes('cv')) {
    actions.push({ label: 'DOWNLOAD RESUME (PDF)', actionType: 'resume', url: PORTFOLIO_KNOWLEDGE.contact.resumeUrl });
  }
  if (combinedText.includes('revora')) {
    actions.push({ label: 'OPEN REVORA', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl });
    actions.push({ label: 'REVORA GITHUB', actionType: 'github', url: PORTFOLIO_KNOWLEDGE.projects[0].githubUrl });
  }
  if (combinedText.includes('tree plantation')) {
    actions.push({ label: 'TREE PLANTATION (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl });
  }
  if (combinedText.includes('expense tracker')) {
    actions.push({ label: 'EXPENSE TRACKER (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl });
  }
  if (combinedText.includes('goyal traders')) {
    actions.push({ label: 'GOYAL TRADERS (LIVE)', actionType: 'external', url: PORTFOLIO_KNOWLEDGE.projects[3].liveUrl });
  }
  return actions;
}
