import { useSearchProduct } from "@/hooks/useProduct";
import ProductItem from "../product/ProductItem";

type Props = {
  searchText: string;
};

const SearchList = ({ searchText }: Props) => {
  const { searchProducts, loading } = useSearchProduct(searchText);

  if (loading)
    return (
      <div className="flex justify-center items-center bg-white h-[480px] border-b border-black">
        <div className="animate-spin h-10 w-10 border-[3px] border-black rounded-full border-t-transparent"></div>
      </div>
    );

  return (
    <>
      {searchProducts?.length !== 0 ? (
        <>
          <div className="bg-white max-h-[480px] overflow-y-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {searchProducts?.map((product) => {
                return <ProductItem key={product.id} product={product} />;
              })}
            </div>
          </div>
          <div className="bg-white px-6 py-4 border-y border-black">
            <p className="text-base font-futura">
              {searchProducts?.length} RESULTS
            </p>
          </div>
        </>
      ) : (
        <div className="bg-white px-6 py-4 border-b border-black">
          <p className="text-base font-futura">No results could be found</p>
        </div>
      )}
    </>
  );
};

export default SearchList;
