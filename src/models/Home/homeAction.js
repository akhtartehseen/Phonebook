import {
    CREATECONTACT, CREATECONTACTSUCCESS, CREATECONTACTFAILURE, GETCONTACTLIST, GETCONTACTLISTFAILURE,
    GETCONTACTLISTSUCCESS, FIRSTNAMECHANGE, LASTNAMECHANGE, EMAILCHANGE, PHONENUMBERCHANGE,
    ALTERNATENUMBERCHANGE, ADDRESSCHANGE, SEARCHTEXTCHANGE, SEARCHTEXT, SEARCHTEXTFAILURE,
    SEARCHTEXTSUCCESS, CLEAR
    } from '../../lib/constants';

 import { insertContact, getPrimaryId, listContact, search } from '../../database/homeSchema';   

   // id = getPrimaryId();

   

    export function createContactRequest() {
        return {
          type: CREATECONTACT
        }
      }
      
      export function createContactSuccess(data) {
        return {
          type: CREATECONTACTSUCCESS,
          payload: data
        }
      }   

      export function createContactFailure(error) {
        return {
          type: CREATECONTACTFAILURE,
          payload: error
        }
      }   

export function onCreateContact(newContact) {
    return async function (dispatch) {
      try {
        dispatch(createContactRequest())
         const response = await insertContact(newContact)
         let contact = await listContact();
        dispatch(createContactSuccess(contact))
      } catch (error) {
       dispatch(createContactFailure(error))
      }
    }
  }

  export function getContact() {
    return async function (dispatch) {
      try {
        dispatch(getContactRequest())
         const response = await listContact()
         console.log('contact list ==>', response)
        dispatch(getContactSuccess(response))
      } catch (error) {
       dispatch(getContactFailure(error))
      }
    }
  }

  export function getContactRequest() {
    return {
      type: GETCONTACTLIST
    }
  }
  
  export function getContactSuccess(data) {
    return {
      type: GETCONTACTLISTSUCCESS,
      payload: data
    }
  }   

  export function getContactFailure(error) {
    return {
      type: GETCONTACTLISTFAILURE,
      payload: error
    }
  }   

  export const onFirstNameChange = (text) => ({
    type: FIRSTNAMECHANGE,
    payload: text
  });

  export const onLastNameChange = (text) => ({
    type: LASTNAMECHANGE,
    payload: text
  })

  export const onPhoneNumberChange = (text) =>  ({
    type: PHONENUMBERCHANGE,
    payload: text
  });

  export const onAlternateNumberChange = (text) => ({
    type: ALTERNATENUMBERCHANGE,
    payload: text
  })

  export const onEmailChange = (text) => ({
    type: EMAILCHANGE,
    payload: text
  })

  export const onAddressChange = (text) => ({
    type: ADDRESSCHANGE,
    payload: text
  })

  export const onSearchChange = (text) => ({
    type: SEARCHTEXTCHANGE,
    payload: text
  })

  export const clear = (text) => ({
    type: CLEAR,
  })

  export function searchContact(text) {
    return async function (dispatch) {
      try {
        dispatch(getContactRequest())
         const response = await search(text)
         console.log('contact list ==>', response)
        dispatch(getContactSuccess(response))
      } catch (error) {
       dispatch(getContactFailure(error))
      }
    }
  }