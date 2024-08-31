import { useContext, useEffect, useState } from "react";
import { WishContext } from "../../Contexts/WishListContext";
import { Bounce, toast } from "react-toastify";
import { CartContext } from "../../Contexts/CartContext";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { getLoggedUserWishList, deleteWishListItem } = useContext(WishContext);
  const { addProductToCart } = useContext(CartContext);
  
  const [wishListDetails, setWishListDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getWishListItem() {
    const response = await getLoggedUserWishList();
    setWishListDetails(response?.data?.data);
  }

  async function deleteItem(productId) {
    setIsLoading(true);
    try {
      const response = await deleteWishListItem(productId);
      toast.success('Removed successfully', {
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
      getWishListItem(); // Refresh the wishlist
    } catch (error) {
      toast.error('Failed to remove item', {
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
    } finally {
      setIsLoading(false);
    }
  }

  async function addProduct(productId) {
    setIsLoading(true);
    try {
      const response = await addProductToCart(productId);
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
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    getWishListItem();
  }, []);

  return (
    <div className="container py-28">
        <Helmet>
  <title>
    WishList
  </title>
</Helmet>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
              <th scope="col" className="px-6 py-3">
                Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListDetails?.map((product) => (
              <tr key={product._id} className="bg-white border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="inline-block object-cover w-20 h-20 lg:me-10"
                  />
                  <p className="inline-block text-2xl font-bold">
                    {product.title.split(" ").splice(0, 2).join(" ")}
                  </p>
                </th>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteItem(product._id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isLoading}
                  >
                    Remove
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => addProduct(product._id)}
                    className="text-green-500 hover:text-green-700"
                    disabled={isLoading}
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
  