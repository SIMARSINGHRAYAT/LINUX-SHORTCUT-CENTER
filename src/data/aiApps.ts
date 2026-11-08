export interface AIStep {
  title: string;
  description: string;
  command?: string;
  note?: string;
}

export interface AIAppGuide {
  slug: string;
  name: string;
  creator: string;
  category: string;
  description: string;
  installMethod: "Official .deb package" | "Anthropic's apt repository" | "Snap Store" | "Linux App Center install script";
  methodType: "deb" | "apt" | "snap" | "script";
  badgeColor: string;
  officialUrl?: string;
  sourceUrl?: string;
  primaryCommand: string;
  uninstallCommand: string;
  requiresSnap?: boolean;
  requiresAppCenter?: boolean;
  notes?: string;
  steps: AIStep[];
  troubleshooting?: { title: string; body: string; command?: string }[];
}

export const aiPrerequisites = {
  title: "Debian 13 System Prerequisites",
  systemCheck: [
    {
      title: "Show Debian version",
      description: "Verify that you are on Debian 13 (trixie). In the video this prints PRETTY_NAME=\"Debian GNU/Linux 13 (trixie)\" and VERSION_ID=\"13\".",
      command: "cat /etc/os-release",
    },
    {
      title: "Show processor architecture",
      description: "Verify that your machine is 64-bit Intel / AMD. Output x86_64 means x64. If it prints aarch64 or arm64, choose ARM64 packages.",
      command: "uname -m",
    },
  ],
  snapSetup: {
    title: "Enable Snap support on Debian",
    description: "Debian doesn't ship with Snap by default. Install it once before using Snap Store apps (Grok, Gemini, Perplexity, DeepSeek).",
    steps: [
      {
        title: "Refresh the package lists",
        command: "sudo apt update",
        description: "Fetch the latest APT package metadata.",
      },
      {
        title: "Install snapd",
        command: "sudo apt install snapd -y",
        description: "Install the core Snap daemon package from Debian's archive.",
      },
      {
        title: "Turn on the Snap service socket",
        command: "sudo systemctl enable --now snapd.socket",
        description: "Enable and immediately start the snapd socket.",
      },
      {
        title: "Install the latest snapd from the Snap Store",
        command: "sudo snap install snapd",
        description: "Updates snapd to the latest version (e.g., snapd 2.78 from Canonical).",
      },
      {
        title: "Restart your computer",
        command: "sudo reboot",
        description: "Required once so desktop entries for Snap apps show up properly in the system application menu.",
      },
      {
        title: "Verify Snap is working",
        command: "snap version",
        description: "Should list snap and snapd versions, debian 13, and architecture amd64.",
      },
    ],
  },
  appCenterSetup: {
    title: "Set up the Linux App Center (one time)",
    url: "https://linuxdesktopapps11.vercel.app",
    sourceCode: "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS",
    description: "The Linux App Center provides ready-made installation scripts for Grok, Copilot, Meta AI, Qwen, and Kimi. You sign in once with GitHub, then unlock the dashboard.",
    steps: [
      "Open linuxdesktopapps11.vercel.app in your browser and click Get Started.",
      "On 'Sign in to continue', click Continue with GitHub and approve the sign-in.",
      "Complete both community actions to unlock the dashboard: Star the repository (Linux App Center) & Follow the profile (@SIMARSINGHRAYAT on GitHub).",
      "Click Continue to Dashboard and navigate to AI Apps.",
    ],
  },
};

