import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GitHubLogo } from "../components/OfficialLogos";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToast } from "../components/ToastProvider";

export function SignInPage() {
  usePageMeta(
    "Sign in with GitHub — Linux Shortcut Center",
    "Sign in with your GitHub account to unlock the Linux Shortcut Center dashboard."
  );

  const { user, loginWithGitHub, demoLogin } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleDemo = () => {
    demoLogin();
    showToast("Signed in with Demo GitHub Account!");
    navigate("/support");
  };

  return (
    <div className="page-container min-h-[calc(100vh-40px)] flex flex-col justify-center items-center py-10 px-4 max-w-xl mx-auto">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link to="/" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      {/* Main Sign In Glass Card */}
      <motion.div
        className="glass-card p-8 sm:p-10 rounded-2xl w-full text-center border border-white/10 shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-purple-500/20 via-sky-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* GitHub Brand Mark */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl flex items-center justify-center border border-white/15 bg-white/5 shadow-[0_0_35px_rgba(255,255,255,0.08)]">
          <GitHubLogo size={44} className="text-white" />
        </div>

        {/* Heading */}
        <h1 className="chrome-title text-3xl sm:text-4xl font-extrabold tracking-tight">
          Sign In with GitHub
        </h1>

        <p className="chrome-subtext text-sm sm:text-base mt-3 text-slate-300 max-w-md mx-auto leading-relaxed">
          Authenticate with your GitHub account to access the Linux Shortcut Center, verify software packages, and unlock the distribution dashboard.
        </p>

        {/* Benefits list */}
        <div className="my-7 py-4 border-y border-white/10 text-left text-xs sm:text-sm text-slate-300 space-y-2.5 font-mono">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <ShieldCheck size={16} className="shrink-0" />
            <span>Verified Debian 13 software repository access</span>
          </div>
          <div className="flex items-center gap-2.5 text-sky-400">
            <ShieldCheck size={16} className="shrink-0" />
            <span>Seamless integration with Linux App Center</span>
          </div>
          <div className="flex items-center gap-2.5 text-purple-400">
            <ShieldCheck size={16} className="shrink-0" />
            <span>1-Click terminal commands for 10 AI desktop applications</span>
          </div>
        </div>

        {/* Action Button: Sign In or Continue */}
        {user ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center gap-3">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 rounded-full border border-emerald-400/50"
              />
              <div className="text-left font-mono">
                <span className="text-xs text-emerald-300 font-semibold block">Signed in as @{user.login}</span>
                <span className="text-[11px] text-slate-400">Authentication active</span>
              </div>
            </div>

            <Link
              to="/support"
              className="transparent-get-started-btn group w-full py-3.5 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
            >
              <span className="chrome-btn-text text-sm sm:text-base font-bold">Continue to Help & Support</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3.5">
            <button
              type="button"
              onClick={loginWithGitHub}
              className="transparent-get-started-btn group w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer"
            >
              <GitHubLogo size={20} />
              <span className="chrome-btn-text text-sm sm:text-base font-bold">Sign in with GitHub</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>

            <button
              type="button"
              onClick={handleDemo}
              className="w-full py-2.5 rounded-xl text-xs font-mono text-purple-300 hover:text-white border border-purple-500/25 bg-purple-500/10 hover:bg-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles size={14} />
              <span>Quick Test with Demo Account</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
