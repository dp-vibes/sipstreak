"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/AuthContext";
import { themes, getTheme, setTheme } from "../utils/storage";

export default function SettingsPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [currentTheme, setCurrentTheme] = useState('cellar');

  useEffect(() => { setCurrentTheme(getTheme()); }, []);

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

  return (
    <div className="flex flex-col items-center min-h-screen px-6 pt-12 pb-8" style={{ background: '#F5F0EB' }}>
      <button onClick={() => router.push('/')}
        className="self-start mb-6 text-sm font-medium" style={{ color: '#722F37' }}>← Back</button>

      <h1 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif", color: '#2C1A2E' }}>
        ⚙️ Settings
      </h1>

      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Account */}
        <div className="p-4 rounded-xl border shadow-sm" style={{ background: 'white', borderColor: '#722F3715' }}>
          <div className="text-sm font-semibold mb-2" style={{ color: '#2C1A2E' }}>Account</div>
          <div className="text-sm" style={{ color: '#8C8279' }}>{user?.email || 'Not signed in'}</div>
        </div>

        {/* Theme Picker */}
        <div className="p-4 rounded-xl border shadow-sm" style={{ background: 'white', borderColor: '#722F3715' }}>
          <div className="text-sm font-semibold mb-3" style={{ color: '#2C1A2E' }}>Theme</div>
          <div className="flex flex-col gap-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button key={key} onClick={() => handleThemeChange(key)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${currentTheme === key ? 'border-[#722F37]' : 'border-transparent hover:border-[#722F3730]'}`}
                style={{ background: currentTheme === key ? '#722F3708' : 'transparent' }}>
                <div className="w-8 h-8 rounded-full border-2" style={{ background: theme.primary, borderColor: theme.secondary }} />
                <span className="text-sm font-medium" style={{ color: '#2C1A2E' }}>{theme.name}</span>
                {currentTheme === key && <span className="ml-auto" style={{ color: '#722F37' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <button onClick={handleSignOut}
          className="p-4 rounded-xl border shadow-sm text-sm font-medium text-left"
          style={{ background: 'white', borderColor: '#722F3715', color: '#722F37' }}>
          Sign Out
        </button>

        <button onClick={handleReset}
          className="p-4 rounded-xl border shadow-sm text-sm font-medium text-left"
          style={{ background: 'white', borderColor: '#ef444415', color: '#ef4444' }}>
          🗑️ Reset All Progress
        </button>
      </div>

      <div className="mt-8 text-xs" style={{ color: '#C9A96E' }}>SipStreak v1.0</div>
    </div>
  );
}
