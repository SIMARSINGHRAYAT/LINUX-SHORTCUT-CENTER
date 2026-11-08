import type { CSSProperties } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { OSCard } from "../components/OSCard";
import { distributions } from "../data/distributions";
import { usePageMeta } from "../hooks/usePageMeta";

export function DistributionDashboard() {
  usePageMeta(
    "Choose your Linux distribution",
    "Select your Linux operating system to browse verified installation commands and software shortcuts. Debian is available now."
  );

  return (
    <div className="page-container distribution-page py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="distribution-heading mb-8">
        <h1 className="chrome-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Choose your Linux distribution
        </h1>
        <p className="chrome-subtext text-sm sm:text-base mt-2 text-slate-300">
          Select your operating system to access verified terminal packages and software guides.
        </p>
      </div>

      {/* Sequence: Ubuntu, Debian, Kali Linux, Fedora, Linux Mint, Arch Linux */}
      <div className="distribution-grid">
        {distributions.map((distribution, index) => (
          <div
            className="distribution-grid-item"
            key={distribution.slug}
            style={{ "--card-order": index } as CSSProperties}
          >
            <OSCard distribution={distribution} />
          </div>
        ))}
      </div>
    </div>
  );
}
