"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cards, getCardsByDeck } from "../data/cards";
import { getProgress, updateCardProgress, updateStreak, checkAndAwardTrophies, checkQuizStreak } from "../utils/storage";

function QuizContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deckId = searchParams.get('deck') || 'all';

  const [quizCards, setQuizCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [stats, setStats] = useState({ studied: 0, correct: 0 });
  const [showComplete, setShowComplete] = useState(false);
  const [quizStreak, setQuizStreak] = useState(0);

  useEffect(() => {
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizCards(shuffled);
  }, [deckId]);

  useEffect(() => {
    if (quizCards.length > 0 && currentIndex < quizCards.length) {
      generateOptions(quizCards[currentIndex]);
    }
  }, [currentIndex, quizCards]);

  const generateOptions = (correctCard) => {
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const others = pool.filter(c => c.id !== correctCard.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [
      { text: correctCard.backText.split('.')[0].split('\n')[0].substring(0, 80), isCorrect: true, cardId: correctCard.id },
      ...shuffledOthers.map(c => ({
        text: c.backText.split('.')[0].split('\n')[0].substring(0, 80),
        isCorrect: false,
        cardId: c.id,
      })),
    ].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleSelect = (option, idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setIsCorrect(option.isCorrect);
    const card = quizCards[currentIndex];
    updateCardProgress(card.id, option.isCorrect);
    updateStreak(1, option.isCorrect ? 1 : 0);
    const streakResult = checkQuizStreak(option.isCorrect);
    setQuizStreak(streakResult.streak);
    checkAndAwardTrophies();
    setStats(prev => ({
      studied: prev.studied + 1,
      correct: prev.correct + (option.isCorrect ? 1 : 0),
    }));

    setTimeout(() => {
      if (currentIndex + 1 >= quizCards.length) {
        setShowComplete(true);
      } else {
        setCurrentIndex(currentIndex + 1);
        setSelected(null);
        setIsCorrect(null);
      }
    }, 1200);
  };

  if (showComplete) {
    const pct = stats.studied > 0 ? Math.round((stats.correct / stats.studied) * 100) : 0;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: '#F5F0EB' }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-6xl mb-4">
          {pct >= 80 ? '🏆' : pct >= 60 ? '🍷' : '📚'}
        </motion.div>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
          {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Nice work!' : 'Keep studying!'}
        </h1>
        <p className="text-lg mb-1" style={{ color: '#722F37' }}>
          {stats.correct}/{stats.studied} correct ({pct}%)
        </p>
        <p className="text-sm mb-8" style={{ color: '#8C8279' }}>
          {pct >= 90 ? "You're becoming a sommelier! 🔥" : pct >= 70 ? "Your palate is developing!" : "Practice makes perfect!"}
        </p>
        <div className="flex gap-3">
          <button onClick={() => { setCurrentIndex(0); setStats({ studied: 0, correct: 0 }); setShowComplete(false); setSelected(null); setIsCorrect(null); }}
            className="px-6 py-3 rounded-xl font-semibold text-white shadow-md" style={{ background: '#722F37' }}>
            Quiz Again
          </button>
          <button onClick={() => router.push('/')}
            className="px-6 py-3 rounded-xl font-semibold border shadow-sm" style={{ color: '#722F37', borderColor: '#722F3730', background: 'white' }}>
            Home
          </button>
        </div>
      </div>
    );
  }

  if (quizCards.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen" style={{ background: '#F5F0EB' }}>
        <div className="text-4xl">🍷</div>
      </div>
    );
  }

  const card = quizCards[currentIndex];

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-8 pb-8" style={{ background: '#F5F0EB' }}>
      <div className="w-full max-w-sm flex items-center justify-between mb-6">
        <button onClick={() => router.push('/quiz/pick')} className="text-sm font-medium" style={{ color: '#722F37' }}>← Back</button>
        <div className="text-sm font-medium" style={{ color: '#8C8279' }}>{currentIndex + 1}/{quizCards.length}</div>
        {quizStreak >= 3 && <div className="text-sm" style={{ color: '#C9A96E' }}>🔥 {quizStreak}</div>}
      </div>

      <div className="w-full max-w-sm h-1.5 rounded-full mb-8" style={{ background: '#722F3715' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${(currentIndex / quizCards.length) * 100}%`, background: '#722F37' }} />
      </div>

      {/* Question */}
      <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm mb-6">
        <div className="text-xs uppercase tracking-[0.2em] mb-2 text-center" style={{ color: '#8C8279' }}>What is this?</div>
        <div className="text-center text-2xl font-bold px-4" style={{ fontFamily: "'Playfair Display', serif", color: '#722F37' }}>
          {card.frontText}
        </div>
      </motion.div>

      {/* Options */}
      <div className="w-full max-w-sm flex flex-col gap-3">
        {options.map((option, idx) => {
          let bg = 'white';
          let border = '#722F3720';
          let textColor = '#2C1A2E';
          if (selected !== null) {
            if (option.isCorrect) { bg = '#5C7A5215'; border = '#5C7A52'; textColor = '#5C7A52'; }
            else if (idx === selected && !option.isCorrect) { bg = '#722F3715'; border = '#722F37'; textColor = '#722F37'; }
          }
          return (
            <motion.button key={idx} whileTap={selected === null ? { scale: 0.98 } : {}}
              onClick={() => handleSelect(option, idx)}
              className="w-full p-4 rounded-xl border text-left text-sm leading-relaxed transition-all shadow-sm"
              style={{ background: bg, borderColor: border, color: textColor }}>
              {option.text}
              {selected !== null && option.isCorrect && <span className="float-right">✅</span>}
              {selected === idx && !option.isCorrect && <span className="float-right">❌</span>}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen" style={{ background: '#F5F0EB' }}><div className="text-4xl">🍷</div></div>}>
      <QuizContent />
    </Suspense>
  );
}
