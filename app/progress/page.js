"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cards, decks, getCardsByDeck } from "../data/cards";
import { getProgress, getStreak } from "../utils/storage";
import AppShell from "../components/AppShell";
import TabBar from "../components/TabBar";

const deckIcons = {
  'wine-basics': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>,
  'major-grapes': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><circle cx="10" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><circle cx="13" cy="15" r="3"/><path d="M13 4V2M11 3l-2-1M15 3l2-1"/></svg>,
  'wine-vocab': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/></svg>,
};

export default function ProgressPage() {
  const router = useRouter();
  const [progress, setProgressData] = useState({});
  const [streak, setStreakData] = useState({ current: 0, longest: 0, totalStudied: 0, totalCorrect: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); setProgressData(getProgress()); setStreakData(getStreak()); }, []);

  if (!mounted) return null;

  const studied = Object.values(progress).filter(p => p.timesSeen > 0).length;
  const mastered = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 5).length;
  const maxLevel = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 10).length;
  const accuracy = streak.totalStudied > 0 ? Math.round((streak.totalCorrect / streak.totalStudied) * 100) : 0;

  return (
    <AppShell>
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ padding: '48px 20px 0' }}>
          <button onClick={() => router.push('/')} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '16px',
            fontSize: '13px', fontWeight: 500, color: 'var(--wine)', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Your Progress</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)' }}>Track your wine knowledge journey</p>
        </div>

        {/* Stats grid */}
        <div style={{ padding: '16px 20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {[
            { label: "Cards Studied", value: studied, sub: `of ${cards.length}` },
            { label: "Mastered", value: mastered, sub: "Level 5+" },
            { label: "Max Level", value: maxLevel, sub: "Level 10" },
            { label: "Accuracy", value: `${accuracy}%`, sub: `${streak.totalCorrect}/${streak.totalStudied}` },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '16px 14px', borderRadius: '14px', textAlign: 'center',
              background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)',
            }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, color: 'var(--wine)' }}>{s.value}</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{s.label}</p>
              <p style={{ fontSize: '11px', color: 'var(--gold-muted)' }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Per-deck */}
        <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>By Deck</h3>
            <div style={{ flex: 1, height: '1px', background: 'rgba(123,45,59,0.08)' }} />
          </div>
          {decks.map((deck, i) => {
            const deckCards = getCardsByDeck(deck.id);
            const deckStudied = deckCards.filter(c => progress[c.id]?.timesSeen > 0).length;
            const deckMastered = deckCards.filter(c => (progress[c.id]?.masteryLevel || 0) >= 5).length;
            const pct = deckCards.length > 0 ? Math.round((deckMastered / deckCards.length) * 100) : 0;
            return (
              <motion.div key={deck.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                style={{ padding: '14px 16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(123,45,59,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {deckIcons[deck.id] || deckIcons['wine-basics']}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{deck.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-hint)' }}>{deckStudied}/{deckCards.length} studied · {deckMastered} mastered</p>
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--wine)', fontFamily: 'var(--font-display)' }}>{pct}%</p>
                </div>
                <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(123,45,59,0.08)', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                    style={{ height: '100%', borderRadius: '2px', background: 'var(--wine)' }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <TabBar />
    </AppShell>
  );
}
