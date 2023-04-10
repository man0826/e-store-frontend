import {
  CategoryDetailPageDocument,
  CategoryDetailPageQuery,
  CategoryModel,
  GetCategoriesDocument,
  GetCategoriesQuery,
  ProductModel,
} from "@/graphql/generated.graphql";
import { initializeApollo } from "@/lib/apolloClient";
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from "next";
import ProductItem from "@/components/product/ProductItem";
import { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import SortBox from "@/components/category/SortBox";

type Props = {
  category: CategoryModel;
};

const CategoryProducts: NextPage<Props> = ({ category }) => {
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [sortedProducts, setSortedProducts] = useState<ProductModel[]>(
    category.products
  );

  useEffect(() => {
    setSortedProducts(category.products);
    setIsOpenSort(false);
  }, [category]);

  const sortChange = (num: number) => {
    setIsOpenSort(false);
    const clonedShops = Array.from(sortedProducts);
    if (num === 0) {
      setSortedProducts([...category.products]);
      return true;
    }
    clonedShops.sort((a, b) => {
      if (num === 1) {
        return a.price - b.price;
      }
      return b.price - a.price;
    });
    setSortedProducts(clonedShops);
  };

  return (
    <section>
      <div className="px-6 md:px-10 py-4 flex items-center border-b border-black">
        <p className="text-2xl md:text-3xl font-futura">{category.name}</p>
      </div>
      {category.products.length ? (
        <>
          <div className="px-4 md:px-6 py-4 flex items-center justify-between">
            <p className="text-xs font-futura">
              {category.products.length} PRODUCTS
            </p>
            <div className="relative">
              <div className="flex items-center">
                <button
                  className="text-base font-futura mr-0.5 flex items-center"
                  onClick={() => setIsOpenSort(!isOpenSort)}
                >
                  SORT
                  <BiChevronDown
                    size={22}
                    color={"#000"}
                    className={`${
                      isOpenSort ? "rotate-180" : "rotate-0"
                    } -mt-0.5`}
                  />
                </button>
              </div>
              {isOpenSort && <SortBox sortChange={sortChange} />}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-black">
            {sortedProducts.map((product, i) => (
              <ProductItem key={i} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="h-80 flex justify-center items-center">
          <p className="text-2xl font-futura">{`There are no products in the category ${category.name}.`}</p>
        </div>
      )}
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { categories },
  } = await apolloClient.query<GetCategoriesQuery>({
    query: GetCategoriesDocument,
  });

  const paths = categories.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    const apolloClient = initializeApollo();
    const {
      data: { findCategoryBySlug },
    } = await apolloClient.query<CategoryDetailPageQuery>({
      query: CategoryDetailPageDocument,
      variables: {
        categorySlug: params?.slug,
      },
    });

    return {
      props: {
        category: findCategoryBySlug,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};

export default CategoryProducts;
