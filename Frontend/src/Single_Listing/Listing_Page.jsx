import React from 'react'
import NavBar from '../LandingPage/NavBar'
import Single_Listing from './Single_Listing'
import { ToastContainer } from 'react-toastify'

const Listing_Page = () => {
    return (
        <div className='h-[100vh] bg-slate-200'>
            <NavBar/>
            <Single_Listing/>
            <ToastContainer/>
        </div>
    )
}

export default Listing_Page
