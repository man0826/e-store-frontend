import { OrderModel } from "@/graphql/generated.graphql";
import { convertYen } from "@/utils/convertYen";
import { isoStringToJstDate } from "@/utils/formatDate";
import Image from "next/image";

type Props = {
  order: OrderModel;
};

const OrderItem = ({ order }: Props) => {
  const { createdAt, totalAmount, cart } = order;

  return (
    <div className="mb-8 last:mb-0">
      <div className="flex items-center mb-4 pb-2 justify-between border-b border-black">
        <p className="text-base md:text-lg font-futura">
          {isoStringToJstDate(createdAt)}
        </p>
        <p className="text-lg md:text-xl font-futura">
          <span className="mr-5">TOTAL</span>
          {convertYen(totalAmount)}
        </p>
      </div>
      {cart.map((cartItem) => {
        const {
          id,
          product: { name, price, images, colors },
          size,
          color,
          quantity,
        } = cartItem;
        const imageIndex = colors?.indexOf(color ?? "");
        const image = images[imageIndex ?? 0];

        return (
          <div key={id} className="flex items-center mb-3 last:mb-0">
            <div className="min-w-[80px] md:min-w-[110px] w-[80px] md:w-[110px] mr-5">
              <Image src={image} alt={image} layout="fill" objectFit="cover" />
            </div>
            <div>
              <p className="text-base md:text-lg !leading-tight font-futura break-words mb-2">
                {name}
              </p>
              <p className="text-[11px] md:text-xs font-futura leading-none mb-1">
                Color / {color}
              </p>
              <p className="text-[11px] md:text-xs font-futura leading-none mb-1">
                Size / {size}
              </p>
              <p className="text-[11px] md:text-xs font-futura leading-none mb-1">
                Quantity / {quantity}
              </p>
              <p className="text-sm md:text-base font-futura">
                {convertYen(price)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderItem;
