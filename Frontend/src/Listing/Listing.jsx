import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { handleSuccess,handleError } from '../utils';

const Listing = ({ id, url, location, bedrooms, bathrooms, area, price }) => {
    const { setMyListings } = useContext(StoreContext);

    const handleDeleteListing = async () => {
        try {
            const email = localStorage.getItem('user_email');
            const URL = `http://localhost:9090/buy/${id}`;
            const response = await axios.delete(URL, {
                headers: {
                    'Content-Type': 'application/json',
                },
                data: {
                    email: email  // Send email in the request body
                }
            });
            console.log(response.data.updatedListings);
            // Update listings in the context
            setMyListings(response.data.updatedListings);
            handleSuccess('listing deleted successfully');
        } catch (err) {
            handleError('failed to delete listing');
            console.log("Error deleting listing", err);
        }
    };

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
                <img className='h-15 hover:scale-110 duration-200' src='delete-button.png' onClick={handleDeleteListing} alt="Delete Listing" />
            </div>

        </div>
    );
};

export default Listing;
