import { configureStore } from '@reduxjs/toolkit';
import { deleteFormDataReducer, formDataReducer, getFormDataReducer, getSingleFormDataReducer, personalReducer, updateFormDataReducer } from './reducer';

const store = configureStore({
  reducer: {
    formData : formDataReducer,
    getFormData: getFormDataReducer,
    getSingleFormData: getSingleFormDataReducer,
    deleteFormData: deleteFormDataReducer,
    updateFormData: updateFormDataReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
