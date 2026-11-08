// Vercel Serverless Function: GitHub OAuth Token Exchange
// Handles exchanging GitHub authorization code for user access token and profile

export default async function handler(req: any, res: any) {
  // CORS Configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Extract authorization code from body or query
  let code = req.query?.code || req.body?.code;
  if (!code && typeof req.body === "string") {
    try {
      const parsed = JSON.parse(req.body);
      code = parsed.code;
    } catch {
      // ignore JSON parse failure
    }
  }

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code from GitHub" });
  }

  const clientId = process.env.GITHUB_CLIENT_ID || process.env.VITE_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: "GitHub OAuth credentials are not fully configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel project environment variables.",
      configured: {
        hasClientId: Boolean(clientId),
        hasClientSecret: Boolean(clientSecret),
      },
    });
  }

  try {
    // 1. Exchange temporary code for access token
    const tokenPayload: Record<string, string> = {
      client_id: clientId,
      client_secret: clientSecret,
      code,
    };

    const redirectUri = req.body?.redirect_uri || req.query?.redirect_uri;
    if (redirectUri) {
      tokenPayload.redirect_uri = redirectUri;
    }

    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(tokenPayload),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).json({
        error: tokenData.error_description || tokenData.error,
        code: tokenData.error,
      });
    }

    const accessToken = tokenData.access_token;
    if (!accessToken) {
      return res.status(400).json({ error: "No access token returned from GitHub" });
    }

    // 2. Fetch authenticated GitHub user profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "Linux-Shortcut-Center",
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!userResponse.ok) {
      return res.status(userResponse.status).json({
        error: `Failed to fetch GitHub profile: ${userResponse.statusText}`,
      });
    }

    const userData = await userResponse.json();

    return res.status(200).json({
      success: true,
      user: {
        id: userData.id,
        login: userData.login,
        name: userData.name || userData.login,
        avatar_url: userData.avatar_url,
        html_url: userData.html_url,
        bio: userData.bio || "",
        public_repos: userData.public_repos || 0,
        followers: userData.followers || 0,
      },
      token: accessToken,
    });
  } catch (err: any) {
    console.error("GitHub OAuth Error:", err);
    return res.status(500).json({
      error: "Internal server error during GitHub authentication",
      message: err?.message || String(err),
    });
  }
}

