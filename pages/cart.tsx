import { useCartItems } from "@/hooks/useCart";
import { convertYen } from "@/utils/convertYen";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCheckoutSession } from "@/hooks/usePayment";
import Button from "@/components/ui/Button";
import CartItem from "@/components/cart/CartItem";
import { CartItemModel } from "@/graphql/generated.graphql";

const Cart = () => {
  const { handleSubmit, sessionURL, loading, called } = useCheckoutSession();
  const { cartProducts, cartLoading } = useCartItems();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  let total = 0;

  useEffect(() => {
    if (!cartLoading) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [cartLoading]);

  useEffect(() => {
    if (called && !loading) {
      router.push(sessionURL ? sessionURL : "");
    }
  }, [called, loading]);

  return (
    <section className="px-4 py-14 md:py-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-4xl mb-4 font-futura">CAR</h1>
        {cartProducts?.length || cartLoading ? (
          <>
            <div className="w-full border-b border-black">
              {cartProducts?.map((cart) => {
                const { totalAmount } = cart;
                total += totalAmount;
                return (
                  <CartItem
                    key={cart.id}
                    // cart={cart}
                    cart={cart as CartItemModel}
                  />
                );
              })}
            </div>
            <div className="flex justify-between items-center py-5 md:py-6 border-b border-black mb-12">
              <p className="text-lg md:text-xl font-futura">TOTAL</p>
              {!isLoading ? (
                <p className="text-xl md:text-2xl font-futura">
                  {convertYen(total)}
                </p>
              ) : (
                <Skeleton width="125px" height="30px" />
              )}
            </div>
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <Button isLoading={loading} onClick={() => handleSubmit()}>
                CHECK OUT
              </Button>
              <Link
                className="text-xs md:text-sm font-bold underline mt-6"
                href="/"
              >
                買い物を続ける
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-10 md:py-16">
            <p className="font-futura text-2xl md:text-3xl mb-5 md:mb-8">
              Your cart is empty
            </p>
            <Link className="text-xs md:text-sm font-bold underline" href="/">
              買い物を続ける
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
