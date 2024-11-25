import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg"; 
import { CiViewList } from "react-icons/ci";  
import { FaRegStar } from "react-icons/fa";   

const Side_Bar = () => {
    const navigate = useNavigate();
    const [currTab, setCurrTab] = useState('');

    const handleLogout = () => {
        console.log(`User ${localStorage.getItem('loggedInUser')} successfully logged out`);
        localStorage.clear();
        navigate('/login');
    };

    const handleTabChange = (tab) => {
        setCurrTab(tab);
        navigate(tab); // Navigate to the selected tab's route
    };

    return (
        <div className='bg-[#699bbf] h-[100vh] w-[18%] flex flex-col pt-10 justify-between'>
            <div className='flex flex-col h-[40%] gap-4 pl-4 text-2xl text-white'>
                <div
                    className={`h-[25%] w-[80%] border-b-2 pl-2 cursor-pointer `}
                    onClick={() => handleTabChange('/')}
                >
                    <p className={`h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200`}>
                        Home
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[80%] border-b-2 pl-2 cursor-pointer flex `}
                    onClick={() => handleTabChange('/profile')}
                >
                    {currTab == '/profile' && <CgProfile className='mt-1'/>}
                    <p className={`h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 ${currTab === '/profile' ? 'ml-4' : ''}`}>
                        Profile
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[80%] border-b-2 pl-2 cursor-pointer flex`}
                    onClick={() => handleTabChange('/myListings')}
                >
                    {currTab == '/myListings' && <CiViewList  className='mt-1'/>}
                    <p className={`h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 ${currTab === '/myListings' ? 'ml-4' : ''}`}>
                        My Listings
                    </p>
                </div>

                <div
                    className={`h-[25%] w-[80%] pl-2 cursor-pointer flex`}
                    onClick={() => handleTabChange('/myFavorites')}
                >
                    {currTab == '/myFavorites' && <FaRegStar  className='mt-1' />}
                    <p className={`h-[100%] w-[100%] hover:ml-4 transition-all ease-in-out duration-200 ${currTab === '/myFavorites' ? 'ml-4' : ''}`}>
                        My Favorites
                    </p>
                </div>
            </div>

            <div className='self-center w-[100%] h-16 flex justify-center' onClick={handleLogout}>
                <button className='text-white bg-red-700 w-[100%] h-[100%] flex justify-center items-center text-2xl hover:bg-red-800 transition-all duration-150'>
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Side_Bar;
