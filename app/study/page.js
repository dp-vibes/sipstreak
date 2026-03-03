"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlashCard from "../components/FlashCard";
import AppShell from "../components/AppShell";
import TabBar from "../components/TabBar";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const pool = deckId === 'all' ? cards : getCardsByDeck(deckId);
    const ordered = getCardsForStudy(pool, deckId === 'all' ? null : [deckId]);
    setStudyCards(ordered.slice(0, 20));
  }, [deckId]);

  const handleSwipe = (correct) => {
    const card = studyCards[currentIndex];
    updateCardProgress(card.id, correct);
    const newStats = { studied: sessionStats.studied + 1, correct: sessionStats.correct + (correct ? 1 : 0) };
    setSessionStats(newStats);
    updateStreak(1, correct ? 1 : 0);
    checkAndAwardTrophies();
    if (currentIndex + 1 >= studyCards.length) setShowComplete(true);
    else setCurrentIndex(currentIndex + 1);
  };

  if (!mounted) return null;

  if (showComplete) {
    const pct = sessionStats.studied > 0 ? Math.round((sessionStats.correct / sessionStats.studied) * 100) : 0;
    return (
      <AppShell>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '16px 0 6px' }}>
            Session Complete
          </h1>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--wine)', marginBottom: '2px' }}>
            {sessionStats.correct}/{sessionStats.studied} correct ({pct}%)
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-hint)', marginBottom: '28px' }}>Keep your streak alive</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => { setCurrentIndex(0); setSessionStats({ studied: 0, correct: 0 }); setShowComplete(false); }}
              style={{ padding: '13px 24px', borderRadius: '12px', border: 'none', background: 'var(--wine)', color: '#fff', fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-body)', cursor: 'pointer', boxShadow: '0 2px 8px rgba(123,45,59,0.2)' }}>
              Study Again
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

  if (studyCards.length === 0) {
    return (
      <AppShell>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-hint)', fontSize: '14px' }}>Loading cards...</p>
        </div>
      </AppShell>
    );
  }

  const card = studyCards[currentIndex];
  const progress = getProgress();
  const masteryLevel = progress[card.id]?.masteryLevel || 0;

  return (
    <AppShell>
      <div style={{ minHeight: '100vh', padding: '48px 20px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <div style={{ width: '100%', maxWidth: '380px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <button onClick={() => router.push('/study/pick')} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            fontSize: '13px', fontWeight: 500, color: 'var(--wine)', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-hint)' }}>
            {currentIndex + 1} / {studyCards.length}
          </span>
          <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--sage)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            {sessionStats.correct}
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ width: '100%', maxWidth: '380px', height: '3px', borderRadius: '2px', background: 'rgba(123,45,59,0.08)', marginBottom: '24px', overflow: 'hidden' }}>
          <div style={{ height: '100%', borderRadius: '2px', width: `${(currentIndex / studyCards.length) * 100}%`, background: 'var(--wine)', transition: 'width 0.3s' }} />
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div key={card.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
            style={{ width: '100%', maxWidth: '380px' }}>
            <FlashCard card={card} onSwipe={handleSwipe} masteryLevel={masteryLevel} />
          </motion.div>
        </AnimatePresence>

        <p style={{ marginTop: '20px', fontSize: '12px', color: 'var(--text-hint)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          swipe left if unsure · swipe right if you know it
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </p>
      </div>
      <TabBar />
    </AppShell>
  );
}

export default function StudyPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}><p style={{ color: 'var(--text-hint)' }}>Loading...</p></div>}>
      <StudyContent />
    </Suspense>
  );
}
