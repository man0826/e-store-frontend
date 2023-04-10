import {
  CreateUserDocument,
  CreateUserInput,
  CreateUserMutation,
  LoginUserDocument,
  LoginUserQuery,
  UpdateUserDocument,
  UpdateUserInput,
  UpdateUserMutation,
} from "@/graphql/generated.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { useLogin } from "./useAuth";

export const useLoginUser = () => {
  const { data, loading, error } = useQuery<LoginUserQuery>(LoginUserDocument, {
    fetchPolicy: "network-only",
  });

  return {
    loginUser: data?.loginUser,
    loginUserLoading: loading,
    error,
  };
};

export const useCreateUser = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const { login } = useLogin();
  const [createUser, { loading }] =
    useMutation<CreateUserMutation>(CreateUserDocument);

  const handleCreateUser = useCallback(
    async ({ name, email, password }: CreateUserInput) => {
      await createUser({
        variables: {
          createUserInput: {
            name,
            email,
            password,
          },
        },
        onCompleted() {
          login({ email, password });
        },
        onError(error) {
          setErrorMsg(error.message);
          setTimeout(() => setIsErrorMsg(true), 500);
        },
      });
    },
    []
  );

  return {
    errorMsg,
    isErrorMsg,
    loading,
    handleCreateUser,
  };
};

export const useUpdateUser = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);
  const [updateUser, { loading }] =
    useMutation<UpdateUserMutation>(UpdateUserDocument);

  const handleUpdateUser = useCallback(
    async ({ name, email }: UpdateUserInput) => {
      await updateUser({
        variables: {
          updateUserInput: {
            name,
            email,
          },
        },
        onCompleted() {
          setTimeout(() => {
            setIsErrorMsg(false);
            setErrorMsg("");
          }, 500);
        },
        onError(error) {
          setErrorMsg(error.message);
          setTimeout(() => setIsErrorMsg(true), 500);
        },
      });
    },
    []
  );

  return {
    errorMsg,
    isErrorMsg,
    loading,
    handleUpdateUser,
  };
};
