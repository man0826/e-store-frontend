import { makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(false);
export const cartTotalVar = makeVar<number>(0);
export const isOpenSearchVar = makeVar<boolean>(false);
