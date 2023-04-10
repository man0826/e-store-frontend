import { OrderModel } from "@/graphql/generated.graphql";
import { useGetOrder } from "@/hooks/useOrder";
import { useLoginUser } from "@/hooks/useUser";
import OrderItem from "./OrderItem";

const OrderList = ({ isLatestOrder = false }) => {
  const { loginUser } = useLoginUser();
  const { orders } = useGetOrder(loginUser?.id ?? "");

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-futura mb-6">ORDERS</h1>
      {orders && orders.length > 0 ? (
        orders?.slice(0, isLatestOrder ? 1 : orders?.length).map((order) => {
          return <OrderItem key={order.id} order={order as OrderModel} />;
        })
      ) : (
        <p className="text-sm text-center mt-40">購入履歴はありません</p>
      )}
    </div>
  );
};

export default OrderList;
