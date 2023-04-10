import { useQuery } from "@apollo/client";
import { GetOrdersDocument, GetOrdersQuery } from "@/graphql/generated.graphql";

export const useGetOrder = (userId: string) => {
  const { data } = useQuery<GetOrdersQuery>(GetOrdersDocument, {
    variables: {
      userId,
    },
  });

  return {
    orders: data?.getOrders,
  };
};
