import React, { useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ShopContext } from '../ShopContext';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SummaryCarouselSection = ({
  sectionId,
  title,
  category,
  viewAllTo,
  limit,
}) => {
  const navigate = useNavigate();
  const { allproducts, addToCart, searchResults } = useContext(ShopContext);

  const products = useMemo(() => {
    const source =
      Array.isArray(searchResults) && searchResults.length > 0
        ? searchResults
        : allproducts || [];
    let filtered = source.filter((item) => item?.category === category);
    if (typeof limit === 'number') {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }, [allproducts, searchResults, category, limit]);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      id={sectionId}
      className="max-w-6xl mx-auto py-10 px-2 sm:px-4"
    >
      <style>{`
        .summary-swiper {
          padding-bottom: 44px;
        }
        .summary-swiper .swiper-button-next,
        .summary-swiper .swiper-button-prev {
          color: #16a34a;
          background: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(15, 118, 110, 0.18);
          transition: all 0.25s ease;
        }
        .summary-swiper .swiper-button-next:hover,
        .summary-swiper .swiper-button-prev:hover {
          background: #16a34a;
          color: #ffffff;
          transform: scale(1.06) translateY(-1px);
        }
        .summary-swiper .swiper-button-next::after,
        .summary-swiper .swiper-button-prev::after {
          font-size: 15px;
          font-weight: 700;
        }
        .summary-swiper .swiper-pagination-bullet {
          background: #bbf7d0;
          opacity: 0.7;
          width: 9px;
          height: 9px;
          transition: all 0.25s ease;
        }
        .summary-swiper .swiper-pagination-bullet-active {
          background: #16a34a;
          opacity: 1;
          transform: scale(1.25);
        }
        .summary-swiper .swiper-pagination {
          bottom: 0;
        }
      `}</style>

      <div className="mb-6 flex justify-between items-end gap-3">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-900 tracking-tight">
            {title}
          </h3>
          <p className="mt-1 text-sm text-emerald-900/70">
            Hand‑picked essentials from this aisle.
          </p>
        </div>
        {viewAllTo && (
          <button
            type="button"
            onClick={() => navigate(viewAllTo)}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 active:scale-[0.98] transition"
          >
            View all
            <span className="text-emerald-500 text-base">›</span>
          </button>
        )}
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3200,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 22 },
          1024: { slidesPerView: 4, spaceBetween: 24 },
        }}
        className="summary-swiper"
      >
        {products.map((item) => {
          const outOfStock = !!item?.outOfStock;
          return (
            <SwiperSlide key={item._id}>
              <article
                onClick={() => navigate(`/product/${item._id}`)}
                className="group h-full cursor-pointer rounded-3xl border border-emerald-100 bg-white shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-stretch"
              >
                <div className="w-full px-4 pt-4">
                  <div className="relative aspect-[4/3] rounded-2xl bg-emerald-50/70 ring-1 ring-emerald-100/80 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-contain p-2 transition-transform duration-200 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <div className="flex-1 px-4 pb-4 pt-3 flex flex-col">
                  <h4 className="text-sm font-bold text-emerald-950 line-clamp-2 min-h-[2.5rem]">
                    {item.name}
                  </h4>
                  <p className="mt-1 text-xs text-emerald-900/70 line-clamp-2 min-h-[2.25rem]">
                    {item.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-emerald-700">
                        ${item.price}
                      </span>
                      {!!item.oldprice && (
                        <span className="text-xs text-emerald-900/40 line-through">
                          ${item.oldprice}
                        </span>
                      )}
                    </div>
                    {!outOfStock && (
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        In stock
                      </span>
                    )}
                    {outOfStock && (
                      <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        Out of stock
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={outOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!outOfStock) addToCart(item._id);
                    }}
                    className={[
                      'mt-3 w-full rounded-2xl px-3 py-2 text-sm font-semibold transition',
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default SummaryCarouselSection;

