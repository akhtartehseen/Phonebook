import {
    CREATECONTACT, CREATECONTACTSUCCESS, CREATECONTACTFAILURE, GETCONTACTLIST, GETCONTACTLISTFAILURE,
    GETCONTACTLISTSUCCESS, FIRSTNAMECHANGE, LASTNAMECHANGE, PHONENUMBERCHANGE, EMAILCHANGE,
    ALTERNATENUMBERCHANGE, ADDRESSCHANGE, SEARCHTEXTCHANGE, SEARCHTEXT, SEARCHTEXTSUCCESS,
    SEARCHTEXTFAILURE, CLEAR
    } from '../../lib/constants';


const INITIAL_STATE = { 
  data: {},
  firstname: '',
  lastname: '',
  contactno: '',
  alternateno: '',
  email: '',
  address: '',
  error: '',
  isLoading: true,
  searchText: '',
};

const homeReducer = (state = INITIAL_STATE, action) => {
    console.log(action, state)
    console.log('response reducer==', state.data);

    switch (action.type) {
        case EMAILCHANGE:
        return { ...state, email: action.payload };
        case FIRSTNAMECHANGE:
        return { ...state, firstname: action.payload };
        case LASTNAMECHANGE:
        return { ...state, lastname: action.payload };
        case PHONENUMBERCHANGE:
            return{ ...state, contactno: action.payload };
        case ALTERNATENUMBERCHANGE:
            return{ ...state, alternateno: action.payload };
        case ADDRESSCHANGE:
            return{ ...state, address: action.payload };        
        case CLEAR:
        return {...state, email: '', firstname: '',
         lastname: '',  error: '', address: '', contactno: '', alternateno: '' }
        case GETCONTACTLIST:
        return { ...state,  isLoading: true };
        case GETCONTACTLISTSUCCESS:
        return { ...state, data: action.payload, isLoading: false };
        case GETCONTACTLISTFAILURE:
        return { ...state, error: action.payload, isLoading: false, data: {} };
        case CREATECONTACT:
            return {
                ...state,
                isLoading: true,
            };
        case CREATECONTACTSUCCESS: 
          return {
              ...state,
               data: action.payload,
               isLoading: false
          }
        case CREATECONTACTFAILURE: 
        return {
           ...state,
           isLoading: false,
           error: action.payload
        }
        case SEARCHTEXTCHANGE: 
            return {
               ...state, search: action.payload,
            }
        default:
            return state;
    }
};

export default homeReducer;