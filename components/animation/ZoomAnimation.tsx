import Image from "next/image";
import { useInView } from "react-intersection-observer";

type Props = {
  categoryName: string;
};

const ZoomAnimation = ({ categoryName }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Image
      className={`${
        inView ? "scale-100" : "scale-125"
      } inline-block transition duration-1000 -z-10`}
      ref={ref}
      src={`/images/category/${categoryName}.jpg`}
      alt={categoryName}
      layout="fill"
      objectFit="cover"
    />
  );
};

export default ZoomAnimation;
