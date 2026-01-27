import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/sonner";

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
      <body className="font-sans antialiased">
        <div className="mx-auto min-h-screen max-w-[480px] pb-20">
          {children}
        </div>
        <Navigation />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
