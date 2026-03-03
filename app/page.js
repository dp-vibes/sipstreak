"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthContext";
import AuthScreen from "./components/AuthScreen";
import AppShell from "./components/AppShell";
import TabBar from "./components/TabBar";
import { getProgress, getStreak } from "./utils/storage";
import { getDailyFact, getCategoryLabel } from "./data/daily-facts";
function CategoryIcon({ category }) {
  const icons = {
    history: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
    regions: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    technique: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    tasting: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 2L16 2L15 10C15 14 13.5 16 12 17C10.5 16 9 14 9 10Z"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>,
    grapes: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><circle cx="13" cy="15" r="3"/><path d="M13 4V2M11 3l-2-1M15 3l2-1"/></svg>,
    funfacts: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26Z"/></svg>,
  };
  return <span style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--gold-muted)' }}>{icons[category] || null}</span>;
}
import { cards as allCards } from "./data/cards";


function HomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({ studied: 0, total: 0, streak: 0, mastery: 0 });
  const [timeOfDay, setTimeOfDay] = useState("");

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");

    const progress = getProgress();
    const studied = Object.keys(progress).length;
    const total = allCards.length;
    const streakData = getStreak();
    const mastered = Object.values(progress).filter(p => p.level >= 5).length;
    setStats({ studied, total, streak: streakData.current || 0, mastery: total > 0 ? Math.round((mastered / total) * 100) : 0 });
  }, []);

  const greeting = timeOfDay === "morning" ? "Good morning" : timeOfDay === "afternoon" ? "Good afternoon" : timeOfDay === "evening" ? "Good evening" : "";
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "";
  const dailyFact = getDailyFact();

  const comingSoon = [
    { title: "Wine Journal", desc: "Log tasting notes", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/></svg>
    )},
    { title: "Bottle Scanner", desc: "Scan and identify wines", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><circle cx="12" cy="12" r="3"/></svg>
    )},
    { title: "AI Sommelier", desc: "Personal recommendations", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><path d="M9.5 2L14.5 2L13.5 9C13.5 12 12.5 13.5 12 14C11.5 13.5 10.5 12 10.5 9Z"/><line x1="12" y1="14" x2="12" y2="18"/><line x1="9.5" y1="18" x2="14.5" y2="18"/></svg>
    )},
    { title: "My Cellar", desc: "Track your collection", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
    )},
  ];

  if (!mounted) return null;

  return (
    <AppShell>
      <div style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ padding: '48px 20px 0' }}>
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
            <p style={{ fontSize: '12px', color: 'var(--text-hint)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px' }}>
              {greeting}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {userName ? `${userName}'s SipStreak` : 'SipStreak'}
            </h1>
          </motion.div>
        </div>

        {/* Streak */}
        {stats.streak > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            style={{ margin: '14px 20px 0', padding: '12px 16px', background: 'linear-gradient(135deg, #7B2D3B, #5C1E2B)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', marginBottom: '1px' }}>Current streak</p>
              <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{stats.streak} {stats.streak === 1 ? 'day' : 'days'}</p>
            </div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2"><path d="M12 2C6.5 6 4 10 4 14a8 8 0 0016 0c0-4-2.5-8-8-12z"/></svg>
            </div>
          </motion.div>
        )}

        {/* Daily Discovery */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          style={{ margin: '14px 20px 0', background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)', borderRadius: '14px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px 0' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--gold-muted)' }}>
              {<CategoryIcon category={dailyFact.category} />} Daily Discovery — {getCategoryLabel(dailyFact.category)}
            </p>
          </div>
          <div style={{ padding: '6px 18px 2px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{dailyFact.title}</h2>
          </div>
          <div style={{ padding: '0 18px 14px' }}>
            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{dailyFact.text}</p>
          </div>
          <div style={{ height: '2px', background: 'linear-gradient(to right, var(--gold), transparent)' }} />
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          style={{ margin: '14px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: "Studied", value: stats.studied, sub: `of ${stats.total}` },
            { label: "Streak", value: stats.streak, sub: stats.streak > 0 ? "days" : "start today" },
            { label: "Mastery", value: `${stats.mastery}%`, sub: "complete" },
          ].map((s, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)', borderRadius: '12px', padding: '16px 12px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--wine)' }}>{s.value}</p>
              <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{s.label}</p>
              <p style={{ fontSize: '11px', color: 'var(--text-hint)', marginTop: '1px' }}>{s.sub}</p>
            </div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ margin: '14px 20px 0', display: 'flex', gap: '8px' }}>
          <button onClick={() => router.push("/study/pick")} style={{
            flex: 1, padding: '14px 16px', background: 'var(--wine)', borderRadius: '12px', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 2px 8px rgba(123,45,59,0.2)', transition: 'transform 0.15s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 7h8M8 12h5"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Study Cards</span>
          </button>
          <button onClick={() => router.push("/quiz/pick")} style={{
            flex: 1, padding: '14px 16px', background: 'transparent', borderRadius: '12px',
            border: '1px solid rgba(123,45,59,0.15)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.15s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9 9a3 3 0 115.12 2.12L12 13m0 3.5v.5"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wine)', fontFamily: 'var(--font-body)' }}>Take Quiz</span>
          </button>
        </motion.div>

        {/* Coming Soon */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ margin: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Coming Soon</h3>
            <div style={{ flex: 1, height: '1px', background: 'rgba(123,45,59,0.08)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {comingSoon.map((f, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px',
                background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.04)',
                borderRadius: '10px', opacity: 0.55,
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(123,45,59,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {f.icon}
                </div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{f.title}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <TabBar />
    </AppShell>
  );
}

export default function SipStreakPage() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" style={{ marginBottom: '12px' }}>
            <path d="M16 6 L32 6 L29.5 22 C29.5 28 27 31 24 32.5 C21 31 18.5 28 18.5 22 Z" fill="none" stroke="#7B2D3B" strokeWidth="1.2" />
            <line x1="24" y1="32.5" x2="24" y2="39" stroke="#7B2D3B" strokeWidth="1.2" />
            <line x1="19" y1="39" x2="29" y2="39" stroke="#7B2D3B" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Decanting...</p>
        </div>
      </div>
    );
  }

  if (!session) return <AuthScreen onAuth={() => {}} />;
  return <HomeScreen />;
}
