import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LogOut, ExternalLink, ShieldCheck, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GitHubLogo } from "./OfficialLogos";

export function GitHubAuthButton() {
  const location = useLocation();
  const { user, loginWithGitHub, logout, isLoading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Do not show on landing page, signin page, support page, or auth callback page
  if (
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/support" ||
    location.pathname === "/auth/callback"
  ) {
    return null;
  }

  if (isLoading) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 sm:top-5 sm:right-6 z-40 font-mono" ref={menuRef}>
      {!user ? (
        <button
          type="button"
          onClick={loginWithGitHub}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium border border-white/10 hover:border-white/30 bg-black/50 hover:bg-white/5 backdrop-blur-md text-slate-200 hover:text-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] cursor-pointer"
          title="Sign in with GitHub"
        >
          <GitHubLogo size={17} />
          <span className="chrome-btn-text tracking-wide hidden xs:inline sm:inline">Sign in with GitHub</span>
          <span className="chrome-btn-text tracking-wide xs:hidden sm:hidden">Sign In</span>
        </button>
      ) : (
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="group flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/15 hover:border-white/35 bg-black/60 hover:bg-black/80 backdrop-blur-md text-slate-200 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] cursor-pointer"
            aria-expanded={menuOpen}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-6 h-6 rounded-full border border-purple-400/40 object-cover"
            />
            <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors max-w-[120px] truncate">
              @{user.login}
            </span>
            <ChevronDown size={14} className={`text-slate-400 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {/* User Profile Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/15 bg-black/90 backdrop-blur-xl p-4 shadow-[0_12px_40px_rgba(0,0,0,0.8)] animate-in fade-in duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                <img
                  src={user.avatar_url}
                  alt={user.login}
                  className="w-10 h-10 rounded-full border border-purple-400/50"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-white truncate">{user.name || user.login}</p>
                  <p className="text-xs text-slate-400 truncate">@{user.login}</p>
                </div>
              </div>

              <div className="py-2.5 space-y-1 text-xs">
                <div className="flex items-center gap-2 px-2 py-1.5 text-emerald-400 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <ShieldCheck size={14} />
                  <span>GitHub Verified Account</span>
                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between px-2 py-2 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <GitHubLogo size={14} /> View GitHub Profile
                  </span>
                  <ExternalLink size={13} className="text-slate-400" />
                </a>
              </div>

              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
