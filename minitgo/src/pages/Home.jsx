import Banner from "../components/banner";
import HomeProducts from "../components/HomeProducts";
import DiscountProduct from "../components/DiscountProduct";
import Slider from "../components/Addslider";
import Carousel from "../components/carousel";
import { useEffect } from "react";
import Advertisement from "./Advertisement";


export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    /* home HomeProducts */
  }, [])

  return (
    <>


      <Banner />
      <HomeProducts />
      <DiscountProduct />
      <Slider />
      <Carousel />
      <Advertisement />

    </>
  )
}





