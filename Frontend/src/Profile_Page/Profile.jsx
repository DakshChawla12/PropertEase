import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

const Profile = () => {
    const { user, getUserData, setUser } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token');

    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile);
    };

    useEffect(() => {
        if (token) {
            getUserData(email);
        }
    }, [token]);


    const handleUpload = async () => {
        if (!selectedFile) {
            handleError("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('email', email);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        try {
            const response = await axios.post('http://localhost:9090/user/setPhoto', formData);

            if (response.data.success) {
                console.log(response.data.profilePhotoUrl);
                setUser(response.data.updatedUser)
                handleSuccess('profile photo updated');
            }
        } catch (error) {
            console.error('Error uploading photo:', error);
            handleError('Error uploading photo');
        }
    };


    return (
        <div className='h-[100vh] flex-grow bg-[#D9D9D9]'>
            <div className='h-[50%] flex items-center pl-24'>
                <img className='h-[300px] w-[300px] rounded-full' src={user?.URL || '/no_photo.webp'} />
                <div className='flex flex-col'>
                    <input type="file" className='ml-5 w-[60%] hover:cursor-pointer' onChange={handleFileChange} />
                    <button className='bg-orange-400 w-36 ml-5 mt-3' onClick={() => handleUpload()}>Change photo</button>
                </div>
            </div>

            <div className='h-[50%] w-[100%] flex items-center text-2xl pl-24 font-semibold'>
                <div className='w-[50%] h-[80%] flex flex-col items-start justify-center'>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>{user?.username || "Username not available"}</p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>{user?.contactNumber || "Contact not available"}</p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>{user?.email || "Email not available"}</p>
                    </div>
                </div>

                <div className='w-[50%] h-[80%] flex flex-col items-start mt-[70px]'>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>
                            My Listings: {user?.listings?.length || 0}
                        </p>
                    </div>
                    <div className='h-[25%] w-[40%]'>
                        <p className='w-[100%] border-b-2 border-black pb-3'>
                            My Favorites: {user?.favorites?.length || 0}
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Profile;
