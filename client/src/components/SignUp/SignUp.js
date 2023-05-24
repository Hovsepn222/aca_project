import React, {useState} from 'react'
import "./SignUp.css"
import { apiUrl } from '../../apiConfig';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../../redux/logInStatus';
import {useDispatch, useSelector} from "react-redux";

export function SignUp(props) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
      event.preventDefault();
        const formData = {
        "name": name,
        "email": email,
        "password": password,
        "confirmPassword":confirmPassword,
        "phone_number": phoneNumber
    }
    
      try {
        const response = await axios.post(`${apiUrl}/signup`, formData);
        console.log(response.data); // Handle the response from the backend
        localStorage.setItem('token', response.data["access_token"]);
        dispatch(login())
        navigate('/mylistings');
      } catch (err) {
        setError(err.response.data['error']);
        console.error(error);
        // Handle the error
      }
    };

    return (
            <div className="container">
                <section id="content">
                    <form onSubmit={handleSubmit}>
                        <h1>SignUp</h1>
                        <div>
                            <input 
                            type="text" 
                            placeholder="Name" 
                            required="" 
                            id="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            required="" 
                            id="password2" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
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
                            type="phoneNumber"
                            placeholder="Phone Number" 
                            required="" 
                            id="phoneNumber" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                            type="submit" 
                            value="Registrat" />
                            <a href="#">Login</a>
                        </div>
                        {error && <p className="error-message">{error}</p>} {/* Render the error message */}
                    </form>
                </section>
            </div>
    )
} 