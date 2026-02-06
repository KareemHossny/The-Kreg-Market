import React, { useContext, useState } from 'react';
import { ShopContext } from '../ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Placeorder = () => {
  const { cart, cartTotal, API_URL, getCart } = useContext(ShopContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const deliveryFee = 25;
  const navigate = useNavigate();

  // Calculate total with delivery fee
  const totalWithDelivery = cartTotal + (cart.length > 0 ? deliveryFee : 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to place an order.');
        setLoading(false);
        return;
      }
      // Validate required fields
      if (!fullName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !postalCode.trim()) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }
      const items = cart.map(item => ({
        productId: item.itemId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image // Add image here
      }));
      const orderData = {
        items,
        amount: totalWithDelivery,
        address: {
          fullName,
          email,
          phone,
          address,
          city,
          postalCode,
          notes
        },
        deliveryFee
      };
      if (paymentMethod === 'COD') {
        const res = await axios.post(
          `${API_URL}/order/placeOrder`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setSuccess('Order placed successfully!');
          toast.success('Order placed successfully!');
          getCart();
          setTimeout(() => navigate('/Orders'), 2000);
        } else {
          setError(res.data.message || 'Order failed.');
        }
      } else if (paymentMethod === 'Stripe') {
        const res = await axios.post(
          `${API_URL}/order/stripe`,
          orderData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success && res.data.session_url) {
          window.location.href = res.data.session_url;
        } else {
          setError(res.data.message || 'Stripe session failed.');
        }
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'Order failed.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Place Your Order</h2>
      <form onSubmit={handleOrder}>
        {/* Cart Review */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-green-600">Order Summary</h3>
          {cart.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {cart.map(item => (
                <li key={item.itemId} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-semibold text-gray-800">{item.name}</span>
                    <span className="ml-2 text-gray-500 text-sm">x{item.quantity}</span>
                  </div>
                  <div className="text-green-700 font-bold">${item.price * item.quantity}</div>
                </li>
              ))}
            </ul>
          )}
          {cart.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-4">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-bold text-green-700">${cartTotal}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-700">Delivery Fee:</span>
                <span className="font-bold text-green-700">${deliveryFee}</span>
              </div>
              <div className="flex justify-between items-center mt-4 border-t pt-4">
                <span className="font-bold text-lg text-gray-700">Total:</span>
                <span className="text-2xl font-bold text-green-700">${totalWithDelivery}</span>
              </div>
            </>
          )}
        </div>
        {/* More Information Form */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Postal Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              value={postalCode}
              onChange={e => setPostalCode(e.target.value)}
              placeholder="Enter your postal code"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">
              Shipping Address <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows={3}
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your shipping address..."
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Order Notes (optional)</label>
            <textarea
              className="w-full border border-green-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any special instructions?"
            />
          </div>
        </div>
        {/* Payment Method */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Payment Method</label>
          <div className="flex gap-6">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-green-600"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
              />
              <span className="ml-2 text-gray-700">Cash on Delivery</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                className="form-radio text-green-600"
                checked={paymentMethod === 'Stripe'}
                onChange={() => setPaymentMethod('Stripe')}
              />
              <span className="ml-2 text-gray-700">Stripe</span>
            </label>
          </div>
        </div>
        {/* Error/Success/Loading */}
        {error && <div className="mb-4 text-red-500 font-semibold">{error}</div>}
        {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
        {/* Place Order Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition text-lg disabled:opacity-60"
          disabled={loading || cart.length === 0}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Placeorder;