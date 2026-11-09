export interface AIStep {
  title: string;
  description: string;
  command?: string;
  note?: string;
  links?: { label: string; url: string }[];
}

export interface AIOption {
  name: string;
  badge: string;
  description: string;
  steps: AIStep[];
  uninstallCommand?: string;
}

export interface AIAppGuide {
  slug: string;
  name: string;
  installMethod: string;
  methodType: "deb" | "apt" | "snap" | "script";
  badgeColor: string;
  summary: string;
  requiresSnap?: boolean;
  requiresAppCenter?: boolean;
  steps: AIStep[];
  options?: AIOption[];
  uninstallCommand: string;
  troubleshooting?: { title: string; body: string; command?: string }[];
}

export const snapPrerequisiteSteps: AIStep[] = [
  {
    title: "Refresh the package lists",
    description: "Update APT package lists.",
    command: "sudo apt update",
  },
  {
    title: "Install snapd",
    description: "Install the Snap daemon on Debian.",
    command: "sudo apt install snapd -y",
  },
  {
    title: "Turn on the Snap service",
    description: "Enable and start the snapd socket immediately.",
    command: "sudo systemctl enable --now snapd.socket",
  },
  {
    title: "Install the latest snapd from the Snap Store",
    description: "Updates to the latest snapd version (prints snapd 2.78 from Canonical installed).",
    command: "sudo snap install snapd",
  },
  {
    title: "Restart the computer",
    description: "Restart so Snap apps show up properly in the system application menu.",
    command: "sudo reboot",
  },
  {
    title: "Check Snap is working",
    description: "After restart, verify Snap is running. It should list snap and snapd 2.78, debian 13 and architecture amd64.",
    command: "snap version",
  },
];

export const appCenterPrerequisiteSteps = [
  "Open linuxdesktopapps11.vercel.app in your browser and click Get Started.",
  "On 'Sign in to continue', click Continue with GitHub and approve the sign-in on GitHub.",
  "On 'Help grow the Linux community', complete both actions: Star the repository (the Linux App Center on GitHub) and Follow the profile (SIMARSINGHRAYAT on GitHub).",
  "Click Continue to Dashboard.",
  "On 'Choose your desktop app category', click Open under AI Apps.",
];

