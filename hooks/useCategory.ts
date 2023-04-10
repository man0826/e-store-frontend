import {
  CategoryDetailPageDocument,
  CategoryDetailPageQuery,
  GetCategoriesDocument,
  GetCategoriesQuery,
} from "@/graphql/generated.graphql";
import { useQuery } from "@apollo/client";

export const useCategories = () => {
  const { data } = useQuery<GetCategoriesQuery>(GetCategoriesDocument);

  return { categories: data?.categories };
};

export const useCategory = (categorySlug: string) => {
  const { data } = useQuery<CategoryDetailPageQuery>(
    CategoryDetailPageDocument,
    {
      variables: {
        categorySlug,
      },
    }
  );

  return {
    category: data?.findCategoryBySlug,
  };
};
