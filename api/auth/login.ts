// Vercel Serverless Function: GitHub OAuth Redirect
// Initiates the OAuth flow with public_repo and user:follow scopes

export default async function handler(req: any, res: any) {
  const clientId = process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID;

  if (!clientId) {
    const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost:5173";
    const proto = req.headers["x-forwarded-proto"] || (host.includes("localhost") ? "http" : "https");
    res.writeHead(302, { Location: `${proto}://${host}/auth/callback?error=unconfigured` });
    return res.end();
  }

  // Determine redirect URI
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost:5173";
  const proto = req.headers["x-forwarded-proto"] || (host.includes("localhost") ? "http" : "https");
  const redirectUri = `${proto}://${host}/auth/callback`;

  // Required scopes: user profile, email, public_repo (to star), user:follow (to follow)
  const scopes = "read:user,user:email,public_repo,user:follow";

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(
    clientId
  )}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

  res.writeHead(302, { Location: authUrl });
  res.end();
}
