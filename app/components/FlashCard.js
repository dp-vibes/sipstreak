"use client";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getMasteryPhase } from "../utils/storage";

export default function FlashCard({ card, onSwipe, themeColors, masteryLevel = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [swiped, setSwiped] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const greenOpacity = useTransform(x, [0, 60, 150], [0, 0.2, 0.7]);
  const redOpacity = useTransform(x, [-150, -60, 0], [0.7, 0.2, 0]);

  const handleDragEnd = (_, info) => {
    if (swiped) return;
    const threshold = 80;
    if (info.offset.x > threshold || info.velocity.x > 500) { setSwiped(true); onSwipe(true); }
    else if (info.offset.x < -threshold || info.velocity.x < -500) { setSwiped(true); onSwipe(false); }
  };

  if (swiped) return null;

  return (
    <div className="relative w-full max-w-sm mx-auto" ref={constraintsRef}>
      <motion.div
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.7}
        onDragEnd={handleDragEnd} style={{ x, rotate }}
        className="relative cursor-grab active:cursor-grabbing touch-none"
      >
        <motion.div style={{ opacity: greenOpacity }}
          className="absolute inset-0 rounded-3xl z-10 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl border-4 border-[#5C7A52]" style={{ background: "rgba(92,122,82,0.15)" }} />
          <span className="text-6xl">✅</span>
        </motion.div>
        <motion.div style={{ opacity: redOpacity }}
          className="absolute inset-0 rounded-3xl z-10 pointer-events-none flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl border-4 border-[#722F37]" style={{ background: "rgba(114,47,55,0.15)" }} />
          <span className="text-6xl">❌</span>
        </motion.div>

        <div onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full rounded-3xl border p-6 min-h-[380px] flex flex-col justify-center select-none overflow-hidden shadow-lg"
          style={{ background: '#FFFDF9', borderColor: '#722F37' + '20' }}>
          
          {!isFlipped ? (
            <div className="flex flex-col items-center text-center gap-4">
              <div className="text-xs uppercase tracking-[0.2em] font-medium" style={{ color: '#8C8279' }}>
                {card.deckId === 'major-grapes' ? '🍇 Grape Variety' : card.deckId === 'wine-vocab' ? '📝 Wine Term' : '🍷 Wine Basics'}
              </div>
              <div className="font-bold break-words w-full px-2" style={{
                fontFamily: "'Playfair Display', serif",
                color: '#722F37',
                fontSize: card.frontText.length > 20 ? "1.5rem" : card.frontText.length > 14 ? "1.875rem" : "2.25rem",
                lineHeight: 1.2,
              }}>
                {card.frontText}
              </div>
              {card.hint && masteryLevel < 3 && (
                <div className="text-xs px-3 py-1.5 rounded-full" style={{ background: '#C9A96E20', color: '#C9A96E' }}>
                  💡 {card.hint}
                </div>
              )}
              <div className="text-sm mt-4 flex items-center gap-1" style={{ color: '#8C8279' }}>
                <span className="opacity-60">tap to reveal</span> <span>👆</span>
              </div>
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: '#722F3715', color: '#722F37' }}>
                Lv.{masteryLevel}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="text-sm leading-relaxed" style={{ color: '#2C1A2E' }}>
                {card.backText}
              </div>
              {card.extraData?.pronunciation && (
                <div className="border-t pt-2" style={{ borderColor: '#722F3715' }}>
                  <div className="text-xs uppercase tracking-wider mb-0.5" style={{ color: '#8C8279' }}>Pronunciation</div>
                  <div className="text-sm italic" style={{ color: '#722F37' }}>{card.extraData.pronunciation}</div>
                </div>
              )}
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: '#722F3715', color: '#722F37' }}>
                Lv.{masteryLevel}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
