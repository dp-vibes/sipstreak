"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { decks, deckEmojis, getCardsByDeck } from "../data/cards";
import { getProgress } from "../utils/storage";

export default function DeckPicker({ mode = "study", themeColors }) {
  const router = useRouter();
  const [progress, setProgressData] = useState({});

  useEffect(() => { setProgressData(getProgress()); }, []);

  const getDeckStats = (deckId) => {
    const deckCards = getCardsByDeck(deckId);
    const studied = deckCards.filter(c => progress[c.id]?.timesSeen > 0).length;
    const mastered = deckCards.filter(c => (progress[c.id]?.masteryLevel || 0) >= 5).length;
    return { total: deckCards.length, studied, mastered };
  };

  const handleSelect = (deckId) => {
    if (mode === "study") router.push(`/study?deck=${deckId}`);
    else router.push(`/quiz?deck=${deckId}`);
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-12 pb-8" style={{ background: '#F5F0EB' }}>
      <button onClick={() => router.push('/')}
        className="self-start mb-6 text-sm font-medium flex items-center gap-1" style={{ color: '#722F37' }}>
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
        {mode === "study" ? "Choose a Deck" : "Choose a Quiz"}
      </h1>
      <p className="text-sm mb-8" style={{ color: '#8C8279' }}>
        {mode === "study" ? "Pick a deck to study" : "Pick a deck to quiz yourself"}
      </p>

      <div className="w-full max-w-sm flex flex-col gap-3">
        {/* All Cards option */}
        <motion.button whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('all')}
          className="flex items-center gap-4 p-4 rounded-2xl border text-left shadow-sm transition-all"
          style={{ background: 'white', borderColor: '#722F3720' }}>
          <span className="text-3xl">🍷</span>
          <div className="flex-1">
            <div className="font-semibold text-lg" style={{ color: '#2C1A2E' }}>All Cards</div>
            <div className="text-sm" style={{ color: '#8C8279' }}>Study everything</div>
          </div>
          <div className="text-sm" style={{ color: '#8C8279' }}>→</div>
        </motion.button>

        {decks.map((deck) => {
          const stats = getDeckStats(deck.id);
          const pct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;
          return (
            <motion.button key={deck.id} whileTap={{ scale: 0.98 }}
              onClick={() => handleSelect(deck.id)}
              className="flex items-center gap-4 p-4 rounded-2xl border text-left shadow-sm transition-all"
              style={{ background: 'white', borderColor: '#722F3720' }}>
              <span className="text-3xl">{deckEmojis[deck.id] || '🍷'}</span>
              <div className="flex-1">
                <div className="font-semibold" style={{ color: '#2C1A2E' }}>{deck.name}</div>
                <div className="text-xs" style={{ color: '#8C8279' }}>
                  {stats.studied}/{stats.total} studied • {pct}% mastered
                </div>
                {/* Progress bar */}
                <div className="mt-1.5 h-1.5 rounded-full overflow-hidden" style={{ background: '#722F3715' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: '#722F37' }} />
                </div>
              </div>
              <div className="text-sm" style={{ color: '#8C8279' }}>→</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
