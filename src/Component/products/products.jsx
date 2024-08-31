import { useContext, useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import useProducts from "../../Hooks/UseProducts";
import ProductCard from "../ProductCard/ProductCard";
import { Helmet } from "react-helmet";
import { WishContext } from "../../Contexts/WishListContext";

export default function Products() {
  const { isLoading, isError, error, data: products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlistProductIds, setWishlistProductIds] = useState([]);
  const { getLoggedUserWishList } = useContext(WishContext);

  useEffect(() => {
    async function fetchWishlist() {
      const response = await getLoggedUserWishList();
      if (response?.data?.data) {
        const ids = response.data.data.map((item) => item._id);
        setWishlistProductIds(ids);
      }
    }

    fetchWishlist();
  }, [getLoggedUserWishList]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isError) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container py-28">
        <form className="max-w-md mx-auto my-3">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              required
            />
          </div>
        </form>
        <div className="grid p-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-10">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen col-span-full">
              <FaSpinner className="text-6xl animate-spin" />
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isInWishlist={wishlistProductIds.includes(product.id)} 
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}
