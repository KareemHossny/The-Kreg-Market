import React from 'react'
import { FaArrowDown } from 'react-icons/fa'

const Start = () => {
  const handleShopNow = () => {
    const section = document.getElementById('sbaby-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center bg-emerald-50/70 ring-1 ring-emerald-100/80 min-h-[80vh] text-center px-4 py-16 sm:py-24">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-700 drop-shadow mb-6 animate-fade-in">
        Your Favourite Market Is Now Online
      </h1>
      <p className="text-lg sm:text-xl text-green-900 mb-10 max-w-2xl animate-fade-in delay-100">
        Discover fresh groceries, daily essentials, and more delivered to your door. Shop with ease and enjoy exclusive deals!
      </p>
      <button
        onClick={handleShopNow}
        className="inline-flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 animate-bounce-in"
      >
        <span>Shop Now</span>
        <FaArrowDown className="text-2xl animate-bounce" />
      </button>
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full opacity-30 blur-2xl -z-10 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-200 rounded-full opacity-20 blur-2xl -z-10 animate-float-slow2" />
    </div>
  )
}

export default Start