import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GitHubLogo } from "../components/OfficialLogos";
import { usePageMeta } from "../hooks/usePageMeta";

export function SignInPage() {
  usePageMeta(
    "Sign in with GitHub — Linux Shortcut Center",
    "Sign in with your GitHub account to access the Linux Shortcut Center."
  );

  const { user, loginWithGitHub } = useAuth();
  const navigate = useNavigate();

  // If already signed in, check if tasks were already completed
  useEffect(() => {
    if (user) {
      const hasStarred = localStorage.getItem("lsc_condition_starred") === "true";
      const hasFollowed = localStorage.getItem("lsc_condition_followed") === "true";
      const isUnlocked = localStorage.getItem("lsc_dashboard_unlocked") === "true";

      if (hasStarred && hasFollowed && isUnlocked) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/support", { replace: true });
      }
    }
  }, [user, navigate]);

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
        className="glass-card p-8 sm:p-12 rounded-2xl w-full text-center border border-white/10 shadow-2xl relative overflow-hidden bg-transparent backdrop-blur-xl"
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

        <p className="chrome-subtext text-sm sm:text-base mt-3 mb-8 text-slate-300 max-w-md mx-auto leading-relaxed">
          Authenticate with your GitHub account to access the Linux Shortcut Center and unlock the distribution dashboard.
        </p>

        {/* ONLY Action Button: Sign in with GitHub */}
        <button
          type="button"
          onClick={loginWithGitHub}
          className="transparent-get-started-btn group w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.06)] bg-transparent"
        >
          <GitHubLogo size={20} />
          <span className="chrome-btn-text text-base font-bold">Sign in with GitHub</span>
          <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </motion.div>
    </div>
  );
}
