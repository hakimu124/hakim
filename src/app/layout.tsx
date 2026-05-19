import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { AuthModalWrapper } from '@/components/theme/AuthModalWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdihakim Mohamed | Full-Stack Developer – Eldoret, Kenya",
  description: "Professional portfolio of Abdihakim Mohamed, a Full-Stack Developer & UI/UX Designer based in Eldoret, Kenya, crafting premium digital experiences.",
  verification: {
    google: "3mPDnu95-y1vZr12PdyaFKkhp0IQrny1gf1Mz7rxxfw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="sw-registration"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
                });
              }
            `,
          }}
        />
        <AuthProvider>
          <ThemeProvider>
            <div className="bg-glow-container">
              <div className="bg-glow glow-1" />
              <div className="bg-glow glow-2" />
            </div>
            <Navbar />
            <AuthModalWrapper />
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" type="module" strategy="afterInteractive" />
        <Script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
