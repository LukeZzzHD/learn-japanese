import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { MainContent } from "@/components/main-content";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Japanese",
  description: "Japanese vocabulary learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <Header />
        <MainContent>{children}</MainContent>
        <Navigation />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
