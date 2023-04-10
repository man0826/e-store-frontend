import { SearchDocument, SearchQuery } from "@/graphql/generated.graphql";
import { useQuery } from "@apollo/client";

export const useSearchProduct = (searchText: string) => {
  const { data, loading } = useQuery<SearchQuery>(SearchDocument, {
    variables: {
      name: searchText,
    },
  });

  return { searchProducts: data?.search, loading };
};
