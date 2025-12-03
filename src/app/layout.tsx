import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DJ Miles Morales | Open-Format DJ for Corporate, Fashion, & Luxury Events",
  description: "Skillful, experienced, and versatile. DJ Miles Morales is one of the premier open-format DJs in the country. Based in Chambersburg, PA and available nationwide.",
  keywords: ["DJ", "Miles Morales", "Wedding DJ", "Corporate DJ", "Event DJ", "Open Format DJ", "Pennsylvania DJ"],
  openGraph: {
    title: "DJ Miles Morales",
    description: "Open-Format DJ for Corporate, Fashion, & Luxury Events",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className={`${inter.className} bg-[#050509] text-zinc-100 antialiased`}>
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
