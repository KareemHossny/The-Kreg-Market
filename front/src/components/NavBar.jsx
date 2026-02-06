import React, { useState, useContext } from 'react';
import { HiOutlineShoppingCart, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { FiShoppingCart } from 'react-icons/fi';
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from "../ShopContext";

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/About', label: 'About' },
  { to: '/Contact', label: 'Contact' },
  { to: '/Orders', label: 'Orders' }
];

const NavBar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount, token, setToken, setUser, setShowSearch } = useContext(ShopContext);

  // Helper to check if a path is active
  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-green-50 via-white to-green-100 text-green-900 shadow-lg px-3 sm:px-6 lg:px-10 py-3 flex items-center justify-between gap-3">
      {/* Logo */}
      <div
        className="logo flex items-center gap-2 font-extrabold text-lg sm:text-xl md:text-2xl cursor-pointer select-none tracking-tight transition-transform duration-200 hover:scale-105 whitespace-nowrap"
        onClick={() => navigate('/')}
      >
        <span className="text-green-700 drop-shadow-sm">THE KREG</span>
        <span className="icon text-green-600 text-3xl flex items-center transition-transform duration-200">
          <HiOutlineShoppingCart className="w-8 h-8" />
        </span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center gap-3 lg:gap-4 px-4 lg:px-5 py-2 rounded-full transition-all duration-200 text-base lg:text-lg font-medium shadow select-none hover:text-green-700 bg-white/40 backdrop-blur-md">
        {NAV_LINKS.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={() =>
              [
                "transition px-4 py-1 rounded-full",
                isActivePath(link.to)
                  ? "bg-gradient-to-r from-green-500 to-green-700 text-white font-extrabold scale-105 shadow"
                  : "text-green-800 font-semibold hover:text-green-600 hover:bg-green-100"
              ].join(' ')
            }
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* Right Side Icons and Buttons */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Search Icon */}
        <button
          onClick={() => {
            const productDetailsMatch = /^\/product\//.test(location.pathname);
            if (
              ['/Orders', '/About', '/Login', '/Contact'].includes(location.pathname)
              || productDetailsMatch
            ) {
              navigate('/');
              setTimeout(() => setShowSearch(true), 100);
            } else {
              setShowSearch(true);
            }
          }}
          className="text-gray-600 hover:text-green-700 active:scale-95 transition-all duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200 bg-white/70 hover:bg-green-50"
          aria-label="Search"
          type="button"
        >
          <CiSearch className="text-xl sm:text-2xl" />
        </button>
        {/* Cart Icon with count */}
        <NavLink
          to="/Cart"
          className="relative text-gray-600 hover:text-green-700 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200 bg-white/70 hover:bg-green-50"
          aria-label="Cart"
        >
          <FiShoppingCart className="text-xl sm:text-2xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white drop-shadow">
              {cartCount}
            </span>
          )}
        </NavLink>
        {/* Login/Logout Button */}
        {token && token !== '' && token !== undefined ? (
          <button
            onClick={() => {
              setToken('');
              setUser && setUser(null);
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              navigate('/Login');
            }}
            className="hidden md:inline-flex bg-gradient-to-r from-red-200 via-red-100 to-red-100 text-red-700 px-4 py-2 rounded-full font-bold shadow hover:bg-red-600 hover:text-white hover:scale-105 active:scale-95 transition-all text-sm sm:text-base border border-red-200"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/Login")}
            className="hidden md:inline-flex bg-gradient-to-r from-green-100 via-green-50 to-green-200 text-green-700 px-4 py-2 rounded-full font-bold shadow hover:bg-green-200 hover:text-green-800 hover:scale-105 active:scale-95 transition-all text-sm sm:text-base border border-green-100"
          >
            Login
          </button>
        )}

        {/* for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-green-100 transition"
          onClick={() => setShowMobileMenu(prev => !prev)}
          aria-label="Open menu"
          aria-expanded={showMobileMenu}
          type="button"
        >
          <HiOutlineMenu className="w-7 h-7 text-green-700" />
        </button>
      </div>

      {/* Mobile Links */}
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-50 transition-opacity duration-200">
          <div className="absolute top-0 right-0 w-3/4 max-w-xs bg-white h-full shadow-2xl flex flex-col p-7 gap-6 rounded-l-3xl border-l-2 border-green-100">
            <button
              className="self-end mb-4 p-2 rounded-full hover:bg-green-100 active:scale-90 transition duration-200"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close menu"
              type="button"
            >
              <HiOutlineX className="w-7 h-7 text-green-700" />
            </button>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={`font-semibold transition px-3 py-2 rounded-full ${
                  isActivePath(link.to)
                    ? "bg-green-100 text-green-700"
                    : "text-green-800 hover:text-green-600 hover:bg-green-100"
                }`}
                onClick={() => setShowMobileMenu(false)}
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
            {!token && (
              <NavLink
                to="/Login"
                className={`px-4 py-2 rounded-full font-bold shadow transition text-sm sm:text-base ${
                  isActivePath("/Login")
                    ? "bg-green-100 text-green-700"
                    : "text-green-800 hover:text-green-600 hover:bg-green-100"
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                Login
              </NavLink>
            )}
            {token && (
              <button
                onClick={() => {
                  setToken('');
                  localStorage.removeItem("token");
                  setShowMobileMenu(false);
                  navigate("/Login");
                }}
                className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold shadow hover:bg-green-200 transition text-sm sm:text-base"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar
