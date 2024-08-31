import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function SubCategories({ categoryId }) {
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    if (categoryId) {
      console.log(`SubCategories received categoryId: ${categoryId}`); // Add this to debug
      getSubCategories(categoryId);
    }
  }, [categoryId]);
  
  async function getSubCategories(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setSubcategories(data?.data || []);
      console.log(id);
      
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  return (
    <div className='container py-10'>
      <h2 className="mt-6 text-2xl font-bold">Subcategories</h2>
      <div className="container grid grid-cols-1 mx-auto md:grid-cols-12">
        {subcategories.map((subcategory) => (
          <div
            key={subcategory._id}
            className="m-5 transition-all duration-300 bg-white border rounded-lg md:col-span-6 hover:shadow-md hover:shadow-green-600 lg:col-span-4"
          >
            <div className="transition-all duration-300 cursor-pointer hover:scale-95">
              <h3 className="my-5 mt-10 text-2xl font-bold text-center ">
                {subcategory.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
