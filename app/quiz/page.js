"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cards, getCardsByDeck } from "../data/cards";
import { getProgress, updateCardProgress, updateStreak, checkAndAwardTrophies, checkQuizStreak } from "../utils/storage";
import AppShell from "../components/AppShell";
import TabBar from "../components/TabBar";

function formatOptionText(text) {
  const parts = [];
  let remaining = text;
  let key = 0;
  while (remaining.includes('**')) {
    const start = remaining.indexOf('**');
    if (start > 0) parts.push(<span key={key++}>{remaining.slice(0, start)}</span>);
    remaining = remaining.slice(start + 2);
    const end = remaining.indexOf('**');
    if (end === -1) { parts.push(<span key={key++}>**{remaining}</span>); remaining = ''; break; }
    parts.push(<span key={key++} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'inherit' }}>{remaining.slice(0, end)}</span>);
    remaining = remaining.slice(end + 2);
  }
  if (remaining) parts.push(<span key={key++}>{remaining}</span>);
  return parts.length > 0 ? parts : text;
}

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuizCards(shuffled);
  }, [deckId]);

  useEffect(() => {
    if (quizCards.length > 0 && currentIndex < quizCards.length) generateOptions(quizCards[currentIndex]);
  }, [currentIndex, quizCards]);

  const generateOptions = (correctCard) => {
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const others = pool.filter(c => c.id !== correctCard.id);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    const allOptions = [
      { text: correctCard.backText.split('.')[0].split('\n')[0].substring(0, 80), isCorrect: true, cardId: correctCard.id },
      ...shuffledOthers.map(c => ({ text: c.backText.split('.')[0].split('\n')[0].substring(0, 80), isCorrect: false, cardId: c.id })),
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
    setStats(prev => ({ studied: prev.studied + 1, correct: prev.correct + (option.isCorrect ? 1 : 0) }));
    setTimeout(() => {
      if (currentIndex + 1 >= quizCards.length) setShowComplete(true);
      else { setCurrentIndex(currentIndex + 1); setSelected(null); setIsCorrect(null); }
    }, 1200);
  };

  if (!mounted) return null;

  if (showComplete) {
    const pct = stats.studied > 0 ? Math.round((stats.correct / stats.studied) * 100) : 0;
    const icon = pct >= 80
      ? <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26Z"/></svg>
      : pct >= 60
      ? <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><path d="M8 2L16 2L15 10C15 14 13.5 16 12 17C10.5 16 9 14 9 10Z"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="9" y1="21" x2="15" y2="21"/></svg>
      : <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z"/></svg>;

    return (
      <AppShell>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>{icon}</motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '16px 0 6px' }}>
            {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Nice work!' : 'Keep studying!'}
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--wine)', marginBottom: '2px' }}>
            {stats.correct}/{stats.studied} correct ({pct}%)
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)', marginBottom: '28px' }}>
            {pct >= 90 ? "You're becoming a sommelier!" : pct >= 70 ? "Your palate is developing!" : "Practice makes perfect!"}
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setCurrentIndex(0); setStats({ studied: 0, correct: 0 }); setShowComplete(false); setSelected(null); setIsCorrect(null); }}
              style={{ padding: '13px 24px', borderRadius: '12px', border: 'none', background: 'var(--wine)', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(123,45,59,0.2)' }}>
              Quiz Again
            </button>
            <button onClick={() => router.push('/')}
              style={{ padding: '13px 24px', borderRadius: '12px', border: '1px solid rgba(123,45,59,0.15)', background: 'transparent', color: 'var(--wine)', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
              Home
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  if (quizCards.length === 0) return (
    <AppShell><div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'var(--text-hint)' }}>Loading...</p>
    </div></AppShell>
  );

  const card = quizCards[currentIndex];

  return (
    <AppShell>
      <div style={{ minHeight: '100vh', padding: '48px 20px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button onClick={() => router.push('/quiz/pick')} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '13px', fontWeight: 500, color: 'var(--wine)', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-hint)' }}>{currentIndex + 1} / {quizCards.length}</span>
          {quizStreak >= 3 && (
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C6.5 6 4 10 4 14a8 8 0 0016 0c0-4-2.5-8-8-12z"/></svg>
              {quizStreak}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: '380px', height: '3px', borderRadius: '2px', background: 'rgba(123,45,59,0.08)', marginBottom: '28px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '2px', width: `${(currentIndex / quizCards.length) * 100}%`, background: 'var(--wine)', transition: 'width 0.3s' }} />
        </div>

        {/* Question */}
        <motion.div key={card.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          style={{ width: '100%', maxWidth: '380px', textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: '8px' }}>What is this?</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--wine)', lineHeight: 1.2, padding: '0 8px' }}>{card.frontText}</h2>
        </motion.div>

        {/* Options */}
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {options.map((option, idx) => {
            let bg = 'var(--bg-card)';
            let borderColor = 'rgba(123,45,59,0.06)';
            let textColor = 'var(--text-primary)';
            let rightIcon = null;
            if (selected !== null) {
              if (option.isCorrect) {
                bg = 'rgba(86,122,76,0.06)'; borderColor = 'var(--sage)'; textColor = 'var(--sage)';
                rightIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>;
              } else if (idx === selected) {
                bg = 'rgba(123,45,59,0.06)'; borderColor = 'var(--wine)'; textColor = 'var(--wine)';
                rightIcon = <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>;
              }
            }
            return (
              <motion.button key={idx} whileTap={selected === null ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(option, idx)}
                style={{
                  width: '100%', padding: '14px 16px', borderRadius: '12px',
                  border: `1px solid ${borderColor}`, background: bg,
                  textAlign: 'left', fontSize: '14px', lineHeight: 1.6,
                  color: textColor, cursor: selected === null ? 'pointer' : 'default',
                  fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: '10px', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(44,44,44,0.04)',
                }}
              >
                <span>{formatOptionText(option.text)}</span>
                {rightIcon}
              </motion.button>
            );
          })}
        </div>
      </div>
      <TabBar />
    </AppShell>
  );
}

export default function QuizPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}><p style={{ color: 'var(--text-hint)' }}>Loading...</p></div>}>
      <QuizContent />
    </Suspense>
  );
}
