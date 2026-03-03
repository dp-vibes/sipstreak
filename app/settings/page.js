"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import { themes, getTheme, setTheme, applyTheme } from "../utils/storage";
import AppShell from "../components/AppShell";
import TabBar from "../components/TabBar";

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [currentTheme, setCurrentTheme] = useState('cellar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = getTheme();
    setCurrentTheme(t);
    applyTheme(t);
  }, []);

  const handleThemeChange = (key) => {
    setTheme(key);
    setCurrentTheme(key);
  };

  const handleSignOut = async () => {
    if (window.confirm('Sign out of SipStreak?')) {
      await signOut();
      router.push('/');
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress? This cannot be undone!')) {
      Object.keys(localStorage).filter(k => k.startsWith('sipstreak_')).forEach(k => localStorage.removeItem(k));
      window.location.reload();
    }
  };

  if (!mounted) return null;

  return (
    <AppShell>
      <div style={{ paddingBottom: '80px' }}>
        <div style={{ padding: '48px 20px 0' }}>
          <button onClick={() => router.push('/')} style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '16px',
            fontSize: '13px', fontWeight: 500, color: 'var(--wine)', fontFamily: 'var(--font-body)',
            display: 'flex', alignItems: 'center', gap: '4px',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back
          </button>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>Settings</h1>
        </div>

        <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Account */}
          <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6"/></svg>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Account</p>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-hint)', paddingLeft: '28px' }}>{user?.email || 'Not signed in'}</p>
          </div>

          {/* Theme Picker */}
          <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid rgba(123,45,59,0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a4 4 0 00-4 4c0 2 2 3 2 6h4c0-3 2-4 2-6a4 4 0 00-4-4z"/><path d="M10 17.5a2 2 0 004 0"/></svg>
              <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>Theme</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {Object.entries(themes).map(([key, theme]) => (
                <button key={key} onClick={() => handleThemeChange(key)} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '10px 12px', borderRadius: '10px',
                  border: currentTheme === key ? '1px solid var(--wine)' : '1px solid transparent',
                  background: currentTheme === key ? 'rgba(123,45,59,0.04)' : 'transparent',
                  cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s',
                }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: theme.swatch, border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                  }} />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>{theme.name}</span>
                  {currentTheme === key && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Sign Out */}
          <button onClick={handleSignOut} style={{
            padding: '14px 16px', borderRadius: '14px', background: 'var(--bg-card)',
            border: '1px solid rgba(123,45,59,0.06)', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--wine)" strokeWidth="1.5"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--wine)' }}>Sign Out</span>
          </button>

          {/* Reset */}
          <button onClick={handleReset} style={{
            padding: '14px 16px', borderRadius: '14px', background: 'var(--bg-card)',
            border: '1px solid rgba(239,68,68,0.08)', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
            <span style={{ fontSize: '14px', fontWeight: 500, color: '#ef4444' }}>Reset All Progress</span>
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '11px', color: 'var(--text-hint)', letterSpacing: '1px' }}>SipStreak v1.0</p>
      </div>
      <TabBar />
    </AppShell>
  );
}
