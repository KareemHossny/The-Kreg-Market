import React, { useContext } from 'react';
import { ShopContext } from '../ShopContext';
import { FiTrash2 } from 'react-icons/fi';
import { useNavigate ,Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart = [], // Add a default empty array
    cartTotal,
    cartCount,
    updateCart,
    removeFromCart,
    clearCart
  } = useContext(ShopContext);

  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <div className="text-gray-400 text-5xl sm:text-6xl mb-6">🛒</div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8 text-base sm:text-lg">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors duration-200 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 mb-6">
            {cart.map(item => (
              <div key={item.itemId} className="flex flex-col md:flex-row items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-4 flex-1">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded border" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-green-600 font-bold text-base">${item.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <button
                    className="px-3 py-1 bg-green-200 text-green-700 rounded-l hover:bg-green-300 font-bold"
                    onClick={() => updateCart(item.itemId, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1 border-t border-b border-green-200 bg-white text-gray-800 font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    className="px-3 py-1 bg-green-200 text-green-700 rounded-r hover:bg-green-300 font-bold"
                    onClick={() => updateCart(item.itemId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-lg font-semibold text-gray-700">${item.itemTotal}</span>
                  <button
                    className="p-2 text-red-500 hover:text-red-700 rounded-full transition"
                    onClick={() => removeFromCart(item.itemId)}
                    aria-label="Remove item"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-6 gap-4">
            <div className="mb-4 md:mb-0">
              <span className="text-gray-600">Total Items: </span>
              <span className="font-bold text-green-700">{cartCount}</span>
            </div>
            <div className="mb-4 md:mb-0">
              <span className="text-gray-600">Total: </span>
              <span className="text-2xl font-bold text-green-700">${cartTotal}</span>
            </div>
            <div className="flex gap-3">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded shadow transition"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition"
                onClick={() => navigate('/Placeorder')}
                disabled={cart.length === 0}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;