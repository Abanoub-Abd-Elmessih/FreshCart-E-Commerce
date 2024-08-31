import axios from "axios";
import { useState, useEffect } from "react";
import SubCategories from "../SubCategories/SubCategories";
import { Helmet } from "react-helmet";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setCategories(data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleCategoryClick = (id) => {
    console.log(`Category ID clicked: ${id}`); // Add this to debug
    setSelectedCategoryId(id);
  };
  

  return (
    <>
      <Helmet>
  <title>
    Categories
  </title>
</Helmet>
      <div className="container grid grid-cols-1 pt-32 mx-auto md:grid-cols-12">
        {categories.map((category) => (
          <div
            key={category._id}
            className="m-5 transition-all duration-300 bg-white border rounded-lg md:col-span-6 hover:shadow-md hover:shadow-green-600 lg:col-span-4 aspect-square"
            onClick={() => handleCategoryClick(category._id)}
          >
            <div className="w-full h-full transition-all duration-300 cursor-pointer hover:scale-95">
              <img
                src={category.image}
                className="object-cover w-full rounded-lg h-3/4"
                alt={category.name || "Category Image"}
              />
              <h3 className="mt-10 text-2xl font-bold text-center text-green-600">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedCategoryId && (
        <SubCategories categoryId={selectedCategoryId} />
      )}
    </>
  );
}
