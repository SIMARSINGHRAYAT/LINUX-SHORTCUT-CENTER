import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, CircleAlert, ClipboardCheck, ExternalLink, HelpCircle, RotateCcw, ShieldCheck, Terminal, Trash2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { aiApps, aiPrerequisites } from "../data/aiApps";
import { AIAppIcon } from "../components/AILogos";
import { TerminalBlock } from "../components/TerminalBlock";
import { useClipboard } from "../hooks/useClipboard";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToast } from "../components/ToastProvider";

export function AIGuide() {
  const { aiSlug = "" } = useParams();
  const app = aiApps.find((item) => item.slug === aiSlug);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const { copy } = useClipboard();
  const { showToast } = useToast();

  usePageMeta(
    app ? `How to Install ${app.name} on Debian 13` : "AI App Not Found",
    app ? `Complete verified installation instructions for ${app.name} on Debian 13 (trixie, x86_64).` : "Select an AI application from the Debian AI library."
  );

  if (!app) {
    return <Navigate to="/dashboard/debian/ai" replace />;
  }

  const completedCount = app.steps.reduce((acc, _, idx) => acc + (completed[idx] ? 1 : 0), 0);

  const copyFullProcedure = async () => {
    const procedure = app.steps
      .map((step, idx) => {
        let text = `# Step ${idx + 1}: ${step.title}\n# ${step.description}`;
        if (step.command) text += `\n${step.command}`;
        if (step.note) text += `\n# Note: ${step.note}`;
        return text;
      })
      .join("\n\n");
    const success = await copy(procedure);
    showToast(success ? "Complete installation procedure copied" : "Clipboard unavailable", success ? "success" : "error");
  };

  return (
    <div className="page-container ai-guide-page py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian/ai" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to AI Apps</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 shadow-[0_0_25px_rgba(255,255,255,0.05)]">
              <AIAppIcon slug={app.slug} size={40} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>DEBIAN 13 (TRIXIE)</span>
                <i>•</i>
                <span>{app.creator}</span>
              </div>
              <h1 className="chrome-title text-2xl sm:text-4xl font-extrabold">{app.name}</h1>
              <p className="chrome-subtext text-xs sm:text-sm mt-1 max-w-xl">{app.description}</p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 self-start sm:self-center">
            <span
              className="px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5"
              style={{
                borderColor: `${app.badgeColor}40`,
                backgroundColor: `${app.badgeColor}15`,
                color: app.badgeColor,
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: app.badgeColor }} />
              {app.installMethod}
            </span>
            {app.officialUrl && (
              <a
                href={app.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Official site</span>
                <ArrowUpRight size={13} />
              </a>
            )}
            {app.sourceUrl && (
              <a
                href={app.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors font-mono"
              >
                <span>Documentation / Source</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        </div>

        {/* Verification banner */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-white/10 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck size={14} /> Verified on Debian 13 (trixie, x86_64)
          </span>
          <span>•</span>
          <span>Architecture: <code className="text-slate-300">amd64 / x86_64</code></span>
          {app.requiresSnap && (
            <>
              <span>•</span>
              <span className="text-amber-400">Requires Snap support (see prerequisites)</span>
            </>
          )}
          {app.requiresAppCenter && (
            <>
              <span>•</span>
              <span className="text-sky-400">Requires Linux App Center sign-in</span>
            </>
          )}
        </div>
      </div>

      {/* Main Grid: Steps & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="chrome-heading text-lg font-bold">Step-by-Step Installation</h2>
              <p className="chrome-subtext text-xs">Run each verified command in order in your Debian terminal.</p>
            </div>
            <button
              onClick={copyFullProcedure}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 flex items-center gap-1.5 transition-all"
            >
              <ClipboardCheck size={14} />
              <span>Copy All Steps</span>
            </button>
          </div>

          {/* Progress tracker */}
          <div className="glass-panel p-3.5 rounded-xl">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-mono">
              <span>Steps Completed</span>
              <span>{completedCount} / {app.steps.length}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / app.steps.length) * 100}%` }}
              />
            </div>
            {completedCount > 0 && (
              <button
                onClick={() => setCompleted({})}
                className="mt-2 text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <RotateCcw size={11} /> Reset checklist
              </button>
            )}
          </div>

          {/* Steps List */}
          <div className="space-y-5">
            {app.steps.map((step, idx) => {
              const isDone = !!completed[idx];
              return (
                <div key={idx} className="glass-card p-5 rounded-2xl">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-300 border border-white/10"
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="chrome-heading text-sm font-semibold">{step.title}</h3>
                        <p className="chrome-subtext text-xs mt-0.5">{step.description}</p>
                      </div>
                    </div>

                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) => setCompleted((cur) => ({ ...cur, [idx]: e.target.checked }))}
                        className="rounded border-white/20 text-emerald-500 focus:ring-0 focus:ring-offset-0 bg-white/5"
                      />
                      <span>Done</span>
                    </label>
                  </div>

                  {step.command && (
                    <div className="mt-3">
                      <TerminalBlock command={step.command} label={`STEP ${idx + 1}`} />
                    </div>
                  )}

                  {step.note && (
                    <div className="mt-3 flex items-start gap-1.5 text-[11px] text-amber-300/90 font-mono">
                      <CircleAlert size={12} className="mt-0.5 flex-shrink-0" />
                      <span>{step.note}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Uninstall Section */}
          <div className="glass-card p-6 rounded-2xl border-rose-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 size={16} className="text-rose-400" />
              <h2 className="chrome-heading text-sm font-bold text-rose-300">How to Uninstall {app.name}</h2>
            </div>
            <p className="chrome-subtext text-xs mb-3">
              To completely remove {app.name} from your Debian 13 system:
            </p>
            <TerminalBlock command={app.uninstallCommand} label="UNINSTALL" />
          </div>

          {/* Troubleshooting */}
          {app.troubleshooting && app.troubleshooting.length > 0 && (
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={16} className="text-amber-400" />
                <h2 className="chrome-heading text-sm font-bold">Troubleshooting Notes</h2>
              </div>
              <div className="space-y-4">
                {app.troubleshooting.map((item, tIdx) => (
                  <div key={tIdx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <strong className="text-xs text-slate-200 block mb-1">{item.title}</strong>
                    <p className="text-xs text-slate-400 leading-relaxed mb-2">{item.body}</p>
                    {item.command && <TerminalBlock command={item.command} label="FIX" compact />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Side Panel: App Details & Prerequisites */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Info */}
          <div className="glass-card p-5 rounded-2xl">
            <h3 className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center justify-between">
              <span>App Specification</span>
              <Check size={14} className="text-emerald-400" />
            </h3>

            <dl className="space-y-3.5 text-xs">
              <div>
                <dt className="text-slate-400 text-[11px]">Application</dt>
                <dd className="chrome-heading font-semibold mt-0.5">{app.name}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Creator / Publisher</dt>
                <dd className="text-slate-200 mt-0.5">{app.creator}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Install Method</dt>
                <dd className="text-slate-200 font-medium mt-0.5">{app.installMethod}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-[11px]">Target OS</dt>
                <dd className="text-emerald-400 font-mono mt-0.5">Debian 13 (trixie, x86_64)</dd>
              </div>
            </dl>
          </div>

          {/* Quick Install Box */}
          <div className="glass-card p-5 rounded-2xl border-white/20">
            <h3 className="text-xs font-mono text-slate-300 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Terminal size={14} className="text-purple-400" />
              <span>Primary Command</span>
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">Copy and execute directly in your terminal:</p>
            <TerminalBlock command={app.primaryCommand} label="INSTALL" />
          </div>

          {/* Prerequisite Notes */}
          {app.requiresSnap && (
            <div className="glass-panel p-4 rounded-xl border-amber-500/20 bg-amber-500/[0.03]">
              <span className="text-xs font-bold text-amber-300 block mb-1">Snap Prerequisite</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Debian 13 does not include Snap by default. You must install and enable snapd once.
              </p>
              <Link
                to="/dashboard/debian/ai#prerequisites"
                className="text-xs text-amber-300 hover:text-amber-200 font-medium flex items-center gap-1"
              >
                <span>View Snap setup instructions</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}

          {app.requiresAppCenter && (
            <div className="glass-panel p-4 rounded-xl border-sky-500/20 bg-sky-500/[0.03]">
              <span className="text-xs font-bold text-sky-300 block mb-1">Linux App Center Sign-in</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Requires one-time sign-in on <code className="text-slate-300">linuxdesktopapps11.vercel.app</code> with GitHub.
              </p>
              <a
                href={aiPrerequisites.appCenterSetup.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sky-300 hover:text-sky-200 font-medium flex items-center gap-1"
              >
                <span>Open Linux App Center</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ArrowRight(props: { size?: number; className?: string }) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
