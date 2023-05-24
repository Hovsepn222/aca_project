import React,{useState} from 'react'
import axios from 'axios';
import { apiUrl } from '../../apiConfig';
import "./Login.css"
import getToken, {setToken, removeToken} from '../useToken'
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/logInStatus';
import {useDispatch, useSelector} from "react-redux";


export function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = {
        "email": email,
        "password": password
      };
      try {
        const response = await axios.post(`${apiUrl}/login`, formData);
        // console.log(response.data); // Handle the response from the backend
        setToken(response.data["access_token"]);
        dispatch(login());
        navigate('/mylistings');
      } catch (err) {
        setError(err.response.data['error'])
        removeToken()
      }
    };

    return (
        <>
            <div className="container">
                <section id="content">
                    <form onSubmit={handleSubmit}>
                        <h1>Login</h1>
                        <div>
                            <input 
                            type="text" 
                            placeholder="Email" 
                            required="" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div>
                            <input 
                            type="password" 
                            placeholder="Password" 
                            required="" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                             />
                        </div>
                        <div>
                            <input type="submit" value="Log in" />
                            <a href="/signup">Register</a>
                        </div>
                        {error && <p className="error-message">{error}</p>} {/* Render the error message */}
                    </form>
                </section>
            </div>
        </>
    )
}
