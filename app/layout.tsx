import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "THERIAN.",
  description: "Find your spirit animal from your voice.",
  openGraph: {
    title: "THERIAN.",
    description: "5 seconds of voice. Find your spirit animal.",
    images: [{ url: "https://therian-app-iota.vercel.app/api/og", width: 1200, height: 630 }],
    url: "https://therian-app-iota.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "THERIAN.",
    description: "5 seconds of voice. Find your spirit animal.",
    images: ["https://therian-app-iota.vercel.app/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
