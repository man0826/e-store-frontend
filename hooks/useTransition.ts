import { useRouter } from "next/router";
import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

nprogress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

const useTransition = () => {
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      nprogress.start();
    };

    const handleStop = () => {
      nprogress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
};

export default useTransition;
