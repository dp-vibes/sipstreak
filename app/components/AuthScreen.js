"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../utils/supabase";

function WineGlassIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M16 6 L32 6 L29.5 22 C29.5 28 27 31 24 32.5 C21 31 18.5 28 18.5 22 Z"
            fill="none" stroke="#7B2D3B" strokeWidth="1.2" />
      <clipPath id="wc"><path d="M16.5 7 L31.5 7 L29 21.5 C29 27.5 26.5 30.5 24 32 C21.5 30.5 19 27.5 19 21.5 Z" /></clipPath>
      <rect x="16" y="20" width="16" height="13" fill="#7B2D3B" opacity="0.12" clipPath="url(#wc)" />
      <line x1="24" y1="32.5" x2="24" y2="39" stroke="#7B2D3B" strokeWidth="1.2" />
      <line x1="19" y1="39" x2="29" y2="39" stroke="#7B2D3B" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ConfirmationModal({ email, onDismiss }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: 'rgba(44,26,46,0.5)', backdropFilter: 'blur(12px)' }} onClick={onDismiss}>
      <motion.div initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 16 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()}
        style={{ background: '#FFFDF9', border: '1px solid rgba(123,45,59,0.08)', borderRadius: '20px', padding: '36px 28px', maxWidth: '360px', width: '100%', textAlign: 'center', boxShadow: '0 24px 48px rgba(44,44,44,0.12)' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📬</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Check Your Email</h2>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '4px' }}>We sent a confirmation link to</p>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--wine)', marginBottom: '16px' }}>{email}</p>
        <div style={{ marginTop: '20px', padding: '12px 16px', background: 'var(--bg-cream)', borderRadius: '12px', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          💡 Don't see it? Check your spam folder.
        </div>
        <button onClick={onDismiss} style={{ marginTop: '24px', width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--wine)', color: '#fff', fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 600, cursor: 'pointer' }}>Got It</button>
      </motion.div>
    </motion.div>
  );
}

export default function AuthScreen({ onAuth }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailAuth = async () => {
    setError(null);
    if (!email.trim() || !password.trim()) { setError("Please enter your email and password."); return; }
    if (mode === "signup" && password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: name.trim() || undefined } } });
        if (error) throw error;
        if (data.user && !data.session) setShowConfirmation(true);
        else if (data.session) onAuth(data.session);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        onAuth(data.session);
      }
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleGoogleSignIn = async () => {
    setError(null); setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin, queryParams: { prompt: "select_account" } } });
      if (error) throw error;
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const switchMode = () => { setMode(mode === "login" ? "signup" : "login"); setPassword(""); setName(""); setError(null); };

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '10px',
    border: '1px solid rgba(123,45,59,0.1)', background: '#fff',
    fontSize: '15px', fontFamily: 'var(--font-body)', color: 'var(--text-primary)',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const leftImages = ['/images/vineyard-1.jpg', '/images/bottles-2.jpg', '/images/glass-1.jpg'];
  const rightImages = ['/images/glass-2.jpg', '/images/vineyard-2.jpg', '/images/bottles-1.jpg'];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', position: 'relative', overflow: 'hidden', background: 'var(--bg-primary)' }}>

      {/* Left photo panel with white overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '28%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {leftImages.map((src, i) => (
            <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(250, 250, 248, 0.62)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Right photo panel with white overlay */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '28%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {rightImages.map((src, i) => (
            <div key={i} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(250, 250, 248, 0.62)' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Center white column */}
      <div style={{
        position: 'relative', zIndex: 10, margin: '0 auto',
        width: '100%', maxWidth: '420px', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '40px 28px',
        background: 'var(--bg-primary)',
      }}>
        {/* Wine-colored separator lines (same color as sign in button) */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '1px', background: '#7B2D3B' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '1px', background: '#7B2D3B' }} />

        <AnimatePresence>
          {showConfirmation && <ConfirmationModal email={email} onDismiss={() => { setShowConfirmation(false); setMode("login"); setPassword(""); }} />}
        </AnimatePresence>

        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ marginBottom: '4px' }}>
          <WineGlassIcon size={52} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.5px', marginBottom: '6px' }}>
            SipStreak
          </h1>
          <div style={{ width: '40px', height: '1.5px', background: 'var(--gold)', margin: '10px auto 12px', borderRadius: '1px' }} />
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: 'var(--text-hint)', letterSpacing: '0.3px' }}>
            {mode === "login" ? "Welcome back" : "Begin your wine journey"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} style={{ width: '100%', maxWidth: '340px' }}>
          <button onClick={handleGoogleSignIn} disabled={loading} style={{
            width: '100%', padding: '13px', borderRadius: '10px', border: '1px solid rgba(44,44,44,0.1)', background: '#fff',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            fontSize: '14px', fontFamily: 'var(--font-body)', fontWeight: 500, color: 'var(--text-primary)', transition: 'all 0.2s',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '20px 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(123,45,59,0.08)' }} />
            <span style={{ fontSize: '11px', color: 'var(--text-hint)', textTransform: 'uppercase', letterSpacing: '1.5px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(123,45,59,0.08)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <AnimatePresence mode="wait">
              {mode === "signup" && (
                <motion.div key="name" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                  <input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} autoComplete="name" />
                </motion.div>
              )}
            </AnimatePresence>
            <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="email"
              onFocus={(e) => { e.target.style.borderColor = 'rgba(123,45,59,0.3)'; e.target.style.boxShadow = '0 0 0 3px rgba(123,45,59,0.05)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(123,45,59,0.1)'; e.target.style.boxShadow = 'none'; }} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(123,45,59,0.3)'; e.target.style.boxShadow = '0 0 0 3px rgba(123,45,59,0.05)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(123,45,59,0.1)'; e.target.style.boxShadow = 'none'; }} />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ marginTop: '10px', fontSize: '13px', color: 'var(--wine)', textAlign: 'center', padding: '10px 14px', background: 'rgba(123,45,59,0.05)', borderRadius: '10px' }}>
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button onClick={handleEmailAuth} disabled={loading} style={{
            marginTop: '18px', width: '100%', padding: '14px', borderRadius: '10px',
            border: 'none', background: 'var(--wine)', color: '#fff', fontSize: '15px',
            fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
            opacity: loading ? 0.6 : 1, boxShadow: '0 2px 8px rgba(123,45,59,0.2)', transition: 'all 0.2s',
          }}>
            {loading ? (mode === "signup" ? "Creating Account..." : "Signing In...") : (mode === "signup" ? "Create Account" : "Sign In")}
          </button>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--text-hint)' }}>
            {mode === "login" ? "New to SipStreak? " : "Already have an account? "}
            <button onClick={switchMode} style={{ background: 'none', border: 'none', color: 'var(--wine)', fontWeight: 600, fontSize: '13px', fontFamily: 'var(--font-body)', cursor: 'pointer' }}>
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ position: 'absolute', bottom: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: 'var(--text-hint)', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Learn · Taste · Discover
          </p>
        </motion.div>
      </div>
    </div>
  );
}
