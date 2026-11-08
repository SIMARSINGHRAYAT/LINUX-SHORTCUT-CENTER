import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, UserPlus, CheckCircle2, Lock, Unlock, ExternalLink } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToast } from "../components/ToastProvider";

const REPO_URL = "https://github.com/SIMARSINGHRAYAT/Linux-Shortcut-Center";
const PROFILE_URL = "https://github.com/SIMARSINGHRAYAT";

export function SupportPage() {
  usePageMeta(
    "Help & Support — Linux Shortcut Center",
    "Complete the two community verification steps to unlock the Linux Shortcut Center dashboard."
  );

  const navigate = useNavigate();
  const { showToast } = useToast();

  const [hasStarred, setHasStarred] = useState<boolean>(() => {
    return localStorage.getItem("lsc_condition_starred") === "true";
  });

  const [hasFollowed, setHasFollowed] = useState<boolean>(() => {
    return localStorage.getItem("lsc_condition_followed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("lsc_condition_starred", hasStarred ? "true" : "false");
  }, [hasStarred]);

  useEffect(() => {
    localStorage.setItem("lsc_condition_followed", hasFollowed ? "true" : "false");
  }, [hasFollowed]);

  const allCompleted = hasStarred && hasFollowed;

  const handleStarClick = () => {
    window.open(REPO_URL, "_blank", "noopener,noreferrer");
    setHasStarred(true);
    showToast("Condition 1 fulfilled: Starred repository!");
  };

  const handleFollowClick = () => {
    window.open(PROFILE_URL, "_blank", "noopener,noreferrer");
    setHasFollowed(true);
    showToast("Condition 2 fulfilled: Followed developer profile!");
  };

  const handleContinue = () => {
    if (!allCompleted) return;
    localStorage.setItem("lsc_dashboard_unlocked", "true");
    showToast("Dashboard unlocked! Welcome to Linux Shortcut Center.");
    navigate("/dashboard");
  };

  return (
    <div className="page-container min-h-[calc(100vh-40px)] flex flex-col justify-center items-center py-10 px-4 max-w-2xl mx-auto">
      {/* Back button */}
      <div className="w-full mb-6">
        <Link to="/signin" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      <motion.div
        className="glass-card p-8 sm:p-10 rounded-2xl w-full border border-white/10 shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-amber-500/15 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="chrome-title text-3xl sm:text-4xl font-extrabold tracking-tight">
            Help & Support
          </h1>
          <p className="chrome-subtext text-sm sm:text-base mt-2 text-slate-300 max-w-lg mx-auto">
            Fulfill both developer support conditions below to unlock full access to the Linux distribution dashboard.
          </p>
        </div>

        {/* Conditions Container */}
        <div className="space-y-4 mb-8">
          {/* Condition 1: Star the Repository */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              hasStarred
                ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    hasStarred
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : "border-amber-500/30 bg-amber-500/10 text-amber-400"
                  }`}
                >
                  <Star size={22} className={hasStarred ? "fill-emerald-400 text-emerald-400" : "fill-amber-400/40"} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 font-semibold uppercase">Condition 1</span>
                    {hasStarred ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-medium">
                        <CheckCircle2 size={12} /> Fulfilled
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-amber-400/80">Pending Action</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">Star the Repository</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Star the official <span className="font-mono text-slate-200">Linux-Shortcut-Center</span> repo on GitHub.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleStarClick}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                  hasStarred
                    ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 shadow-[0_0_15px_rgba(245,158,11,0.15)]"
                }`}
              >
                <span>{hasStarred ? "Starred ✓" : "Star on GitHub"}</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>

          {/* Condition 2: Follow the Profile */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 ${
              hasFollowed
                ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    hasFollowed
                      ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                      : "border-purple-500/30 bg-purple-500/10 text-purple-400"
                  }`}
                >
                  <UserPlus size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400 font-semibold uppercase">Condition 2</span>
                    {hasFollowed ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-medium">
                        <CheckCircle2 size={12} /> Fulfilled
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-purple-400/80">Pending Action</span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-white mt-0.5">Follow the Developer Profile</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Follow <span className="font-mono text-slate-200">@SIMARSINGHRAYAT</span> on GitHub for updates and releases.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFollowClick}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 ${
                  hasFollowed
                    ? "border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "border border-purple-500/40 bg-purple-500/15 text-purple-300 hover:bg-purple-500/25 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                }`}
              >
                <span>{hasFollowed ? "Following ✓" : "Follow on GitHub"}</span>
                <ExternalLink size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* Continue to Dashboard Button */}
        <div className="pt-2 text-center">
          {allCompleted ? (
            <button
              type="button"
              onClick={handleContinue}
              className="transparent-get-started-btn group w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(34,197,94,0.2)] border-emerald-500/40"
            >
              <Unlock size={18} className="text-emerald-400" />
              <span className="chrome-btn-text text-base font-bold">Continue to Dashboard</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1.5 text-emerald-300" />
            </button>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 border border-white/10 bg-white/5 text-slate-500 cursor-not-allowed opacity-50 font-mono text-sm"
              >
                <Lock size={16} />
                <span>Continue to Dashboard</span>
              </button>
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5">
                <Lock size={12} className="text-amber-400" />
                <span>Complete both Condition 1 and Condition 2 to unlock access</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
