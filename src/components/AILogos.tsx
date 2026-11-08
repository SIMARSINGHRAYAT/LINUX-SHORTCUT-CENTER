interface AILogoProps {
  className?: string;
  size?: number;
}

export function ChatGPTLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1.5"/>
      <path d="M12 4.5a3.5 3.5 0 0 1 3.2 2.1 3.5 3.5 0 0 1 2.3 2.3A3.5 3.5 0 0 1 19.5 12a3.5 3.5 0 0 1-2 3.2 3.5 3.5 0 0 1-2.3 2.3 3.5 3.5 0 0 1-3.2 2 3.5 3.5 0 0 1-3.2-2 3.5 3.5 0 0 1-2.3-2.3A3.5 3.5 0 0 1 4.5 12a3.5 3.5 0 0 1 2-3.2 3.5 3.5 0 0 1 2.3-2.3 3.5 3.5 0 0 1 3.2-2z" stroke="#10B981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill="#10B981"/>
    </svg>
  );
}

export function ClaudeLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#A855F7" fillOpacity="0.15" stroke="#A855F7" strokeWidth="1.5"/>
      <path d="M12 6.5v11M6.5 12h11M8 8l8 8M16 8l-8 8" stroke="#D8B4FE" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function GrokLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#F97316" fillOpacity="0.15" stroke="#F97316" strokeWidth="1.5"/>
      <path d="M7 17L17 7M7 7l5 5.5M17 17l-3.5-3.8" stroke="#FDBA74" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function GeminiLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1.5"/>
      <path d="M12 4C12 8.418 8.418 12 4 12C8.418 12 12 15.582 12 20C12 15.582 15.582 12 20 12C15.582 12 12 8.418 12 4Z" fill="#60A5FA"/>
    </svg>
  );
}

export function PerplexityLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#06B6D4" fillOpacity="0.15" stroke="#06B6D4" strokeWidth="1.5"/>
      <path d="M12 6v12M7.5 7.5l9 9M16.5 7.5l-9 9M6 12h12" stroke="#67E8F9" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

export function CopilotLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0EA5E9" fillOpacity="0.15" stroke="#0EA5E9" strokeWidth="1.5"/>
      <path d="M8 10C8 7.79 9.79 6 12 6C14.21 6 16 7.79 16 10C16 12.21 14.21 14 12 14" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 14C16 16.21 14.21 18 12 18C9.79 18 8 16.21 8 14" stroke="#7DD3FC" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

export function MetaAILogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#2563EB" fillOpacity="0.15" stroke="#2563EB" strokeWidth="1.5"/>
      <path d="M7.5 13.5C6.4 13.5 5.5 12.6 5.5 11.5C5.5 10.4 6.4 9.5 7.5 9.5C9 9.5 10.5 12 12 13.5C13.5 12 15 9.5 16.5 9.5C17.6 9.5 18.5 10.4 18.5 11.5C18.5 12.6 17.6 13.5 16.5 13.5C15 13.5 13.5 11 12 9.5C10.5 11 9 13.5 7.5 13.5Z" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function QwenLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#6366F1" fillOpacity="0.15" stroke="#6366F1" strokeWidth="1.5"/>
      <path d="M12 6.5L16.5 9V15L12 17.5L7.5 15V9L12 6.5Z" stroke="#818CF8" strokeWidth="1.8" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="2" fill="#C7D2FE"/>
    </svg>
  );
}

export function KimiLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#EC4899" fillOpacity="0.15" stroke="#EC4899" strokeWidth="1.5"/>
      <path d="M8 7v10M8 12h3l4-5M11 12l4.5 5" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function DeepSeekLogo({ size = 28, className }: AILogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#0284C7" fillOpacity="0.15" stroke="#0284C7" strokeWidth="1.5"/>
      <path d="M6 13C8 10 10.5 8 13.5 8C17 8 18.5 11 18.5 12C18.5 14 16.5 16 13.5 16C9 16 6.5 13.5 6 13Z" stroke="#38BDF8" strokeWidth="1.8"/>
      <circle cx="10" cy="11.5" r="1" fill="#BAE6FD"/>
    </svg>
  );
}

export function AIAppIcon({ slug, size = 32 }: { slug: string; size?: number }) {
  switch (slug) {
    case "chatgpt":
      return <ChatGPTLogo size={size} />;
    case "claude":
      return <ClaudeLogo size={size} />;
    case "grok":
      return <GrokLogo size={size} />;
    case "gemini":
      return <GeminiLogo size={size} />;
    case "perplexity":
      return <PerplexityLogo size={size} />;
    case "copilot":
      return <CopilotLogo size={size} />;
    case "meta-ai":
      return <MetaAILogo size={size} />;
    case "qwen":
      return <QwenLogo size={size} />;
    case "kimi":
      return <KimiLogo size={size} />;
    case "deepseek":
      return <DeepSeekLogo size={size} />;
    default:
      return null;
  }
}
