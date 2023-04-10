import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductModel } from "@/graphql/generated.graphql";
import ProductSliderItem from "./ProductSliderItem";
import Image from "next/image";

type Props = {
  products?: ProductModel[];
  images?: string[];
};

const ProductSlider = ({ products, images }: Props) => {
  const sliderSettings = {
    slidesToShow: products ? 4.3 : 1,
    draggable: products ? false : true,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: false,
    speed: 300,
    cssEase: products ? "ease-in" : "linear",
    dots: products ? false : true,
    arrows: products ? true : false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: products ? 3.3 : 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: products ? 2 : 1,
        },
      },
    ],
  };

  return (
    <Slider {...sliderSettings}>
      {products &&
        products.map((product) => {
          return <ProductSliderItem key={product.id} product={product} />;
        })}
      {images &&
        images.map((image, i) => {
          return (
            <Image
              key={i}
              className="cursor-pointer"
              src={image}
              alt={image}
              layout="fill"
              objectFit="cover"
            />
          );
        })}
    </Slider>
  );
};

export default ProductSlider;
