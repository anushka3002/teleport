"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { deleteSingleFormDataAction, getSingleFormDataAction } from '../register/route';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { getSingleFormData } = useSelector(state => state.getSingleFormData)
  const {loading} = useSelector(state => state.deleteFormData)
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getSingleFormDataAction(''))
  }, [])

  const handleDeleteAccount = async () => {
    try {
      await Promise.all([
        dispatch(deleteSingleFormDataAction(getSingleFormData?.data?.emailId)),
      ]);
      localStorage.removeItem('personalFormData'),
        localStorage.removeItem('preferencesData'),
        localStorage.removeItem('accountFormData'),
        localStorage.removeItem('emailId')

      router.push('/register/step1');

    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="flex items-center justify-between bg-blue-500 p-4 text-white fixed w-full z-50">
      <div className="font-bold text-lg">Teleport</div>

      <div className="flex my-auto">
        <span className='my-auto mr-4 font-bold'>{getSingleFormData?.data?.personalDetails?.firstName}</span>
          <button onClick={handleDeleteAccount} className="block bg-red-500 rounded-lg px-4 py-2 text-white-600 transition-all duration-300 ease-in-out font-bold hover:bg-red-700 w-full text-left">
           {loading ? 'Deleting..' : 'Delete Account'} 
          </button>
      </div>
    </div>
  );
};

export default Navbar;
