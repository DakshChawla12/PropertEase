import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading'
import { FaRegBookmark } from "react-icons/fa";
import { SlTag } from "react-icons/sl";
import { IoMdContact } from "react-icons/io";
import { CiPhone } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { SlSizeFullscreen } from "react-icons/sl";
import { StoreContext } from "../context/StoreContext";

const Single_Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const email = localStorage.getItem('user_email');

    const {addToFavorites} = useContext(StoreContext);

    const handleAddToFavorites = () => {
        console.log(`function called`,email,id);
        addToFavorites(email,id);
    }

    // Fetch listing details
    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/buy/${id}`);
            setListing(response.data.listing); 
        } catch (err) {
            setError('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">
            <div className=''>
                <Loading />
            </div>
        </div>
    }

    if (error) {
        return <div>{error}</div>;
    }

    const { location, price, bedrooms, bathrooms, area, images, createdBy } = listing || {};

    return (
        <div className='w-[90vw] m-auto h-[75vh] flex justify-center items-center bg-slate-200'>

            {/* Left section: Property Image */}
            <div className='w-[45%] h-[100%]'>
                {/* Conditional rendering to check if images exist */}
                {images && images.length > 0 ? (
                    <img src={images[0]} className='h-[100%] w-[100%]' alt="Property" />
                ) : (
                    <p>No image available</p>
                )}
            </div>

            {/* Right section: Property and Seller Details */}
            <div className='w-[40%] h-[100%] flex flex-col px-8 bg-white text-xl gap-6 justify-evenly'>

                {/* div-1 */}
                <div className="flex flex-col gap-2">
                    <FaRegBookmark size={40} onClick={()=>handleAddToFavorites()}   className="cursor-pointer active:scale-75 transition duration-100"/>
                    <h1 className="text-[80px]">{location || 'N/A'}</h1>
                    <span className="flex w-[115px] ml-2 px-1 rounded-sm bg-slate-200 gap-2 items-center justify-start"><SlTag /><span>${price || 'N/A'}</span></span>
                </div>

                {/* div-2 */}
                <div className="flex flex-col ml-2 gap-8">
                    <div className="flex items-center gap-16">
                        <div className="flex flex-col items-start">
                            <p className="m-0">BEDROOM</p>
                            <div className="flex gap-2 items-center justify-start"><IoBedOutline /><span>{bedrooms || 'N/A'}</span></div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="m-0">BATHROOM</p>
                            <div className="flex gap-2 items-center justify-start"><TbBath /><span>{bathrooms || 'N/A'}</span></div>
                        </div>
                        <div className="flex flex-col items-start">
                            <p className="m-0">AREA</p>
                            <div className="flex gap-2 items-center justify-start"><SlSizeFullscreen /><span>{area || 'N/A'} sq m</span></div>
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">SELLER DETAILS</p>
                        <div className="flex flex-col gap-2">
                            <div className="flex w-[200px] gap-2 items-center justify-start"><IoMdContact />{createdBy?.username || 'N/A'}</div>
                            <div className="flex w-[200px] gap-2 items-center justify-start"><CiPhone />{createdBy?.contactNumber || 'N/A'}</div>
                            <div className="flex w-[200px] gap-2 items-center justify-start"><img className="h-[20px]" src="/mail-icon.png" /> {createdBy?.email || 'N/A'}</div>
                        </div>
                    </div>

                </div>

                <div className="ml-2">
                    <button className="bg-slate-300 px-5 py-2 rounded-sm active:bg-slate-400">CONTACT OWNER</button>
                </div>

            </div>
        </div>
    );
}

export default Single_Listing;
