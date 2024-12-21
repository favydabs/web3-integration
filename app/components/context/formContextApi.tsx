"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";
import userFormAbi from "@/app/components/data.json";

const USER_FORM_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTACT_ADDRESS as string;
const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

interface FormData {
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  location: string;
}

interface User {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  location: string;
}

interface AppContextType {
  value: string;
  setValue: (value: string) => void;
  createUser: (formData: FormData) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  getUserData: (userAddress: string) => Promise<User>;
  deleteUserData: () => Promise<void>;
  getUsersCount: () => Promise<number>;
  userExists: (userAddress: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { address } = useAppKitAccount();
  const [value, setValue] = useState("Hello world");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProvider = () => {
    try {
      const provider = new ethers.JsonRpcProvider(alchemyApiKey);
      return provider;
    } catch (error) {
      console.error("Error creating provider:", error);
      throw error;
    }
  };

  const createUser = async (formData: FormData) => {
    console.log(formData, "in handle create user");

    if (!window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    setLoading(true);
    setError(null);

    try {
      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance with signer
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        signer
      );

      // Send transaction
      const tx = await contract.CreateUserData(
        formData.firstname,
        formData.lastname,
        Number(formData.age),
        formData.sex,
        formData.location,
        {
          gasLimit: 700000,
          gasPrice: ethers.parseUnits("15.0", "gwei"),
        }
      );

      await tx.wait();
      console.log("User created successfully:", tx.hash);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(error instanceof Error ? error.message : "Error creating user");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const getAllUsers = async (): Promise<User[]> => {
    setLoading(true);
    setError(null);
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        provider
      );
      const users = await contract.getAllUsers();
      const totalUsers = await getUsersCount();
      console.log("fetched users:", totalUsers.toString());
      return users.map((user: any) => ({
        firstName: user.firstName,
        lastName: user.lastName,
        age: Number(user.age),
        sex: user.sex,
        location: user.location,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      setError(error instanceof Error ? error.message : "Error fetching users");
      return [];
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  const getUserData = async (userAddress: string): Promise<User> => {
    setLoading(true);
    setError(null);
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        provider
      );
      const [firstName, lastName, age, sex, location] =
        await contract.getUserData(userAddress);
      return {
        firstName,
        lastName,
        age: Number(age),
        sex,
        location,
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError(
        error instanceof Error ? error.message : "Error fetching user data"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUserData = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        signer
      );
      const tx = await contract.deleteUserData();
      await tx.wait();
      console.log("User data deleted successfully");
    } catch (error) {
      console.error("Error deleting user data:", error);
      setError(
        error instanceof Error ? error.message : "Error deleting user data"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getUsersCount = async (): Promise<number> => {
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        provider
      );
      const count = await contract.getUsersCount();
      console.log("Total counts:", count.toString());
      return Number(count);
    } catch (error) {
      console.error("Error getting users count:", error);
      setError(
        error instanceof Error ? error.message : "Error getting users count"
      );
      throw error;
    }
  };

  const userExists = async (userAddress: string): Promise<boolean> => {
    try {
      const provider = getProvider();
      const contract = new ethers.Contract(
        USER_FORM_CONTRACT_ADDRESS,
        userFormAbi,
        provider
      );
      return await contract.userDataExists(userAddress);
    } catch (error) {
      console.error("Error checking user existence:", error);
      setError(
        error instanceof Error ? error.message : "Error checking user existence"
      );
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        createUser,
        getAllUsers,
        getUserData,
        deleteUserData,
        getUsersCount,
        userExists,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
