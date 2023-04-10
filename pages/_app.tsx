import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "@/lib/apolloClient";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import { parseCookies } from "nookies";
import { isLoggedInVar } from "@/utils/cache";
import useTransition from "@/hooks/useTransition";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo();
  useTransition();

  useEffect(() => {
    const { token } = parseCookies();
    if (token) {
      isLoggedInVar(true);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>E-STORE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
