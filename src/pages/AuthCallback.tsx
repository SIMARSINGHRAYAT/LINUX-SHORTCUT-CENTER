import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, AlertTriangle, Loader2, ExternalLink, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../components/ToastProvider";

export function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUserSession, isConfigured } = useAuth();
  const { showToast } = useToast();

  const [status, setStatus] = useState<"loading" | "success" | "error" | "unconfigured">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (errorParam === "unconfigured" || (!isConfigured && !code)) {
      setStatus("unconfigured");
      return;
    }

    if (errorParam) {
      setStatus("error");
      setErrorMessage(errorDescription || `GitHub OAuth error: ${errorParam}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setErrorMessage("No authorization code received from GitHub.");
      return;
    }

    // Exchange authorization code via serverless backend function /api/auth/github
    async function exchangeCode(authCode: string) {
      try {
        const response = await fetch("/api/auth/github", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            code: authCode,
            redirect_uri: `${window.location.origin}/auth/callback`,
          }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Failed to exchange authorization code.");
        }

        setUserSession(data.user, data.token);
        setStatus("success");
        showToast(`Welcome, @${data.user.login}! GitHub connected.`);

        // Redirect directly to the Help & Support page
        setTimeout(() => {
          navigate("/support", { replace: true });
        }, 1000);
      } catch (err: any) {
        console.error("Auth callback error:", err);
        setStatus("error");
        setErrorMessage(
          err?.message ||
            "Could not communicate with the authentication server. Verify Vercel environment variables."
        );
      }
    }

    exchangeCode(code);
  }, [searchParams, isConfigured, navigate, setUserSession, showToast]);

  const handleDemoSignIn = () => {
    const demoUser = {
      id: 99999999,
      login: "simarsinghrayat",
      name: "Simar Singh Rayat",
      avatar_url: "https://avatars.githubusercontent.com/u/10000000?v=4",
      html_url: "https://github.com/SIMARSINGHRAYAT",
      bio: "Creator of Linux Shortcut Center & KilzSnippet",
      public_repos: 12,
      followers: 48,
    };
    setUserSession(demoUser, "demo_github_token_authenticated");
    showToast("Signed in with Demo GitHub Account!");
    navigate("/support", { replace: true });
  };

  return (
    <div className="page-container min-h-[calc(100vh-80px)] flex flex-col justify-center items-center py-12 px-4 max-w-xl mx-auto">
      <div className="w-full mb-6">
        <Link to="/dashboard" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      <div className="glass-card p-8 rounded-2xl w-full text-center border border-white/10 shadow-2xl">
        {status === "loading" && (
          <div className="flex flex-col items-center py-6">
            <Loader2 size={44} className="animate-spin text-purple-400 mb-4" />
            <h2 className="chrome-title text-2xl font-bold">Connecting to GitHub...</h2>
            <p className="chrome-subtext text-sm mt-2 text-slate-300">
              Exchanging authorization token and fetching profile.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="chrome-title text-2xl font-bold text-emerald-400">Authenticated!</h2>
            <p className="chrome-subtext text-sm mt-2 text-slate-300">
              GitHub account connected successfully. Redirecting you back...
            </p>
          </div>
        )}

        {status === "unconfigured" && (
          <div className="flex flex-col items-center py-4 text-left">
            <div className="w-14 h-14 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 self-center">
              <AlertTriangle size={28} />
            </div>
            <h2 className="chrome-title text-xl font-bold text-center w-full">
              GitHub OAuth Setup Required
            </h2>
            <p className="chrome-subtext text-xs sm:text-sm mt-2 text-slate-300 text-center w-full mb-6">
              To enable real live GitHub OAuth sign-in on your Vercel deployment or locally, configure your GitHub OAuth App credentials.
            </p>

            <div className="glass-panel p-4 rounded-xl text-xs font-mono space-y-2 mb-6 border border-white/10 w-full bg-black/60">
              <div className="text-slate-400 font-semibold mb-1">Required Environment Variables:</div>
              <div className="text-purple-300">VITE_GITHUB_CLIENT_ID=&lt;Your_Client_ID&gt;</div>
              <div className="text-cyan-300">GITHUB_CLIENT_ID=&lt;Your_Client_ID&gt;</div>
              <div className="text-amber-300">GITHUB_CLIENT_SECRET=&lt;Your_Client_Secret&gt;</div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <a
                href="https://github.com/settings/developers"
                target="_blank"
                rel="noreferrer"
                className="transparent-get-started-btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                <span>Create OAuth App</span>
                <ExternalLink size={14} />
              </a>

              <button
                type="button"
                onClick={handleDemoSignIn}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Test in Demo Mode</span>
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-4 text-left">
            <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 self-center">
              <AlertTriangle size={28} />
            </div>
            <h2 className="chrome-title text-xl font-bold text-center w-full text-rose-300">
              Authentication Notice
            </h2>
            <p className="chrome-subtext text-xs sm:text-sm mt-2 text-slate-300 text-center w-full mb-6">
              {errorMessage}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
              <button
                type="button"
                onClick={handleDemoSignIn}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border border-purple-500/40 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all cursor-pointer"
              >
                <Sparkles size={14} />
                <span>Continue in Demo Mode</span>
              </button>
              <Link
                to="/dashboard"
                className="transparent-get-started-btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
              >
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

