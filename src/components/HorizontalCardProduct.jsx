import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className='container mx-auto px-2 sm:px-4 my-6 relative'>
      <h2 className='text-lg sm:text-2xl font-semibold py-4'>{heading}</h2>

      <div className='flex items-center gap-4 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
        {/* Scroll Buttons - Only visible on desktop */}
        <button
          className='bg-white shadow-md rounded-full p-1 absolute left-0 top-1/2 -translate-y-1/2 text-lg hidden md:block z-10'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className='bg-white shadow-md rounded-full p-1 absolute right-0 top-1/2 -translate-y-1/2 text-lg hidden md:block z-10'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Product Cards */}
        {(loading ? loadingList : data).map((product, index) => (
          <div
            key={product?._id || index}
            className='min-w-[220px] sm:min-w-[260px] max-w-[240px] sm:max-w-[280px] h-32 sm:h-36 bg-white rounded-md shadow flex'
          >
            {/* Image */}
            <div className='bg-slate-200 h-full p-2 sm:p-4 min-w-[100px] sm:min-w-[120px] flex items-center justify-center'>
              {loading ? (
                <div className='w-full h-full bg-slate-300 animate-pulse rounded'></div>
              ) : (
                <img
                  src={product?.productImage?.[0]}
                  alt={product?.productName}
                  className='object-contain h-full transition-transform duration-200 hover:scale-110'
                />
              )}
            </div>

            {/* Content */}
            <div className='p-2 sm:p-4 grid w-full gap-1 sm:gap-2'>
              {loading ? (
                <>
                  <div className='bg-slate-300 h-4 rounded-full animate-pulse'></div>
                  <div className='bg-slate-300 h-3 w-1/2 rounded-full animate-pulse'></div>
                  <div className='flex gap-2'>
                    <div className='bg-slate-300 h-4 w-1/2 rounded-full animate-pulse'></div>
                    <div className='bg-slate-300 h-4 w-1/2 rounded-full animate-pulse'></div>
                  </div>
                  <div className='bg-slate-300 h-6 w-full rounded-full animate-pulse'></div>
                </>
              ) : (
                <>
                  <h2 className='text-sm sm:text-base font-medium line-clamp-1'>
                    {product?.productName}
                  </h2>
                  <p className='text-xs capitalize text-slate-500'>{product?.category}</p>
                  <div className='flex gap-2'>
                    <p className='text-red-600 text-sm font-semibold'>
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className='text-slate-500 text-xs line-through'>
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className='text-xs sm:text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
