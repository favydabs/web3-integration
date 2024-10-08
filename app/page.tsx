'use client';

import React, { useContext, useState } from 'react';
import { PersonDetailsProvider } from './components/context/personContext';
import { useAccount } from 'wagmi';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';

const FormComponent: React.FC = () => {
   const { address, chainId, isConnected } = useWeb3ModalAccount();

   console.log({ address, chainId, isConnected });

   const {
      handleChange,
      formData,
      setFormData,
      handleSubmit,
      allPersons,
   } = useContext(PersonDetailsProvider);

   console.log(allPersons.length);

   const handleUpdate = () => {
      alert('Form data updated');
      console.log('Updated Data:', formData);
   };

   const handleDelete = () => {
      setFormData({
         firstname: '',
         lastname: '',
         sex: '',
         age: '',
         address: '',
      });
      alert('Form data deleted');
   };

   return (
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-24">
         <h2 className="text-xl font-bold mb-4">User Information</h2>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
               >
                  First Name
               </label>
               <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
               >
                  Last Name
               </label>
               <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               />
            </div>
            <div className="mb-4">
               <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-700"
               >
                  Sex
               </label>
               <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
               </select>
            </div>
            <div className="mb-4">
               <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
               >
                  Age
               </label>
               <input
                  type="text"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               />
            </div>

            <div className="flex space-x-4">
               <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600"
               >
                  Submit
               </button>
               {/* <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600"
               >
                  Update
               </button>
               <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600"
               >
                  Delete
               </button> */}
            </div>
         </form>
      </div>
   );
};

export default FormComponent;
