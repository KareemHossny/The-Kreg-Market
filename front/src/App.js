import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Productdetails from './components/Productdetails';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Placeorder from './components/Placeorder';
import Login from './components/Login';
import Breakfast from './components/Breakfast';
import Baby from './components/Baby';
import Bakery from './components/Bakery';
import Chicken from './components/Chicken';
import Cleaning from './components/Cleaning';
import Cold from './components/Cold';
import Dairy from './components/Dairy';
import Fruits from './components/Fruits';
import Oil from './components/Oil';
import Healthy from './components/Healthy';
import Pet from './components/Pet';
import Sauces from './components/Sauces';
import Snacks from './components/Snacks';
import Tea from './components/Tea';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
      <ScrollToTop />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{
            borderRadius: '12px',
          }}
        />
        <Navbar />
        <SearchBar />
        <main className="py-4 sm:py-6 lg:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/product/:id" element={<Productdetails />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Orders" element={<Orders />} />
            <Route path="/Placeorder" element={<Placeorder />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Breakfast" element={<Breakfast />} />
            <Route path="/BabyCare" element={<Baby />} />
            <Route path="/Bakery" element={<Bakery />} />
            <Route path="/Chicken&Meat&Fish" element={<Chicken />} />
            <Route path="/Cleaning" element={<Cleaning />} />
            <Route path="/ColdDrinks" element={<Cold />} />
            <Route path="/Dairy&Eggs" element={<Dairy />} />
            <Route path="/Fruits&Vegetables" element={<Fruits />} />
            <Route path="/Oil" element={<Oil />} />
            <Route path="/Healthy" element={<Healthy />} />
            <Route path="/PetCare" element={<Pet />} />
            <Route path="/Sauces" element={<Sauces />} />
            <Route path="/Snacks" element={<Snacks />} />
            <Route path="/Tea&Coffe" element={<Tea />} />
            <Route path="/SearchBar" element={<SearchBar />} />
            <Route path="/Categories" element={<Categories />} />
            <Route path="/Contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