export const aiApps: AIAppGuide[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    installMethod: "Official .deb package",
    methodType: "deb",
    badgeColor: "#10a37f",
    summary: "ChatGPT installs from OpenAI's own .deb file with apt.",
    uninstallCommand: "sudo apt remove chatgpt",
    steps: [
      {
        title: "Download the official .deb package",
        description: "In the browser, open OpenAI's 'ChatGPT desktop app for Linux' page. Under Download the right package, click Download .deb for x64 (the Ubuntu or Debian row).",
      },
      {
        title: "Verify the download in terminal",
        description: "In the Terminal, go to your Downloads folder and check the file is there. You should see chatgpt_amd64.deb.",
        command: "cd ~/Downloads && ls",
      },
      {
        title: "Install with APT",
        description: "Install the package (enter your sudo password when asked):",
        command: "sudo apt install ./chatgpt_amd64.deb",
      },
      {
        title: "Open and Sign In",
        description: "Open ChatGPT from the app menu and click Continue to sign in. The browser opens. Choose your account, select the workspace (Personal account), and click Continue. On 'You're signed in', click Open ChatGPT. The app opens on 'What should we work on?'",
      },
    ],
    troubleshooting: [
      {
        title: "APT cannot find the file",
        body: "Make sure you ran the command from ~/Downloads and the downloaded file is named chatgpt_amd64.deb.",
        command: "ls -la ~/Downloads/chatgpt*.deb",
      },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    installMethod: "Anthropic's apt repository",
    methodType: "apt",
    badgeColor: "#d97757",
    summary: "Claude Desktop installs from Anthropic's apt repository, so it updates with your normal system updates. The commands come from the 'Claude Desktop on Linux (beta)' page at code.claude.com/docs/en/desktop-linux.",
    uninstallCommand: "sudo apt remove claude-desktop",
    steps: [
      {
        title: "Install curl and gnupg",
        description: "Install curl and gnupg (needed to fetch and check the signing key):",
        command: "sudo apt install curl gnupg",
      },
      {
        title: "Download Anthropic's signing key",
        description: "Download the official signing key into APT's keyrings directory:",
        command: "sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc",
      },
      {
        title: "Check the signing key",
        description: "The fingerprint must be 31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE (Anthropic Claude Code Release Signing):",
        command: "gpg --show-keys /usr/share/keyrings/claude-desktop-archive-keyring.asc",
        note: "Fingerprint must be: 31DDDE24DDFAB679F42D7BD2BAA929FF1A7ECACE",
      },
      {
        title: "Register the repository",
        description: "Add Anthropic's official APT source for Claude Desktop:",
        command: 'echo "deb [arch=amd64,arm64 signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list',
      },
      {
        title: "Update and install Claude Desktop",
        description: "Update package list and install claude-desktop, then press Y to continue (about 227 MB download in the video):",
        command: "sudo apt update && sudo apt install claude-desktop",
      },
      {
        title: "Open and Sign In",
        description: "Open Claude from the app menu (or run claude-desktop). Click Continue with Google (or sign in with email), choose your account, then click Open Claude when the browser asks.",
        command: "claude-desktop",
      },
    ],
    troubleshooting: [
      {
        title: "NO_PUBKEY BAA929FF1A7ECACE on apt update",
        body: "The signing key didn't download. Rerun the key download in step 2 and check the fingerprint.",
        command: "sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc",
      },
    ],
  },
  {
    slug: "grok",
    name: "Grok",
    installMethod: "Snap Store (edge channel), then the Linux App Center install script",
    methodType: "script",
    badgeColor: "#f97316",
    summary: "The video installs Grok from the Snap Store first, removes it, then reinstalls it from the Linux App Center. You only need one of the two options.",
    requiresSnap: true,
    requiresAppCenter: true,
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh",
    steps: [],
    options: [
      {
        name: "Option A: Snap Store (edge channel)",
        badge: "Snap Store",
        description: "Needs Snap support first (step 4).",
        uninstallCommand: "sudo snap remove grok-desktop --purge",
        steps: [
          {
            title: "Try the normal install (note why it fails)",
            description: "It fails because grok-desktop isn't on the stable channel, only on edge (pre-release):",
            command: "sudo snap install grok-desktop",
          },
          {
            title: "Install from the edge channel",
            description: "It prints grok-desktop (edge) 1.0.0 from Umar Javaid (omii56) installed. This is a community build, not made by xAI:",
            command: "sudo snap install grok-desktop --edge",
          },
          {
            title: "Launch Grok",
            description: "Open Grok from the app menu and sign in.",
          },
          {
            title: "Remove Snap version (if switching to Option B)",
            description: "To remove it, as the video does before Option B:",
            command: "sudo snap remove grok-desktop --purge",
          },
        ],
      },
      {
        name: "Option B: Linux App Center (used in the video)",
        badge: "Recommended",
        description: "Needs the Linux App Center set up (step 5).",
        uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/uninstall.sh | sh",
        steps: [
          {
            title: "Access Linux App Center",
            description: "In the Linux App Center (linuxdesktopapps11.vercel.app), open AI Apps and click Grok.",
          },
          {
            title: "Copy the Debian command",
            description: "Click the Debian tab, then Copy in the Debian Installation box.",
          },
          {
            title: "Run the install command in terminal",
            description: "Paste the command into the Terminal, press Enter, and type your password when asked:",
            command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Grok/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
          },
          {
            title: "Wait for build & Launch",
            description: "Wait while the script downloads the app, builds it (an AppImage and a .deb) and installs the .deb. It ends with Grok installed. Search for it in the application menu. Open Grok from the app menu and sign in (the video uses Google sign-in with 2-Step Verification).",
          },
        ],
      },
    ],
    troubleshooting: [
      {
        title: "snap 'grok-desktop' is not available on stable",
        body: "Add --edge to install the pre-release build.",
        command: "sudo snap install grok-desktop --edge",
      },
    ],
  },
  {
    slug: "gemini",
    name: "Gemini",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#3b82f6",
    summary: "Needs Snap support first (step 4). This is a community build, not made by Google.",
    requiresSnap: true,
    uninstallCommand: "sudo snap remove gemini-desktop --purge",
    steps: [
      {
        title: "Install Gemini Desktop from Snap",
        description: "In the Terminal, run the command and type your password when asked:",
        command: "sudo snap install gemini-desktop",
      },
      {
        title: "Wait for confirmation",
        description: "Wait for the installed message from snap.",
      },
      {
        title: "Open Gemini",
        description: "Open Gemini from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your Google account.",
        note: "This is a community build, not made by Google.",
      },
    ],
    troubleshooting: [
      {
        title: "Snap apps missing from app menu",
        body: "Restart after installing snapd (step 4) so desktop launchers are refreshed.",
        command: "sudo reboot",
      },
    ],
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#06b6d4",
    summary: "Needs Snap support first (step 4). This is a community build, not made by Perplexity.",
    requiresSnap: true,
    uninstallCommand: "sudo snap remove perplexity-desktop --purge",
    steps: [
      {
        title: "Install Perplexity Desktop from Snap",
        description: "In the Terminal, run the command and type your password when asked:",
        command: "sudo snap install perplexity-desktop",
      },
      {
        title: "Wait for download to finish",
        description: "The video shows perplexity-desktop 0.5.0-8-gec216cc4cf from Ken VanDine installed.",
      },
      {
        title: "Open Perplexity",
        description: "Open Perplexity from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your account.",
        note: "This is a community build, not made by Perplexity.",
      },
    ],
    troubleshooting: [
      {
        title: "error: unknown command 'instal'",
        body: "A typo; the command is install.",
        command: "sudo snap install perplexity-desktop",
      },
    ],
  },
  {
    slug: "copilot",
    name: "Copilot",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#0ea5e9",
    summary: "Needs the Linux App Center set up (step 5).",
    requiresAppCenter: true,
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/uninstall.sh | sh",
    steps: [
      {
        title: "Find Copilot in Linux App Center",
        description: "In the Linux App Center (linuxdesktopapps11.vercel.app), open AI Apps and click Copilot.",
      },
      {
        title: "Copy the Debian installation command",
        description: "Click the Debian tab, then Copy in the Debian Installation box.",
      },
      {
        title: "Execute in Terminal",
        description: "Paste the command into the Terminal, press Enter, and type your password when asked:",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Copilot/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for installation",
        description: "Wait while the script builds and installs the app, until it says Copilot is installed.",
      },
      {
        title: "Open Copilot",
        description: "Open Copilot from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your Microsoft account and enter the one-time code Microsoft sends you.",
      },
    ],
    troubleshooting: [
      {
        title: "Harmless APT notice",
        body: "N: Download is performed unsandboxed as root ... Permission denied during a Linux App Center install is a harmless apt notice; the app still installs.",
      },
    ],
  },
  {
    slug: "meta-ai",
    name: "Meta AI",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#0081fb",
    summary: "Needs the Linux App Center set up (step 5).",
    requiresAppCenter: true,
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/uninstall.sh | sh",
    steps: [
      {
        title: "Find Meta AI in Linux App Center",
        description: "In the Linux App Center (linuxdesktopapps11.vercel.app), open AI Apps and click Meta AI.",
      },
      {
        title: "Copy the Debian command",
        description: "Click the Debian tab, then Copy in the Debian Installation box.",
      },
      {
        title: "Execute the install script",
        description: "Paste the command into the Terminal, press Enter, and type your password when asked:",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Meta%20AI/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
        note: "The %20 stands for the space in 'Meta AI'; keep it as is.",
      },
      {
        title: "Wait for build and install",
        description: "Wait while the script builds and installs the app, until it says Meta AI is installed.",
      },
      {
        title: "Open Meta AI",
        description: "Open Meta AI from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your account and complete the verification step it asks for.",
      },
    ],
    troubleshooting: [
      {
        title: "URL encoding for space",
        body: "The %20 stands for the space in 'Meta AI'; keep it exactly as written in the command.",
      },
    ],
  },
  {
    slug: "qwen",
    name: "Qwen",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#615ced",
    summary: "Needs the Linux App Center set up (step 5).",
    requiresAppCenter: true,
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/uninstall.sh | sh",
    steps: [
      {
        title: "Find Qwen in Linux App Center",
        description: "In the Linux App Center (linuxdesktopapps11.vercel.app), open AI Apps and click Qwen.",
      },
      {
        title: "Copy the Debian installation command",
        description: "Click the Debian tab, then Copy in the Debian Installation box.",
      },
      {
        title: "Run in Terminal",
        description: "Paste the command into the Terminal, press Enter, and type your password when asked:",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Qwen/install.sh | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for confirmation",
        description: "Wait while the script builds and installs the app, until it says Qwen is installed.",
      },
      {
        title: "Open Qwen",
        description: "Open Qwen from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your Google account (the video confirms with 2-Step Verification).",
      },
    ],
  },
  {
    slug: "kimi",
    name: "Kimi",
    installMethod: "Linux App Center install script",
    methodType: "script",
    badgeColor: "#ec4899",
    summary: "Needs the Linux App Center set up (step 5).",
    requiresAppCenter: true,
    uninstallCommand: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/uninstall.sh | sh",
    steps: [
      {
        title: "Find Kimi in Linux App Center",
        description: "In the Linux App Center (linuxdesktopapps11.vercel.app), open AI Apps and click Kimi.",
      },
      {
        title: "Copy the Debian installation command",
        description: "Click the Debian tab, then Copy in the Debian Installation box.",
      },
      {
        title: "Run in Terminal",
        description: "Paste the command into the Terminal, press Enter, and type your password when asked:",
        command: "curl -fsSL https://raw.githubusercontent.com/SIMARSINGHRAYAT/LINUX-DESKTOP-APPS/main/ai/Kimi/install.sh?v=node22 | LINUX_DESKTOP_DISTRO=debian sh",
      },
      {
        title: "Wait for build & install",
        description: "Wait while the script builds and installs the app, until it says Kimi is installed.",
      },
      {
        title: "Open Kimi",
        description: "Open Kimi from the app menu.",
      },
      {
        title: "Sign In",
        description: "Sign in with your Google account.",
      },
    ],
  },
  {
    slug: "deepseek",
    name: "DeepSeek",
    installMethod: "Snap Store",
    methodType: "snap",
    badgeColor: "#0066ff",
    summary: "Needs Snap support first (step 4). This is a community build, not made by DeepSeek.",
    requiresSnap: true,
    uninstallCommand: "sudo snap remove deepseek-desktop --purge",
    steps: [
      {
        title: "Install DeepSeek Desktop from Snap",
        description: "In the Terminal, run the command and type your password when asked:",
        command: "sudo snap install deepseek-desktop",
      },
      {
        title: "Wait for installed message",
        description: "Wait for the installed message from snap.",
      },
      {
        title: "Open DeepSeek",
        description: "Open DeepSeek from the app menu.",
      },
      {
        title: "Log In",
        description: "Log in with your email and password.",
        note: "This is a community build, not made by DeepSeek.",
      },
    ],
    troubleshooting: [
      {
        title: "Snap apps missing from app menu",
        body: "Restart after installing snapd (step 4) so desktop launchers appear.",
        command: "sudo reboot",
      },
    ],
  },
];

