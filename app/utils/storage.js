// SipStreak localStorage utilities

const KEYS = {
  PROGRESS: 'sipstreak_progress',
  STREAK: 'sipstreak_streak',
  SETTINGS: 'sipstreak_settings',
  THEME: 'sipstreak_theme',
  DEVMODE: 'sipstreak_devmode',
  TROPHIES: 'sipstreak_trophies',
  QUIZ_STREAK: 'sipstreak_quiz_streak',
  SHARPSHOOTER_COUNT: 'sipstreak_sharpshooter_count',
};

// ==========================================
// MASTERY PHASES (Wine-themed)
// ==========================================
export function getMasteryPhase(level) {
  if (level <= 3) return "sipper";
  if (level <= 6) return "explorer";
  if (level <= 8) return "enthusiast";
  return "connoisseur";
}

export function getMasteryPhaseLabel(level) {
  const phase = getMasteryPhase(level);
  if (phase === "sipper") return "Sipper";
  if (phase === "explorer") return "Explorer";
  if (phase === "enthusiast") return "Enthusiast";
  return "Connoisseur";
}

// ==========================================
// DEV MODE
// ==========================================
export function getDevMode() {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(KEYS.DEVMODE) === 'true';
}
export function setDevMode(bool) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.DEVMODE, bool ? 'true' : 'false');
}
export function isDevMode() { return getDevMode(); }

// ==========================================
// CARD PROGRESS
// ==========================================
export function getProgress() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEYS.PROGRESS) || '{}'); } catch { return {}; }
}

export function getCardProgress(cardId) {
  const progress = getProgress();
  return progress[cardId] || { timesSeen: 0, timesCorrect: 0, masteryLevel: 0, lastSeen: null, nextReview: null };
}

export function updateCardProgress(cardId, correct) {
  const progress = getProgress();
  const current = progress[cardId] || { timesSeen: 0, timesCorrect: 0, masteryLevel: 0, lastSeen: null, nextReview: null };
  const oldLevel = current.masteryLevel;
  current.timesSeen += 1;
  if (correct) {
    current.timesCorrect += 1;
    current.masteryLevel = Math.min(10, current.masteryLevel + 1);
  } else {
    current.masteryLevel = Math.max(0, current.masteryLevel - 1);
  }
  current.lastSeen = Date.now();
  const intervals = [0, 1, 2, 3, 5, 7, 10, 14, 21, 30, 45];
  const daysUntilReview = intervals[current.masteryLevel] || 0;
  current.nextReview = Date.now() + (daysUntilReview * 24 * 60 * 60 * 1000);
  progress[cardId] = current;
  localStorage.setItem(KEYS.PROGRESS, JSON.stringify(progress));
  return { ...current, oldLevel, newLevel: current.masteryLevel, leveledUp: current.masteryLevel > oldLevel };
}

// ==========================================
// STREAK
// ==========================================
export function getStreak() {
  if (typeof window === 'undefined') return { current: 0, longest: 0, lastDate: null, totalStudied: 0, totalCorrect: 0 };
  try { return JSON.parse(localStorage.getItem(KEYS.STREAK) || '{}') || { current: 0, longest: 0, lastDate: null, totalStudied: 0, totalCorrect: 0 }; } catch { return { current: 0, longest: 0, lastDate: null, totalStudied: 0, totalCorrect: 0 }; }
}

function getDateString(date) { return new Date(date).toISOString().split('T')[0]; }

export function updateStreak(cardsStudied = 0, cardsCorrect = 0) {
  const streak = getStreak();
  const today = getDateString(Date.now());
  const lastDate = streak.lastDate;
  if (lastDate === today) { /* already studied today */ }
  else if (lastDate === getDateString(Date.now() - 86400000)) { streak.current = (streak.current || 0) + 1; }
  else if (!lastDate) { streak.current = 1; }
  else { streak.current = 1; }
  streak.lastDate = today;
  streak.longest = Math.max(streak.longest || 0, streak.current);
  streak.totalStudied = (streak.totalStudied || 0) + cardsStudied;
  streak.totalCorrect = (streak.totalCorrect || 0) + cardsCorrect;
  localStorage.setItem(KEYS.STREAK, JSON.stringify(streak));
  return streak;
}

