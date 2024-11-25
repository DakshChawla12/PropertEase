import React from 'react';
import { useNavigate } from 'react-router-dom';
import {handleError} from '../utils';
import { ToastContainer } from 'react-toastify';

const Post = ({ id, url, location, bedrooms, bathrooms, area, price }) => {
    const navigate = useNavigate();

    const handlePostClick = () => {
        if(!localStorage.getItem('token')){
            console.log("error");
            handleError("please login to view full details");
            return;
        }
        navigate(`/details/${id}`); // Redirect to the details page based on the ID
    };

    return (
        <div 
            className="w-[350px] h-76 rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer" 
            onClick={handlePostClick}
        >
            <img className="w-full h-40 object-cover" src={url} alt="Property Image" loading='lazy'/>
            <div className="px-4 py-2 bg-white">
                <div className="mb-2">
                    <h2 className="text-lg font-bold text-blue-800">{location}</h2>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/windows/24/null/bedroom.png" />
                        <p className="ml-2 text-xs font-medium text-gray-800">{`${bedrooms} bedrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" />
                        <p className="ml-2 text-xs font-medium text-gray-800">{`${bathrooms} bathrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" />
                        <p className="ml-2 text-xs font-medium text-gray-800">{`${area} sq m`}</p>
                    </div>
                </div>
                <div className="mt-2">
                    <p className="text-2xl font-extrabold text-blue-800">{`${price} $ `}</p>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Post;
