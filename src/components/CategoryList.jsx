import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(13).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className='container mx-auto px-2 sm:px-4 py-4'>
      <div className='flex items-center gap-4 overflow-x-auto scrollbar-none'>
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className='flex-shrink-0 h-16 w-16 sm:w-20 sm:h-20 rounded-full bg-slate-200 animate-pulse'
                key={'categoryLoading' + index}
              ></div>
            ))
          : categoryProduct.map((product) => (
              <Link
                to={'/product-category?category=' + product?.category}
                className='flex flex-col items-center gap-1 flex-shrink-0 w-16 sm:w-20'
                key={product?.category}
              >
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden p-2 bg-slate-200 flex items-center justify-center'>
                  <img
                    src={product?.productImage[0]}
                    alt={product?.category}
                    className='h-full object-contain mix-blend-multiply hover:scale-110 transition-transform duration-200'
                  />
                </div>
                <p className='text-xs sm:text-sm text-center capitalize'>
                  {product?.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryList;
