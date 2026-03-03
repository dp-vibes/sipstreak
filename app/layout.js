import "./globals.css";
import { AuthProvider } from "./components/AuthContext";
import ThemeProvider from "./components/ThemeProvider";

export const metadata = {
  title: "SipStreak — Master Wine Knowledge",
  description: "Your personal wine companion. Learn, taste, discover.",
  openGraph: {
    title: "SipStreak — Master Wine Knowledge",
    description: "Your personal wine companion. Learn, taste, discover.",
    url: "https://sipstreak.com",
    siteName: "SipStreak",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#FAFAF8" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
