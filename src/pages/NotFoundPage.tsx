import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFoundPage() {
  usePageMeta("Page not found", "The requested Linux Shortcut Center page could not be found.");

  return (
    <div className="not-found-page page-container py-16 px-4 max-w-3xl mx-auto flex flex-col items-center text-center">
      <div>
        <Link to="/" className="back-btn group mb-8">
          <ArrowLeft size={16} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>
      </div>
      <span className="text-xs font-mono text-purple-400 tracking-widest font-semibold uppercase mb-2">
        404 / NOT FOUND
      </span>
      <h1 className="chrome-title text-4xl sm:text-5xl font-extrabold mb-4">
        Page Not Found
      </h1>
      <p className="chrome-subtext text-base max-w-md mx-auto mb-8">
        This path is not available in the Linux Shortcut Center library.
      </p>
      <Link to="/" className="transparent-get-started-btn px-6 py-3 rounded-xl inline-flex items-center gap-2">
        <ArrowLeft size={16} />
        <span>Return Home</span>
      </Link>
    </div>
  );
}
