"use client";

import React, { useState } from "react";
import { useAppContext } from "./components/context/formContextApi";
import ConnectButton from "./components/Button";
import UsersList from "./components/UsersList";
interface FormData {
  firstname: string;
  lastname: string;
  sex: string;
  age: number;
  location: string; // Changed from address to location to match contract
}

const FormComponent: React.FC = () => {
  const { createUser, loading, error, getAllUsers } = useAppContext();
  const [formData, setFormData] = useState<FormData>({
    firstname: "",
    lastname: "",
    sex: "",
    age: 0,
    location: "",
  });

  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear status messages when user starts typing again
    setSubmitStatus(null);
  };

  const validateForm = () => {
    if (!formData.firstname.trim()) return "First name is required";
    if (!formData.lastname.trim()) return "Last name is required";
    if (!formData.sex) return "Sex is required";
    if (!formData.age.toString().trim()) return "Age is required";
    if (isNaN(Number(formData.age))) return "Age must be a number";
    if (Number(formData.age) < 0 || Number(formData.age) > 150)
      return "Please enter a valid age";
    if (!formData.location.trim()) return "Location is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({
        success: false,
        message: validationError,
      });
      return;
    }

    console.log(formData, "in handle submit");

    try {
      await createUser(formData);

      setSubmitStatus({
        success: true,
        message: "User data submitted successfully!",
      });

      // Reset form after successful submission
      setFormData({
        firstname: "",
        lastname: "",
        sex: "",
        age: 0,
        location: "",
      });
    } catch (err) {
      setSubmitStatus({
        success: false,
        message: error || "Error submitting form. Please try again.",
      });
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto p-4 bg-white mt-20 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">User Information</h2>

        {/* Status Messages */}
        {submitStatus && (
          <div
            className={`p-3 mb-4 rounded ${
              submitStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

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
              required
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
              required
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
              required
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
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="0"
              max="150"
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-white rounded-full shadow-sm ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
            <ConnectButton />
          </div>
        </form>
      </div>
      <UsersList />
    </div>
  );
};

export default FormComponent;
