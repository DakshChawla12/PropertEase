import React from 'react'
import styles from './FavoritePage.module.css'
import Side_Bar from '../Profile_Page/Side_Bar'
import MyFavorites from './MyFavorites'
import { ToastContainer } from 'react-toastify'

const FavoritePage = () => {
    return (
        <div className='flex w-full h-full'>
            <MyFavorites />
            <ToastContainer />
        </div>
    )
}

export default FavoritePage
