import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaSpinner, FaStar } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Contexts/CartContext';
import { Bounce, toast } from 'react-toastify';
import { WishContext } from '../../Contexts/WishListContext';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToWishList, getLoggedUserWishList } = useContext(WishContext);
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const [isRed, setIsRed] = useState(false);
  const { isLoading, error, isError, data: productDetails } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    select: (data) => data.data.data
  });

  useEffect(() => {
    async function fetchWishlist() {
      try {
        const response = await getLoggedUserWishList();
        if (response?.data?.data) {
          const ids = response.data.data.map((item) => item._id);
          setWishlistProductIds(ids);
          setIsRed(ids.includes(id)); // Update isRed based on the wishlist
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    }

    fetchWishlist();
  }, [getLoggedUserWishList, id]);

  async function addWishList(productId) {
    try {
      const response = await addProductToWishList(productId);
      console.log(response);
      setIsRed(true);
      toast.success('Added to wishlist successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Failed to add to wishlist', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  const { addProductToCart, setCartItems } = useContext(CartContext);

  async function addProduct(productId) {
    try {
      const response = await addProductToCart(productId);
      console.log(response);
      setCartItems(response.data.numOfCartItems);
      toast.success('Added to cart successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } catch (error) {
      toast.error('Failed to add to cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen col-span-full">
        <FaSpinner className='text-5xl animate-spin' />
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{productDetails.title} - Product Details</title>
      </Helmet>
      <div className='grid gap-4 p-5 sm:grid-cols-12'>
        <div className="col-span-4 py-5">
          <img src={productDetails.imageCover} className='w-full rounded-lg' alt="Product img" />
        </div>
        <div className="self-center col-span-8 py-5">
          <h2 className='text-4xl font-bold'>{productDetails.title}</h2>
          <p className='my-3 font-light'>{productDetails.description}</p>
          <h3 className='mb-2 text-2xl font-semibold'>{productDetails.category.name}</h3>
          <div className="flex items-center justify-between mb-3">
            <p className='text-lg font-semibold'>{productDetails.price} EGY</p>
            <p className='flex items-center gap-3 font-semibold'>{productDetails.ratingsAverage} <FaStar className='text-yellow-400' /></p>
          </div>
          <button onClick={() => addWishList(productDetails.id)} className="w-1/4 text-3xl">
            <FaHeart className={isRed ? "text-red-600" : ""} />
          </button>
          <button onClick={() => addProduct(productDetails.id)} className='w-full p-3 font-bold transition-all duration-300 bg-green-600 rounded-lg hover:bg-green-800'>
            Add To Cart
          </button>
        </div>
      </div>
    </>
  );
}
