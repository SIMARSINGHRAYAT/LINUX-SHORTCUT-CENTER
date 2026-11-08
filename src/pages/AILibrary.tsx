import { useState } from "react";
import { ArrowLeft, Bot, Brain, Cpu, Sparkles, Terminal, Wand2, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { TerminalBlock } from "../components/TerminalBlock";
import { usePageMeta } from "../hooks/usePageMeta";

interface AITool {
  slug: string;
  name: string;
  category: string;
  description: string;
  command: string;
  tag: string;
  icon: typeof Bot;
  color: string;
}

const aiTools: AITool[] = [
  {
    slug: "ollama",
    name: "Ollama",
    category: "Local LLM Runtime",
    description: "Run DeepSeek, Llama 3, Mistral, and Gemma models locally on Debian with CUDA or CPU support.",
    command: "curl -fsSL https://ollama.com/install.sh | sh",
    tag: "Recommended",
    icon: Cpu,
    color: "#a855f7",
  },
  {
    slug: "claude-code",
    name: "Claude Code CLI",
    category: "Coding Agent",
    description: "Anthropic's terminal-native agentic coding assistant to edit, test, and explain complex codebases.",
    command: "npm install -g @anthropic-ai/claude-code",
    tag: "Official CLI",
    icon: Sparkles,
    color: "#f97316",
  },
  {
    slug: "gemini-cli",
    name: "Gemini CLI",
    category: "AI Developer Tool",
    description: "Official command-line tool to interact with Google Gemini models, prompt templates, and multimodal APIs.",
    command: "npm install -g @google/gemini-cli",
    tag: "Official CLI",
    icon: Wand2,
    color: "#3b82f6",
  },
  {
    slug: "pytorch",
    name: "PyTorch",
    category: "Machine Learning Framework",
    description: "Open-source machine learning framework with native Debian pip package and GPU hardware acceleration.",
    command: "pip install torch torchvision torchaudio",
    tag: "Deep Learning",
    icon: Zap,
    color: "#ef4444",
  },
  {
    slug: "huggingface-cli",
    name: "Hugging Face Hub CLI",
    category: "Model Hub",
    description: "Download, manage, and inspect thousands of open-source models and datasets from the Hugging Face Hub.",
    command: 'pip install -U "huggingface_hub[cli]"',
    tag: "Model Management",
    icon: Brain,
    color: "#eab308",
  },
  {
    slug: "localai",
    name: "LocalAI",
    category: "Self-Hosted API",
    description: "Drop-in replacement REST API for OpenAI specifications running completely locally on your Debian machine.",
    command: "curl https://localai.io/install.sh | bash",
    tag: "Self-Hosted",
    icon: Bot,
    color: "#10b981",
  },
];

export function AILibrary() {
  const [filterQuery, setFilterQuery] = useState("");

  usePageMeta(
    "Debian Artificial Intelligence",
    "Verified terminal installation commands for local LLMs, AI coding agents, and machine learning tools on Debian Linux."
  );

  const filteredTools = aiTools.filter((tool) =>
    tool.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
    tool.category.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="page-container ai-library-page py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Back button */}
      <div>
        <Link to="/dashboard/debian" className="back-btn group">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back</span>
        </Link>
      </div>

      {/* Heading */}
      <div className="ai-heading mb-8">
        <h1 className="chrome-title text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Artificial Intelligence
        </h1>
        <p className="chrome-italic-desc text-sm sm:text-base mt-2 text-slate-300 font-light">
          <em>Verified terminal installation shortcuts for AI tools, local LLM runners, and developer frameworks on Debian.</em>
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="mb-8">
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter AI tools (e.g., Ollama, Claude, PyTorch)..."
          className="w-full max-w-md px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400/50 backdrop-blur-md transition-colors"
        />
      </div>

      {/* Grid of AI Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTools.map((tool) => {
          const IconComponent = tool.icon;
          return (
            <div
              key={tool.slug}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-white/25"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center border"
                      style={{
                        borderColor: `${tool.color}40`,
                        backgroundColor: `${tool.color}15`,
                        color: tool.color,
                      }}
                    >
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h2 className="chrome-heading text-lg font-bold">{tool.name}</h2>
                      <span className="text-xs font-mono text-slate-400">{tool.category}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-medium border border-white/10 bg-white/5 text-slate-300">
                    {tool.tag}
                  </span>
                </div>

                <p className="chrome-subtext text-xs leading-relaxed mb-4">
                  {tool.description}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Terminal size={13} className="text-purple-400" />
                  <span className="text-[11px] font-mono text-slate-400 font-semibold tracking-wider">
                    INSTALL SHORTCUT
                  </span>
                </div>
                <TerminalBlock command={tool.command} label="INSTALL" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="glass-panel p-10 text-center rounded-2xl mt-4">
          <Bot size={36} className="mx-auto text-slate-500 mb-3" />
          <h3 className="chrome-heading text-lg font-semibold">No tools found</h3>
          <p className="chrome-subtext text-sm mt-1">Try another search term or clear the filter.</p>
        </div>
      )}
    </div>
  );
}

