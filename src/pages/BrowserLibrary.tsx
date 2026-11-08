import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, Search, SlidersHorizontal, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { BrowserCard } from "../components/BrowserCard";
import { browsers } from "../data/browsers";
import { usePersistentState } from "../hooks/usePersistentState";
import { usePageMeta } from "../hooks/usePageMeta";

type BrowserFilter = "all" | "saved" | "Debian archive" | "Vendor repository" | "Official .deb";

export function BrowserLibrary() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<BrowserFilter>("all");
  const [favorites, setFavorites] = usePersistentState<string[]>("shortcut-favorite-guides", []);
  const methods: BrowserFilter[] = ["all", "saved", "Debian archive", "Vendor repository", "Official .deb"];

  usePageMeta(
    "Debian Web Browsers",
    "Verified browser installation guides and shortcuts for Debian Linux."
  );

  const visibleBrowsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return browsers.filter((browser) => {
      const matchesQuery =
        !normalizedQuery ||
        `${browser.name} ${browser.description} ${browser.installMethod} ${browser.searchTerms.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesFilter =
        filter === "all" ||
        (filter === "saved" && favorites.includes(browser.slug)) ||
        browser.methodFilter === filter;
      return matchesQuery && matchesFilter;
    });
  }, [favorites, filter, query]);

  const toggleFavorite = (slug: string) => {
    setFavorites((current) =>
      current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    );
  };

  return (
    <div className="page-container browser-library-page py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      <div className="page-heading browser-library-heading mb-8">
        <h1 className="chrome-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Web Browsers
        </h1>
        <p className="chrome-subtext text-sm sm:text-base mt-2 text-slate-300">
          Install and configure verified web browsers on Debian Linux using step-by-step terminal commands.
        </p>
      </div>

      <div className="browser-library-toolbar glass-panel mb-8 p-3 rounded-xl flex flex-wrap items-center gap-3">
        <label className="library-search flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-slate-200 text-xs">
          <Search size={15} className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter browsers..."
            className="w-full bg-transparent border-0 outline-none text-slate-200 placeholder-slate-500 text-xs"
            aria-label="Filter browsers by name or installation method"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </label>

        <div className="browser-filter-heading flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <SlidersHorizontal size={13} />
          <span>Filter:</span>
        </div>

        <div className="browser-filter-tabs flex flex-wrap gap-1.5">
          {methods.map((method) => {
            const label =
              method === "all"
                ? "All browsers"
                : method === "saved"
                ? `Saved ${favorites.length ? `(${favorites.length})` : ""}`.trim()
                : method;
            return (
              <button
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === method
                    ? "bg-white/15 border border-white/30 text-white"
                    : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20"
                }`}
                key={method}
                onClick={() => setFilter(method)}
              >
                {method === "saved" && <Star size={12} className="inline mr-1" />}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="browser-results-heading flex items-center justify-between mb-4">
        <h2 className="chrome-heading text-sm font-semibold">
          {filter === "saved" ? "Saved browser guides" : "Available guides"}
        </h2>
        <span className="text-xs font-mono text-slate-400">
          {visibleBrowsers.length} {visibleBrowsers.length === 1 ? "browser" : "browsers"}
        </span>
      </div>

      {visibleBrowsers.length ? (
        <div className="browser-grid grid grid-cols-1 md:grid-cols-2 gap-5">
          {visibleBrowsers.map((browser, index) => (
            <div
              className="browser-grid-item"
              key={browser.slug}
              style={{ "--card-order": index } as CSSProperties}
            >
              <BrowserCard
                guide={browser}
                favorite={favorites.includes(browser.slug)}
                onToggleFavorite={() => toggleFavorite(browser.slug)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-panel p-10 text-center rounded-2xl">
          <Search size={32} className="mx-auto text-slate-500 mb-3" />
          <h2 className="chrome-heading text-base font-semibold">
            {filter === "saved" && !favorites.length ? "No saved guides yet" : "No browsers found"}
          </h2>
          <p className="chrome-subtext text-xs mt-1">
            {filter === "saved" && !favorites.length
              ? "Use the star icon on any browser guide to bookmark it here."
              : "Try a different browser name or clear the current filter."}
          </p>
          {filter !== "all" && (
            <button
              className="mt-4 px-4 py-2 rounded-lg text-xs font-medium bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setFilter("all")}
            >
              Show all browsers
            </button>
          )}
        </div>
      )}
    </div>
  );
}
