"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function formatBackText(text) {
  const lines = text.split('\n').filter(l => l.trim());
  return lines.map((line, i) => {
    const parts = [];
    let remaining = line;
    let key = 0;
    while (remaining.includes('**')) {
      const start = remaining.indexOf('**');
      if (start > 0) parts.push(<span key={key++} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)' }}>{remaining.slice(0, start)}</span>);
      remaining = remaining.slice(start + 2);
      const end = remaining.indexOf('**');
      if (end === -1) { parts.push(<span key={key++}>**{remaining}</span>); remaining = ''; break; }
      parts.push(<span key={key++} style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--wine)', fontSize: '12px', letterSpacing: '0.3px' }}>{remaining.slice(0, end)}</span>);
      remaining = remaining.slice(end + 2);
    }
    if (remaining) parts.push(<span key={key++} style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-primary)' }}>{remaining}</span>);
    return <p key={i} style={{ marginBottom: i < lines.length - 1 ? '10px' : 0, lineHeight: 1.7 }}>{parts}</p>;
  });
}

export default function FlashCard({ card, onSwipe, masteryLevel = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const deckLabel = card.deckId === 'major-grapes' ? 'Grape Variety'
    : card.deckId === 'wine-vocab' ? 'Wine Vocabulary' : 'Wine Basics';

  // Strip emoji from hint for cleaner display on back
  const cleanHint = card.hint ? card.hint.replace(/[\u{1F300}-\u{1FAD6}\u{2600}-\u{27BF}]/gu, '').trim() : null;

  return (
    <div style={{ width: '100%', maxWidth: '380px', margin: '0 auto' }}>
      <div onClick={() => setIsFlipped(!isFlipped)} style={{
        position: 'relative', width: '100%', borderRadius: '16px',
        border: '1px solid rgba(123,45,59,0.08)',
        padding: '28px 22px', minHeight: '300px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        background: 'var(--bg-card)',
        boxShadow: '0 4px 20px rgba(44,44,44,0.06)',
        userSelect: 'none', overflow: 'hidden', cursor: 'pointer',
      }}>
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
          background: 'rgba(123,45,59,0.06)', color: 'var(--wine)',
        }}>
          Lv.{masteryLevel}
        </div>

        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div key="front" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '14px' }}>
              <p style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--text-hint)', fontFamily: 'var(--font-body)',
              }}>
                {deckLabel}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--wine)',
                fontSize: card.frontText.length > 20 ? '22px' : card.frontText.length > 14 ? '26px' : '30px',
                lineHeight: 1.25, padding: '0 4px',
              }}>
                {card.frontText}
              </h2>
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-hint)', fontSize: '12px', fontFamily: 'var(--font-body)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 15l-6-6M9 9v6h6"/></svg>
                tap to reveal
              </div>
            </motion.div>
          ) : (
            <motion.div key="back" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Card title as header */}
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700,
                color: 'var(--wine)', marginBottom: '0',
              }}>
                {card.frontText}
              </p>
              {/* Hint as subtitle */}
              {cleanHint && (
                <p style={{
                  fontSize: '13px', fontStyle: 'italic', color: 'var(--gold-muted)',
                  fontFamily: 'var(--font-body)', marginBottom: '4px',
                }}>
                  {cleanHint}
                </p>
              )}
              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(123,45,59,0.06)', margin: '2px 0' }} />
              {/* Content */}
              <div>
                {formatBackText(card.backText)}
              </div>
              {card.extraData?.pronunciation && (
                <div style={{ borderTop: '1px solid rgba(123,45,59,0.06)', paddingTop: '10px', marginTop: '4px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: '2px', fontFamily: 'var(--font-body)' }}>Pronunciation</p>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--wine)', fontFamily: 'var(--font-display)' }}>{card.extraData.pronunciation}</p>
                </div>
              )}
              <div style={{ marginTop: '8px', textAlign: 'center', fontSize: '11px', color: 'var(--text-hint)', fontFamily: 'var(--font-body)' }}>tap to flip back</div>
            </motion.div>
          )}
        </AnimatePresence>

        {isFlipped && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(to right, var(--gold), transparent)' }} />}
      </div>

      {/* Action buttons */}
      {isFlipped && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
          <button onClick={(e) => { e.stopPropagation(); onSwipe(false); }}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: '1px solid rgba(123,45,59,0.12)', background: 'var(--bg-card)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wine)', fontFamily: 'var(--font-body)' }}>Still Learning</span>
          </button>
          <button onClick={(e) => { e.stopPropagation(); onSwipe(true); }}
            style={{
              flex: 1, padding: '14px', borderRadius: '12px',
              border: 'none', background: 'var(--wine)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 2px 8px rgba(123,45,59,0.2)',
            }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-body)' }}>Got It</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
