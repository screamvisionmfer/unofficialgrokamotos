import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";

export const viewport = { width: "device-width", initialScale: 1, maximumScale: 1, viewportFit: "cover" };

export const metadata = {
  title: "Unofficial Grokamotos",
  description: "Game-style NFT landing for $DRB",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer@4.2.0/dist/model-viewer.min.js"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
