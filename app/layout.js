import { AuthProvider } from "./components/AuthContext";

export const metadata = {
  title: "SipStreak 🍷🔥",
  description: "Master wine knowledge — grapes, regions, tasting, and food pairings. Duolingo-style wine learning app.",
  openGraph: {
    title: "SipStreak 🍷🔥",
    description: "Master wine knowledge — grapes, regions, tasting, and food pairings.",
    url: "https://sipstreak.com",
    siteName: "SipStreak",
    type: "website",
  },
};

export default function SipStreakLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F0EB', color: '#2C1A2E' }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}
