import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastProvider } from "./components/ToastProvider";
import { BackgroundGlow } from "./components/BackgroundGlow";
import { BrowserLibrary } from "./pages/BrowserLibrary";
import { DebianDashboard } from "./pages/DebianDashboard";
import { DistributionDashboard } from "./pages/DistributionDashboard";
import { InstallationGuide } from "./pages/InstallationGuide";
import { LandingPage } from "./pages/LandingPage";
import { AILibrary } from "./pages/AILibrary";
import { AIGuide } from "./pages/AIGuide";
import { NotFoundPage } from "./pages/NotFoundPage";

function Application() {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetId = decodeURIComponent(location.hash.slice(1));
      window.requestAnimationFrame(() =>
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="app-shell relative min-h-screen bg-black text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-white">
      {/* Universal Background: Full black contrast with grid and glossy professional colors */}
      <BackgroundGlow />

      {/* Main Content Area without any top header or sidebar */}
      <main id="main-content" className="site-main relative z-10 min-h-screen flex flex-col justify-start">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="route-frame flex-1"
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<DistributionDashboard />} />
              <Route path="/dashboard/debian" element={<DebianDashboard />} />
              <Route path="/dashboard/debian/browsers" element={<BrowserLibrary />} />
              <Route path="/dashboard/debian/browsers/:browserSlug" element={<InstallationGuide />} />
              <Route path="/dashboard/debian/ai" element={<AILibrary />} />
              <Route path="/dashboard/debian/ai/:aiSlug" element={<AIGuide />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </ToastProvider>
  );
}
