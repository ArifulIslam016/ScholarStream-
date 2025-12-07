import React from 'react';
import { Link, NavLink } from 'react-router';
import useAuthhooks from '../../hooks/Authhooks';
import logoImg from '../../assets/SchorarStream Logo.png'
const Navbar = () => {
    
  const {user,logOut}=useAuthhooks()
  const links=<>
  <li> <NavLink to={'/'}>Home</NavLink></li>
  <li> <NavLink to={'/'}>All Scholarship</NavLink></li>
 
  </>
    return (
       <div className="navbar bg-primary shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
       {links}
      </ul>
    </div>
    <Link className="btn btn-ghost text-xl text-neutral hover:text-black flex items-center"><img src={logoImg}  className='max-w-[100px] h-12' alt="" /> <span className='hidden md:block'>ScholarStream</span></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    {links}
    </ul>
  </div>
  <div className="navbar-end">
      {user?<div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={user.photoURL} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 space-y-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link className='btn btn-primary'>
            Profile
          
          </Link>
        </li>
        <li><Link className='btn btn-primary'>Dashboard</Link></li>
        <li><button onClick={logOut} className='btn btn-warning'>Logout</button></li>
      </ul>
    </div>
  </div>:<div className='flex gap-2'>
          <Link to={'/login'} className="btn outline-0 border-0  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF]">Login</Link>
    <Link to={'/register'}className="btn outline-0 border-0  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF]">Register</Link></div>}
  </div>
</div>
    );
};

export default Navbar;