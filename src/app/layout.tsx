import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";

import "./globals.css";
import { AppProvider } from "@/components/providers";
import { poppins } from "@/helpers/fonts";
import { sharedMetadata } from "@/helpers/metadata";

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
      <body className={poppins.className}>
        <AppProvider>{children}</AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
