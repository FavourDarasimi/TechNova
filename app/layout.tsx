import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tech-nova-tau.vercel.app/"),
  title: "Tech Nova",
  description:
    "Discover the latest tech gadgets, smartphones, laptops, smartwatches, and premium electronics at TechNova. Free shipping, competitive prices, and trusted by 2,000+ tech enthusiasts.",
  keywords: [
    "tech gadgets",
    "electronics store",
    "smartphones",
    "laptops",
    "smartwatches",
    "audio equipment",
    "cameras",
    "drones",
    "online electronics",
    "tech shop",
  ],
  authors: [{ name: "TechNova" }],
  creator: "TechNova",
  publisher: "TechNova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tech-nova-tau.vercel.app/",
    title: "TechNova - Premium Tech Gadgets & Electronics Store",
    description:
      "Your one-stop destination for premium gadgets. We bring the future of technology right to your doorstep.",
    siteName: "TechNova",
    images: [
      {
        url: "/images/og-image.png", // You'll need to create this
        width: 1200,
        height: 630,
        alt: "TechNova - Premium Tech Store",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
