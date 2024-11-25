import React from 'react'
import My_listings from './My_listings'
import Side_Bar from '../Profile_Page/Side_Bar'
import { ToastContainer } from 'react-toastify'

const Page = () => {
  return (
    <div className='flex w-full h-full'>
      <My_listings/>
      <ToastContainer/>
    </div>
  )
}

export default Page;