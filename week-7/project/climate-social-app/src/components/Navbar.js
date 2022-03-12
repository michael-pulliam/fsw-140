import {React, useContext} from 'react'
import { UserContext } from '../context/UserProvider.js'
import { Link } from 'react-router-dom'

export default function Navbar(){
  // const  user  = useContext(UserContext)
  const  {logout, token}  = useContext(UserContext)
  return (
  <div>
    
  </div>
    <div className="navbar">
      { token && <Link className='navLink' to="/profile">Profile</Link>}
      <Link className='navLink' to="/public">Public</Link>
      { token && <button className='button' onClick={logout}>Logout</button>}
    </div>
  )
}