export const aiApps: AIAppGuide[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    creator: "OpenAI",
    category: "AI Desktop Assistant",
    description: "OpenAI's official desktop application for Linux, featuring workspace integration and direct chat access.",
    installMethod: "Official .deb package",
    methodType: "deb",
    badgeColor: "#10b981", // Emerald
    officialUrl: "https://openai.com/chatgpt/desktop/",
    primaryCommand: "cd ~/Downloads && sudo apt install ./chatgpt_amd64.deb",
    uninstallCommand: "sudo apt remove chatgpt",
    notes: "Installs directly from OpenAI's official .deb package with APT.",
    steps: [
      {
        title: "Download the official .deb package",
        description: "In your browser, open OpenAI's 'ChatGPT desktop app for Linux' download page. Under 'Download the right package', click 'Download .deb for x64' (Ubuntu or Debian row).",
      },
      {
        title: "Navigate to Downloads and verify the file",
        description: "Open terminal, go to Downloads folder, and confirm chatgpt_amd64.deb is present.",
        command: "cd ~/Downloads && ls",
      },
      {
        title: "Install the package with APT",
        description: "Run APT to install the local package and automatically resolve required dependencies.",
        command: "sudo apt install ./chatgpt_amd64.deb",
      },
      {
        title: "Launch ChatGPT & Complete Sign-in",
        description: "Open ChatGPT from your application menu. Click 'Continue' to open the browser sign-in page. Select your account, choose your workspace (Personal account), and click Continue. On 'You're signed in', click 'Open ChatGPT'.",
      },
    ],
    troubleshooting: [
      {
        title: "File not found error",
        body: "Make sure you downloaded the file into ~/Downloads and that the filename exactly matches chatgpt_amd64.deb.",
        command: "ls -la ~/Downloads/chatgpt*.deb",
      },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    creator: "Anthropic",
    category: "AI Desktop Assistant & Code",
    description: "Anthropic's native Claude Desktop client for Linux with system updates via Anthropic's signed APT repository.",
    installMethod: "Anthropic's apt repository",
    methodType: "apt",
    badgeColor: "#a855f7", // Purple
    officialUrl: "https://claude.ai",
    sourceUrl: "https://code.claude.com/docs/en/desktop-linux",
    primaryCommand: "sudo apt update && sudo apt install claude-desktop",
    uninstallCommand: "sudo apt remove claude-desktop",
    notes: "Installs from Anthropic's official apt repository so it receives updates alongside normal system updates.",
    steps: [
      {
        title: "Install curl and gnupg",
        description: "Make sure curl and GnuPG are installed to download and verify Anthropic's security signing key.",
        command: "sudo apt install curl gnupg -y",
      },
      {
        title: "Download Anthropic's signing key",
        description: "Fetch the official Claude Desktop signing key into APT's trusted keyrings.",
        command: "sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc",
      },
      {
        title: "Verify the signing key fingerprint",
        description: "Confirm that the key fingerprint matches 31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE (Anthropic Claude Code Release Signing).",
        command: "gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc",
        note: "Fingerprint must be: 31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE",
      },
      {
        title: "Register Anthropic's APT repository",
        description: "Add the official Claude Desktop APT source configured with the verified keyring.",
        command: 'echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list',
      },
      {
        title: "Update package list & install Claude Desktop",
        description: "Refresh APT metadata and install the claude-desktop package (approx. 227 MB).",
        command: "sudo apt update && sudo apt install claude-desktop -y",
      },
      {
        title: "Launch Claude & Sign in",
        description: "Open Claude from the app menu (or run `claude-desktop`). Click 'Continue with Google' (or sign in with email), select your account, and click 'Open Claude'.",
        command: "claude-desktop",
      },
    ],
    troubleshooting: [
      {
        title: "NO_PUBKEY BAA929FF1A7ECACE error",
        body: "The signing key was not downloaded properly. Re-run Step 2 to download the key and verify its fingerprint.",
        command: "sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc",
      },
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    creator: "xAI / Community",
    category: "AI Desktop Assistant",
    description: "Desktop client for Grok by xAI. Can be installed via Linux App Center build script or Snap Store edge channel.",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#f97316", // Orange
    requiresAppCenter: true,
    primaryCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh",
    notes: "Supports two installation methods: Option A (Linux App Center script, recommended) or Option B (Snap Store edge channel).",
    steps: [
      {
        title: "Option A (Recommended): Linux App Center script",
        description: "Downloads the app, builds both an AppImage and .deb package, and installs the .deb automatically.",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Option B (Alternative): Snap Store Edge Channel",
        description: "Requires Snap support enabled (Step 4). Grok is published on the edge channel.",
        command: "sudo snap install grok-desktop --edge",
        note: "Note: Running without '--edge' fails because grok-desktop is not on the stable channel.",
      },
      {
        title: "Launch & Sign in",
        description: "Search for Grok in the application menu, launch it, and sign in (e.g. Google sign-in with 2-Step Verification).",
      },
    ],
    troubleshooting: [
      {
        title: "snap 'grok-desktop' is not available on stable",
        body: "The community package is only on the edge (pre-release) channel. Be sure to add the --edge flag.",
        command: "sudo snap install grok-desktop --edge",
      },
      {
        title: "Remove Snap version before App Center install",
        body: "If switching from Snap to App Center, purge the Snap version first.",
        command: "sudo snap remove grok-desktop --purge",
      },
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    creator: "Google / Community",
    category: "Multimodal AI Desktop",
    description: "Desktop application wrapper for Google Gemini, offering streamlined access to Gemini's AI capabilities.",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#3b82f6", // Blue
    requiresSnap: true,
    primaryCommand: "sudo snap install gemini-desktop",
    uninstallCommand: "sudo snap remove gemini-desktop --purge",
    notes: "Requires Snap support enabled on Debian. Community build packaged for desktop Linux.",
    steps: [
      {
        title: "Verify Snap support is enabled",
        description: "Make sure snapd is installed, active, and your system has been restarted if newly installed.",
        command: "snap version",
      },
      {
        title: "Install Gemini Desktop from Snap Store",
        description: "Run the install command in your terminal and enter your sudo password when prompted.",
        command: "sudo snap install gemini-desktop",
      },
      {
        title: "Launch & Sign in",
        description: "Open Gemini from the application menu and sign in securely with your Google account.",
      },
    ],
    troubleshooting: [
      {
        title: "Snap apps not showing in application menu",
        body: "Debian needs a restart after installing snapd for environment variables and desktop shortcuts to update.",
        command: "sudo reboot",
      },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    creator: "Perplexity AI / Community",
    category: "AI Search & Research",
    description: "Desktop client for Perplexity AI, the conversational answer engine with web sources and live citations.",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#06b6d4", // Cyan
    requiresSnap: true,
    primaryCommand: "sudo snap install perplexity-desktop",
    uninstallCommand: "sudo snap remove perplexity-desktop --purge",
    notes: "Requires Snap support enabled on Debian. Maintained by Ken VanDine.",
    steps: [
      {
        title: "Verify Snap support is enabled",
        description: "Confirm Snap support is operational on your Debian 13 installation.",
        command: "snap version",
      },
      {
        title: "Install Perplexity Desktop from Snap Store",
        description: "Install the perplexity-desktop snap package.",
        command: "sudo snap install perplexity-desktop",
      },
      {
        title: "Launch & Sign in",
        description: "Open Perplexity from the application menu and sign in with your account credentials.",
      },
    ],
    troubleshooting: [
      {
        title: "Command typo check",
        body: "Make sure not to mistype 'install' (e.g., 'instal').",
        command: "sudo snap install perplexity-desktop",
      },
    ],
  },
  {
    slug: "copilot",
    name: "Copilot",
    creator: "Microsoft / App Center",
    category: "AI Productivity & Search",
    description: "Desktop wrapper for Microsoft Copilot, providing quick access to GPT-4o, web search, and file analysis.",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#0ea5e9", // Sky Blue
    requiresAppCenter: true,
    sourceUrl: "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS",
    primaryCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/uninstall.sh | sh",
    notes: "Requires one-time GitHub setup on Linux App Center (linuxdesktopapps11.vercel.app).",
    steps: [
      {
        title: "Set up Linux App Center (one time)",
        description: "Visit linuxdesktopapps11.vercel.app, sign in with GitHub, star the repo & follow the profile to access the script.",
      },
      {
        title: "Run the Debian installation script",
        description: "Paste the install script command into your terminal, press Enter, and enter your sudo password when prompted.",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for build and installation to complete",
        description: "The script downloads dependencies, builds the native package, and installs it. Wait until it displays 'Copilot is installed'.",
      },
      {
        title: "Launch & Sign in",
        description: "Open Copilot from the application menu, sign in with your Microsoft account, and enter the one-time code sent to your email or phone.",
      },
    ],
    troubleshooting: [
      {
        title: "Harmless APT root notice",
        body: "Notice: 'N: Download is performed unsandboxed as root ...' is a harmless APT notice on Debian; the package installs successfully.",
      },
    ],
  },
  {
    slug: "meta-ai",
    name: "Meta AI",
    creator: "Meta / App Center",
    category: "Llama AI Desktop Assistant",
    description: "Desktop client for Meta AI, powered by the Llama 3 foundation models with image generation and smart search.",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#2563eb", // Royal Blue
    requiresAppCenter: true,
    sourceUrl: "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS",
    primaryCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/uninstall.sh | sh",
    notes: "Note that '%20' represents the URL-encoded space in 'Meta AI'; leave it as is.",
    steps: [
      {
        title: "Run the Meta AI install script",
        description: "Execute the official installation script. Notice the '%20' represents the space in 'Meta AI'.",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for build and installation",
        description: "Wait while the script builds and installs the application until it outputs 'Meta AI is installed'.",
      },
      {
        title: "Launch & Sign in",
        description: "Open Meta AI from the application menu, sign in with your account, and complete any requested verification steps.",
      },
    ],
    troubleshooting: [
      {
        title: "Keep %20 in URL",
        body: "Do not replace '%20' with a literal space in the curl URL, as curl needs the URL-encoded path to locate the install script on GitHub.",
      },
    ],
  },
  {
    slug: "qwen",
    name: "Qwen",
    creator: "Alibaba Cloud / App Center",
    category: "Open-Weights AI Assistant",
    description: "Desktop client for Alibaba's Qwen AI models, with strong multilingual, mathematics, and reasoning capabilities.",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#6366f1", // Indigo
    requiresAppCenter: true,
    sourceUrl: "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS",
    primaryCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/uninstall.sh | sh",
    notes: "Requires one-time GitHub setup on Linux App Center (linuxdesktopapps11.vercel.app).",
    steps: [
      {
        title: "Run the Qwen install script",
        description: "Run the verified installation script in the terminal and enter your sudo password.",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for build and installation",
        description: "Wait while the script downloads, packages, and installs the software until it prints 'Qwen is installed'.",
      },
      {
        title: "Launch & Sign in",
        description: "Open Qwen from the application menu. Sign in with your Google account (confirming with 2-Step Verification).",
      },
    ],
  },
  {
    slug: "kimi",
    name: "Kimi",
    creator: "Moonshot AI / App Center",
    category: "Long-Context AI Assistant",
    description: "Desktop client for Kimi by Moonshot AI, famous for handling ultra-long context windows and in-depth document analysis.",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#ec4899", // Pink
    requiresAppCenter: true,
    sourceUrl: "https://github.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS",
    primaryCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=debian sh",
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/uninstall.sh | sh",
    notes: "Uses Node 22 build pipeline parameter ('?v=node22').",
    steps: [
      {
        title: "Run the Kimi install script",
        description: "Run the installation script with the required Node 22 target parameter in your terminal.",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for installation to finish",
        description: "Wait while the script builds and installs the app until it outputs 'Kimi is installed'.",
      },
      {
        title: "Launch & Sign in",
        description: "Open Kimi from the application menu and sign in with your Google account.",
      },
    ],
  },
  {
    slug: "deepseek",
    name: "DeepSeek",
    creator: "DeepSeek / Community",
    category: "Reasoning & Coding AI",
    description: "Desktop client for DeepSeek AI, known for cutting-edge reasoning, math, and code generation models.",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#0284c7", // Sky Blue
    requiresSnap: true,
    primaryCommand: "sudo snap install deepseek-desktop",
    uninstallCommand: "sudo snap remove deepseek-desktop --purge",
    notes: "Requires Snap support enabled on Debian. Community desktop build.",
    steps: [
      {
        title: "Verify Snap support is enabled",
        description: "Confirm Snap support is operational on Debian 13.",
        command: "snap version",
      },
      {
        title: "Install DeepSeek from the Snap Store",
        description: "Execute the snap install command in your terminal and enter your password.",
        command: "sudo snap install deepseek-desktop",
      },
      {
        title: "Launch & Sign in",
        description: "Open DeepSeek from the application menu and log in with your email and password.",
      },
    ],
    troubleshooting: [
      {
        title: "Snap apps not in menu",
        body: "Restart your machine after the initial snapd setup so your desktop environment recognizes new Snap apps.",
        command: "sudo reboot",
      },
    ],
  },
];
