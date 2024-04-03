import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { AppProvider } from "@/components/providers";
import { sharedMetadata } from "@/helpers/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...sharedMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
