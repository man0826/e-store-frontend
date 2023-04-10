import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="w-full pb-1">
      <Skeleton className="h-[45vw] sm:h-[31vw] lg:h-[23.5vw] mb-3" />
      <Skeleton className="h-[15px] sm-1" />
      <Skeleton className="h-[12px]" />
    </div>
  );
};

export default CardSkeleton;
