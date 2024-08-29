import type { Metadata } from 'next';
import Header from './components/header';
import { Web3ModalWrapper } from './components/context/web3ModalWrapper';
import { PersonalDetailsContextProvider } from './components/context/personContext';

export const metadata: Metadata = {
   title: 'Personal Details',
   description: 'Personal Details',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
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
}
