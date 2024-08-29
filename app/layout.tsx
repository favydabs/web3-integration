import Header from './components/header';
import { Web3ModalWrapper } from './components/context/web3ModalWrapper';

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body>
            <Web3ModalWrapper>
               <Header />
               {children}
            </Web3ModalWrapper>
         </body>
      </html>
   );
}
