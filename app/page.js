"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthContext";
import AuthScreen from "./components/AuthScreen";
import { getStreak, getTheme, themes, getProgress, isDevMode, setDevMode, checkAndAwardTrophies } from "./utils/storage";
import { cards, decks } from "./data/cards";

function WineGlassIcon({ size = 120, color = "#722F37", fillLevel = 0 }) {
  // fillLevel 0-7 maps to glass fill amount
  const fillHeight = Math.min(fillLevel / 7, 1) * 30;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Wine fill */}
      {fillLevel > 0 && (
        <clipPath id="glassClip">
          <path d="M37 17 L63 17 L59 44 C59 54 54 59 50 61 C46 59 41 54 41 44 Z" />
        </clipPath>
      )}
      {fillLevel > 0 && (
        <rect x="35" y={47 - fillHeight} width="30" height={fillHeight + 2}
          fill={color} opacity="0.35" clipPath="url(#glassClip)" />
      )}
      {/* Glass outline */}
      <path d="M35 15 L65 15 L60 45 C60 55 55 60 50 62 C45 60 40 55 40 45 Z"
        stroke={color} strokeWidth="2" fill="none" />
      {/* Stem */}
      <line x1="50" y1="62" x2="50" y2="80" stroke={color} strokeWidth="2" />
      {/* Base */}
      <line x1="38" y1="80" x2="62" y2="80" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HomeScreen() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [streak, setStreakData] = useState({ current: 0, longest: 0, totalStudied: 0 });
  const [stats, setStats] = useState({ studied: 0, total: 135, mastered: 0 });
  const [devModeActive, setDevModeActive] = useState(false);
  const versionTapTimesRef = useRef([]);

  const refreshStats = () => {
    const s = getStreak();
    setStreakData(s);
    const progress = getProgress();
    const studied = Object.values(progress).filter(p => p.timesSeen > 0).length;
    const mastered = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 5).length;
    setStats({ studied, total: cards.length, mastered });
    setDevModeActive(isDevMode());
  };

  useEffect(() => { refreshStats(); }, []);

  const handleVersionTap = () => {
    const now = Date.now();
    versionTapTimesRef.current = [...versionTapTimesRef.current.filter(t => now - t < 2000), now];
    if (versionTapTimesRef.current.length >= 5) {
      versionTapTimesRef.current = [];
      if (!isDevMode()) { setDevMode(true); setDevModeActive(true); }
    }
  };

  // Glass fill based on streak (0-7 days = 0-7 fill)
  const glassFill = Math.min(streak.current || 0, 7);

  const menuItems = [
    { title: "Flashcards", subtitle: "Swipe through wine cards", icon: "🃏", path: "/study/pick" },
    { title: "Quiz Mode", subtitle: "Test your wine knowledge", icon: "🧪", path: "/quiz/pick" },
    { title: "Progress", subtitle: `${stats.studied}/${stats.total} cards studied`, icon: "📊", path: "/progress" },
    { title: "Settings", subtitle: "Theme, account & more", icon: "⚙️", path: "/settings" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-10 pb-8" style={{ background: '#F5F0EB', fontFamily: "'DM Sans', sans-serif" }}>
      {/* Wine Glass Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-1"
      >
        <WineGlassIcon size={100} color="#722F37" fillLevel={glassFill} />
      </motion.div>

      <h1 className="text-4xl font-extrabold tracking-tight mb-0.5" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
        Sip<span style={{ color: '#722F37' }}>Streak</span>
      </h1>
      <p className="text-sm mb-6" style={{ color: '#8C8279' }}>Master the world of wine 🍷</p>

      {/* Streak Display */}
      <div className="flex items-center gap-3 mb-8 px-6 py-3 rounded-2xl border shadow-sm"
        style={{ background: 'white', borderColor: '#722F3715' }}>
        <div className="text-center">
          <div className="text-3xl">🔥</div>
        </div>
        <div>
          <div className="text-3xl font-bold" style={{ color: '#722F37' }}>{streak.current || 0}</div>
          <div className="text-xs" style={{ color: '#8C8279' }}>
            day streak {streak.longest > 0 && `• best: ${streak.longest}`}
          </div>
        </div>
        {streak.totalStudied > 0 && (
          <div className="ml-4 pl-4" style={{ borderLeft: '1px solid #722F3715' }}>
            <div className="text-lg font-bold" style={{ color: '#2C1A2E' }}>{streak.totalStudied}</div>
            <div className="text-xs" style={{ color: '#8C8279' }}>cards studied</div>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="w-full max-w-sm flex flex-col gap-3 mb-6">
        {menuItems.map((item) => (
          <motion.button key={item.title} whileTap={{ scale: 0.98 }}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-4 p-4 rounded-2xl border text-left shadow-sm transition-all hover:shadow-md"
            style={{ background: 'white', borderColor: '#722F3715' }}>
            <span className="text-3xl">{item.icon}</span>
            <div className="flex-1">
              <div className="font-semibold text-lg" style={{ color: '#2C1A2E' }}>{item.title}</div>
              <div className="text-sm" style={{ color: '#8C8279' }}>{item.subtitle}</div>
            </div>
            <div style={{ color: '#8C8279' }}>→</div>
          </motion.button>
        ))}
      </div>

      {/* Version */}
      <div onClick={handleVersionTap}
        className="mt-4 text-xs select-none cursor-default" style={{ color: '#C9A96E', WebkitUserSelect: 'none' }}>
        v1.0
      </div>
    </div>
  );
}

function SipStreakApp() {
  const { session, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#F5F0EB' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
          <WineGlassIcon size={64} color="#722F37" fillLevel={3} />
        </motion.div>
      </div>
    );
  }

  if (!session) return <AuthScreen onAuth={() => {}} />;
  return <HomeScreen />;
}


export default function SipStreakPage() {
  return <SipStreakApp />;
}
