import { ArrowLeft, ArrowRight, Bot, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export function DebianDashboard() {
  usePageMeta(
    "Debian Software Library",
    "Explore essential software categories and verified installation commands for Debian Linux."
  );

  return (
    <div className="page-container debian-dashboard-page py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="debian-heading mb-10">
        <h1 className="chrome-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Debian Software Library
        </h1>
        <p className="chrome-subtext text-sm sm:text-base mt-2 text-slate-300">
          Select a category to explore verified terminal installation shortcuts and configuration guides.
        </p>
      </div>

      {/* Exactly Two Blocks: Browser and Artificial Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Block 1: Browser */}
        <Link
          to="/dashboard/debian/browsers"
          className="glass-card debian-block group block p-8 rounded-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Globe size={30} />
            </div>
            <span className="status-label status-available">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block mr-1.5" />
              Available
            </span>
          </div>

          <h2 className="chrome-heading text-2xl font-bold mb-3 group-hover:text-white transition-colors">
            Browser
          </h2>
          <p className="chrome-subtext text-sm leading-relaxed mb-6">
            Install and configure your favorite modern, privacy-focused, and standard web browsers on Debian Linux.
          </p>

          <div className="flex items-center text-blue-400 group-hover:text-blue-300 text-sm font-semibold gap-2 mt-auto">
            <span>Explore Browsers</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </Link>

        {/* Block 2: Artificial Intelligence */}
        <Link
          to="/dashboard/debian/ai"
          className="glass-card debian-block group block p-8 rounded-2xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(168,85,247,0.15)]">
              <Bot size={30} />
            </div>
            <span className="status-label status-available">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block mr-1.5" />
              Available
            </span>
          </div>

          <h2 className="chrome-heading text-2xl font-bold mb-3 group-hover:text-white transition-colors">
            Artificial Intelligence
          </h2>
          <p className="chrome-subtext text-sm leading-relaxed mb-6">
            Install 10 AI desktop applications on Debian 13 (ChatGPT, Claude, Grok, Gemini, Perplexity, Copilot, Meta AI, Qwen, Kimi, DeepSeek) with verified step-by-step terminal commands.
          </p>

          <div className="flex items-center text-purple-400 group-hover:text-purple-300 text-sm font-semibold gap-2 mt-auto">
            <span>Explore Artificial Intelligence</span>
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
