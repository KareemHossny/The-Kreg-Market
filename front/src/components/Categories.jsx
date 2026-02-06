import React from 'react'
import { Link } from 'react-router-dom';

const Categories = () => {
  const categoryPhoto = [
    { name: "Breakfast & Instant Food", Image: "/category/Breakfast & Instant Food.png",path:"/Breakfast" },
    { name: "Baby Care", Image: "/category/Baby Care.png",path:"/BabyCare" },
    { name: "Bakery & Biscuits", Image: "/category/Bakery & Biscuits.png" ,path:"/Bakery"},
    { name: "Chicken, Meat & Fish", Image: "/category/Chicken, Meat & Fish.png" ,path:"/Chicken&Meat&Fish"},
    { name: "Cleaning Essentials", Image: "/category/Cleaning Essentials.png",path:"/Cleaning" },
    { name: "Cold Drinks & Juices", Image: "/category/Cold Drinks & Juices.png", path: "/ColdDrinks" },
    { name: "Dairy, Bread & Eggs", Image: "/category/Dairy, Bread & Eggs.png", path: "/Dairy&Eggs" },
    { name: "Fruits & Vegetables", Image: "/category/Fruits & Vegetables.png", path: "/Fruits&Vegetables" },
    { name: "Oil & Ghee", Image: "/category/Masala, Oil & More.png", path: "/Oil" },
    { name: "Healthy & Gourmet", Image: "/category/Organic & Healthy Living.png", path: "/Healthy" },
    { name: "Pet Care", Image: "/category/Pet Care.png", path: "/PetCare" },
    { name: "Sauces & Spreads", Image: "/category/Sauces & Spreads.png", path: "/Sauces" },
    { name: "Snacks & Munchies", Image: "/category/Snacks & Munchies.png", path: "/Snacks" },
    { name: "Tea & Coffee", Image: "/category/Tea, Coffe & Health Drink.png", path: "/Tea&Coffe" },


  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <h2 className="text-4xl font-extrabold text-green-700 mb-6 tracking-tight">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categoryPhoto.map((cat, idx) => (
          <Link
            to={cat.path}
            key={cat.name}
            className="flex flex-col items-center bg-white rounded-2xl shadow-md p-3 hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="w-25 h-25 flex items-center justify-center bg-green-50 group-hover:scale-105 transition-transform">
              <img
                src={cat.Image}
                alt={cat.name}
                className="object-contain w-35 h-full"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories