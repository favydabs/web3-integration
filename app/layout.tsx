<<<<<<< HEAD
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/app/components/context/formContextApi";

const inter = Inter({ subsets: ["latin"] });
=======
import type { Metadata } from 'next';
import Header from './components/header';
import { Web3ModalWrapper } from './components/context/web3ModalWrapper';
import { PersonalDetailsContextProvider } from './components/context/personContext';
>>>>>>> 053f7524e7e0368829e81a64659cb7ea77dfb219

import { headers } from "next/headers"; // added
import ContextProvider from "@/app/components/context/appkitContext";

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "AppKit Example App",
  description: "Powered by Reown",
=======
   title: 'Personal Details',
   description: 'Personal Details',
>>>>>>> 053f7524e7e0368829e81a64659cb7ea77dfb219
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
<<<<<<< HEAD
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
=======
   return (
      <html lang="en">
         <body>
            <Web3ModalWrapper>
               <PersonalDetailsContextProvider>
                  <Header />
                  {children}
               </PersonalDetailsContextProvider>
            </Web3ModalWrapper>
         </body>
      </html>
   );
>>>>>>> 053f7524e7e0368829e81a64659cb7ea77dfb219
}
