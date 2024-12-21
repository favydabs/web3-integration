'use client';

import Link from 'next/link';
// import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { PersonDetailsProvider } from './context/personContext';

const Header = () => {
   return (
      <main className="w-full flex justify-between items-center fixed top-0  bg-opacity-10 backdrop-blur-md shadow-lg h-16 z-20">
         <div className="flex w-full p-4 justify-between items-center  shadow-custom">
            <div className=" pr-2">
               <img
                  src="https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.dreamstime.com%2Fmeilleur-imag-mon-%25C3%25A9dition-en-photo-d-album-%25C3%25A9ditant-des-albums-image144808262&psig=AOvVaw2oltjBg-sx8jfBt1Q4Dslv&ust=1724936733602000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCOD2_p3gl4gDFQAAAAAdAAAAABAJ"
                  alt="logo-image"
                  className="h-12 w-12"
               />
            </div>
            <div className="flex space-x-5 justify-center items-center">
               <div className="">
                  <w3m-button />
               </div>
            </div>
         </div>
      </main>
   );
};

export default Header;
