import type { Metadata } from "next";
import "../globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import NavBar from "@/components/navbar";
import AuthProvider from "@/providers/sessionProvider";
import { Analytics } from '@vercel/analytics/next';

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
      <head />
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
