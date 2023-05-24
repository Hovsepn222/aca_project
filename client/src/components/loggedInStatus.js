import store from '../redux/store'
import getToken, {removeToken} from './useToken';
import { apiUrl } from '../apiConfig';
import React, { useState } from "react";
import { Navigate } from 'react-router-dom';


export const UserLoggedStatus = () => {
    const state = store.getState();
    const loggedStatus = state.user.logged

    if (loggedStatus === true && getToken()) {return true;}
    else {return false;}
  }

  export const GetLoggedUserData = async () => {
    try {
      const res = await fetch(`${apiUrl}/loggeddata`, {
        method: "POST",
        mode: 'cors',
        headers: {
          Authorization: 'Bearer ' + getToken()
        }
      });
      
      if (!res.ok) {
        throw new Error('Request failed'); 
      }
      
      const jsonData = await res.json();
      return jsonData;
    } catch (err) {
      removeToken();
      return { error: err.message };
    }
}
  