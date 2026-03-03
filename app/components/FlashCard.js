"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function FlashCard({ card, onSwipe, masteryLevel = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const greenOpacity = useTransform(x, [0, 60, 150], [0, 0.15, 0.6]);
  const redOpacity = useTransform(x, [-150, -60, 0], [0.6, 0.15, 0]);

  const handleDragEnd = (_, info) => {
    if (swiped) return;
    const threshold = 80;
    if (info.offset.x > threshold || info.velocity.x > 500) { setSwiped(true); onSwipe(true); }
    else if (info.offset.x < -threshold || info.velocity.x < -500) { setSwiped(true); onSwipe(false); }
  };

  if (swiped) return null;

  const deckLabel = card.deckId === 'major-grapes' ? 'Grape Variety'
    : card.deckId === 'wine-vocab' ? 'Wine Vocabulary' : 'Wine Basics';

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto' }}>
      <motion.div
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.7}
        onDragEnd={handleDragEnd} style={{ x, rotate, touchAction: 'none', cursor: 'grab' }}
      >
        {/* Swipe overlays */}
        <motion.div style={{ opacity: greenOpacity, position: 'absolute', inset: 0, borderRadius: '16px', zIndex: 10, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', border: '3px solid var(--sage)', background: 'rgba(86,122,76,0.1)' }} />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
        </motion.div>
        <motion.div style={{ opacity: redOpacity, position: 'absolute', inset: 0, borderRadius: '16px', zIndex: 10, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: '16px', border: '3px solid var(--wine)', background: 'rgba(123,45,59,0.1)' }} />
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </motion.div>

        {/* Card */}
        <div onClick={() => setIsFlipped(!isFlipped)} style={{
          position: 'relative', width: '100%', borderRadius: '16px',
          border: '1px solid rgba(123,45,59,0.08)',
          padding: '24px 20px', minHeight: '340px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: 'var(--bg-card)',
          boxShadow: '0 4px 20px rgba(44,44,44,0.06)',
          userSelect: 'none', overflow: 'hidden',
        }}>
          {/* Level badge */}
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
            background: 'rgba(123,45,59,0.06)', color: 'var(--wine)',
          }}>
            Lv.{masteryLevel}
          </div>

          {!isFlipped ? (
            /* ── FRONT: Question only ── */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px' }}>
              <p style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--text-hint)',
              }}>
                {deckLabel}
              </p>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--wine)',
                fontSize: card.frontText.length > 20 ? '22px' : card.frontText.length > 14 ? '26px' : '30px',
                lineHeight: 1.2, padding: '0 8px',
              }}>
                {card.frontText}
              </h2>
              {card.hint && masteryLevel < 3 && (
                <p style={{
                  fontSize: '12px', color: 'var(--gold-muted)', fontStyle: 'italic',
                  padding: '6px 14px', borderRadius: '20px', background: 'rgba(201,169,110,0.08)',
                }}>
                  {card.hint}
                </p>
              )}
              <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-hint)', fontSize: '12px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 15l-6-6M9 9v6h6"/></svg>
                tap to reveal
              </div>
            </div>
          ) : (
            /* ── BACK: Answer ── */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{
                fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
                color: 'var(--gold-muted)', marginBottom: '4px',
              }}>
                {card.frontText}
              </p>
              <div style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--text-primary)' }}>
                {card.backText}
              </div>
              {card.extraData?.pronunciation && (
                <div style={{ borderTop: '1px solid rgba(123,45,59,0.06)', paddingTop: '10px', marginTop: '4px' }}>
                  <p style={{ fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text-hint)', marginBottom: '2px' }}>Pronunciation</p>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--wine)' }}>{card.extraData.pronunciation}</p>
                </div>
              )}
            </div>
          )}

          {/* Bottom accent */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: isFlipped ? 'linear-gradient(to right, var(--gold), transparent)' : 'transparent' }} />
        </div>
      </motion.div>
    </div>
  );
}
