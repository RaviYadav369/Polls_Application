import React from 'react'
import { NavLink } from 'react-router-dom'
import '../index.css'

const NavBar = () => {
  return (
    <div>
    <nav className="bg-white border-b border-gray-200">
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center space-x-8 h-16">
        <NavLink to="/polling" className={({ isActive }) => 
    isActive 
      ? "text-blue-600 font-bold transition" 
      : "text-gray-600 font-medium hover:text-blue-600 transition"
  }>Home</NavLink>
        <NavLink to="/pollcreate" className={({ isActive }) => 
    isActive 
      ? "text-blue-600 font-bold  transition" 
      : "text-gray-600 font-medium hover:text-blue-600 transition"
  }>Poll Create</NavLink>
        <NavLink to="/pollsresult" className={({ isActive }) => 
    isActive 
      ? "text-blue-600 font-bold  transition" 
      : "text-gray-600 font-medium hover:text-blue-600 transition"
  }>Result</NavLink>
      </div>
    </div>
  </nav>
    </div>
  )
}

export default NavBar