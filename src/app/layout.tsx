import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Somatic Stroop Test — Clinical Edition",
  description: "A clinical Neuropsychology assessment tool for attentional bias.",
  themeColor: "#1A1814",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    title: "Somatic Stroop",
    statusBarStyle: "default",
    capable: true,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F2EC] text-[#1A1814] min-h-screen flex flex-col`}
      >
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          {children}
        </main>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
