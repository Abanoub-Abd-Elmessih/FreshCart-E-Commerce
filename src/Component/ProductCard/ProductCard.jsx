import { useContext, useState, useEffect } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { Bounce, toast } from "react-toastify";
import { WishContext } from "../../Contexts/WishListContext";
import { Helmet } from "react-helmet";

export default function ProductCard({ product, isInWishlist }) {
  const { addProductToCart, getLoggedUserCart, setCartItems } = useContext(CartContext);
  const { addProductToWishList, deleteWishListItem } = useContext(WishContext);
  const [isRed, setIsRed] = useState(isInWishlist);

  useEffect(() => {
    setIsRed(isInWishlist);
  }, [isInWishlist]);

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
      console.log(error);
      
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

  async function addProduct(productId) {
    try {
      await addProductToCart(productId);
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
      const response = await getLoggedUserCart();
      setCartItems(response.data.numOfCartItems);
    } catch (error) {
      console.log(error);
      
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

  return (
    <div className="my-3 group hover:shadow-lg shadow-green-500">
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <Link to={`/ProductDetails/${product.id}`} >
        <div className="flex flex-col justify-between h-full overflow-hidden transition-all duration-500 rounded-lg cursor-pointer group-hover:scale-95">
          <img src={product.imageCover} alt="Product Img" className="rounded-lg mix-blend-multiply" />
          <h3 className="my-4 text-3xl font-bold text-green-400">
            {product.title.split(" ").splice(0, 2).join(" ")}
          </h3>
          <p className="mb-3 line-clamp-3">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-semibold">{product.price} EGY</p>
            <p className="flex items-center gap-3 font-semibold">
              {product.ratingsAverage} <FaStar className="text-yellow-400" />
            </p>
          </div>
        </div>
      </Link>
      <div className="flex justify-between transition-all duration-500 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
        <button
          onClick={() => addProduct(product.id)}
          className="w-3/4 py-2 font-bold bg-green-400 rounded-lg me-4 hover:bg-green-600"
        >
          Add to Cart
        </button>
        <button onClick={() => addWishList(product.id)} className="w-1/4 text-3xl">
          <FaHeart className={isRed ? "text-red-600" : ""} />
        </button>
      </div>
    </div>
  );
}
