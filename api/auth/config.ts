// Vercel Serverless Function: Expose Public OAuth Client ID
// Allows frontend to check if GITHUB_CLIENT_ID is set in Vercel environment variables

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const clientId = process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID || null;

  return res.status(200).json({
    configured: Boolean(clientId),
    clientId: clientId,
  });
}

