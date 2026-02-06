import React, { useContext } from 'react'
import { ShopContext } from '../ShopContext';
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Searchbar = () => {
    const {
        searchQuery,
        setSearchQuery,
        showSearch,
        clearSearch
    } = useContext(ShopContext);

    return showSearch ? (
        <div className='bg-white border-b border-gray-100 shadow-sm'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                <div className='flex items-center justify-center gap-4'>
                    <div className='relative flex-1 max-w-md'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <CiSearch className='h-5 w-5 text-gray-400' />
                        </div>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text" 
                            placeholder='Search for products...' 
                            className='block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
                        />
                    </div>
                    <button
                        onClick={clearSearch}
                        className='p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200'
                    >
                        <IoMdClose className='h-6 w-6' />
                    </button>
                </div>
            </div>
        </div>
    ) : null
}

export default Searchbar