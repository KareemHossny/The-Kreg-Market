import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Footer = () => {
  const navigate=useNavigate()
  return (
    <footer className="w-full bg-gradient-to-r from-green-50 via-white to-green-100 border-t border-green-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-8">
        {/* Left: Logo & Name */}
        <div className="flex flex-col items-start gap-4 w-full md:w-1/3">
        <div
        className="logo flex items-center gap-2 font-extrabold text-2xl cursor-pointer select-none tracking-tight transition-transform duration-200 hover:scale-105"
        onClick={() => navigate('/')}
      >
        <span className="text-green-700 drop-shadow-sm">THE KREG</span>
        <span className="icon text-green-600 text-3xl flex items-center transition-transform duration-200">
          <HiOutlineShoppingCart className="w-8 h-8" />
        </span>
      </div>
          <div className="flex items-center gap-2 text-green-800 text-sm flex-wrap">
            <FaMapMarkerAlt className="text-green-500" />
            <span>123 Maple Street, Cityville</span>
          </div>
          <div className="flex items-center gap-2 text-green-800 text-sm flex-wrap">
            <FaPhoneAlt className="text-green-500" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 text-green-800 text-sm flex-wrap">
            <FaEnvelope className="text-green-500" />
            <span>thekergmarket13@gmail.com</span>
          </div>
        </div>

      </div>
      <div className="text-green-700 text-xs text-center py-2">
        &copy; {new Date().getFullYear()} Market. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer