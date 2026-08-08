import React from "react";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Atul Sagotra | Lead Front-end & Full-Stack Engineer",
  description: "Lead/Senior Frontend Developer specializing in React, Next.js, and micro-frontend architectures. Delivering high-performance, responsive web applications.",
  icons: {
    icon: "/logo_black.png",
  },
  openGraph: {
    title: "Atul Sagotra | Lead Front-end & Full-Stack Engineer",
    description: "Lead/Senior Frontend Developer specializing in React, Next.js, and micro-frontend architectures.",
    url: "https://atulsagotra.vercel.app",
    siteName: "Atul Sagotra Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#060608" />
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem("theme") || "dark";
                if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                  document.documentElement.classList.add("dark");
                  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#060608");
                } else {
                  document.documentElement.classList.remove("dark");
                  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f5f5f9");
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <div className="bg-grid"></div>
        <div className="ambient-glow"></div>
        {children}
      </body>
    </html>
  );
}
