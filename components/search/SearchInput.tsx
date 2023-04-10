import { isOpenSearchVar } from "@/utils/cache";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import SearchList from "./SearchList";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClick = () => {
    setSearchText("");
    isOpenSearchVar(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="fixed top-0 left-0 w-full h-full z-[110] backdrop-blur-md cursor-pointer"
      ></div>
      <div className="fixed top-0 left-0 w-full bg-white z-[120]">
        <div className="px-5 md:px-8 h-14 md:h-16 flex justify-between items-center border-b border-black">
          <div className="flex items-center w-full">
            <AiOutlineSearch size={24} color={"#000"} />
            <input
              className="w-full p-2 focus:outline-none placeholder:text-sm"
              type="text"
              value={searchText}
              placeholder="Search..."
              onChange={handleChange}
              autoFocus={true}
            />
          </div>
          <button onClick={handleClick}>
            <IoCloseOutline size={24} color={"#000"} />
          </button>
        </div>
        {searchText && <SearchList searchText={searchText} />}
      </div>
    </>
  );
};

export default SearchInput;
