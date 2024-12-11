import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Buying_page/Loading'
import { FaRegBookmark } from "react-icons/fa";
import { SlTag } from "react-icons/sl";
import { IoMdContact } from "react-icons/io";
import { CiPhone } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { SlSizeFullscreen } from "react-icons/sl";
import { StoreContext } from "../context/StoreContext";

const Single_Listing = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);

    const email = localStorage.getItem('user_email');

    const { addToFavorites, userEmail, setUserEmail } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleAddToFavorites = () => {
        console.log(`function called`, email, id);
        addToFavorites(email, id);
    }

    const handleContact = () => {
        setUserEmail(listing.createdBy.email);
        navigate('/contact');
    }

    const handleMortgage = (amount) => {
        navigate(`/mortgage-calculator?id=${id}&price=${amount}`)
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

    const changeIndex = (idx) => {
        setIndex(idx);
    }

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

    const { location, price, bedrooms, bathrooms, area, images, createdBy, category } = listing || {};

    return (
        <div className='w-[80vw] mx-auto mt-[2.8rem] h-[75vh] rounded-3xl flex justify-between items-center bg-white p-3 shadow-2xl '>

            {/* Left section: Property Image */}
            <div className='w-[55%] h-[100%] flex flex-col gap-2'>
                <div className="h-[75%]">
                    <img src={images[index]} className='h-[100%] w-[100%] rounded-2xl' alt="Property" />
                </div>
                <div className="h-[23.6%] flex justify-between">
                    <div className={`w-[19%] h-[100%] rounded-lg overflow-hidden ${index == 0 && 'bg-gray-100 brightness-[70%]'} cursor-pointer`} onClick={() => changeIndex(0)}>
                        <img src={images[0]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] rounded-lg overflow-hidden ${index == 1 && 'bg-gray-100 brightness-[70%]'} cursor-pointer`} onClick={() => changeIndex(1)}>
                        <img src={images[1]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] rounded-lg overflow-hidden ${index == 2 && 'bg-gray-100 brightness-[70%]'} cursor-pointer`} onClick={() => changeIndex(2)}>
                        <img src={images[2]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] rounded-lg overflow-hidden ${index == 3 && 'bg-gray-100 brightness-[70%]'} cursor-pointer`} onClick={() => changeIndex(3)}>
                        <img src={images[3]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                    <div className={`w-[19%] h-[100%] rounded-lg overflow-hidden ${index == 4 && 'bg-gray-100 brightness-[70%]'} cursor-pointer`} onClick={() => changeIndex(4)}>
                        <img src={images[4]} alt="" className="h-[100%] w-[100%]" />
                    </div>
                </div>
            </div>

            {/* Right section: Property and Seller Details */}
            <div className='w-[45%] h-[100%] flex flex-col pl-[30px] bg-white text-xl gap-6 justify-evenly'>
                
                {/* div-1 */}
                <div className="flex flex-col gap-1">
                    <div className="w-[95%] flex items-center justify-between">
                        <h1 className="text-[80px]">{location || 'N/A'}</h1>
                        <FaRegBookmark size={50} onClick={() => handleAddToFavorites()} className="cursor-pointer active:scale-75 transition duration-100" />
                    </div>
                    <div className="flex">
                        {category == 'selling' ? <span className="flex w-[10rem] ml-2 px-2 py-1 rounded-lg bg-slate-200 gap-2 items-center justify-center"><SlTag /><span>${price || 'N/A'}</span></span> : <span className="flex w-[10rem] ml-2 px-1 rounded-lg bg-slate-200 gap-2 items-center justify-center"><SlTag /><span>${price || 'N/A'} P/M</span></span>}
                        <span className="ml-2 px-2 py-1 rounded-lg bg-slate-200 gap-2 items-center justify-center" >CATEGORY : {category || 'N/A'}</span>
                    </div>
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

                <div className="flex gap-2 w-[100%]">
                    <button className="bg-slate-300 w-[15rem] py-2 rounded-lg hover:bg-[#4a73a1b1] ease-in-out duration-300 active:bg-slate-400" onClick={handleContact}>CONTACT OWNER</button>
                    {category == 'selling' && <button className="bg-slate-300 w-[15rem] py-2 rounded-lg hover:bg-[#4a73a1b1] ease-in-out duration-300 active:bg-slate-400" onClick={() => { handleMortgage(price) }}>CALCULATE MORTGAGE</button>}
                </div>

            </div>
        </div>
    );
}

export default Single_Listing;
