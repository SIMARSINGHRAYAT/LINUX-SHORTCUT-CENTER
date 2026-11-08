import { useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, CircleAlert, ClipboardCheck, ExternalLink, HelpCircle, Info, RotateCcw, ShieldCheck, Terminal, Trash2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { aiApps, snapPrerequisiteSteps, appCenterPrerequisiteSteps, type AIStep } from "../data/aiApps";
import { AIAppIcon } from "../components/AILogos";
import { TerminalBlock } from "../components/TerminalBlock";
import { useClipboard } from "../hooks/useClipboard";
import { usePageMeta } from "../hooks/usePageMeta";
import { useToast } from "../components/ToastProvider";

export function AIGuide() {
  const { aiSlug = "" } = useParams();
  const app = aiApps.find((item) => item.slug === aiSlug);
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [showSnapPrereq, setShowSnapPrereq] = useState(false);
  const [showAppCenterPrereq, setShowAppCenterPrereq] = useState(false);
  const { copy } = useClipboard();
  const { showToast } = useToast();

  usePageMeta(
    app ? `How to Install ${app.name} on Debian 13` : "AI Application Guide",
    app ? `Verified step-by-step terminal instructions to install ${app.name} on Debian 13.` : "Choose an AI application from the library."
  );

  if (!app) {
    return <Navigate to="/dashboard/debian/ai" replace />;
  }

  // Active steps count
  const allActiveSteps: AIStep[] = app.options
    ? app.options.flatMap((opt) => opt.steps)
    : app.steps;

  const completedCount = Object.values(completed).filter(Boolean).length;

  const copyAllCommands = async (stepsList: AIStep[]) => {
    const commandsText = stepsList
      .filter((s) => s.command)
      .map((s, idx) => `# Step ${idx + 1}: ${s.title}\n${s.command}`)
      .join("\n\n");
    if (!commandsText) return;
    const success = await copy(commandsText);
    showToast(success ? "Commands copied to clipboard" : "Clipboard access unavailable", success ? "success" : "error");
  };

  return (
    <div className="page-container ai-guide-page py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian/ai" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Artificial Intelligence</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center border border-white/10 bg-white/5 shadow-[0_0_25px_rgba(255,255,255,0.06)]">
              <AIAppIcon slug={app.slug} size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                <span>DEBIAN 13 (TRIXIE)</span>
                <i>•</i>
                <span>X86_64</span>
              </div>
              <h1 className="chrome-title text-2xl sm:text-4xl font-extrabold">{app.name}</h1>
              <p className="chrome-subtext text-xs sm:text-sm mt-1 max-w-xl">{app.summary}</p>
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
          </div>
        </div>

        {/* Verification banner */}
        <div className="flex flex-wrap items-center gap-4 mt-6 pt-5 border-t border-white/10 text-xs text-slate-400 font-mono">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck size={14} /> Verified on Debian 13 (trixie, x86_64)
          </span>
          <span>•</span>
          <span>Installation Method: <span className="text-slate-200">{app.installMethod}</span></span>
        </div>
      </div>

      {/* Snap Store Prerequisite Banner (for Grok, Gemini, Perplexity, DeepSeek) */}
      {app.requiresSnap && (
        <div className="glass-panel p-5 rounded-2xl mb-6 border-amber-500/30 bg-amber-500/[0.04]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-amber-300">
                  Prerequisite: Snap Support Required (Step 4 in video)
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Debian doesn't ship with Snap, so install it once before installing Snap Store apps (Grok, Gemini, Perplexity, DeepSeek).
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowSnapPrereq(!showSnapPrereq)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 transition-colors flex-shrink-0"
            >
              {showSnapPrereq ? "Hide Snap Steps" : "View Snap Steps (6)"}
            </button>
          </div>

          {showSnapPrereq && (
            <div className="mt-4 pt-4 border-t border-amber-500/20 space-y-3">
              <span className="text-xs font-mono text-amber-300 font-semibold block">
                Enable Snap support on Debian:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {snapPrerequisiteSteps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-xs font-semibold text-slate-200 block mb-1">
                      4.{idx + 1} {s.title}
                    </span>
                    <p className="text-[11px] text-slate-400 mb-2">{s.description}</p>
                    {s.command && <TerminalBlock command={s.command} label="TERMINAL" compact />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Linux App Center Prerequisite Banner (for Grok, Copilot, Meta AI, Qwen, Kimi) */}
      {app.requiresAppCenter && (
        <div className="glass-panel p-5 rounded-2xl mb-6 border-sky-500/30 bg-sky-500/[0.04]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <Info size={18} className="text-sky-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-sky-300">
                  Prerequisite: Linux App Center Setup (Step 5 in video)
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  The Linux App Center gives you a ready-made install command for Grok, Copilot, Meta AI, Qwen and Kimi. You sign in once with GitHub; after that you go straight to the app list.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowAppCenterPrereq(!showAppCenterPrereq)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-sky-400/30 text-sky-300 hover:bg-sky-400/10 transition-colors flex-shrink-0"
            >
              {showAppCenterPrereq ? "Hide Setup Steps" : "View Setup Steps"}
            </button>
          </div>

          {showAppCenterPrereq && (
            <div className="mt-4 pt-4 border-t border-sky-500/20 space-y-3">
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-300">
                {appCenterPrerequisiteSteps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
              <div className="pt-2 flex items-center gap-3">
                <a
                  href="https://linuxdesktopapps11.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30 transition-colors flex items-center gap-1.5"
                >
                  <span>Open linuxdesktopapps11.vercel.app</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5 font-mono"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* If the app has Options (like Grok: Option A Snap and Option B App Center) */}
      {app.options ? (
        <div className="space-y-8">
          {app.options.map((option, optIdx) => (
            <div key={optIdx} className="glass-card p-6 sm:p-7 rounded-2xl">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="chrome-heading text-lg font-bold">{option.name}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-white/15 bg-white/5 text-slate-300">
                      {option.badge}
                    </span>
                  </div>
                  <p className="chrome-subtext text-xs mt-0.5">{option.description}</p>
                </div>
                <button
                  onClick={() => copyAllCommands(option.steps)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 flex items-center gap-1.5 transition-all"
                >
                  <ClipboardCheck size={14} />
                  <span>Copy Option Steps</span>
                </button>
              </div>

              <div className="space-y-5">
                {option.steps.map((step, sIdx) => {
                  const stepKey = `opt-${optIdx}-step-${sIdx}`;
                  const isDone = !!completed[stepKey];
                  return (
                    <div key={sIdx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold ${
                            isDone ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-white/10 text-slate-300"
                          }`}>
                            {sIdx + 1}
                          </span>
                          <h3 className="chrome-heading text-sm font-semibold">{step.title}</h3>
                        </div>
                        <label className="flex items-center gap-1 text-xs text-slate-400 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={(e) => setCompleted((c) => ({ ...c, [stepKey]: e.target.checked }))}
                            className="rounded border-white/20 text-emerald-500"
                          />
                          <span>Done</span>
                        </label>
                      </div>

                      <p className="chrome-subtext text-xs mb-3">{step.description}</p>

                      {step.command && <TerminalBlock command={step.command} label={`COMMAND`} />}
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

              {option.uninstallCommand && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-rose-300 font-semibold block mb-2">
                    Remove command for {option.name}:
                  </span>
                  <TerminalBlock command={option.uninstallCommand} label="REMOVE" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* Standard Single-Option App Steps (ChatGPT, Claude, Gemini, Perplexity, Copilot, Meta AI, Qwen, Kimi, DeepSeek) */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="chrome-heading text-lg font-bold">Step-by-Step Installation Instructions</h2>
            <button
              onClick={() => copyAllCommands(app.steps)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 flex items-center gap-1.5 transition-all"
            >
              <ClipboardCheck size={14} />
              <span>Copy All Steps</span>
            </button>
          </div>

          <div className="space-y-5">
            {app.steps.map((step, idx) => {
              const stepKey = `step-${idx}`;
              const isDone = !!completed[stepKey];
              return (
                <div key={idx} className="glass-card p-5 rounded-2xl">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                        isDone
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-white/5 text-slate-300 border border-white/10"
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="chrome-heading text-sm font-semibold">{step.title}</h3>
                    </div>

                    <label className="flex items-center gap-1.5 text-xs text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={(e) => setCompleted((c) => ({ ...c, [stepKey]: e.target.checked }))}
                        className="rounded border-white/20 text-emerald-500"
                      />
                      <span>Done</span>
                    </label>
                  </div>

                  <p className="chrome-subtext text-xs mb-3">{step.description}</p>

                  {step.command && <TerminalBlock command={step.command} label={`STEP ${idx + 1}`} />}

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
          <div className="glass-card p-6 rounded-2xl border-rose-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Trash2 size={16} className="text-rose-400" />
              <h3 className="chrome-heading text-sm font-bold text-rose-300">Uninstall {app.name}</h3>
            </div>
            <p className="chrome-subtext text-xs mb-3">To remove {app.name} from your Debian 13 system:</p>
            <TerminalBlock command={app.uninstallCommand} label="UNINSTALL" />
          </div>

          {/* Troubleshooting Section */}
          {app.troubleshooting && app.troubleshooting.length > 0 && (
            <div className="glass-card p-6 rounded-2xl">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={16} className="text-amber-400" />
                <h3 className="chrome-heading text-sm font-bold">Troubleshooting</h3>
              </div>
              <div className="space-y-3">
                {app.troubleshooting.map((t, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <strong className="text-xs text-slate-200 block mb-1">{t.title}</strong>
                    <p className="text-xs text-slate-400 mb-2">{t.body}</p>
                    {t.command && <TerminalBlock command={t.command} label="FIX" compact />}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
