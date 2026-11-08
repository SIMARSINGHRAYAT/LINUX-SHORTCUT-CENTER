import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { BrowserGuide } from "../data/browsers";
import { BrandLogo } from "./Brand";

interface BrowserCardProps {
  guide: BrowserGuide;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export function BrowserCard({ guide, favorite, onToggleFavorite }: BrowserCardProps) {
  return (
    <article className="browser-card glass-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/30">
      <div>
        <div className="flex items-start gap-4 mb-4">
          <BrandLogo slug={guide.logo} color={guide.color} name={guide.name} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h2 className="chrome-heading text-lg font-bold">{guide.name}</h2>
              <button
                className={`favorite-button p-1.5 rounded-lg transition-colors ${
                  favorite ? "text-amber-400 bg-amber-400/10" : "text-slate-400 hover:text-white"
                }`}
                onClick={onToggleFavorite}
                aria-label={favorite ? `Remove ${guide.name} from favourites` : `Save ${guide.name} to favourites`}
                aria-pressed={favorite}
                title={favorite ? "Remove from favourites" : "Add to favourites"}
              >
                <Star size={16} fill={favorite ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="chrome-subtext text-xs leading-relaxed mt-1">{guide.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-4 pt-3 border-t border-white/5">
          <span className="flex items-center gap-1 text-emerald-400">
            <Check size={12} /> Debian
          </span>
          <span>•</span>
          <span className="text-slate-300">{guide.installMethod}</span>
        </div>
      </div>

      <Link
        className="flex items-center justify-between text-xs font-semibold text-blue-400 hover:text-blue-300 pt-3 border-t border-white/10 transition-colors group"
        to={`/dashboard/debian/browsers/${guide.slug}`}
      >
        <span>View Installation Guide</span>
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
