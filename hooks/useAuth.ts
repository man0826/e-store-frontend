import {
  AuthInput,
  LoginDocument,
  LoginMutation,
} from "@/graphql/generated.graphql";
import { useMutation } from "@apollo/client";
import { setCookie, destroyCookie } from "nookies";
import { isLoggedInVar } from "@/utils/cache";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { initializeApollo } from "@/lib/apolloClient";
import { setCartTotal } from "@/utils/setCartTotal";

export const useLogin = () => {
  const [authenticate, { loading }] = useMutation<LoginMutation>(LoginDocument);
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [isErrorMsg, setIsErrorMsg] = useState(false);

  const login = useCallback(async ({ email, password }: AuthInput) => {
    await authenticate({
      variables: {
        authInput: {
          email,
          password,
        },
      },
      onCompleted({ authenticate }) {
        setCookie(null, "token", authenticate.access_token);
        isLoggedInVar(true);
        setCartTotal(authenticate.user.cartItems);
        setTimeout(() => {
          router.push("/account");
        }, 600);
      },
      onError(error) {
        setErrorMsg(error.message);
        setTimeout(() => setIsErrorMsg(true), 500);
      },
    });
  }, []);
  return {
    errorMsg,
    isErrorMsg,
    login,
    loading,
  };
};

export const useLogout = () => {
  const client = initializeApollo();
  const router = useRouter();

  return useCallback(async () => {
    await client.resetStore();
    destroyCookie({}, "token");
    isLoggedInVar(false);
    router.push("/login");
  }, []);
};
