"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { decks, getCardsByDeck, cards as allCards } from "../data/cards";
import { getProgress } from "../utils/storage";
import AppShell from "./AppShell";
import TabBar from "./TabBar";

const deckIcons = {
  'all': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><path d="M8 2L16 2L15 10C15 14 13.5 16 12 17C10.5 16 9 14 9 10Z"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>,
  'wine-basics': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l2 2"/></svg>,
  'major-grapes': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><circle cx="10" cy="10" r="3"/><circle cx="16" cy="10" r="3"/><circle cx="13" cy="15" r="3"/><path d="M13 4V2M11 3l-2-1M15 3l2-1"/></svg>,
  'wine-vocab': <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7B2D3B" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/><path d="M8 7h8M8 11h5"/></svg>,
};

export default function DeckPicker({ mode = "study" }) {
  const router = useRouter();
  const [progress, setProgressData] = useState({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); setProgressData(getProgress()); }, []);

  const getDeckStats = (deckId) => {
    const deckCards = deckId === 'all' ? allCards : getCardsByDeck(deckId);
    const studied = deckCards.filter(c => progress[c.id]?.timesSeen > 0).length;
    const mastered = deckCards.filter(c => (progress[c.id]?.masteryLevel || 0) >= 5).length;
    return { total: deckCards.length, studied, mastered };
  };

  const handleSelect = (deckId) => {
    if (mode === "study") router.push(`/study?deck=${deckId}`);
    else router.push(`/quiz?deck=${deckId}`);
  };

  if (!mounted) return null;

  const allDecks = [{ id: 'all', name: 'All Cards', description: 'Study everything' }, ...decks];

  return (
    <AppShell>
      <div style={{ paddingBottom: '80px' }}>
        {/* Header */}
        <div style={{ padding: '48px 20px 0' }}>
          <button onClick={() => router.push('/')} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '16px',
            fontSize: '13px', fontWeight: 500, color: 'var(--wine)', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {mode === "study" ? "Choose a Deck" : "Choose a Quiz"}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)' }}>
            {mode === "study" ? "Pick a deck to study" : "Test your knowledge"}
          </p>
        </div>

        {/* Deck list */}
        <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {allDecks.map((deck, i) => {
            const stats = getDeckStats(deck.id);
            const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
            return (
              <motion.button key={deck.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(deck.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '16px',
                  background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)',
                  borderRadius: '14px', cursor: 'pointer', textAlign: 'left', width: '100%',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: 'rgba(123,45,59,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {deckIcons[deck.id] || deckIcons['all']}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: '2px' }}>
                    {deck.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-hint)', marginBottom: '6px' }}>
                    {stats.studied}/{stats.total} studied · {pct}% mastered
                  </p>
                  <div style={{ height: '3px', borderRadius: '2px', background: 'rgba(123,45,59,0.08)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '2px', width: `${pct}%`, background: 'var(--wine)', transition: 'width 0.3s' }} />
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-hint)" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </motion.button>
            );
          })}
        </div>
      </div>
      <TabBar />
    </AppShell>
  );
}
