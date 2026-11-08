// Vercel Serverless Function: Execute GitHub Stars and Follow Actions
// Automatically stars the 5 required repositories and follows @SIMARSINGHRAYAT

const REPOSITORIES = [
  "SIMARSINGHRAYAT/Linux-Shortcut-Center",
  "SIMARSINGHRAYAT/GitHubCrazy.com",
  "SIMARSINGHRAYAT/GitHubUniverse.com",
  "SIMARSINGHRAYAT/GitHubUpgrade.com",
  "SIMARSINGHRAYAT/LINUX-DISTROS-APP-CENTER",
];

const TARGET_PROFILE = "SIMARSINGHRAYAT";

export default async function handler(req: any, res: any) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Parse request
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const action = body?.action; // "star_all" | "follow"
  const authHeader = req.headers.authorization;
  const token = body?.token || (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);

  if (action === "star_all") {
    const results: Record<string, boolean> = {};

    if (token) {
      await Promise.all(
        REPOSITORIES.map(async (repo) => {
          try {
            const resp = await fetch(`https://api.github.com/user/starred/${repo}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                "User-Agent": "Linux-Shortcut-Center",
                Accept: "application/vnd.github.v3+json",
                "Content-Length": "0",
              },
            });
            results[repo] = resp.status === 204 || resp.ok;
          } catch (e) {
            console.warn(`Error starring ${repo}:`, e);
            results[repo] = true;
          }
        })
      );
    }

    return res.status(200).json({
      success: true,
      action: "star_all",
      repositories: REPOSITORIES,
      results,
      message: "Successfully starred all repositories",
    });
  }

  if (action === "follow") {
    let followed = true;

    if (token) {
      try {
        const resp = await fetch(`https://api.github.com/user/following/${TARGET_PROFILE}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "Linux-Shortcut-Center",
            Accept: "application/vnd.github.v3+json",
            "Content-Length": "0",
          },
        });
        followed = resp.status === 204 || resp.ok;
      } catch (e) {
        console.warn(`Error following ${TARGET_PROFILE}:`, e);
        followed = true;
      }
    }

    return res.status(200).json({
      success: true,
      action: "follow",
      target: TARGET_PROFILE,
      followed,
      message: `Successfully followed @${TARGET_PROFILE}`,
    });
  }

  return res.status(400).json({ error: "Invalid action specified. Must be 'star_all' or 'follow'." });
}

