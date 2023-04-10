import { useCreateUser } from "@/hooks/useUser";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "@/graphql/generated.graphql";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInputSchema } from "@/utils/createInputSchema";
import Input from "@/components/ui/Input";

const Signup = () => {
  const schema = createInputSchema();
  const { errorMsg, isErrorMsg, loading, handleCreateUser } = useCreateUser();
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
  } = useForm<CreateUserInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ name, email, password }: CreateUserInput) => {
    setIsLoading(true);
    handleCreateUser({ name, email, password });
  };

  return (
    <section>
      <div className="px-6 py-10 md:py-20">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl md:text-3xl mb-8 font-futura">
            CREATE ACCOUNT
          </h1>
          <p className="mb-5 text-xs">初めてご利用の方</p>
          {isErrorMsg && (
            <p className="text-xs text-red-500 mb-2">{errorMsg}</p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <Input
                id="name"
                placeholder="NAME"
                register={register("name")}
                error={errors.name}
              />
            </div>
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
              SIGNUP
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