// ==========================================
// THEMES — Wine-Themed Color Palettes
// ==========================================
export const themes = {
  cellar: {
    name: "Wine Cellar",
    colors: { '--wine': '#7B2D3B', '--wine-deep': '#5C1E2B', '--gold': '#C9A96E', '--gold-muted': '#A8905C', '--sage': '#567A4C', '--bg-primary': '#FAFAF8', '--bg-cream': '#F5F0E8', '--bg-card': '#FFFDF9', '--text-primary': '#2C2C2C', '--text-secondary': '#5A5652', '--text-hint': '#9B9590' },
    swatch: '#7B2D3B',
  },
  vineyard: {
    name: "Vineyard",
    colors: { '--wine': '#4A6741', '--wine-deep': '#385030', '--gold': '#C9A96E', '--gold-muted': '#A8905C', '--sage': '#567A4C', '--bg-primary': '#F7FAF5', '--bg-cream': '#EEF3E8', '--bg-card': '#FCFDFB', '--text-primary': '#2C2C2C', '--text-secondary': '#5A5652', '--text-hint': '#8A9585' },
    swatch: '#4A6741',
  },
  rosé: {
    name: "Rosé Garden",
    colors: { '--wine': '#C76B8A', '--wine-deep': '#A4536E', '--gold': '#D4A574', '--gold-muted': '#B8906A', '--sage': '#8BA68A', '--bg-primary': '#FFF8FA', '--bg-cream': '#FFF0F4', '--bg-card': '#FFFCFD', '--text-primary': '#3A2830', '--text-secondary': '#6A525A', '--text-hint': '#A8909A' },
    swatch: '#C76B8A',
  },
  champagne: {
    name: "Champagne",
    colors: { '--wine': '#B8860B', '--wine-deep': '#8B6508', '--gold': '#D4A843', '--gold-muted': '#B8942E', '--sage': '#8A9A6A', '--bg-primary': '#FFFDF5', '--bg-cream': '#FFF8E8', '--bg-card': '#FFFEFB', '--text-primary': '#2C2818', '--text-secondary': '#5A5440', '--text-hint': '#9A9480' },
    swatch: '#B8860B',
  },
  noir: {
    name: "Grape Noir",
    colors: { '--wine': '#C9A96E', '--wine-deep': '#A88B50', '--gold': '#8B6F47', '--gold-muted': '#7A6240', '--sage': '#6A7A5A', '--bg-primary': '#1E1A22', '--bg-cream': '#2A2530', '--bg-card': '#28232E', '--text-primary': '#F0ECE8', '--text-secondary': '#B0A8A0', '--text-hint': '#706868' },
    swatch: '#2C1A2E',
  },
};

export function getTheme() {
  try { return localStorage.getItem('sipstreak_theme') || 'cellar'; } catch { return 'cellar'; }
}

export function setTheme(key) {
  localStorage.setItem('sipstreak_theme', key);
  applyTheme(key);
}

export function applyTheme(key) {
  const theme = themes[key || 'cellar'];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme.colors).forEach(([prop, value]) => {
    root.style.setProperty(prop, value);
  });
}
export function getCurrentThemeColors() { return themes[getTheme()] || themes.cellar; }

// ==========================================
// SETTINGS
// ==========================================
export function getSettings() {
  if (typeof window === 'undefined') return { selectedDecks: null };
  try { return JSON.parse(localStorage.getItem(KEYS.SETTINGS) || '{}') || { selectedDecks: null }; } catch { return { selectedDecks: null }; }
}
export function saveSettings(settings) { localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings)); }

// ==========================================
// TROPHIES — Wine-themed tiered system
// ==========================================
export const TROPHY_TIERS = ["bronze", "silver", "gold", "diamond", "legendary"];
export const TROPHY_TIER_EMOJIS = { bronze: "🥉", silver: "🥈", gold: "🥇", diamond: "💎", legendary: "⭐" };
export const TROPHY_TIER_COLORS = { bronze: "#cd7f32", silver: "#c0c0c0", gold: "#ffd700", diamond: "#b9f2ff", legendary: "#ff6b6b" };

export const TROPHY_DEFINITIONS = [
  { id: "daily_pour", emoji: "🔥", name: "Daily Pour", tiers: [
    { tier: "bronze", requirement: 2, description: "2-day streak" },
    { tier: "silver", requirement: 7, description: "7-day streak" },
    { tier: "gold", requirement: 14, description: "14-day streak" },
    { tier: "diamond", requirement: 30, description: "30-day streak" },
    { tier: "legendary", requirement: 100, description: "100-day streak" },
  ]},
  { id: "explorer", emoji: "🗺️", name: "World Traveler", tiers: [
    { tier: "bronze", requirement: 25, description: "Study 25 cards" },
    { tier: "silver", requirement: 50, description: "Study 50 cards" },
    { tier: "gold", requirement: 100, description: "Study 100 cards" },
    { tier: "diamond", requirement: 200, description: "Study 200 cards" },
    { tier: "legendary", requirement: 300, description: "Study all cards" },
  ]},
  { id: "good_nose", emoji: "👃", name: "Good Nose", tiers: [
    { tier: "bronze", requirement: 1, description: "10 correct in a row" },
    { tier: "silver", requirement: 3, description: "3 times" },
    { tier: "gold", requirement: 5, description: "5 times" },
    { tier: "diamond", requirement: 10, description: "10 times" },
    { tier: "legendary", requirement: 25, description: "25 times" },
  ]},
  { id: "wine_master", emoji: "🏆", name: "Sommelier", tiers: [
    { tier: "bronze", requirement: 5, description: "5 cards at Level 10" },
    { tier: "silver", requirement: 25, description: "25 cards at Level 10" },
    { tier: "gold", requirement: 50, description: "50 cards at Level 10" },
    { tier: "diamond", requirement: 100, description: "100 cards at Level 10" },
    { tier: "legendary", requirement: 135, description: "All cards mastered" },
  ]},
  { id: "first_crush", emoji: "🍇", name: "First Crush", tiers: [
    { tier: "bronze", requirement: 1, description: "Complete first lesson" },
  ]},
  { id: "both_sides", emoji: "🔴", name: "Both Sides", tiers: [
    { tier: "bronze", requirement: 1, description: "Study red AND white grapes" },
  ]},
];

