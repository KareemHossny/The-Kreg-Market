import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiSlash } from 'react-icons/fi';
import { ShopContext } from '../ShopContext';

function formatCurrency(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return `$${value}`;
  return `$${n.toFixed(2).replace(/\.00$/, '')}`;
}

const CategoryProducts = ({ title, category }) => {
  const navigate = useNavigate();
  const { allproducts, addToCart, searchResults } = useContext(ShopContext);

  const productsToShow = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : allproducts;

  const groupedBySubcategory = useMemo(() => {
    const filtered = (productsToShow || []).filter((item) => item?.category === category);
    return filtered.reduce((acc, item) => {
      const subcat = item?.subcategory || 'Other';
      if (!acc[subcat]) acc[subcat] = [];
      acc[subcat].push(item);
      return acc;
    }, {});
  }, [productsToShow, category]);

  const totalCount = useMemo(() => {
    return Object.values(groupedBySubcategory).reduce((sum, arr) => sum + arr.length, 0);
  }, [groupedBySubcategory]);

  return (
    <div className="bg-gradient-to-b from-emerald-50/70 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-emerald-700/70">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="hover:text-emerald-800 transition-colors"
            >
              Home
            </button>
            <FiSlash className="opacity-60" />
            <span className="text-emerald-900 font-medium">{title}</span>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-emerald-950">
                {title}
              </h1>
              <p className="mt-2 text-emerald-900/70">
                Fresh picks, great value, fast delivery.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/70 backdrop-blur px-4 py-2 text-sm text-emerald-900 shadow-sm">
              <FiCheckCircle className="text-emerald-600" />
              <span className="font-semibold">{totalCount}</span>
              <span className="text-emerald-900/60">items</span>
            </div>
          </div>
        </div>

        {totalCount === 0 ? (
          <div className="rounded-3xl border border-emerald-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 text-2xl">
              🥬
            </div>
            <h2 className="text-xl font-bold text-emerald-950">Nothing here yet</h2>
            <p className="mt-2 text-emerald-900/70">
              We couldn’t find products for this category right now.
            </p>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-white font-semibold shadow-sm hover:bg-emerald-700 active:scale-[0.99] transition"
            >
              Browse all products <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(groupedBySubcategory).map(([subcategory, items]) => (
              <section key={subcategory} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg sm:text-xl font-extrabold text-emerald-950">
                    {subcategory}
                  </h2>
                  <span className="text-sm text-emerald-900/60">{items.length} items</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {items.map((item) => {
                    const outOfStock = !!item?.outOfStock;
                    return (
                      <article
                        key={item._id}
                        role="button"
                        tabIndex={0}
                        onClick={() => navigate(`/product/${item._id}`)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') navigate(`/product/${item._id}`);
                        }}
                        className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                      >
                        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-emerald-50 to-transparent pointer-events-none" />

                        <div className="p-4">
                          <div className="relative aspect-square rounded-2xl bg-emerald-50/70 ring-1 ring-emerald-100 overflow-hidden flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.03]"
                              loading="lazy"
                            />
                          </div>

                          <div className="mt-4 space-y-2">
                            <h3 className="text-base font-bold text-emerald-950 leading-snug line-clamp-2">
                              {item.name}
                            </h3>
                            <p className="text-sm text-emerald-900/65 line-clamp-2">
                              {item.description}
                            </p>

                            <div className="flex items-end justify-between gap-3 pt-1">
                              <div className="flex items-baseline gap-2">
                                <span className="text-lg font-extrabold text-emerald-700">
                                  {formatCurrency(item.price)}
                                </span>
                                {!!item.oldprice && (
                                  <span className="text-sm text-emerald-900/45 line-through">
                                    {formatCurrency(item.oldprice)}
                                  </span>
                                )}
                              </div>
                              {!outOfStock ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold px-2.5 py-1">
                                  In stock
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-red-50 text-red-700 text-xs font-semibold px-2.5 py-1">
                                  Out of stock
                                </span>
                              )}
                            </div>
                          </div>

                          <button
                            type="button"
                            disabled={outOfStock}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!outOfStock) addToCart(item._id);
                            }}
                            className={[
                              'mt-4 w-full rounded-2xl px-4 py-2.5 font-semibold transition',
                              'focus:outline-none focus:ring-4 focus:ring-emerald-200',
                              outOfStock
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.99]',
                            ].join(' ')}
                          >
                            {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

