import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const Input = ({ register, error, ...props }: Props) => {
  return (
    <>
      <input
        className="w-full text-sm px-3.5 md:px-4 py-2.5 md:py-3 border border-black focus:outline-none font-futura"
        {...register}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-rose-600">{error.message}</p>}
    </>
  );
};

export default Input;
