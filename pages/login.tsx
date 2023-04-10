import { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { AuthInput } from "@/graphql/generated.graphql";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInputSchema } from "@/utils/createInputSchema";

const Login = () => {
  const schema = createInputSchema();
  const { errorMsg, isErrorMsg, login, loading } = useLogin();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = ({ email, password }: AuthInput) => {
    setIsLoading(true);
    login({ email, password });
  };

  return (
    <section>
      <div className="md:flex">
        <div className="md:w-1/2 border-b md:border-b-0 md:border-r px-6 md:px-10 pt-10 md:pt-20 pb-16 md:pb-40 border-black">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl md:text-3xl mb-8 font-futura">LOGIN</h1>
            <p className="mb-5 text-xs">会員登録がお済みの方</p>
            {isErrorMsg && (
              <p className="text-xs text-red-500 mb-2">{errorMsg}</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <Input
                  id="email"
                  placeholder="E-MAIL"
                  register={register("email")}
                  error={errors.email}
                />
              </div>
              <div className="mb-8">
                <Input
                  id="password"
                  type="password"
                  placeholder="PASSWORD"
                  register={register("password")}
                  error={errors.password}
                />
              </div>
              <Button isLoading={isLoading} type="submit">
                LOGIN
              </Button>
            </form>
          </div>
        </div>
        <div className="md:w-1/2 px-6 md:px-10 pt-10 md:pt-20 pb-16 md:pb-40">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl md:text-3xl mb-8 font-futura">
              CREATE ACCOUNT
            </h1>
            <p className="mb-5 text-xs">初めてご利用の方</p>
            <Link
              className="flex h-14 md:h-16 justify-center items-center text-center bg-black text-white font-futura text-base md:text-lg"
              href="/signup"
            >
              CREATE ACCOUNT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
