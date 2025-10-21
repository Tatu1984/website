import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CursorFollower from "@/components/effects/CursorFollower";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Infinititech Partners - Transform Your Digital Future",
  description: "Data Center Management, Custom Software Development, Smart City Solutions, CRM, ERP, POS, Web & Mobile Apps, Digital Marketing",
  keywords: "data center, MDC software, smart city, CRM, ERP, POS, web development, mobile apps, digital marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {/* Custom cursor follower */}
        <CursorFollower />

        {/* Flowing wave in background - z-index: 0 */}
        <ScrollProgress />

        {/* All content on top - z-index: 10 */}
        <div className="relative" style={{ zIndex: 10 }}>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}