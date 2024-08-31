import Slider from 'react-slick';
import img_1 from '../../assets/imgs/Slide1.jpg';
import img_2 from '../../assets/imgs/Slide2.jpg';
import img_3 from '../../assets/imgs/Slide3.jpg';
import img_4 from '../../assets/imgs/Bags.jpg';
import img_5 from '../../assets/imgs/Guitar.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function MainSlider() {


  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, 
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 p-5 gap-4 items-center mx-5 pt-24'>
      <div className="col-span-1 md:col-span-8">
      <Slider {...settings}>
  <div>
    <img src={img_1} className='h-[300px] md:h-[600px] md:w-1/3 md:mx-auto w-full object-cover object-center rounded-lg' alt="main slider photo" />
  </div>
  <div>
    <img src={img_2} className='h-[300px] md:h-[600px] md:w-1/3 md:mx-auto w-full object-cover object-center rounded-lg' alt="main slider photo" />
  </div>
  <div>
    <img src={img_3} className='h-[300px] md:h-[600px] md:w-1/3 md:mx-auto w-full object-cover object-center rounded-lg' alt="main slider photo" />
  </div>
</Slider>

      </div>
      <div className="col-span-1 md:col-span-4">
        <img src={img_4} className='h-[200px] md:h-[300px] w-full mb-3 md:mb-0 rounded-lg' alt="secondary slider photo" />
        <img src={img_5} className='h-[200px] md:h-[300px] w-full rounded-lg' alt="secondary slider photo" />
      </div>
    </div>
  );
}
