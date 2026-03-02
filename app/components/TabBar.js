"use client";
import { usePathname, useRouter } from "next/navigation";

const tabs = [
  { id: "home", label: "Home", path: "/", icon: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#7B2D3B" : "#9B9590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )},
  { id: "learn", label: "Learn", path: "/study/pick", icon: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#7B2D3B" : "#9B9590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
      <path d="M8 7h8M8 11h5" />
    </svg>
  )},
  { id: "scan", label: "Scan", path: null, icon: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#7B2D3B" : "#9B9590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )},
  { id: "somm", label: "Sommelier", path: null, icon: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#7B2D3B" : "#9B9590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2L15 2L14 10C14 13 13 14.5 12 15.5C11 14.5 10 13 10 10Z" />
      <line x1="12" y1="15.5" x2="12" y2="19" />
      <line x1="9" y1="19" x2="15" y2="19" />
      <path d="M3 22h18" opacity="0.4" />
    </svg>
  )},
  { id: "profile", label: "Profile", path: "/settings", icon: (active) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#7B2D3B" : "#9B9590"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    </svg>
  )},
];

export default function TabBar() {
  const pathname = usePathname();
  const router = useRouter();

  const getActiveTab = () => {
    if (pathname === "/") return "home";
    if (pathname.startsWith("/study") || pathname.startsWith("/quiz") || pathname.startsWith("/progress")) return "learn";
    if (pathname === "/settings") return "profile";
    return "home";
  };

  const activeTab = getActiveTab();

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(250, 250, 248, 0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(123, 45, 59, 0.06)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '8px 0 4px',
      }}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const isComingSoon = tab.path === null;

          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isComingSoon) return;
                router.push(tab.path);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                background: 'none',
                border: 'none',
                cursor: isComingSoon ? 'default' : 'pointer',
                padding: '4px 12px',
                opacity: isComingSoon ? 0.35 : 1,
                transition: 'opacity 0.2s',
              }}
            >
              {tab.icon(isActive)}
              <span style={{
                fontSize: '10px',
                fontFamily: 'var(--font-body)',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? '#7B2D3B' : '#9B9590',
                letterSpacing: '0.2px',
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
