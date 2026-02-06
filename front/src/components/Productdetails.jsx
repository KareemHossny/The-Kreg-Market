import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../ShopContext';

const Productdetails = () => {
  const { id } = useParams();
  const { getProductById, addToCart } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
      } else {
        setError('Product not found');
      }
      setLoading(false);
    };
    fetchProduct();
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72 min-h-[11rem] bg-green-50 rounded-lg mt-12">
        <span className="text-xl font-bold text-green-600 animate-pulse">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-72 min-h-[11rem] bg-red-50 rounded-lg mt-12">
        <span className="text-xl font-bold text-red-600">{error}</span>
      </div>
    );
  }

  const outOfStock = !!product?.outOfStock;

  return (
    <div className="max-w-5xl mx-auto md:mt-10 mt-5 px-2 sm:px-4">
      <div className="bg-gradient-to-r from-green-50 to-green-100/60 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 p-6 md:p-10 border border-green-100/50">
        {/* Image Section */}
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-white border-2 border-green-100 rounded-2xl shadow-md flex justify-center items-center w-64 h-64 sm:w-72 sm:h-72">
            <img
              src={product.image}
              alt={product.name}
              className="object-contain max-h-60 sm:max-h-64 w-auto h-auto drop-shadow-2xl rounded-xl"
            />
          </div>
        </div>
        {/* Product Details Section */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div>
            <h2 className="text-4xl font-extrabold mb-2 text-green-800 tracking-tight drop-shadow-sm">{product.name}</h2>
            {product.description && (
              <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">{product.description}</p>
            )}
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <span className="text-3xl font-black text-green-700 drop-shadow">$<span className="tabular-nums">{product.price}</span></span>
              {product.oldprice && (
                <span className="text-2xl text-gray-400 line-through font-bold">${product.oldprice}</span>
              )}
              {/* In Stock / Out of Stock Indicator */}
              <span className={
                [
                  "inline-flex gap-1 items-center px-3 py-1 rounded-full font-bold text-sm",
                  outOfStock
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-green-100 text-green-700 border border-green-200"
                ].join(" ")
              }>
                <span className={`w-2 h-2 rounded-full ${outOfStock ? "bg-red-400" : "bg-green-400"}`}></span>
                {outOfStock ? <>Out of Stock</> : <>In Stock</>}
              </span>
            </div>
          </div>
          <button
            onClick={() => addToCart(product._id)}
            className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-700 hover:to-green-700 text-white font-extrabold rounded-full shadow-lg transition-transform duration-200 transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed text-lg"
            disabled={outOfStock}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productdetails;