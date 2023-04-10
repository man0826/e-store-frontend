import { ProductModel } from "@/graphql/generated.graphql";
import Image from "next/image";
import Link from "next/link";
import FadeAnimation from "../animation/FadeAnimation";
import CardSkeleton from "../skeleton/CardSkeleton";
import { useState } from "react";

type Props = {
  product: ProductModel;
};

const ProductSliderItem = ({ product }: Props) => {
  const { name, slug, price, images, colors } = product;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="px-[0.5vw]">
      {!isLoaded && <CardSkeleton />}
      <Link
        className={`${
          isLoaded ? "opacity-100 !h-full" : "opacity-0 !h-0"
        } block`}
        href={`/product/${slug}`}
      >
        <div className="relative group before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#f6f6f6] before:-z-10">
          <FadeAnimation>
            <Image
              src={images[0]}
              alt={images[0]}
              layout="fill"
              objectFit="cover"
            />
            <Image
              className="!absolute top-0 left-0 opacity-0 transition duration-200 group-hover:opacity-100"
              src={images[images.length - 1]}
              alt={images[images.length - 1]}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => {
                setIsLoaded(true);
              }}
            />
            <div className="absolute bottom-3 left-3 flex gap-1">
              {colors?.map((color, i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 border-[0.5px] border-black"
                  style={{
                    background: `${color.toLowerCase()}`,
                  }}
                ></div>
              ))}
            </div>
          </FadeAnimation>
        </div>
        <div className="px-3 md:px-4 pb-4 pt-3">
          <p className="text-sm md:text-base font-futura !leading-tight mb-1">
            {name}
          </p>
          <p className="text-xs md:text-sm font-futura">
            ¥{price.toLocaleString("ja-JP")}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductSliderItem;
