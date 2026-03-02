"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlashCard from "../components/FlashCard";
import { cards, getCardsByDeck } from "../data/cards";
import { getProgress, updateCardProgress, updateStreak, getCardsForStudy, checkAndAwardTrophies } from "../utils/storage";

function StudyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deck') || 'all';

  const [studyCards, setStudyCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState({ studied: 0, correct: 0 });
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const ordered = getCardsForStudy(pool, deckId === 'all' ? null : [deckId]);
    setStudyCards(ordered.slice(0, 20)); // 20 cards per session
  }, [deckId]);

  const handleSwipe = (correct) => {
    const card = studyCards[currentIndex];
    updateCardProgress(card.id, correct);
    const newStats = {
      studied: sessionStats.studied + 1,
      correct: sessionStats.correct + (correct ? 1 : 0),
    };
    setSessionStats(newStats);
    updateStreak(1, correct ? 1 : 0);
    checkAndAwardTrophies();

    if (currentIndex + 1 >= studyCards.length) {
      setShowComplete(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (showComplete) {
    const pct = sessionStats.studied > 0 ? Math.round((sessionStats.correct / sessionStats.studied) * 100) : 0;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: '#F5F0EB' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">🍷</motion.div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
          Session Complete!
        </h1>
        <p className="text-lg mb-1" style={{ color: '#722F37' }}>
          {sessionStats.correct}/{sessionStats.studied} correct ({pct}%)
        </p>
        <p className="text-sm mb-8" style={{ color: '#8C8279' }}>Keep your streak alive! 🔥</p>
        <div className="flex gap-3">
          <button onClick={() => { setCurrentIndex(0); setSessionStats({ studied: 0, correct: 0 }); setShowComplete(false); }}
            className="px-6 py-3 rounded-xl font-semibold text-white shadow-md"
            style={{ background: '#722F37' }}>
            Study Again
          </button>
          <button onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold border shadow-sm"
            style={{ color: '#722F37', borderColor: '#722F3730', background: 'white' }}>
            Home
          </button>
        </div>
      </div>
    );
  }

  if (studyCards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: '#F5F0EB' }}>
        <div className="text-4xl mb-4">🍷</div>
        <p style={{ color: '#8C8279' }}>Loading cards...</p>
      </div>
    );
  }

  const card = studyCards[currentIndex];
  const progress = getProgress();
  const masteryLevel = progress[card.id]?.masteryLevel || 0;

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-8 pb-8" style={{ background: '#F5F0EB' }}>
      {/* Header */}
      <div className="w-full max-w-sm flex items-center justify-between mb-6">
        <button onClick={() => router.push('/study/pick')} className="text-sm font-medium" style={{ color: '#722F37' }}>← Back</button>
        <div className="text-sm font-medium" style={{ color: '#8C8279' }}>
          {currentIndex + 1}/{studyCards.length}
        </div>
        <div className="text-sm" style={{ color: '#5C7A52' }}>
          ✓ {sessionStats.correct}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-sm h-1.5 rounded-full mb-6" style={{ background: '#722F3715' }}>
        <div className="h-full rounded-full transition-all" style={{
          width: `${((currentIndex) / studyCards.length) * 100}%`,
          background: '#722F37',
        }} />
      </div>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div key={card.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
          className="w-full max-w-sm">
          <FlashCard card={card} onSwipe={handleSwipe} masteryLevel={masteryLevel} />
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 text-xs text-center" style={{ color: '#8C8279' }}>
        ← swipe left if unsure • swipe right if you know it →
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen" style={{ background: '#F5F0EB' }}><div className="text-4xl">🍷</div></div>}>
      <StudyContent />
    </Suspense>
  );
}
