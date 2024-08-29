import React, { useState, useEffect, useContext, createContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal, useWeb3ModalTheme } from '@web3modal/wagmi/react';
import { ethers } from 'ethers';
// import { InjectedConnector } from 'wagmi/connectors/injected';
// import paycrestAbi from '@/Contract/paycrest.json';
// import approveAbi from '@/Contract/approve.json';
// import toast, { Toaster } from 'react-hot-toast';
import { keccak256 } from 'ethers/lib/utils';
import crypto from 'crypto';

// import axios from 'axios';

export const PersonDetails = createContext({});

export const PaycrestContextProvider = ({ children }: any) => {
   // testnet
   const paycrestContractAddress = '0xba31A1adb519A2C76475cE231FB1445047971358';
   const createOrderToken = '0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97';
   const institutionCode =
      '0x41424e474e474c41000000000000000000000000000000000000000000000000';

   return (
      <PersonDetails.Provider value={{}}>{children}</PersonDetails.Provider>
   );
};