export const ubuntuAIApps: AIAppGuide[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    installMethod: "Official .deb package",
    methodType: "deb",
    badgeColor: "#10a37f",
    summary: "Install the official ChatGPT Desktop app for Ubuntu from OpenAI's .deb package.",
    uninstallCommand: "sudo apt remove chatgpt",
    steps: [
      {
        title: "Step 2. Download the official ChatGPT app",
        description: "Open the official Linux installation guide and download the .deb package for your architecture.",
        links: [
          { label: "OpenAI - ChatGPT for Linux installation guide", url: "https://learn.chatgpt.com/docs/linux/linux-app?utm_source=chatgpt.com" },
          { label: "ChatGPT Desktop for Ubuntu reference", url: "https://images.openai.com/static-rsc-4/tYBiRYiHWjdLGa_1BNIy4h_YHvq8ZZ4VMQwo04PnuOnjpLzvfyda-jPm_wLdsGYOZ_mrEDjzR68sNqRMnvXCTiUry1rA-xAtReTXefXaAYoLUxXdz7Y1KXqgg2BnnqS3QAoV5K_dCl55exgrVHNDFOVFUiF_WA1N_xwsiROWkHg?purpose=inline" },
        ],
        note: "Package: .deb | Architecture: AMD64 (x86_64) or ARM64 | Publisher: OpenAI",
      },
      {
        title: "Step 3. Install ChatGPT",
        description: "Once the download is complete, install the package from your Downloads folder. If your filename is different, replace chatgpt_amd64.deb with the actual filename.",
        command: "cd ~/Downloads\nsudo apt install ./chatgpt_amd64.deb",
      },
      {
        title: "Step 4. Launch ChatGPT",
        description: "Open Ubuntu Activities, search for ChatGPT, and click the ChatGPT icon, or launch it from the terminal.",
        command: "chatgpt",
      },
      {
        title: "Step 5. Sign in",
        description: "Open ChatGPT and sign in using your existing OpenAI account. Your conversations and account access will be available after signing in.",
      },
    ],
  },
  {
    slug: "claude",
    name: "Claude",
    installMethod: "Anthropic's official APT repository",
    methodType: "apt",
    badgeColor: "#d97757",
    summary: "Install Claude Desktop on Ubuntu using Anthropic's official APT repository.",
    uninstallCommand: "sudo apt remove claude-desktop",
    steps: [
      {
        title: "Step 2. Add Anthropic's official repository",
        description: "Copy and execute these commands one by one. First, download the official signing key.",
        command: "sudo curl -fsSLo /usr/share/keyrings/claude-desktop-archive-keyring.asc https://downloads.claude.ai/claude-desktop/key.asc",
      },
      {
        title: "Step 2. Add the APT repository",
        description: "Add Anthropic's official Claude Desktop APT repository.",
        command: 'echo "deb [signed-by=/usr/share/keyrings/claude-desktop-archive-keyring.asc] https://downloads.claude.ai/claude-desktop/apt/stable stable main" | sudo tee /etc/apt/sources.list.d/claude-desktop.list',
      },
      {
        title: "Step 3. Install Claude Desktop",
        description: "Update the package lists and install Claude Desktop using the official installation method.",
        command: "sudo apt update\nsudo apt install claude-desktop",
      },
      {
        title: "Step 4. Launch Claude",
        description: "Launch Claude Desktop from the terminal or the applications menu.",
        command: "claude-desktop",
      },
    ],
  },
];
