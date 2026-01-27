import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Learn Japanese",
  description: "Japanese learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
