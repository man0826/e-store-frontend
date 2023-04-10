import { useCategories } from "@/hooks/useCategory";
import Link from "next/link";
import { useState } from "react";
import { slide as Menu } from "react-burger-menu";

const Nav = () => {
  const { categories } = useCategories();
  const [isOpen, setOpen] = useState(false);

  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  return (
    <Menu
      width={320}
      isOpen={isOpen}
      onOpen={handleIsOpen}
      onClose={handleIsOpen}
    >
      <ul>
        <li className="mb-4">
          <Link
            onClick={closeSideBar}
            className="text-base font-futura"
            href="/"
          >
            TOP
          </Link>
        </li>
        <li className="mb-4">
          <Link
            onClick={closeSideBar}
            className="text-base font-futura"
            href="/category/new-arrivals"
          >
            NEW ARRIVALS
          </Link>
        </li>
        <li className="mb-4">
          <Link
            onClick={closeSideBar}
            className="text-base font-futura"
            href="/category/trending"
          >
            TRENDING NOW
          </Link>
        </li>
        {categories?.slice(0, 6).map((category) => (
          <li key={category.id} className="mb-4 last:mb-0">
            <Link
              onClick={closeSideBar}
              className="text-base font-futura"
              href={`/category/${category.slug}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </Menu>
  );
};

export default Nav;
