import React, { useState } from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Contact Us</h2>
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3 text-green-800">
          <FaMapMarkerAlt className="text-green-500" />
          <span>123 Maple Street, Cityville</span>
        </div>
        <div className="flex items-center gap-3 text-green-800">
          <FaPhoneAlt className="text-green-500" />
          <span>+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center gap-3 text-green-800">
          <FaEnvelope className="text-green-500" />
          <span>thekergmarket13@gmail.com</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-green-600 mb-4">Send us a message</h3>
      {submitted ? (
        <div className="text-green-700 font-semibold mb-4">
          Thank you for contacting us! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800 font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-green-800 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-green-800 font-medium mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full border border-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
              id="message"
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold shadow-sm hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;