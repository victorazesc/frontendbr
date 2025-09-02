import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import NavBar from "@/components/navbar";
import AuthProvider from "@/providers/sessionProvider";
import { Analytics } from '@vercel/analytics/next';
import Script from "next/script";

export const metadata: Metadata = {
  title: "Frontend BR",
  description: "Seu repositório de vagas de Frontend no Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        <Script
          src="https://track-mint.vercel.app/js/script.js"
          defer
          data-website-id="1VM0fm3oKaJe5mvlA6zhs"
          data-domain="frontendbr.com"
          data-debug="true"
          strategy="afterInteractive"
        />
      </head>
      <body>
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="max-w-7xl mx-auto relative h-full">
              <NavBar />
              {children}
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
