import React from 'react'
import AdminDashNavbar from '../../Dashboard/AdminDashNavbar'
import AdminDashbarHor from '../../Dashboard/AdminDashbarHor'
import Users from './Users'
import UserNavbar from './UserNavbar'

const Userpage = () => {
  return (
    <div className='flex bg-[#ddf4fc]'>
      <AdminDashNavbar/>
      <div>
        <AdminDashbarHor/>
        <UserNavbar/>
        <Users/>
      </div>
    </div>
  )
}

export default Userpage
