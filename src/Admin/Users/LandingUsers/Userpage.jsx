import React from 'react'
import AdminDashNavbar from '../../Dashboard/AdminDashNavbar'
import AdminDashbarHor from '../../Dashboard/AdminDashbarHor'
import Users from './Users'

const Userpage = () => {
  return (
    <div className='flex bg-[#ddf4fc]'>
      <AdminDashNavbar/>
      <div>
        <AdminDashbarHor/>
        <Users/>
      </div>
    </div>
  )
}

export default Userpage
