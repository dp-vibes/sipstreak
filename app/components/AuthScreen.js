"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";

function WineGlassIcon({ size = 80, color = "#722F37" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <path d="M35 15 L65 15 L60 45 C60 55 55 60 50 62 C45 60 40 55 40 45 Z" fill={color} opacity="0.3" />
      <path d="M35 15 L65 15 L60 45 C60 55 55 60 50 62 C45 60 40 55 40 45 Z" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="50" y1="62" x2="50" y2="80" stroke={color} strokeWidth="2.5" />
      <line x1="38" y1="80" x2="62" y2="80" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="50" cy="35" rx="10" ry="4" fill={color} opacity="0.15" />
    </svg>
  );
}

function ConfirmationModal({ email, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(44,26,46,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onDismiss}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl p-8 shadow-xl text-center"
        style={{ background: '#FFFDF9', border: '1px solid #722F3720' }}
      >
        <div className="text-5xl mb-4">📬</div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
          Check Your Email!
        </h2>
        <p className="text-sm mb-4 leading-relaxed" style={{ color: '#555' }}>
          We sent a confirmation link to<br />
          <strong style={{ color: '#722F37' }}>{email}</strong>
        </p>
        <p className="text-sm mb-2 leading-relaxed" style={{ color: '#555' }}>
          Tap the link to activate your account, then come back and log in.
        </p>
        <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{ background: '#C9A96E15', color: '#8C8279' }}>
          💡 <strong>Don't see it?</strong> Check your spam/junk folder — sometimes emails end up there. The email will come from <strong>SipStreak</strong>.
        </div>
        <button
          onClick={onDismiss}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all active:scale-[0.98]"
          style={{ background: '#722F37' }}
        >
          Got it!
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailAuth = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return; }
    if (mode === 'signup' && password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { full_name: name.trim() || undefined } },
        });
        if (error) throw error;
        if (data.user && !data.session) {
          setShowConfirmation(true);
        } else if (data.session) { onAuth(data.session); }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        onAuth(data.session);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin },
      });
      if (error) throw error;
    } catch (err) { setError(`Google Sign-In Error: ${err.message}`); }
    finally { setLoading(false); }
  };

  const handleConfirmationDismiss = () => {
    setShowConfirmation(false);
    setMode('login');
    setPassword('');
    setName('');
  };

  const inputClasses = "w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors bg-[#2C1A2E]/5 border-[#722F37]/15 text-[#2C1A2E] placeholder-[#8C8279] focus:border-[#722F37]/40";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6" style={{ background: '#F5F0EB' }}>
      <AnimatePresence>
        {showConfirmation && <ConfirmationModal email={email} onDismiss={handleConfirmationDismiss} />}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0, rotate: -15 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-2"
      >
        <WineGlassIcon size={80} color="#722F37" />
      </motion.div>

      <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
        SipStreak
      </h1>
      <p className="text-sm mb-8" style={{ color: '#8C8279' }}>
        {mode === 'login' ? 'Welcome back!' : 'Create your account'}
      </p>

      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-3.5 rounded-xl font-semibold transition-all active:scale-[0.98] border border-gray-200 bg-white text-gray-700 flex items-center justify-center gap-3 text-sm shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-[#2C1A2E]/10"></div>
          <span className="text-xs" style={{ color: '#8C8279' }}>or {mode === 'login' ? 'log in' : 'sign up'} with email</span>
          <div className="flex-1 h-px bg-[#2C1A2E]/10"></div>
        </div>

        {mode === 'signup' && (
          <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)}
            className={inputClasses} autoComplete="name" />
        )}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
          className={inputClasses} autoComplete="email" />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
          className={inputClasses} autoComplete={mode === 'login' ? "current-password" : "new-password"} />

        {/* Inline error message */}
        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="text-sm text-center py-2 px-3 rounded-xl" style={{ background: '#722F3710', color: '#722F37' }}>
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <button onClick={handleEmailAuth} disabled={loading}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all active:scale-[0.98] shadow-md"
          style={{ background: '#722F37', opacity: loading ? 0.6 : 1 }}>
          {loading ? (mode === 'signup' ? 'Creating Account...' : 'Logging In...') : (mode === 'signup' ? 'Sign Up' : 'Log In')}
        </button>

        <button onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setPassword(''); setName(''); setError(null); }}
          className="text-sm w-full text-center" style={{ color: '#8C8279' }}>
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <span className="font-semibold" style={{ color: '#722F37' }}>{mode === 'login' ? 'Sign Up' : 'Log In'}</span>
        </button>
      </div>
    </div>
  );
}
