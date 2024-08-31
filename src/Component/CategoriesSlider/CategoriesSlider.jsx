import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa6';
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  return (
    <>
      <Slider {...settings} className='p-5 mx-5'>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className='p-2 cursor-pointer hover:scale-95 transition-all duration-300'>
              <img 
                src={category.image} 
                className='h-[200px] rounded-lg object-top w-full object-cover' 
                alt={category.name || "Category Image"} 
              />
              <h3 className='text-lg text-green-400 text-center my-3'>{category.name}</h3>
            </div>
          ))
        ) : (
          <FaSpinner className="animate-spin"/>
        )}
      </Slider>
    </>
  );
}
