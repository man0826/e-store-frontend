import {
  CreateCheckoutSessionDocument,
  CreateCheckoutSessionQuery,
  GetOrderStatusFromStripeDocument,
  GetOrderStatusFromStripeQuery,
} from "@/graphql/generated.graphql";
import { cartTotalVar } from "@/utils/cache";
import { useLazyQuery, useQuery } from "@apollo/client";

export const useOrderStatus = (sessionId: string) => {
  const { data, error } = useQuery<GetOrderStatusFromStripeQuery>(
    GetOrderStatusFromStripeDocument,
    {
      variables: {
        id: sessionId,
      },
      onCompleted({ getOrderStatusFromStripe }) {
        if (getOrderStatusFromStripe.status === "paid") {
          cartTotalVar(0);
        }
      },
    }
  );

  return {
    orderStatus: data?.getOrderStatusFromStripe.status,
    error,
  };
};

export const useCheckoutSession = () => {
  const [handleSubmit, { data, loading, called }] =
    useLazyQuery<CreateCheckoutSessionQuery>(CreateCheckoutSessionDocument);

  return {
    handleSubmit,
    sessionURL: data?.createCheckoutSession.url,
    loading,
    called,
  };
};
