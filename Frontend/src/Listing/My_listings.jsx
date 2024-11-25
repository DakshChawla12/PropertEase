import React, { useContext, useEffect } from 'react';
import Listing from './Listing';
import styles from './My_listings.module.css';
import { StoreContext } from '../context/StoreContext';

const My_listings = () => {
    const { myListings, fetchMyListings } = useContext(StoreContext);
    const email = localStorage.getItem('user_email');
    const token = localStorage.getItem('token'); // Check for token in localStorage

    useEffect(() => {
        if (token) { // Only fetch listings if the token is present
            fetchMyListings(email);
        }
    }, [myListings, token]); // Include 'token' in the dependencies array

    return (
        <div className='flex flex-col flex-grow gap-5'>
        <h1 className='ml-20 text-5xl mt-5'>My Listings</h1>
        <div className={styles.container}>
            {myListings.length > 0 ? (
                myListings.map((listing) => (
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
                <p>No listings available</p>
            )}
        </div>
        </div>
    );
}

export default My_listings;
