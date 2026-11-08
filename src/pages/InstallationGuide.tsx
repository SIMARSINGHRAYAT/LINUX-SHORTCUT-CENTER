import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Check, CircleAlert, ClipboardCheck, RotateCcw, ShieldCheck, Star } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BrandLogo } from "../components/Brand";
import { TerminalBlock } from "../components/TerminalBlock";
import { useClipboard } from "../hooks/useClipboard";
import { usePageMeta } from "../hooks/usePageMeta";
import { usePersistentState } from "../hooks/usePersistentState";
import { browsers } from "../data/browsers";
import { useToast } from "../components/ToastProvider";

export function InstallationGuide() {
  const { browserSlug = "" } = useParams();
  const guide = browsers.find((browser) => browser.slug === browserSlug);
  const [favorites, setFavorites] = usePersistentState<string[]>("shortcut-favorite-guides", []);
  const [, setRecent] = usePersistentState<string[]>("shortcut-recent-guides", []);
  const [completed, setCompleted] = usePersistentState<Record<string, boolean>>(`shortcut-checklist-${browserSlug}`, {});
  const { copy } = useClipboard();
  const { showToast } = useToast();

  usePageMeta(
    guide ? `Install ${guide.name} on Debian` : "Installation guide not found",
    guide ? `${guide.description} Follow Debian compatibility notes and copy each official installation command step by step.` : "Choose an available Debian installation guide from the browser library."
  );

  useEffect(() => {
    if (!guide) return;
    setRecent((current) => [guide.slug, ...current.filter((slug) => slug !== guide.slug)].slice(0, 6));
  }, [guide, setRecent]);

  if (!guide) return <Navigate to="/dashboard/debian/browsers" replace />;

  const isFavorite = favorites.includes(guide.slug);
  const completedCount = guide.steps.reduce((count, _, index) => count + (completed[String(index)] ? 1 : 0), 0);
  const toggleFavorite = () => {
    setFavorites((current) => current.includes(guide.slug) ? current.filter((slug) => slug !== guide.slug) : [...current, guide.slug]);
    showToast(isFavorite ? "Removed from saved guides" : "Saved to your browser guides", "success");
  };

  const copyProcedure = async () => {
    const procedure = guide.steps
      .map((step, index) => `# Step ${String(index + 1).padStart(2, "0")}: ${step.title}\n${step.command}`)
      .join("\n\n");
    const success = await copy(procedure);
    showToast(success ? "Complete procedure copied" : "Clipboard access is unavailable", success ? "success" : "error");
  };

  const resetChecklist = () => {
    setCompleted({});
    showToast("Checklist reset", "info");
  };

  return (
    <div className="page-container guide-page py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian/browsers" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Browsers</span>
        </Link>
      </div>

      {/* Guide Hero Header */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <BrandLogo slug={guide.logo} color={guide.color} name={guide.name} />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>DEBIAN</span>
                <i>•</i>
                <span>{guide.installMethod}</span>
              </div>
              <h1 className="chrome-title text-2xl sm:text-3xl font-extrabold">{guide.name}</h1>
              <p className="chrome-subtext text-xs sm:text-sm mt-1 max-w-xl">{guide.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-center">
            <button
              onClick={toggleFavorite}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                isFavorite
                  ? "border-amber-400/40 bg-amber-400/10 text-amber-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20"
              }`}
            >
              <Star size={14} className={isFavorite ? "fill-amber-400 text-amber-400" : ""} />
              <span>{isFavorite ? "Saved" : "Save"}</span>
            </button>
            <a
              href={guide.officialUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl text-xs font-medium border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>Official Site</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-white/10 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck size={14} /> Verified for Debian 12 (Bookworm) & 11 (Bullseye)
          </span>
          <span>•</span>
          <span>Package: <code className="text-slate-300">{guide.packageName}</code></span>
        </div>
      </div>

      {/* Guide Content: Steps & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="chrome-heading text-lg font-bold">Installation Procedure</h2>
              <p className="chrome-subtext text-xs">Run each verified command in your terminal sequentially.</p>
            </div>
            <button
              onClick={copyProcedure}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 flex items-center gap-1.5 transition-all"
            >
              <ClipboardCheck size={14} />
              <span>Copy All Steps</span>
            </button>
          </div>

          {/* Checklist progress */}
          <div className="glass-panel p-3.5 rounded-xl mb-6">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-mono">
              <span>Steps Completed</span>
              <span>{completedCount} / {guide.steps.length}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / guide.steps.length) * 100}%` }}
              />
            </div>
            {completedCount > 0 && (
              <button
                onClick={resetChecklist}
                className="mt-2 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <RotateCcw size={11} /> Reset checklist
              </button>
            )}
          </div>

          {/* Steps List */}
          <div className="space-y-6">
            {guide.steps.map((step, index) => {
              const stepIndexStr = String(index);
              const isStepDone = !!completed[stepIndexStr];
              return (
                <div key={index} className="glass-card p-5 rounded-2xl">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isStepDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-400 border border-white/10"
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="chrome-heading text-sm font-semibold">{step.title}</h3>
                        <p className="chrome-subtext text-xs mt-0.5">{step.description}</p>
                      </div>
                    </div>

                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isStepDone}
                        onChange={(e) =>
                          setCompleted((cur) => ({ ...cur, [stepIndexStr]: e.target.checked }))
                        }
                        className="rounded border-white/20 text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-white/5"
                      />
                      <span>Done</span>
                    </label>
                  </div>

                  <TerminalBlock command={step.command} label={`STEP ${index + 1}`} />

                  {step.note && (
                    <div className="mt-2.5 flex items-start gap-1.5 text-[11px] text-amber-300/90 font-mono">
                      <CircleAlert size={12} className="mt-0.5 flex-shrink-0" />
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Uninstall Section */}
          <div className="glass-card p-5 rounded-2xl mt-8">
            <h2 className="chrome-heading text-sm font-bold mb-1">How to Uninstall</h2>
            <p className="chrome-subtext text-xs mb-3">To completely remove {guide.name} and purge its configurations:</p>
            <TerminalBlock command={guide.uninstallCommand} label="UNINSTALL" />
          </div>
        </div>

        {/* Sidebar Details Panel */}
        <div className="lg:col-span-1">
          <div className="glass-card p-5 rounded-2xl sticky top-6">
            <h3 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>Package Summary</span>
              <Check size={14} className="text-emerald-400" />
            </h3>

            <dl className="space-y-3.5 text-xs">
              <div>
                <dt className="text-slate-400 text-[11px]">Browser</dt>
                <dd className="chrome-heading font-semibold mt-0.5">{guide.name}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Install Source</dt>
                <dd className="text-slate-200 mt-0.5">{guide.installMethod}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Package Name</dt>
                <dd className="font-mono text-slate-200 mt-0.5">{guide.packageName}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Binary Execution Command</dt>
                <dd className="font-mono text-emerald-400 mt-0.5">{guide.binaryCommand}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
