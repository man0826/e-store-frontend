import { CartItemModel } from "@/graphql/generated.graphql";
import {
  useDecrementCart,
  useDeleteCart,
  useIncrementCart,
} from "@/hooks/useCart";
import { convertYen } from "@/utils/convertYen";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import Skeleton from "react-loading-skeleton";

type Props = {
  cart: CartItemModel;
};

const CartItem = ({ cart }: Props) => {
  const {
    id,
    product: { name, slug, price, images, colors },
    size,
    color,
    quantity,
    totalAmount,
  } = cart;
  const imageIndex = colors?.indexOf(color ?? "");
  const image = images[imageIndex ?? 0];

  const { deleteCart } = useDeleteCart();
  const { incrementCart } = useIncrementCart();
  const { decrementCart } = useDecrementCart();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      key={id}
      className="relative w-full flex items-center gap-4 md:gap-5 border-t border-black py-8 md:py-6"
    >
      <div className="min-w-[75px] w-[75px] md:min-w-[120px] md:w-[120px]">
        {!isLoaded && <Skeleton className="h-[71px] md:h-[116px]" />}
        <Link
          className={`${
            isLoaded ? "opacity-100 !h-full" : "opacity-0 !h-0"
          } block`}
          href={`/product/${slug}`}
        >
          <Image
            src={image}
            alt={image}
            layout="fill"
            objectFit="cover"
            onLoadingComplete={() => {
              setIsLoaded(true);
            }}
          />
        </Link>
      </div>
      <div className="w-full flex justify-between items-end md:items-center gap-3 md:gap-5">
        <div className="w-full md:w-[63%]">
          {isLoaded ? (
            <>
              <Link
                href={`/product/${slug}`}
                className="text-base md:text-xl font-futura !leading-tight break-words mb-1 inline-block hover:underline underline-offset-4"
              >
                {name}
              </Link>
              <p className="text-[11px] md:text-xs font-futura leading-none mb-1">
                Color / {color}
              </p>
              <p className="text-[11px] md:text-xs font-futura leading-none mb-1">
                Size / {size}
              </p>
              <p className="text-sm md:text-base font-futura">
                {convertYen(price)}
              </p>
            </>
          ) : (
            <>
              <Skeleton className="max-w-[320px] h-[22px]" />
              <Skeleton className="max-w-[100px] h-[10px]" />
              <Skeleton className="max-w-[100px] h-[10px]" />
              <Skeleton className="max-w-[100px] h-[15px]" />
            </>
          )}
        </div>
        <div className="min-w-[110px] md:w-[37%] flex flex-col md:flex-row justify-end items-end md:items-center">
          <div className="w-full md:w-1/2 mb-2 md:mb-0">
            {isLoaded ? (
              <div className="inline-block bg-gray-50">
                <div className="flex items-center">
                  <button
                    className="px-4 md:px-6 py-3 md:py-3.5"
                    onClick={() => decrementCart(id, quantity)}
                  >
                    <AiOutlineMinus size={15} color={"#000"} />
                  </button>
                  <div className="text-xs md:text-sm w-4 text-center font-futura">
                    {quantity}
                  </div>
                  <button
                    className="px-4 md:px-6 py-3 md:py-3.5"
                    onClick={() => incrementCart(id)}
                  >
                    <AiOutlinePlus size={15} color={"#000"} />
                  </button>
                </div>
              </div>
            ) : (
              <Skeleton className="max-w-[105px] md:max-w-[142px] h-[35px] md:h-[43px]" />
            )}
          </div>
          <div className="w-full md:w-1/2 text-right">
            {isLoaded ? (
              <p className="text-base md:text-lg font-futura">
                {convertYen(totalAmount)}
              </p>
            ) : (
              <Skeleton className="max-w-[80px] h-[25px]" />
            )}
          </div>
        </div>
      </div>
      <button
        className="absolute top-1 md:top-2 right-0"
        onClick={() => deleteCart(id)}
      >
        <IoCloseOutline size={26} color={"#000"} />
      </button>
    </div>
  );
};

export default CartItem;
