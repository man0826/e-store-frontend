import { useCategories } from "@/hooks/useCategory";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Footer = () => {
  const { categories } = useCategories();
  const text = "E-STORE ".repeat(3).split(" ");
  const display = () => {
    return text.map((value, index) => (
      <div
        key={index}
        className="text-[130px] md:text-[180px] font-futura font-bold md:py-2 mr-8 md:mr-10 last:mr-0"
      >
        {value}
      </div>
    ));
  };

  return (
    <footer>
      <Marquee gradientWidth={0} speed={50} className="border-t border-black">
        {display()}
      </Marquee>
      <div className="border-t border-black px-6 lg:px-10 py-8">
        <ul className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-7">
          <li>
            <Link
              className="text-[13px] lg:text-sm font-futura"
              href="/category/new-arrivals"
            >
              NEW ARRIVALS
            </Link>
          </li>
          <li>
            <Link
              className="text-[13px] lg:text-sm font-futura"
              href="/category/trending"
            >
              TRENDING NOW
            </Link>
          </li>
          {categories?.slice(0, 6).map((category) => {
            const { id, slug, name } = category;
            return (
              <li key={id}>
                <Link
                  className="text-[13px] lg:text-sm font-futura"
                  href={`/category/${slug}`}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="bg-white border-t border-black md:px-10 py-6">
        <p className="text-[11px] md:text-xs text-center md:text-right font-futura tracking-wider">
          ©2023 E-STORE CO.,LTD. ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
