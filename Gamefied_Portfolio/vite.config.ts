import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { PORTFOLIO_KNOWLEDGE } from './src/data/knowledgeBase.ts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',

    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'vite-plugin-gemini-api',

        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const apiKey =
              process.env.GEMINI_API_KEY ||
              env.GEMINI_API_KEY;

            // Health check
            if (
              req.url === '/api/chat/status' &&
              req.method === 'GET'
            ) {
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

            // Chat endpoint
            if (
              req.url === '/api/chat' &&
              req.method === 'POST'
            ) {
              let bodyRaw = '';

              req.on('data', (chunk) => {
                bodyRaw += chunk;
              });

              req.on('end', async () => {
                let body: any = {};

                try {
                  body = JSON.parse(bodyRaw || '{}');
                } catch {
                  body = {};
                }

                const userMessage = (body.message || '').trim();
                const history = body.history || [];

                if (!userMessage) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(
                    JSON.stringify({
                      error: 'User message is required.',
                    })
                  );
                  return;
                }

                // Local fallback
                if (!apiKey) {
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');

                  res.end(
                    JSON.stringify({
                      response: null,
                      source: 'local',
                      message:
                        'Gemini API key is not configured.',
                    })
                  );

                  return;
                }

                try {
                  const systemInstructionText = `
You are NAITIK.OS, an intelligent AI portfolio assistant for Naitik Goyal.

Answer using ONLY verified information from Naitik's portfolio.

VERIFIED PORTFOLIO KNOWLEDGE:
${JSON.stringify(PORTFOLIO_KNOWLEDGE, null, 2)}
`;

                  const geminiContents: Array<{
                    role: 'user' | 'model';
                    parts: Array<{ text: string }>;
                  }> = [];

                  history.slice(-6).forEach((turn: any) => {
                    geminiContents.push({
                      role:
                        turn.role === 'user'
                          ? 'user'
                          : 'model',
                      parts: [{ text: turn.text }],
                    });
                  });

                  geminiContents.push({
                    role: 'user',
                    parts: [{ text: userMessage }],
                  });

                  const modelName =
                    process.env.GEMINI_MODEL ||
                    env.GEMINI_MODEL ||
                    'gemini-2.0-flash';

                  const geminiUrl =
                    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

                  const geminiRes = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      systemInstruction: {
                        parts: [
                          {
                            text: systemInstructionText,
                          },
                        ],
                      },
                      contents: geminiContents,
                      generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 450,
                      },
                    }),
                  });

                  if (!geminiRes.ok) {
                    throw new Error(
                      `Gemini API returned ${geminiRes.status}`
                    );
                  }

                  const data: any =
                    await geminiRes.json();

                  const candidateText =
                    data?.candidates?.[0]?.content?.parts?.[0]?.text;

                  if (!candidateText) {
                    throw new Error(
                      'No response from Gemini.'
                    );
                  }

                  const actions =
                    generateContextualActions(
                      candidateText.toLowerCase() +
                        ' ' +
                        userMessage.toLowerCase()
                    );

                  res.statusCode = 200;
                  res.setHeader(
                    'Content-Type',
                    'application/json'
                  );

                  res.end(
                    JSON.stringify({
                      response: candidateText.trim(),
                      source: 'gemini',
                      model: modelName,
                      actions,
                    })
                  );
                } catch (error: any) {
                  console.error(
                    '[AI] Gemini Request Error:',
                    error?.message
                  );

                  res.statusCode = 200;
                  res.setHeader(
                    'Content-Type',
                    'application/json'
                  );

                  res.end(
                    JSON.stringify({
                      response: null,
                      source: 'local',
                      error:
                        error?.message ||
                        'Gemini API call failed.',
                    })
                  );
                }
              });

              return;
            }

            next();
          });
        },
      },
    ],
  };
});

function generateContextualActions(
  combinedText: string
) {
  const actions: any[] = [];

  if (
    combinedText.includes('email') ||
    combinedText.includes('hire') ||
    combinedText.includes('contact') ||
    combinedText.includes('collaborate')
  ) {
    actions.push({
      label: 'SEND EMAIL',
      actionType: 'email',
      url: `mailto:${PORTFOLIO_KNOWLEDGE.contact.email}`,
    });
  }

  if (combinedText.includes('linkedin')) {
    actions.push({
      label: 'CONNECT ON LINKEDIN',
      actionType: 'linkedin',
      url: PORTFOLIO_KNOWLEDGE.contact.linkedin,
    });
  }

  if (
    combinedText.includes('github') ||
    combinedText.includes('source code') ||
    combinedText.includes('repository')
  ) {
    actions.push({
      label: 'OPEN GITHUB',
      actionType: 'github',
      url: PORTFOLIO_KNOWLEDGE.contact.github,
    });
  }

  if (
    combinedText.includes('resume') ||
    combinedText.includes('cv')
  ) {
    actions.push({
      label: 'DOWNLOAD RESUME (PDF)',
      actionType: 'resume',
      url: PORTFOLIO_KNOWLEDGE.contact.resumeUrl,
    });
  }

  if (combinedText.includes('revora')) {
    actions.push({
      label: 'OPEN REVORA',
      actionType: 'external',
      url: PORTFOLIO_KNOWLEDGE.projects[0].liveUrl,
    });
    actions.push({
      label: 'REVORA GITHUB',
      actionType: 'github',
      url: PORTFOLIO_KNOWLEDGE.projects[0].githubUrl,
    });
  }

  if (combinedText.includes('tree plantation')) {
    actions.push({
      label: 'TREE PLANTATION (LIVE)',
      actionType: 'external',
      url: PORTFOLIO_KNOWLEDGE.projects[1].liveUrl,
    });
  }

  if (combinedText.includes('expense tracker')) {
    actions.push({
      label: 'EXPENSE TRACKER (LIVE)',
      actionType: 'external',
      url: PORTFOLIO_KNOWLEDGE.projects[2].liveUrl,
    });
  }

  if (combinedText.includes('goyal traders')) {
    actions.push({
      label: 'GOYAL TRADERS (LIVE)',
      actionType: 'external',
      url: PORTFOLIO_KNOWLEDGE.projects[3].liveUrl,
    });
  }

  return actions;
}