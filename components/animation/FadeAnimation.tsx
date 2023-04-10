import { useInView } from "react-intersection-observer";

type Props = {
  children: React.ReactNode;
};

const FadeAnimation = ({ children }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.7,
  });

  return (
    <span
      className={`${
        inView ? "opacity-100" : "opacity-0"
      } transition duration-300`}
      ref={ref}
    >
      {children}
    </span>
  );
};

export default FadeAnimation;
