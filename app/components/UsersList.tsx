// components/UsersList.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useAppContext } from "./context/formContextApi";

interface User {
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  location: string;
}

const UsersList: React.FC = () => {
  const { getAllUsers } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Registered Users</h2>
        <button
          onClick={fetchUsers}
          disabled={loading}
          className={`px-4 py-2 rounded-full text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Refreshing..." : "Refresh Users"}
        </button>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      {!loading && users.length === 0 && (
        <p className="text-gray-500 text-center py-4">No users found</p>
      )}

      <div className="grid gap-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{user.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sex</p>
                <p className="font-medium">{user.sex}</p>
              </div>
              <div className="col-span-2 md:col-span-3">
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{user.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
