import { CategoryModel } from "@/graphql/generated.graphql";
import Link from "next/link";
import ZoomAnimation from "../animation/ZoomAnimation";

type Props = {
  category: CategoryModel;
  isLarge?: boolean;
};

const CategoryItem = ({ category, isLarge = false }: Props) => {
  return (
    <Link
      className={`h-[35vw] ${
        isLarge ? "sm:h-[45vw]" : "sm:h-[30vw]"
      } border-t sm:border-t-0 sm:border-r border-black last:border-r-0 group relative overflow-hidden`}
      key={category.id}
      href={`/category/${category.slug}`}
    >
      <ZoomAnimation categoryName={category.name} />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition duration-300"></div>
      <p className="absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl font-futura text-white whitespace-nowrap">
        {category.name}
      </p>
    </Link>
  );
};

export default CategoryItem;
