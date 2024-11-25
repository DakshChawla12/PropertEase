import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

const SignUp = () => {

    const navigate = useNavigate();

    const [signUpDetails, setSignUpDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contactNumber: '' // Add contact number to state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpDetails({ ...signUpDetails, [name]: value });
    };

    const handleSignUp = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, password, contactNumber } = signUpDetails;

    // Validate required fields
    if (!first_name || !last_name || !email || !password || !contactNumber) {
        return handleError('All fields are required');
    }

    // Generate the username
    const username = `${first_name} ${last_name}`;

    console.log('Payload being sent:', { username, email, password, contactNumber }); // Log the payload

    try {
        const url = "http://localhost:9090/auth/signup";
        const response = await axios.post(url, {
            username,
            email,
            password,
            contactNumber
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.data;
        const { message, success } = result;

        if (success) {
            handleSuccess("Sign Up successful");
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        } else {
            handleError(message);
        }
    } catch (err) {
        if (err.response) {
            handleError(err.response.data.message || "Sign Up failed");
        } else {
            handleError("Sign Up failed");
        }
    }
};


    return (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 bg-white rounded-lg mt-12">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h1>

                <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
                    Discover your dream home or sell your property with ease.
                </p>

                <form onSubmit={handleSignUp} className="mb-0 mt-4 space-y-4 rounded-lg p-4 shadow-lg sm:p-4 lg:p-6">
                    <p className="text-center text-lg font-medium">Create a new account</p>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="first-name" className="sr-only">First Name</label>
                            <input
                                type="text"
                                id="first-name"
                                className="w-full rounded-lg border-2 border-gray-200 p-2 text-sm shadow-md"
                                placeholder="First Name"
                                name='first_name'
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="last-name" className="sr-only">Last Name</label>
                            <input
                                type="text"
                                id="last-name"
                                className="w-full rounded-lg border-2 border-gray-200 p-2 text-sm shadow-md"
                                placeholder="Last Name"
                                name='last_name'
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full rounded-lg border-2 border-gray-200 p-2 text-sm shadow-md"
                            placeholder="Enter email"
                            name='email'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="contact-number" className="sr-only">Contact Number</label>
                        <input
                            type="text"
                            id="contact-number"
                            className="w-full rounded-lg border-2 border-gray-200 p-2 text-sm shadow-md"
                            placeholder="Enter contact number"
                            name='contactNumber'
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full rounded-lg border-2 border-gray-200 p-2 text-sm shadow-md"
                            placeholder="Enter password"
                            name='password'
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white"
                    >
                        Sign up
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Already have an account?
                        <Link to={'/login'} className='no-underline'> Sign in</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUp;
