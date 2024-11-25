import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {handleError , handleSuccess} from '../utils';
import { ToastContainer } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";

const Login = () => {

    const navigate = useNavigate();

    const [loginDetails , setLoginDetails] = useState({
        email:'',password:''
    });

    const handleChange =(e) => {
        const {name,value} = e.target;
        setLoginDetails({...loginDetails,[name]:value});
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const { email, password } = loginDetails;

        if (!email || !password) return handleError('All fields are required');    
        try {
            const url = "http://localhost:9090/auth/login";
            const response = await axios.post(url, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data); // Check the response data

            const { success, message, jwtToken, user } = response.data;

            if (success) {
                handleSuccess("Login successful");
                localStorage.setItem('token', jwtToken); // Check this line
                localStorage.setItem('loggedInUser', user.username);
                localStorage.setItem('user_email', user.email);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            } else {
                handleError(message);
            }
        } catch (err) {
            console.error("Login error:", err); // Detailed error logging
            handleError(err.response?.data?.message || "Login failed");
        }
    };


    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 mt-12 mb-0">
            <div className="relative max-w-lg mx-auto bg-white bg-opacity-80 rounded-lg">
                <div className="absolute inset-0 bg-white rounded-lg"></div>
                <div className="relative z-10 p-6">

                    <Link className='' to={'/'}>
                        <IoMdArrowRoundBack className='' />
                    </Link>

                    <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Welcome Back</h1>

                    <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                        Discover your dream home or sell your property with ease.
                    </p>

                    <form onSubmit={handleLogin} className="mb-0 mt-4 space-y-4 rounded-lg shadow-lg sm:p-4 lg:p-6">
                        <p className="text-center text-lg font-medium">Sign in to your account</p>

                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md"
                                    placeholder="Enter email"
                                    name='email'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>

                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full rounded-lg border-2 border-gray-200 p-3 pe-12 text-sm shadow-md"
                                    placeholder="Enter password"
                                    name='password'
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                        >
                            Sign in
                        </button>

                        <p className="text-center text-sm text-gray-500">
                            No account?
                            <Link to={'/signup'} className='no-underline'> Sign up</Link>
                        </p>
                    </form>
                    <ToastContainer /> 
                </div>
            </div>
        </div>
    )
}

export default Login;
