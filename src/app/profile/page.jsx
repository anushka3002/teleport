"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleFormDataAction, updateFormDataAction } from "../api/register/route";
import Image from "next/image";
import Navbar from "../api/navbar/page";
import { toast } from "react-toastify";

const Profile = () => {
  const [profileEdit, setProfileEdit] = useState(false);
  const [accountEdit, setAccountEdit] = useState(false);
  const [preferencesEdit, setPreferencesEdit] = useState(false);
  const [formData, setFormData] = useState(null);

  const { getSingleFormData } = useSelector((state) => state.getSingleFormData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleFormDataAction());
  }, []);

  useEffect(() => {
    if (getSingleFormData?.data) {
      setFormData(getSingleFormData.data);
    }
  }, [getSingleFormData]);

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const notify = () => toast.success('Profile update successfully')

  const handleSave = (section) => {
    const emailId = JSON.parse(localStorage.getItem("emailId"))
    if (section === "personalDetails") {
      localStorage.setItem("personalFormData", JSON.stringify(formData.personalDetails));
      setProfileEdit(false);
      const personalVal = {
        "personalDetails" : formData.personalDetails
      }
      dispatch(updateFormDataAction(personalVal, emailId))
    }
    if (section === "accountDetails") {
      localStorage.setItem("accountFormData", JSON.stringify(formData.accountDetails));
      setAccountEdit(false);
      const accountVal = {
        "accountDetails" : formData.accountDetails
      }
      dispatch(updateFormDataAction(accountVal, emailId))
    } 
    if (section === "preferences") {
      localStorage.setItem("preferencesData", JSON.stringify(formData.preferences));
      setPreferencesEdit(false);
      const preferencesVal = {
        "preferences" : formData.preferences
      }
      dispatch(updateFormDataAction(preferencesVal, emailId))
    } 
    notify()
  };

  const handleCancel = (section) => {
    setFormData(getSingleFormData.data);
    if (section === "personalDetails") setProfileEdit(false);
    if (section === "accountDetails") setAccountEdit(false);
    if (section === "preferences") setPreferencesEdit(false);
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-24">
        {/* Profile Details */}
        <div className="container mx-auto p-4 relative">
          <h2 className="text-3xl font-semibold mb-4">Profile Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {profileEdit ? (
              <>
                <div className="mb-4">
                  <strong>First Name:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.firstName}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "firstName", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Last Name:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.lastName}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "lastName", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Email:</strong>
                  <input
                    type="email"
                    value={formData.emailId}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "emailId", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Address:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.address}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "address", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>City:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.city}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "city", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>State:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.state}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "state", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Postal Code:</strong>
                  <input
                    type="text"
                    value={formData.personalDetails.postalCode}
                    onChange={(e) =>
                      handleInputChange("personalDetails", "postalCode", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <button
                  onClick={() => handleSave("personalDetails")}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("personalDetails")}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <strong>First Name:</strong> {formData.personalDetails.firstName}
                </div>
                <div className="mb-4">
                  <strong>Last Name:</strong> {formData.personalDetails.lastName}
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> {formData.emailId}
                </div>
                <div className="mb-4">
                  <strong>Address:</strong> {formData.personalDetails.address}
                </div>
                <div className="mb-4">
                  <strong>City:</strong> {formData.personalDetails.city}
                </div>
                <div className="mb-4">
                  <strong>State:</strong> {formData.personalDetails.state}
                </div>
                <div className="mb-4">
                  <strong>Postal Code:</strong> {formData.personalDetails.postalCode}
                </div>
                <div
                  onClick={() => setProfileEdit(true)}
                  className="absolute right-6 top-20 cursor-pointer"
                >
                  <Image src="/edit.webp" width={30} height={30} alt="Edit" />
                </div>
              </>
            )}
          </div>
        </div>


        {/* Account Details */}
        <div className="container mx-auto p-4 relative">
          <h2 className="text-3xl font-semibold mb-4">Account Details</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {accountEdit ? (
              <>
                <div className="mb-4">
                  <strong>Bank Name:</strong>
                  <input
                    type="text"
                    value={formData.accountDetails.bankName}
                    onChange={(e) =>
                      handleInputChange("accountDetails", "bankName", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Account Number:</strong>
                  <input
                    type="text"
                    value={formData.accountDetails.accountNumber}
                    onChange={(e) =>
                      handleInputChange("accountDetails", "accountNumber", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>IFSC Code:</strong>
                  <input
                    type="text"
                    value={formData.accountDetails.ifscCode}
                    onChange={(e) =>
                      handleInputChange("accountDetails", "ifscCode", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Account Type:</strong>
                  <input
                    type="text"
                    value={formData.accountDetails.accountType}
                    onChange={(e) =>
                      handleInputChange("accountDetails", "accountType", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <button
                  onClick={() => handleSave("accountDetails")}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("accountDetails")}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <strong>Bank Name:</strong> {formData.accountDetails.bankName}
                </div>
                <div className="mb-4">
                  <strong>Account Number:</strong> {formData.accountDetails.accountNumber}
                </div>
                <div className="mb-4">
                  <strong>IFSC Code:</strong> {formData.accountDetails.ifscCode}
                </div>
                <div className="mb-4">
                  <strong>Account Type:</strong> {formData.accountDetails.accountType}
                </div>
                <div
                  onClick={() => setAccountEdit(true)}
                  className="absolute right-6 top-20 cursor-pointer"
                >
                  <Image src="/edit.webp" width={30} height={30} alt="Edit" />
                </div>
              </>
            )}
          </div>
        </div>


        {/* Preferences */}
        <div className="container mx-auto p-4 relative">
          <h2 className="text-3xl font-semibold mb-4">Preferences</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {preferencesEdit ? (
              <>
                <div className="mb-4">
                  <strong>Notifications:</strong>
                  <input
                    type="text"
                    value={formData.preferences.notifications}
                    onChange={(e) =>
                      handleInputChange("preferences", "notifications", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Theme:</strong>
                  <input
                    type="text"
                    value={formData.preferences.theme}
                    onChange={(e) =>
                      handleInputChange("preferences", "theme", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <div className="mb-4">
                  <strong>Language:</strong>
                  <input
                    type="text"
                    value={formData.preferences.language}
                    onChange={(e) =>
                      handleInputChange("preferences", "language", e.target.value)
                    }
                    className="border rounded px-2 py-1 ml-2"
                  />
                </div>
                <button
                  onClick={() => handleSave("preferences")}
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handleCancel("preferences")}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <strong>Notifications:</strong> {formData.preferences.notifications}
                </div>
                <div className="mb-4">
                  <strong>Theme:</strong> {formData.preferences.theme}
                </div>
                <div className="mb-4">
                  <strong>Language:</strong> {formData.preferences.language}
                </div>
                <div
                  onClick={() => setPreferencesEdit(true)}
                  className="absolute right-6 top-20 cursor-pointer"
                >
                  <Image src="/edit.webp" width={30} height={30} alt="Edit" />
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;

