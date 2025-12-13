import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import Header from "@/components/header/Header";
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
  title: "Cloud Posts ",
  description: "Cloud Posts Project",
};
interface RootLayoutProps {
  children : React.ReactNode
}

export default function RootLayout({children,}: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <ToastContainer theme="colored" position="top-center"/>
        <main style={{marginTop:"80px"}}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
