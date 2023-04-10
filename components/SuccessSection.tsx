import OrderList from "./account/OrderList";
import Link from "next/link";
import { useOrderStatus } from "@/hooks/usePayment";

type Props = {
  sessionId: string;
};

const SuccessSection = ({ sessionId }: Props) => {
  const { orderStatus, error } = useOrderStatus(sessionId);

  if (error)
    return (
      <section className="py-40 text-center">
        <Link className="text-xl font-futura border-b border-black" href="/">
          BACK TO TOP
        </Link>
      </section>
    );

  return (
    <section className="px-6 pt-16 md:pt-24 pb-10 md:pb-14">
      {orderStatus === "paid" && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 md:mb-24">
            <p className="text-2xl md:text-4xl text-center font-futura">
              Thanks for your order!
            </p>
          </div>
          <OrderList isLatestOrder={true} />
        </div>
      )}
    </section>
  );
};

export default SuccessSection;
