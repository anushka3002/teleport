import { CREATE_FORM_DATA, CREATE_FORM_DATA_FAIL, CREATE_FORM_DATA_SUCCESS, DELETE_FORM_DATA, DELETE_FORM_DATA_FAIL, DELETE_FORM_DATA_SUCCESS, GET_FORM_DATA, GET_FORM_DATA_FAIL, GET_FORM_DATA_SUCCESS, GET_SINGLE_FORM_DATA, GET_SINGLE_FORM_DATA_FAIL, GET_SINGLE_FORM_DATA_SUCCESS, UPDATE_FORM_DATA, UPDATE_FORM_DATA_FAIL, UPDATE_FORM_DATA_SUCCESS } from "@/redux/constant"
import axios from "axios"

export const formData = (router, notify) => async (dispatch) =>{
  try{
      dispatch({
          type: CREATE_FORM_DATA
      })
      const emailId = JSON.parse(localStorage.getItem('emailId'))
      const accountDetails = JSON.parse(localStorage.getItem('accountFormData'))
      const personalDetails = JSON.parse(localStorage.getItem('personalFormData'))
      const preferences = JSON.parse(localStorage.getItem('preferencesData'))

      const formData = {
        emailId,
        personalDetails,
        accountDetails,
        preferences
      }

      const data = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register`,formData)
      dispatch({
          type: CREATE_FORM_DATA_SUCCESS,
          payload: data
      })
      router.push('/profile')
      notify('Form submitted successfully')
  }catch(error){
      dispatch({
          type: CREATE_FORM_DATA_FAIL,
          payload: error
      })
      notify('Something went wrong. Please fill required fields')
  }
}

export const getFormDataAction = () => async (dispatch) =>{
    try{
        dispatch({
            type: GET_FORM_DATA
        })
        const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register`)
        dispatch({
            type: GET_FORM_DATA_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: GET_FORM_DATA_FAIL,
            payload: error
        })
    }
  }

  export const getSingleFormDataAction = (email) => async (dispatch) =>{
    try{
        dispatch({
            type: GET_SINGLE_FORM_DATA
        })
        const emailId = JSON.parse(localStorage.getItem('emailId'))
        const data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/register/${email ? email : emailId}`)
        dispatch({
            type: GET_SINGLE_FORM_DATA_SUCCESS,
            payload: data
        })
        return data;
    }catch(error){
        dispatch({
            type: GET_SINGLE_FORM_DATA_FAIL,
            payload: error
        })
    }
  }

  export const deleteSingleFormDataAction = (emailId) => async (dispatch) =>{
    try{
        dispatch({
            type: DELETE_FORM_DATA
        })
        const data = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/register/${emailId}`)
        dispatch({
            type: DELETE_FORM_DATA_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: DELETE_FORM_DATA_FAIL,
            payload: error
        })
    }
  }

  export const updateFormDataAction = (formData,emailId) => async (dispatch) =>{
    try{
        dispatch({
            type: UPDATE_FORM_DATA
        })
        const data = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/register/${emailId}`,formData)
        dispatch({
            type: UPDATE_FORM_DATA_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: UPDATE_FORM_DATA_FAIL,
            payload: error
        })
    }
  }

