import type { Metadata } from "next";
import "./globals.css";
import { NextAuthProvider } from './components/Providers'
import Navbar from './components/Navbar'

export const metadata: Metadata = {
  title: "Anki Card Maker",
  description: "Let's make Anki Cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}