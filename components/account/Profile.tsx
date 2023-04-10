import { FieldError, useForm } from "react-hook-form";
import { useLoginUser, useUpdateUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { UpdateUserInput } from "@/graphql/generated.graphql";
import Button from "../ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInputSchema } from "@/utils/createInputSchema";
import Input from "../ui/Input";

const Profile = () => {
  const schema = createInputSchema();
  const { errorMsg, isErrorMsg, loading, handleUpdateUser } = useUpdateUser();
  const { loginUser } = useLoginUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [loading]);

  useEffect(() => {
    if (loginUser) {
      reset({ name: loginUser.name, email: loginUser.email });
    }
  }, [loginUser]);

  const onSubmit = async ({ name, email }: UpdateUserInput) => {
    setIsLoading(true);
    handleUpdateUser({ name, email });
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-xl md:text-2xl font-futura mb-6">PROFILE</h1>
      {isErrorMsg && <p className="text-xs text-red-500 mb-2">{errorMsg}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5">
          <Input
            id="name"
            placeholder="NAME"
            register={register("name")}
            error={errors.name}
          />
        </div>
        <div className="mb-8">
          <Input
            id="email"
            placeholder="E-MAIL"
            register={register("email")}
            error={errors.email}
          />
        </div>
        <Button isLoading={isLoading} type="submit">
          UPDATE PROFILE
        </Button>
      </form>
    </div>
  );
};

export default Profile;
