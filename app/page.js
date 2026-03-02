"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "./components/AuthContext";
import AuthScreen from "./components/AuthScreen";
import TabBar from "./components/TabBar";
import { storage } from "./utils/storage";
import { allCards } from "./data/cards";

/* ── Daily wine facts ─────────────────────────────────── */
const wineFacts = [
  { title: "The Oldest Winery", text: "The world's oldest known winery, dating back to 4100 BC, was discovered in Armenia — over 6,000 years of winemaking history.", category: "History" },
  { title: "Why We Swirl", text: "Swirling wine in your glass isn't pretentious — it releases volatile aroma compounds called esters, letting you smell more of the wine's complexity.", category: "Technique" },
  { title: "Red vs White", text: "Red wine gets its color from grape skins left in contact during fermentation. White wine is pressed immediately, separating juice from skins.", category: "Basics" },
  { title: "The Judgment of Paris", text: "In 1976, California wines beat France's best in a blind tasting — shocking the wine world and putting Napa Valley on the map forever.", category: "History" },
  { title: "Terroir Matters", text: "The same grape variety planted in different soils, climates, and altitudes produces dramatically different wines. The French call this 'terroir.'", category: "Regions" },
  { title: "Tannin Touch", text: "That dry, grippy feeling in your mouth from red wine? Those are tannins — natural compounds from grape skins, seeds, and oak barrels.", category: "Tasting" },
  { title: "Champagne Pressure", text: "A bottle of Champagne has about 90 PSI of pressure — roughly three times the pressure in a car tire. Handle with care.", category: "Fun Facts" },
];

function getDailyFact() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return wineFacts[dayOfYear % wineFacts.length];
}

/* ── Home screen ──────────────────────────────────────── */
function HomeScreen() {
  const router = useRouter();
  const { session } = useAuth();
  const [stats, setStats] = useState({ studied: 0, total: 0, streak: 0, mastery: 0 });
  const [timeOfDay, setTimeOfDay] = useState("evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");

    // Load stats
    const progress = storage.getProgress();
    const studied = Object.keys(progress).length;
    const total = allCards.length;
    const streakData = storage.getStreak();
    const mastered = Object.values(progress).filter(p => p.level >= 5).length;
    setStats({
      studied,
      total,
      streak: streakData.current || 0,
      mastery: total > 0 ? Math.round((mastered / total) * 100) : 0,
    });
  }, []);

  const greeting = timeOfDay === "morning" ? "Good morning" : timeOfDay === "afternoon" ? "Good afternoon" : "Good evening";
  const userName = session?.user?.user_metadata?.full_name?.split(" ")[0] || "";
  const dailyFact = getDailyFact();

  const comingSoonFeatures = [
    { icon: "📓", title: "Wine Journal", desc: "Log tasting notes for every bottle", phase: "Phase 2" },
    { icon: "📸", title: "Bottle Scanner", desc: "Point, scan, and learn about any wine", phase: "Phase 2" },
    { icon: "🧠", title: "AI Sommelier", desc: "Your personal wine recommendation engine", phase: "Phase 3" },
    { icon: "🏠", title: "My Cellar", desc: "Track your collection and drink windows", phase: "Phase 3" },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ padding: '52px 24px 0' }}>
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'var(--font-body)', marginBottom: '4px' }}>
            {greeting}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {userName ? `${userName}'s SipStreak` : 'SipStreak'}
          </h1>
        </motion.div>
      </div>

      {/* Streak banner */}
      {stats.streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            margin: '16px 24px 0',
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #7B2D3B 0%, #5C1E2B 100%)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '2px' }}>Current streak</p>
            <p style={{ fontSize: '22px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>
              {stats.streak} {stats.streak === 1 ? 'day' : 'days'} 🔥
            </p>
          </div>
          <div style={{ fontSize: '36px' }}>🍷</div>
        </motion.div>
      )}

      {/* Daily Wine Fact — editorial card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          margin: '20px 24px 0',
          background: 'var(--bg-card)',
          border: '1px solid rgba(123, 45, 59, 0.06)',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Category tag */}
        <div style={{
          padding: '16px 20px 0',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: 'var(--gold-muted)',
            fontFamily: 'var(--font-body)',
          }}>
            ✦ Daily Discovery — {dailyFact.category}
          </div>
        </div>
        {/* Headline */}
        <div style={{ padding: '8px 20px 4px' }}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
          }}>
            {dailyFact.title}
          </h2>
        </div>
        {/* Body */}
        <div style={{ padding: '0 20px 18px' }}>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
          }}>
            {dailyFact.text}
          </p>
        </div>
        {/* Thin gold accent line at bottom */}
        <div style={{ height: '2px', background: 'linear-gradient(to right, var(--gold), transparent)' }} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          margin: '20px 24px 0',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '10px',
        }}
      >
        {[
          { label: "Cards Studied", value: stats.studied, sub: `of ${stats.total}` },
          { label: "Day Streak", value: stats.streak, sub: stats.streak > 0 ? "keep going!" : "start today" },
          { label: "Mastery", value: `${stats.mastery}%`, sub: "cards mastered" },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(123, 45, 59, 0.06)',
            borderRadius: '14px',
            padding: '16px 12px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--wine)', marginBottom: '2px' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1px', letterSpacing: '0.2px' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '10px', color: 'var(--text-hint)' }}>{stat.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Continue Learning CTA */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ margin: '20px 24px 0' }}
      >
        <button
          onClick={() => router.push("/study/pick")}
          style={{
            width: '100%',
            padding: '18px 20px',
            background: 'var(--wine)',
            borderRadius: '14px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 16px rgba(123, 45, 59, 0.2)',
            transition: 'transform 0.15s',
          }}
        >
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
              Continue Learning
            </p>
            <p style={{ fontSize: '17px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-display)' }}>
              Study Flashcards →
            </p>
          </div>
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '22px',
          }}>
            🃏
          </div>
        </button>

        {/* Quiz secondary button */}
        <button
          onClick={() => router.push("/quiz/pick")}
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '14px 20px',
            background: 'transparent',
            borderRadius: '14px',
            border: '1px solid rgba(123, 45, 59, 0.15)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.15s',
          }}
        >
          <span style={{ fontSize: '16px' }}>🧪</span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wine)', fontFamily: 'var(--font-body)' }}>
            Test Your Knowledge
          </span>
        </button>
      </motion.div>

      {/* Coming Soon — section header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ margin: '32px 24px 0' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}>
            Coming Soon
          </h3>
          <div style={{ flex: 1, height: '1px', background: 'rgba(123, 45, 59, 0.08)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {comingSoonFeatures.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.05 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid rgba(123, 45, 59, 0.06)',
                borderRadius: '14px',
                padding: '16px',
                opacity: 0.65,
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{feature.icon}</div>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontFamily: 'var(--font-display)' }}>
                {feature.title}
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-hint)', lineHeight: 1.4 }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer breathing room */}
      <div style={{ height: '20px' }} />

      {/* Tab bar */}
      <TabBar />
    </div>
  );
}

/* ── Root page ────────────────────────────────────────── */
export default function SipStreakPage() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-primary)',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🍷</div>
          <p style={{ fontSize: '14px', color: 'var(--text-hint)', fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>
            Decanting...
          </p>
        </div>
      </div>
    );
  }

  if (!session) return <AuthScreen onAuth={() => {}} />;
  return <HomeScreen />;
}
