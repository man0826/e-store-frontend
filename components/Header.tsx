import Link from "next/link";
import { cartTotalVar, isLoggedInVar, isOpenSearchVar } from "@/utils/cache";
import { useReactiveVar } from "@apollo/client";
import { useLoginUser } from "@/hooks/useUser";
import { setCartTotal } from "@/utils/setCartTotal";
import { useEffect } from "react";
import { BsBag } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { IoSearchOutline } from "react-icons/io5";
import Marquee from "react-fast-marquee";
import { useCategories } from "@/hooks/useCategory";
import SearchInput from "./search/SearchInput";
import Nav from "./Nav";
import { destroyCookie } from "nookies";

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const cartTotal = useReactiveVar(cartTotalVar);
  const isOpenSearch = useReactiveVar(isOpenSearchVar);
  const { loginUser, loginUserLoading, error } = useLoginUser();
  const { categories } = useCategories();
  const text = "10,000円以上のお買い上げで送料無料 ".repeat(5).split(" ");
  const display = () => {
    return text.map((value, index) => (
      <div
        key={index}
        className="text-[11px] md:text-xs text-white font-bold tracking-widest mr-20 md:mr-40 last:mr-0"
      >
        {value}
      </div>
    ));
  };

  useEffect(() => {
    if (!loginUserLoading) {
      if (loginUser) {
        setCartTotal(loginUser.cartItems);
      }
      if (error) {
        destroyCookie({}, "token");
        isLoggedInVar(false);
      }
    }
  }, [loginUserLoading]);

  useEffect(() => {
    const body = document.getElementById("body");
    if (isOpenSearch) {
      body!.style.overflow = "hidden";
    } else {
      body!.style.overflow = "visible";
    }
  }, [isOpenSearch]);

  return (
    <>
      <Marquee gradientWidth={0} speed={50} className="bg-black py-1.5">
        {display()}
      </Marquee>
      <header className="sticky top-0 bg-white border-b border-black z-[101] w-full h-14 md:h-16">
        <Nav />
        <div className="w-full h-full relative pl-2 lg:pl-5">
          <ul className="h-full hidden md:flex">
            <li className="flex items-center px-3">
              <Link
                className="text-sm lg:text-base font-futura"
                href="/category/new-arrivals"
              >
                NEW ARRIVALS
              </Link>
            </li>
            <li className="flex items-center px-3 group">
              <span className="text-sm lg:text-base font-futura">
                CATEGORIES
              </span>
              <div className="absolute top-full left-0 w-full bg-white px-10 py-3 border-y border-black opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all">
                <ul className="flex gap-5">
                  {categories?.slice(0, 6).map((category) => {
                    const { id, slug, name } = category;
                    return (
                      <li key={id}>
                        <Link
                          className="text-sm font-futura"
                          href={`/category/${slug}`}
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
          </ul>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-futura absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/">E-STORE</Link>
          </h1>
          <div className="absolute top-1/2 right-3 md:right-6 lg:right-10 -translate-y-1/2 flex items-center gap-3 md:gap-7">
            <button
              className="cursor-pointer"
              onClick={() => isOpenSearchVar(!isOpenSearch)}
            >
              <IoSearchOutline size={24} color={"#000"} />
            </button>
            {isLoggedIn ? (
              <Link href="/account">
                <RxPerson size={24} color={"#000"} />
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <RxPerson size={24} color={"#000"} />
                </Link>
              </>
            )}
            <Link className="relative" href="/cart">
              <BsBag size={24} color={"#000"} />
              {isLoggedIn &&
                (cartTotal ? (
                  <span className="absolute top-[7px] left-1/2 -translate-x-1/2 text-black font-futura text-[11px]">
                    {cartTotal}
                  </span>
                ) : (
                  ""
                ))}
            </Link>
          </div>
        </div>
      </header>
      {isOpenSearch && <SearchInput />}
    </>
  );
};

export default Header;
