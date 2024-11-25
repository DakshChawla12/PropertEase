import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price }) => {

    const email = localStorage.getItem('user_email');
    const {deleteFromFavorites} = useContext(StoreContext);

    const handleDeleteFromFavorites = () => {
        deleteFromFavorites(email,id);
    }

    return (
        <div className="flex w-[90%] h-[250px] rounded overflow-hidden shadow-lg hover:shadow-xl cursor-pointer justify-between">

            <img className="h-[250px] w-auto  object-cover" src={url} alt="Property Image" loading='lazy' />

            <div className="px-6 py-4 bg-white flex flex-col justify-evenly w-[50%]">
                <div className='flex justify-between items-center'>
                    <h2 className="text-[50px] font-bold text-blue-800">{location}</h2>
                    <p className="text-[35px] font-extrabold text-blue-800">{`${price} $ `}</p>
                </div>

                <div className="flex justify-between gap-10 ">
                    <div className="flex items-center justify-start">
                        <img src="https://img.icons8.com/windows/24/null/bedroom.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${bedrooms} bedrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/pastel-glyph/24/null/bath--v2.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${bathrooms} bathrooms`}</p>
                    </div>
                    <div className="flex items-center">
                        <img src="https://img.icons8.com/ios-glyphs/24/null/expand--v1.png" />
                        <p className="mt-3 ml-2 text-lg font-medium text-gray-800">{`${area} sq m`}</p>
                    </div>
                </div>
                
            </div>

            <div className="flex px-14 border-l-2 border-gray-200 h-[80%] justify-center items-center self-center">
                <img className='h-15 hover:scale-110 duration-200' src='delete-button.png' alt="Delete Listing" onClick={()=>handleDeleteFromFavorites()}/>
            </div>

        </div>
    );
};

export default Listing;
