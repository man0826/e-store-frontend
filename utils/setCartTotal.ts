import { cartTotalVar } from "@/utils/cache";

export const setCartTotal = (
  cartItems: {
    quantity: number;
  }[]
) => {
  const cartTotal = cartItems.reduce((prev, current) => {
    return prev + current.quantity;
  }, 0);

  cartTotalVar(cartTotal);
};
