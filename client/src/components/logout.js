import React, {useEffect} from "react";
import {removeToken} from './useToken';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/logInStatus';
import {useDispatch, useSelector} from "react-redux";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); 
    useEffect(() => {
        navigate('/')
    }, [])

    dispatch(logout());
    removeToken();
    
}

export default Logout