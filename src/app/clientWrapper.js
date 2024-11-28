'use client'; 

import { Provider } from 'react-redux';
import store from '../redux/store'; 
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
