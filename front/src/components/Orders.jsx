import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../ShopContext';

const Orders = () => {
  const { API_URL } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const formatAddress = (address) => {
    if (!address) {
      return <span className="text-gray-500">No address provided.</span>;
    }
    if (typeof address === 'string') {
      return address; // For old orders with string addresses
    }
    if (typeof address === 'object') {
      return (
        <div className="text-sm">
          <p className="font-bold">{address.fullName}</p>
          <p>{address.address}</p>
          <p>{`${address.city}, ${address.postalCode}`}</p>
          {address.phone && <p>Phone: {address.phone}</p>}
        </div>
      );
    }
    return <span className="text-red-500">Invalid address format.</span>;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view your orders.');
          setLoading(false);
          return;
        }
        const res = await axios.get(`${API_URL}/order/userOrders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setError(res.data.message || 'Failed to fetch orders.');
        }
      } catch (err) {
        setError(err?.response?.data?.message || 'Failed to fetch orders.');
      }
      setLoading(false);
    };
    fetchOrders();
  }, [API_URL]);

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-green-700 mb-6">My Orders</h2>
      {loading && (
        <div className="text-center text-gray-500 py-8">Loading orders...</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-8 font-semibold">{error}</div>
      )}
      {!loading && !error && orders.length === 0 && (
        <div className="text-center text-gray-500 py-8">You have no orders yet.</div>
      )}
      {!loading && !error && orders.length > 0 && (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="border border-green-100 rounded-xl shadow-sm p-6 bg-gray-50">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <div className="text-green-700 font-bold text-lg">Order #{order._id.slice(-6).toUpperCase()}</div>
                <div className="text-gray-500 text-sm">{new Date(order.date).toLocaleString()}</div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Shipping Address:</span>
                <div className="ml-2 text-gray-600">{formatAddress(order.address)}</div>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Payment Method:</span>
                <span className="ml-2 text-gray-600 capitalize">{order.paymentMethod}</span>
              </div>
              <div className="mb-2">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="ml-2 text-green-700 font-bold">${order.amount}</span>
              </div>
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Items:</h4>
                <ul className="divide-y divide-gray-200">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex items-center py-2 gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-contain rounded bg-green-50 border"
                      />
                      <div className="flex-1">
                        <span className="font-semibold text-green-800">{item.name}</span>
                        <span className="ml-2 text-gray-500 text-sm">x{item.quantity}</span>
                      </div>
                      <div className="text-green-700 font-bold">${item.price * item.quantity}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;