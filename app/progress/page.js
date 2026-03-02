"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cards, decks, deckEmojis, getCardsByDeck } from "../data/cards";
import { getProgress, getStreak, getMasteryPhaseLabel } from "../utils/storage";

export default function ProgressPage() {
  const router = useRouter();
  const [progress, setProgressData] = useState({});
  const [streak, setStreakData] = useState({ current: 0, longest: 0, totalStudied: 0, totalCorrect: 0 });

  useEffect(() => {
    setProgressData(getProgress());
    setStreakData(getStreak());
  }, []);

  const totalCards = cards.length;
  const studied = Object.values(progress).filter(p => p.timesSeen > 0).length;
  const mastered = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 5).length;
  const maxLevel = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 10).length;
  const accuracy = streak.totalStudied > 0 ? Math.round((streak.totalCorrect / streak.totalStudied) * 100) : 0;

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-12 pb-8" style={{ background: '#F5F0EB' }}>
      <button onClick={() => router.push('/')}
        className="self-start mb-6 text-sm font-medium" style={{ color: '#722F37' }}>← Back</button>

      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
        📊 Your Progress
      </h1>

      {/* Overview stats */}
      <div className="w-full max-w-sm grid grid-cols-2 gap-3 mb-6">
        {[
          { label: "Cards Studied", value: studied, sub: `of ${totalCards}` },
          { label: "Mastered", value: mastered, sub: "Level 5+" },
          { label: "Max Level", value: maxLevel, sub: "Level 10" },
          { label: "Accuracy", value: `${accuracy}%`, sub: `${streak.totalCorrect}/${streak.totalStudied}` },
        ].map(stat => (
          <div key={stat.label} className="p-4 rounded-xl border shadow-sm text-center"
            style={{ background: 'white', borderColor: '#722F3715' }}>
            <div className="text-2xl font-bold" style={{ color: '#722F37' }}>{stat.value}</div>
            <div className="text-xs" style={{ color: '#8C8279' }}>{stat.label}</div>
            <div className="text-xs" style={{ color: '#C9A96E' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Per-deck breakdown */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {decks.map(deck => {
          const deckCards = getCardsByDeck(deck.id);
          const deckStudied = deckCards.filter(c => progress[c.id]?.timesSeen > 0).length;
          const deckMastered = deckCards.filter(c => (progress[c.id]?.masteryLevel || 0) >= 5).length;
          const pct = deckCards.length > 0 ? Math.round((deckMastered / deckCards.length) * 100) : 0;
          return (
            <div key={deck.id} className="p-4 rounded-xl border shadow-sm"
              style={{ background: 'white', borderColor: '#722F3715' }}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{deckEmojis[deck.id]}</span>
                <div className="flex-1">
                  <div className="font-semibold" style={{ color: '#2C1A2E' }}>{deck.name}</div>
                  <div className="text-xs" style={{ color: '#8C8279' }}>
                    {deckStudied}/{deckCards.length} studied • {deckMastered} mastered
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color: '#722F37' }}>{pct}%</div>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: '#722F3710' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full" style={{ background: '#722F37' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
