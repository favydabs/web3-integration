'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react';
import { ethers } from 'ethers';
// import { InjectedConnector } from 'wagmi/connectors/injected';
// import paycrestAbi from '@/Contract/paycrest.json';
import personDetailsAbi from '@/app/components/context/personDetails.json';
// import toast, { Toaster } from 'react-hot-toast';
// import { keccak256, parseUnits } from 'ethers/lib/utils';
import crypto from 'crypto';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

// import axios from 'axios';

interface FormData {
   firstname: string;
   lastname: string;
   sex: string;
   age: string;
}

export const PersonDetailsProvider = createContext({});

export const PersonalDetailsContextProvider = ({ children }: any) => {
   const { address, chainId, isConnected } = useWeb3ModalAccount();
   const [formData, setFormData] = useState<FormData>({
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
   });
   const [allPersons, setAllPersons] = useState('');
   // testnet
   const personalDetailsContractAddress =
      '0x1cf093C22bC3D5d26bebA4a49185590a112D1C3E';

   const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
   ) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log({
         firstname: formData.firstname,
         lastname: formData.lastname,
         sex: formData.sex,
         age: formData.age,
      });

      const provider = window.ethereum
         ? new ethers.BrowserProvider(window.ethereum as any)
         : null;

      if (!provider) {
         console.error('Ethereum provider is not available');
         return;
      }

      const signer = await provider.getSigner();
      const personDetailsInstance = new ethers.Contract(
         personalDetailsContractAddress,
         personDetailsAbi,
         signer
      );

      const getAllCreatedShibbase = await personDetailsInstance.createPerson(
         formData.firstname,
         formData.lastname,
         formData.sex,
         formData.age

         // {
         //    //  add gas fee and
         //    gasLimit: 7000000,
         //    gasPrice: parseUnits('15.0', 'gwei'),
         // }
      );

      console.log('Submitted Data:', getAllCreatedShibbase);
   };

   const handleUpdate = (personId: string) => {
      console.log('Updated Data:', formData);
   };

   useEffect(() => {
      const getAllPerson = async () => {
         try {
            const alchemyApiKey =
               'https://eth-sepolia.g.alchemy.com/v2/k876etRLMsoIcTpTzkkTuh3LPBTK96YZ';

            const provider = new ethers.JsonRpcProvider(alchemyApiKey);

            const personDetailsInstance = new ethers.Contract(
               personalDetailsContractAddress,
               personDetailsAbi,
               provider
            );
            const getAllCreatedShibbase = await personDetailsInstance.getAllPersons();
            setAllPersons(getAllCreatedShibbase);
            console.log(getAllCreatedShibbase);
         } catch (error) {
            console.log('Failed to fetch person');
         }
      };
      getAllPerson();
   }, []);

   return (
      <PersonDetailsProvider.Provider
         value={{
            handleChange,
            formData,
            setFormData,
            handleSubmit,
            allPersons,
         }}
      >
         {children}
      </PersonDetailsProvider.Provider>
   );
};
