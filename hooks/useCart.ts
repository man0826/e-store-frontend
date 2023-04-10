import {
  AddCartDocument,
  AddCartMutation,
  CartItemsDocument,
  CartItemsQuery,
  CartInput,
  DeleteCartItemDocument,
  DeleteCartItemMutation,
  IncrementCartItemMutation,
  IncrementCartItemDocument,
  DecrementCartItemMutation,
  DecrementCartItemDocument,
} from "@/graphql/generated.graphql";
import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import { setCartTotal } from "@/utils/setCartTotal";

export const useCartItems = () => {
  const { data, error, loading } = useQuery<CartItemsQuery>(CartItemsDocument, {
    fetchPolicy: "network-only",
  });

  return {
    cartProducts: data?.cartItems,
    error,
    cartLoading: loading,
  };
};

export const useAddCart = () => {
  const [addCart] = useMutation<AddCartMutation>(AddCartDocument, {
    refetchQueries: ["CartItems", "LoginUser"],
  });

  return useCallback(
    async ({ productId, quantity, size, color }: CartInput) => {
      await addCart({
        variables: {
          cartInput: {
            productId,
            quantity,
            size,
            color,
          },
        },
        onCompleted({ addCart }) {
          setCartTotal(addCart.user.cartItems);
        },
      });
    },
    []
  );
};

export const useDeleteCart = () => {
  const [deleteCartItem] = useMutation<DeleteCartItemMutation>(
    DeleteCartItemDocument,
    {
      refetchQueries: ["CartItems", "LoginUser"],
    }
  );

  const deleteCart = useCallback(async (cartId: string) => {
    await deleteCartItem({
      variables: {
        cartId,
      },
      onCompleted({ deleteCartItem }) {
        setCartTotal(deleteCartItem.user.cartItems);
      },
    });
  }, []);

  return {
    deleteCart,
  };
};

export const useIncrementCart = () => {
  const [incrementCartItem] = useMutation<IncrementCartItemMutation>(
    IncrementCartItemDocument,
    {
      refetchQueries: ["CartItems"],
    }
  );

  const incrementCart = useCallback(async (cartId: string) => {
    await incrementCartItem({
      variables: {
        cartId,
      },
      onCompleted({ incrementCartItem }) {
        setCartTotal(incrementCartItem.user.cartItems);
      },
    });
  }, []);

  return {
    incrementCart,
  };
};

export const useDecrementCart = () => {
  const [decrementCartItem] = useMutation<DecrementCartItemMutation>(
    DecrementCartItemDocument,
    {
      refetchQueries: ["CartItems"],
    }
  );

  const decrementCart = useCallback(
    async (cartId: string, quantity: number) => {
      if (quantity > 1) {
        await decrementCartItem({
          variables: {
            cartId,
          },
          onCompleted({ decrementCartItem }) {
            setCartTotal(decrementCartItem.user.cartItems);
          },
        });
      }
    },
    []
  );

  return {
    decrementCart,
  };
};
