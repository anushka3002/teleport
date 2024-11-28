// src/app/ClientWrapper.js (Client component)
'use client';  // This makes this file a client component

import { Provider } from 'react-redux';
import store from '../redux/store'; // Import the Redux store
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientWrapper({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer position="bottom-right"/>
    </Provider>
  );
}
