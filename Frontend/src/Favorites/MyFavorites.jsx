import React, { useEffect, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import Listing from './Listing';
import styles from './MyFavorites.module.css';

const MyFavorites = () => {
    const { myFavorites, fetchMyFavorites } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token'); // Check for token in localStorage

    useEffect(() => {
        if (token) { // Only fetch favorites if the token is present
            fetchMyFavorites(email);
        }
    }, [token]); // Include 'token' in the dependencies array

    return (
        <div className='flex flex-col flex-grow gap-5'>
            <h1 className='ml-20 text-5xl mt-5'>My Favorites</h1>
            <div className={styles.container}>
                {myFavorites.length > 0 ? (
                    myFavorites.map((listing) => (
                        <Listing
                            key={listing._id}
                            id={listing._id}
                            url={listing.images[0]}
                            location={listing.location}
                            bedrooms={listing.bedrooms}
                            bathrooms={listing.bathrooms}
                            area={listing.area}
                            price={listing.price}
                        />
                    ))
                ) : (
                    <p>No favorites available</p> // Optional: show a message when no favorites are found
                )}
            </div>
        </div>
    );
};

export default MyFavorites;
