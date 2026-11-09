import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { aiApps, ubuntuAIApps } from "../data/aiApps";
import { AIAppIcon } from "../components/AILogos";
import { usePageMeta } from "../hooks/usePageMeta";

export function AILibrary() {
  const isUbuntu = useLocation().pathname.startsWith("/dashboard/ubuntu");
  const apps = isUbuntu ? ubuntuAIApps : aiApps;
  const basePath = isUbuntu ? "/dashboard/ubuntu" : "/dashboard/debian";
  const distroName = isUbuntu ? "Ubuntu" : "Debian";

  usePageMeta(
    "Artificial Intelligence",
    `Select an AI desktop application to view verified installation steps for ${distroName}.`
  );

  return (
    <div className="page-container ai-library-page py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link to={basePath} className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      {/* Heading - Just Artificial Intelligence */}
      <div className="ai-heading mb-10">
        <h1 className="chrome-title text-4xl sm:text-5xl font-extrabold tracking-tight">
          Artificial Intelligence
        </h1>
      </div>

      {/* 10 AI Desktop App Blocks: Official Logo and App Name */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {apps.map((app) => (
          <Link
            key={app.slug}
            to={`${basePath}/ai/${app.slug}`}
            className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 transition-all duration-300 hover:border-white/35 group min-h-[170px]"
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.04)]">
              <AIAppIcon slug={app.slug} size={38} />
            </div>
            <h2 className="chrome-heading text-base sm:text-lg font-bold group-hover:text-white transition-colors">
              {app.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
