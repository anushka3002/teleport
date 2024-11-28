import { CREATE_FORM_DATA, CREATE_FORM_DATA_FAIL, CREATE_FORM_DATA_SUCCESS, DELETE_FORM_DATA, DELETE_FORM_DATA_FAIL,
     DELETE_FORM_DATA_SUCCESS, GET_FORM_DATA, GET_FORM_DATA_FAIL, GET_FORM_DATA_SUCCESS, 
     GET_SINGLE_FORM_DATA, 
     GET_SINGLE_FORM_DATA_FAIL, 
     GET_SINGLE_FORM_DATA_SUCCESS, 
     UPDATE_FORM_DATA, UPDATE_FORM_DATA_FAIL, UPDATE_FORM_DATA_SUCCESS } from "./constant";

export const formDataReducer = (state = {formData : []},action) =>{
    switch(action.type){
        case CREATE_FORM_DATA:
            return{
                loading: true,
                formData: []
            }
        case CREATE_FORM_DATA_SUCCESS:
            return{
                loading: false,
                formData: action.payload
            }
        case CREATE_FORM_DATA_FAIL:
            return{
                loading: false,
                formData: action.payload
            }
        default:
            return state;
    }
}

export const getFormDataReducer = (state = {getFormData : []},action) =>{
    switch(action.type){
        case GET_FORM_DATA:
            return{
                loading: true,
                getFormData: []
            }
        case GET_FORM_DATA_SUCCESS:
            return{
                loading: false,
                getFormData: action.payload
            }
        case GET_FORM_DATA_FAIL:
            return{
                loading: false,
                getFormData: action.payload
            }
        default:
            return state;
    }
}

export const getSingleFormDataReducer = (state = {getSingleFormData : []},action) =>{
    switch(action.type){
        case GET_SINGLE_FORM_DATA:
            return{
                loading: true,
                getSingleFormData: []
            }
        case GET_SINGLE_FORM_DATA_SUCCESS:
            return{
                loading: false,
                getSingleFormData: action.payload
            }
        case GET_SINGLE_FORM_DATA_FAIL:
            return{
                loading: false,
                getSingleFormData: action.payload
            }
        default:
            return state;
    }
}

export const deleteFormDataReducer = (state = {deleteFormData : []},action) =>{
    switch(action.type){
        case DELETE_FORM_DATA:
            return{
                loading: true,
                deleteFormData: []
            }
        case DELETE_FORM_DATA_SUCCESS:
            return{
                loading: false,
                deleteFormData: action.payload
            }
        case DELETE_FORM_DATA_FAIL:
            return{
                loading: false,
                deleteFormData: action.payload
            }
        default:
            return state;
    }
}

export const updateFormDataReducer = (state = {updateFormData : []},action) =>{
    switch(action.type){
        case UPDATE_FORM_DATA:
            return{
                loading: true,
                updateFormData: []
            }
        case UPDATE_FORM_DATA_SUCCESS:
            return{
                loading: false,
                updateFormData: action.payload
            }
        case UPDATE_FORM_DATA_FAIL:
            return{
                loading: false,
                updateFormData: action.payload
            }
        default:
            return state;
    }
}
