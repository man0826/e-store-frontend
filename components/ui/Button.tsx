import { ButtonHTMLAttributes, ReactNode } from "react";
import Loading from "./Loading";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
};

const Button = ({ children, isLoading, ...props }: Props) => {
  return (
    <button
      className="w-full h-14 md:h-16 flex justify-center items-center bg-black font-futura text-base md:text-lg text-white border border-black"
      {...props}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};

export default Button;
