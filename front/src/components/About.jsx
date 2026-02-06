import React from 'react'
import { FaLeaf, FaShippingFast, FaRegSmile, FaLock } from 'react-icons/fa'

const About = () => {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4 sm:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-6 drop-shadow">About Our Market</h2>
      <p className="text-lg text-green-900 mb-10 max-w-2xl mx-auto">
        Welcome to your favourite online market! We are dedicated to bringing you the freshest groceries, daily essentials, and unbeatable convenience—all at your fingertips. Shop with confidence and enjoy a seamless, secure, and delightful experience every time.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <div className="flex flex-col items-center">
          <FaLeaf className="text-4xl text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Fresh & Organic</h3>
          <p className="text-green-900">We source only the best, freshest, and most organic products for your family.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaShippingFast className="text-4xl text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Fast Delivery</h3>
          <p className="text-green-900">Get your orders delivered quickly and reliably, right to your doorstep.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaRegSmile className="text-4xl text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Customer Happiness</h3>
          <p className="text-green-900">Our support team is always here to ensure your satisfaction and happiness.</p>
        </div>
        <div className="flex flex-col items-center">
          <FaLock className="text-4xl text-green-500 mb-3" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Secure Shopping</h3>
          <p className="text-green-900">Shop with peace of mind—your data and payments are always protected.</p>
        </div>
      </div>
    </section>
  )
}

export default About
