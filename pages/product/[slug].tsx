import {
  GetProductsDocument,
  GetProductsQuery,
  ProductColor,
  ProductDetailPageDocument,
  ProductDetailPageQuery,
  ProductModel,
  ProductSize,
} from "@/graphql/generated.graphql";
import { initializeApollo } from "@/lib/apolloClient";
import {
  NextPage,
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "@/utils/cache";
import { useRouter } from "next/router";
import { useAddCart } from "@/hooks/useCart";
import { convertYen } from "@/utils/convertYen";
import { Link as Scroll } from "react-scroll";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { SideBySideMagnifier } from "react-image-magnifiers";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCategory } from "@/hooks/useCategory";
import Button from "@/components/ui/Button";
import Link from "next/link";
import ProductSlider from "@/components/slider/ProductSlider";

type Props = {
  product: ProductModel;
};

const Product: NextPage<Props> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();
  const addCart = useAddCart();
  const { id, name, price, colors, sizes, categories } = product;
  const categorySlug = categories ? categories[0].slug : null;
  const [isLoading, setIsLoading] = useState(true);
  const { category } = useCategory(categorySlug!);
  const relatedItems = category?.products.filter((item) => item.id !== id);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  useEffect(() => {
    setSelectedColor(0);
    setSelectedSize(0);
  }, [product]);

  const handleSubmit = async () => {
    if (isLoggedIn) {
      await addCart({
        productId: Number(id),
        quantity,
        size: sizes && (sizes[selectedSize] as ProductSize),
        color: colors && (colors[selectedColor] as ProductColor),
      });
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="product">
      <div className="px-3 md:px-6 py-2 border-b border-black">
        <ul className="flex">
          <li className="text-[11px] md:text-xs font-futura after:content-['/'] after:mx-1 md:after:mx-2">
            <Link className="hover:underline" href="/">
              HOME
            </Link>
          </li>
          <li className="text-[11px] md:text-xs font-futura after:content-['/'] after:mx-1 md:after:mx-2">
            <Link
              className="hover:underline"
              href={`/category/${categorySlug}`}
            >
              {category?.name}
            </Link>
          </li>
          <li className="text-[11px] md:text-xs font-futura">{name}</li>
        </ul>
      </div>
      <div className="md:flex items-start">
        <div className="md:w-1/2">
          <div className="md:hidden pb-7">
            {!isLoading ? (
              <ProductSlider images={product.images} />
            ) : (
              <Skeleton borderRadius={0} className="h-[100vw]" />
            )}
          </div>
          <div className="hidden md:block">
            {!isLoading ? (
              product.images.map((image, i) => (
                <div
                  key={i}
                  id={`image-${i.toString()}`}
                  className="border-r border-b border-black last:border-b-0"
                >
                  <SideBySideMagnifier
                    imageSrc={image}
                    imageAlt={image}
                    alwaysInPlace={true}
                  />
                </div>
              ))
            ) : (
              <div className="border-r border-black bg-[#ebebeb]">
                <Skeleton
                  borderRadius={0}
                  className="h-[49.5vw] border-b border-black"
                />
                <Skeleton borderRadius={0} className="h-[49.5vw]" />
              </div>
            )}
          </div>
        </div>
        <div className="md:w-1/2 sticky top-16 px-[6vw] lg:px-20 py-12 md:py-20">
          {!isLoading ? (
            <>
              <h3 className="text-2xl lg:text-3xl font-futura mb-2">{name}</h3>
              <p className="text-lg lg:text-xl font-futura mb-6 md:mb-10">
                {convertYen(price)}
              </p>
              {colors &&
                colors.length > 0 &&
                colors?.find((color) => color !== "NONE") && (
                  <div className="mb-6">
                    <p className="text-xs font-futura mb-1.5">
                      COLOR : {colors[selectedColor]}
                    </p>
                    <div className="hidden md:flex items-center gap-2">
                      {colors.map((color, i) => (
                        <Scroll
                          key={i}
                          to={`image-${i}`}
                          smooth={true}
                          duration={300}
                          offset={-60}
                          onClick={() => setSelectedColor(i)}
                          className={`${
                            selectedColor === i ? "border border-gray-600" : ""
                          } relative w-8 h-8 rounded-full transition duration-100 cursor-pointer`}
                        >
                          <span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  inline-block w-6 h-6 rounded-full border border-gray-300"
                            style={{
                              background: `${color.toLowerCase()}`,
                            }}
                          ></span>
                        </Scroll>
                      ))}
                    </div>
                    <div className="flex md:hidden items-center gap-2">
                      {colors.map((color, i) => (
                        <div
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          className={`${
                            selectedColor === i ? "border border-gray-600" : ""
                          } md:hidden relative w-8 h-8 rounded-full transition duration-100 cursor-pointer`}
                        >
                          <span
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  inline-block w-6 h-6 rounded-full border border-gray-300"
                            style={{
                              background: `${color.toLowerCase()}`,
                            }}
                          ></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              {sizes && sizes.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <p className="text-xs mb-1.5 font-futura">
                    SIZE : {sizes[selectedSize]}
                  </p>
                  <div className="flex items-center">
                    {sizes?.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(index)}
                        className={`
                    ${
                      selectedSize === index
                        ? "text-white bg-black pointer-events-none"
                        : "text-black bg-white"
                    } mr-2 border border-black w-14 h-9 text-sm font-futura transition-all
                  `}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="inline-block border border-black mb-5">
                <div className="flex items-center">
                  <button
                    className="px-4 md:px-5 py-3 md:py-3.5"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  >
                    <AiOutlineMinus size={15} color={"#000"} />
                  </button>
                  <div className="text-sm w-7 text-center font-futura">
                    {quantity}
                  </div>
                  <button
                    className="px-4 md:px-5 py-3 md:py-3.5"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <AiOutlinePlus size={15} color={"#000"} />
                  </button>
                </div>
              </div>
              <Button isLoading={false} onClick={handleSubmit}>
                ADD TO CART
              </Button>
            </>
          ) : (
            <>
              <Skeleton className="h-[30px] md:h-[32px] mb-3" />
              <Skeleton className="h-[20px] md:h-[22px] mb-6 md:mb-9" />
              <Skeleton className="h-[15px] md:h-[20px]" />
              <Skeleton className="h-[30px] mb-4" />
              <Skeleton className="h-[15px] md:h-[20px]" />
              <Skeleton className="h-[30px] md:h-[32px] mb-5 md:mb-7" />
              <Skeleton className="h-[40px] md:h-[45px] mb-4" />
              <Skeleton className="h-[56px] md:h-[63px]" />
            </>
          )}
        </div>
      </div>
      {relatedItems && relatedItems.length > 0 && (
        <>
          <div className="px-5 md:px-10 flex items-center h-[70px] md:h-20 border-t border-black">
            <h3 className="text-lg md:text-2xl font-futura">RELATED ITEMS</h3>
          </div>
          <ProductSlider products={relatedItems.slice(0, 8)} />
        </>
      )}
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();
  const {
    data: { products },
  } = await apolloClient.query<GetProductsQuery>({
    query: GetProductsDocument,
  });
  const paths = products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// export const getStaticProps: GetStaticProps<Props> = async ({
export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  try {
    const apolloClient = initializeApollo();
    const {
      data: { findProductBySlug },
    } = await apolloClient.query<ProductDetailPageQuery>({
      query: ProductDetailPageDocument,
      variables: {
        productSlug: params?.slug,
      },
    });

    return {
      props: {
        product: findProductBySlug,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
};

export default Product;
