import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/components/context/formContextApi";

const inter = Inter({ subsets: ["latin"] });

import { headers } from "next/headers"; // added
import ContextProvider from "@/app/components/context/appkitContext";

export const metadata: Metadata = {
  title: "AppKit Example App",
  description: "Powered by Reown",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = headers().get("cookie");

  return (
    <html lang="en">
      <ContextProvider cookies={cookies}>
        <AppProvider>
          <body className={inter.className}>{children}</body>
        </AppProvider>
      </ContextProvider>
    </html>
  );
}
