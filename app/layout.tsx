import "./globals.css";
import Script from "next/script";
import type { ReactNode } from "react";

export const viewport = { width: "device-width", initialScale: 1, maximumScale: 1, viewportFit: "cover" };

export const metadata = {
  metadataBase: new URL("https://unofficialgrokamotos.com"),
  title: {
    default: "Unofficial Grokamotos — fan-made $DRB PFP archive",
    template: "%s | Unofficial Grokamotos",
  },
  description:
    "Unofficial Grokamotos is a fan-made $DRB PFP NFT archive built around low-poly early-2000s game aesthetics, terminal-core energy, and community-made underground mythology.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://unofficialgrokamotos.com",
    siteName: "Unofficial Grokamotos",
    title: "Unofficial Grokamotos — fan-made $DRB PFP archive",
    description:
      "A fan-made $DRB PFP NFT archive with low-poly early-2000s game aesthetics and terminal-core energy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Unofficial Grokamotos — fan-made $DRB PFP archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Unofficial Grokamotos — fan-made $DRB PFP archive",
    description:
      "A fan-made $DRB PFP NFT archive with low-poly early-2000s game aesthetics and terminal-core energy.",
    images: ["/og-image.png"],
  },
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
