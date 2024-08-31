import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const modalRef = useRef(null);

  useEffect(() => {
    getBrands();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    }

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen]);

  async function getBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      setBrands(data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  function openModal(brand) {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedBrand(null);
  }

  return (
    <>
      <Helmet>
  <title>
    brands
  </title>
</Helmet>
      <h2 className="mt-10 text-4xl font-semibold text-center text-green-700">All Brands</h2>
      <div className="container grid grid-cols-1 p-10 mx-auto md:grid-cols-12">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="m-5 transition-all duration-300 bg-white border rounded-lg md:col-span-6 hover:shadow-sm hover:shadow-green-600 lg:col-span-3 aspect-square"
            onClick={() => openModal(brand)}
          >
            <div className="w-full transition-all duration-300 cursor-pointer hover:scale-95">
              <img
                src={brand.image}
                className="object-cover w-full rounded-lg h-3/4"
                alt={brand.name || "brand Image"}
              />
              <h3 className="mt-10 text-2xl font-bold text-center text-gray-600">
                {brand.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div
            ref={modalRef}
            className="relative w-full max-w-2xl mx-4 bg-white rounded-lg shadow md:mx-0"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t md:p-5">
              <h3 className="text-xl font-semibold text-gray-900">
                {selectedBrand?.name}
              </h3>
              <button
                type="button"
                className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 "
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
{/* Modal body */}
<div className="flex justify-between p-4 space-y-4 md:p-5">
  <div className="flex items-center space-x-4">
    <img
      src={selectedBrand?.image}
      alt={selectedBrand?.name || "Brand Image"}
      className="object-cover w-1/2 mt-3 rounded-lg"
    />
  </div>
    <p className="text-5xl font-bold leading-relaxed text-green-500">
      {selectedBrand?.name}
    </p>
</div>

            {/* Modal footer */}
            <div className="flex items-center justify-end p-4 border-t border-gray-200 rounded-b md:p-5">
              <button
                onClick={closeModal}
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
