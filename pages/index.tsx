import { NextPage, GetServerSideProps, GetServerSidePropsContext } from "next";
import { initializeApollo } from "@/lib/apolloClient";
import {
  GetCategoriesQuery,
  GetCategoriesDocument,
  ProductModel,
  CategoryModel,
  GetProductsQuery,
  GetProductsDocument,
} from "@/graphql/generated.graphql";
import Link from "next/link";
import ProductSlider from "@/components/slider/ProductSlider";
import Video from "@/components/home/Video";
import CategoryItem from "@/components/home/CategoryItem";

type Props = {
  products: ProductModel[];
  categories: CategoryModel[];
};

const Home: NextPage<Props> = ({ products, categories }) => {
  const newInProducts = products.filter((product) => {
    return product.categories?.some((category) => category.id === "7");
  });

  const trendingProducts = products.filter((product) => {
    return product.categories?.some((category) => category.id === "8");
  });

  return (
    <>
      <Video />
      <section>
        <div className="px-5 lg:px-10 flex justify-between items-center h-[70px] md:h-20">
          <h3 className="text-lg md:text-2xl font-futura">NEW ARRIVALS</h3>
          <Link
            className="text-xs md:text-sm border-b border-black font-futura"
            href="/category/new-arrivals"
          >
            VIEW ALL
          </Link>
        </div>
        <ProductSlider products={newInProducts.slice(0, 8)} />
      </section>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:border-b border-black">
          {categories.slice(0, 2).map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              isLarge={true}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 border-b border-black">
          {categories.slice(2, 6).map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </section>
      <section>
        <div className="px-5 lg:px-10 flex justify-between items-center h-[70px] md:h-20">
          <h3 className="text-lg md:text-2xl font-futura">TRENDING NOW</h3>
          <Link
            className="text-xs md:text-sm border-b border-black font-futura"
            href="/category/trending"
          >
            VIEW ALL
          </Link>
        </div>
        <ProductSlider products={trendingProducts.slice(0, 8)} />
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const apolloClient = initializeApollo(ctx);
    const {
      data: { products },
    } = await apolloClient.query<GetProductsQuery>({
      query: GetProductsDocument,
    });

    const {
      data: { categories },
    } = await apolloClient.query<GetCategoriesQuery>({
      query: GetCategoriesDocument,
    });

    return {
      props: {
        products,
        categories,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};

export default Home;
