import { Helmet } from "react-helmet";
import CategorySlider from "../CategoriesSlider/CategoriesSlider";
import MainSlider from "../MainSlider/MainSlider";
import Products from "../products/products";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