export function getTrophies() {
  if (typeof window === 'undefined') return {};
  try { return JSON.parse(localStorage.getItem(KEYS.TROPHIES) || '{}'); } catch { return {}; }
}

export function awardTrophy(trophyId, value = 1) {
  const trophies = getTrophies();
  const definition = TROPHY_DEFINITIONS.find(t => t.id === trophyId);
  if (!definition) return { newTrophy: false, tierUp: false };
  const current = trophies[trophyId] || null;
  const now = Date.now();
  let qualifiedTier = null;
  for (let i = definition.tiers.length - 1; i >= 0; i--) {
    if (value >= definition.tiers[i].requirement) { qualifiedTier = definition.tiers[i].tier; break; }
  }
  if (!qualifiedTier) return { newTrophy: false, tierUp: false };
  const qualifiedIndex = TROPHY_TIERS.indexOf(qualifiedTier);
  const currentIndex = current ? TROPHY_TIERS.indexOf(current.tier) : -1;
  if (qualifiedIndex <= currentIndex) { if (current) { current.count = value; trophies[trophyId] = current; localStorage.setItem(KEYS.TROPHIES, JSON.stringify(trophies)); } return { newTrophy: false, tierUp: false }; }
  const tierHistory = current?.tierHistory || {};
  tierHistory[qualifiedTier] = now;
  trophies[trophyId] = { tier: qualifiedTier, count: value, awarded: now, tierHistory };
  localStorage.setItem(KEYS.TROPHIES, JSON.stringify(trophies));
  return { newTrophy: !current, tierUp: !!current, oldTier: current?.tier || null, newTier: qualifiedTier, trophyId };
}

export function checkAndAwardTrophies() {
  const progress = getProgress();
  const streak = getStreak();
  const tierUps = [];
  const streakResult = awardTrophy("daily_pour", streak.current || 0);
  if (streakResult.newTrophy || streakResult.tierUp) tierUps.push(streakResult);
  const seenCount = Object.values(progress).filter(p => p.timesSeen > 0).length;
  const explorerResult = awardTrophy("explorer", seenCount);
  if (explorerResult.newTrophy || explorerResult.tierUp) tierUps.push(explorerResult);
  const level10Count = Object.values(progress).filter(p => (p.masteryLevel || 0) >= 10).length;
  const masterResult = awardTrophy("wine_master", level10Count);
  if (masterResult.newTrophy || masterResult.tierUp) tierUps.push(masterResult);
  if (seenCount >= 1) { const fcResult = awardTrophy("first_crush", 1); if (fcResult.newTrophy) tierUps.push(fcResult); }
  return tierUps;
}

export function checkQuizStreak(correct) {
  if (typeof window === 'undefined') return { streak: 0, newTrophy: false, tierUp: null };
  let quizStreak = parseInt(localStorage.getItem(KEYS.QUIZ_STREAK) || '0', 10);
  if (correct) { quizStreak += 1; } else { quizStreak = 0; }
  localStorage.setItem(KEYS.QUIZ_STREAK, String(quizStreak));
  let tierUp = null;
  if (quizStreak >= 10 && quizStreak % 10 === 0) {
    const count = parseInt(localStorage.getItem(KEYS.SHARPSHOOTER_COUNT) || '0', 10) + 1;
    localStorage.setItem(KEYS.SHARPSHOOTER_COUNT, String(count));
    const result = awardTrophy("good_nose", count);
    if (result.newTrophy || result.tierUp) tierUp = result;
  }
  return { streak: quizStreak, newTrophy: !!tierUp, tierUp };
}

// ==========================================
// SPACED REPETITION HELPERS
// ==========================================
export function getCardsForStudy(allCards, selectedDecks = null) {
  let pool = allCards;
  if (selectedDecks && selectedDecks.length > 0) {
    pool = allCards.filter(c => selectedDecks.includes(c.deckId));
  }
  const progress = getProgress();
  const scored = pool.map(card => {
    const p = progress[card.id];
    let priority = 50;
    if (!p || p.timesSeen === 0) priority = 100;
    else if (p.nextReview && Date.now() >= p.nextReview) priority = 90;
    else if (p.masteryLevel <= 1) priority = 80;
    else if (p.masteryLevel <= 3) priority = 60;
    else priority = 30;
    priority += Math.random() * 20;
    return { card, priority };
  });
  scored.sort((a, b) => b.priority - a.priority);
  return scored.map(s => s.card);
}

export function countCardsAtLevel(minLevel) {
  const progress = getProgress();
  return Object.values(progress).filter(p => (p.masteryLevel || 0) >= minLevel).length;
}
