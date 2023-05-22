import React from "react";
import {removeToken} from './useToken';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    removeToken();
    navigate('/')
}

export default Logout