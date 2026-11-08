import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";
import { TerminalBlock } from "../components/TerminalBlock";

export function LandingPage() {
  usePageMeta(
    "Linux Shortcut Center",
    "Your centralized hub for verified Linux terminal shortcuts and software guides."
  );

  return (
    <div className="landing-page min-h-[calc(100vh-20px)] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Application Name */}
        <motion.h1
          className="chrome-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Linux Shortcut Center
        </motion.h1>

        {/* Description in italics, line, concise */}
        <motion.p
          className="chrome-italic-desc text-base sm:text-lg md:text-xl mt-4 max-w-2xl text-slate-300 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          <em>Your centralized command hub for verified Linux terminal shortcuts and software guides.</em>
        </motion.p>

        {/* Only Get Started Button - Transparent */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
        >
          <Link
            to="/dashboard"
            className="transparent-get-started-btn group inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-medium tracking-wide transition-all duration-300"
          >
            <span className="chrome-btn-text text-base">Get Started</span>
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 text-slate-300" />
          </Link>
        </motion.div>

        {/* Command bar / terminal preview */}
        <motion.div
          className="hero-terminal-wrap w-full max-w-2xl mt-12 text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        >
          <div className="hero-terminal-window glass-panel">
            <div className="terminal-window-bar flex items-center justify-between px-4 py-2.5 border-b border-white/10">
              <span className="window-dots flex items-center gap-1.5">
                <i className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <i className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <i className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </span>
              <span className="text-xs font-mono text-slate-400 font-medium">bash — linux-shortcuts</span>
              <span className="text-[11px] font-mono text-slate-500">debian / verified</span>
            </div>
            <div className="p-4 sm:p-5">
              <TerminalBlock command="sudo apt update && sudo apt install -y curl git build-essential" label="TERMINAL" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
