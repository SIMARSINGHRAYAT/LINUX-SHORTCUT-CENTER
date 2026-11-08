import { useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronUp, Copy, ExternalLink, HelpCircle, Layers, ShieldCheck, Terminal, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { aiApps, aiPrerequisites } from "../data/aiApps";
import { AIAppIcon } from "../components/AILogos";
import { TerminalBlock } from "../components/TerminalBlock";
import { usePageMeta } from "../hooks/usePageMeta";
import { useClipboard } from "../hooks/useClipboard";
import { useToast } from "../components/ToastProvider";

type MethodFilter = "all" | "deb" | "apt" | "snap" | "script";

export function AILibrary() {
  const [filterQuery, setFilterQuery] = useState("");
  const [methodFilter, setMethodFilter] = useState<MethodFilter>("all");
  const [prereqOpen, setPrereqOpen] = useState(false);
  const [troubleOpen, setTroubleOpen] = useState(false);
  const { copy } = useClipboard();
  const { showToast } = useToast();

  usePageMeta(
    "How to Install 10 AI Desktop Apps on Debian 13",
    "Verified terminal installation commands for 10 AI desktop applications on Debian 13 (trixie, x86_64) by @SIMAR SINGH RAYAT."
  );

  const filteredApps = aiApps.filter((app) => {
    const matchesQuery =
      app.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.creator.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      app.installMethod.toLowerCase().includes(filterQuery.toLowerCase());
    const matchesMethod = methodFilter === "all" || app.methodType === methodFilter;
    return matchesQuery && matchesMethod;
  });

  const handleCopy = async (text: string, label: string) => {
    const success = await copy(text);
    showToast(success ? `${label} copied to clipboard` : "Clipboard unavailable", success ? "success" : "error");
  };

  return (
    <div className="page-container ai-library-page py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Debian Library</span>
        </Link>
      </div>

      {/* Main Header */}
      <div className="ai-heading mb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold mb-2">
          <span>DEBIAN 13 (TRIXIE)</span>
          <i>•</i>
          <span>X86_64 ARCHITECTURE</span>
          <i>•</i>
          <span>BY @SIMAR SINGH RAYAT</span>
        </div>
        <h1 className="chrome-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          How to Install 10 AI Desktop Apps on Debian 13
        </h1>
        <p className="chrome-italic-desc text-sm sm:text-base mt-2 text-slate-300 font-light max-w-3xl">
          <em>Exact verified instructions, terminal commands, and uninstallation guides for 10 AI desktop applications installed using official .deb packages, Anthropic APT, Snap Store, and the Linux App Center.</em>
        </p>
      </div>

      {/* System Prerequisites Accordion Card */}
      <div id="prerequisites" className="glass-card mb-8 rounded-2xl overflow-hidden transition-all duration-300 border-white/15">
        <button
          onClick={() => setPrereqOpen(!prereqOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="chrome-heading text-base font-bold flex items-center gap-2">
                <span>System Prerequisites & Setup Guides</span>
                <span className="text-[11px] font-mono font-normal px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Required Once
                </span>
              </h2>
              <p className="chrome-subtext text-xs mt-0.5">
                Check Debian 13 version, enable Snap support for Snap apps, and configure Linux App Center.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
            <span>{prereqOpen ? "Collapse" : "Expand"}</span>
            {prereqOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {prereqOpen && (
          <div className="p-6 pt-2 border-t border-white/10 space-y-6">
            {/* 1. System Version & Architecture */}
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">1</span>
                <span>Check Debian Version and Architecture</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-semibold text-slate-200 block mb-1">Check Debian 13 (trixie)</span>
                  <p className="text-[11px] text-slate-400 mb-2">Prints VERSION_ID="13" and PRETTY_NAME="Debian GNU/Linux 13 (trixie)".</p>
                  <TerminalBlock command="cat /etc/os-release" label="CHECK OS" compact />
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xs font-semibold text-slate-200 block mb-1">Check 64-bit Architecture</span>
                  <p className="text-[11px] text-slate-400 mb-2">Output must be x86_64 for amd64 packages.</p>
                  <TerminalBlock command="uname -m" label="CHECK CPU" compact />
                </div>
              </div>
            </div>

            {/* 2. Enable Snap Support */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">2</span>
                <span>Enable Snap Support on Debian (for Grok, Gemini, Perplexity, DeepSeek)</span>
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                Debian does not bundle Snap by default. Run these steps once to activate the Snap Store:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {aiPrerequisites.snapSetup.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
                    <span className="font-semibold text-slate-300 block mb-1">Step 2.{idx + 1}: {step.title}</span>
                    <TerminalBlock command={step.command} label="TERMINAL" compact />
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Linux App Center */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">3</span>
                <span>Linux App Center Setup (for Grok, Copilot, Meta AI, Qwen, Kimi)</span>
              </h3>
              <p className="text-xs text-slate-400 mb-3">
                One-time unlock on <code className="text-slate-300">linuxdesktopapps11.vercel.app</code> using GitHub:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-400">
                {aiPrerequisites.appCenterSetup.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ul>
              <div className="mt-3 flex items-center gap-3">
                <a
                  href={aiPrerequisites.appCenterSetup.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors flex items-center gap-1.5"
                >
                  <span>Open Linux App Center</span>
                  <ExternalLink size={12} />
                </a>
                <a
                  href={aiPrerequisites.appCenterSetup.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-1.5 font-mono"
                >
                  <span>View GitHub Repository</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toolbar: Search and Filter Tabs */}
      <div className="glass-panel p-3.5 rounded-xl mb-8 flex flex-wrap items-center justify-between gap-4">
        {/* Method Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setMethodFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              methodFilter === "all"
                ? "bg-white/20 border border-white/35 text-white"
                : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            All 10 Apps
          </button>
          <button
            onClick={() => setMethodFilter("deb")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              methodFilter === "deb"
                ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300"
                : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            Official .deb (ChatGPT)
          </button>
          <button
            onClick={() => setMethodFilter("apt")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              methodFilter === "apt"
                ? "bg-purple-500/20 border border-purple-500/40 text-purple-300"
                : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            Anthropic APT (Claude)
          </button>
          <button
            onClick={() => setMethodFilter("snap")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              methodFilter === "snap"
                ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            Snap Store (4)
          </button>
          <button
            onClick={() => setMethodFilter("script")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              methodFilter === "script"
                ? "bg-amber-500/20 border border-amber-500/40 text-amber-300"
                : "bg-white/[0.02] border border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            Linux App Center (5)
          </button>
        </div>

        {/* Search input */}
        <div className="w-full sm:w-auto min-w-[240px]">
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Search AI apps (e.g. Claude, Grok, Qwen)..."
            className="w-full px-3.5 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-purple-400/50 transition-colors"
          />
        </div>
      </div>

      {/* Grid of the 10 AI Desktop App Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {filteredApps.map((app, index) => (
          <div
            key={app.slug}
            className="glass-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/30 group"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 group-hover:scale-105 transition-transform duration-300">
                    <AIAppIcon slug={app.slug} size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400">#{index + 1}</span>
                      <h2 className="chrome-heading text-lg font-bold group-hover:text-white transition-colors">
                        {app.name}
                      </h2>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">{app.creator}</span>
                  </div>
                </div>

                <span
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5"
                  style={{
                    borderColor: `${app.badgeColor}40`,
                    backgroundColor: `${app.badgeColor}12`,
                    color: app.badgeColor,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: app.badgeColor }} />
                  {app.installMethod}
                </span>
              </div>

              {/* Description */}
              <p className="chrome-subtext text-xs leading-relaxed mb-5">
                {app.description}
              </p>

              {/* Primary Command Box */}
              <div className="mb-5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1 text-slate-300">
                    <Terminal size={12} className="text-purple-400" />
                    <span>TERMINAL SHORTCUT</span>
                  </span>
                  <button
                    onClick={() => handleCopy(app.primaryCommand, `${app.name} command`)}
                    className="hover:text-white flex items-center gap-1 transition-colors text-[10px]"
                  >
                    <Copy size={11} />
                    <span>Copy</span>
                  </button>
                </div>
                <TerminalBlock command={app.primaryCommand} label="INSTALL" />
              </div>
            </div>

            {/* Card Footer: Link to full instructions */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                {app.steps.length} verified {app.steps.length === 1 ? "step" : "steps"}
              </span>
              <Link
                to={`/dashboard/debian/ai/${app.slug}`}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 group-hover:translate-x-1 transition-all"
              >
                <span>View Full Instructions</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Troubleshooting & Uninstallation Reference Box */}
      <div className="glass-card rounded-2xl overflow-hidden border-white/15">
        <button
          onClick={() => setTroubleOpen(!troubleOpen)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <HelpCircle size={20} />
            </div>
            <div>
              <h2 className="chrome-heading text-base font-bold">
                Uninstallation Table & Common Fixes
              </h2>
              <p className="chrome-subtext text-xs mt-0.5">
                All uninstallation commands and video troubleshooting notes for Debian 13.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-mono text-xs">
            <span>{troubleOpen ? "Collapse" : "Expand"}</span>
            {troubleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </button>

        {troubleOpen && (
          <div className="p-6 pt-2 border-t border-white/10 space-y-6">
            {/* Uninstallation Reference Table */}
            <div>
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Trash2 size={14} className="text-rose-400" />
                <span>Uninstallation Commands for all 10 Apps</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-white/5 text-slate-400 font-mono uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">App</th>
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3">Remove Command</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {aiApps.map((a) => (
                      <tr key={a.slug} className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-semibold text-white">{a.name}</td>
                        <td className="py-2.5 px-3 text-slate-400">{a.installMethod}</td>
                        <td className="py-2.5 px-3 text-emerald-400">
                          <code>{a.uninstallCommand}</code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Video Troubleshooting Notes */}
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">
                Problems & Solutions Seen in the Video
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">error: unknown command "instal"</strong>
                  <p className="text-slate-400">A typo; the correct command is <code className="text-white">install</code>.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">snap "grok-desktop" not available on stable</strong>
                  <p className="text-slate-400">Add <code className="text-white">--edge</code> to install the pre-release build.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">NO_PUBKEY BAA929FF1A7ECACE on apt update (Claude)</strong>
                  <p className="text-slate-400">The key didn't download. Rerun the key download step and verify fingerprint.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">Permission denied / unsandboxed notice</strong>
                  <p className="text-slate-400">Harmless APT notice during Linux App Center install; the app still installs cleanly.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">Snap apps missing from application menu</strong>
                  <p className="text-slate-400">Restart your system after installing snapd with <code className="text-white">sudo reboot</code>.</p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <strong className="text-amber-300 block mb-1">Linux App Center dashboard won't open</strong>
                  <p className="text-slate-400">Complete both Star the repository and Follow the profile to unlock the dashboard.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
