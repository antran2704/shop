import Link from "next/link";
import { Fragment, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inpSearchRef = useRef<HTMLInputElement>(null);

  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <Fragment>
      <div
        ref={searchRef}
        className={`relative sm:flex hidden items-center justify-end w-full px-1 py-1 bg-white border  rounded-md transition-all ease-linear duration-100 z-30`}
      >
        <input
          ref={inpSearchRef}
          type="text"
          onFocus={() => {
            searchRef.current?.classList.add("border-dark");
            setShowSearch(true);
          }}
          onBlur={() => searchRef.current?.classList.remove("border-dark")}
          placeholder="Search Product"
          className={`w-full px-2 outline-none transition-all ease-linear duration-100`}
        />
        <AiOutlineSearch className="lg:text-3xl md:text-2xl text-xl cursor-pointer" />

        {/* {showSearch && ( */}
        <div
          className={`absolute ${
            showSearch ? "block" : "hidden"
          } top-[110%] left-0 right-0 bg-white border-2 rounded-md shadow-lg`}
        >
          {/* <div className="flex flex-col items-center justify-center py-5 gap-2">
              <img
                src="/no_result.svg"
                alt="No Result"
                className="w-[160px] h-[160px]"
              />

              <p className="text-base font-medium">No Result</p>
            </div> */}
          <ul className="w-full">
            <li>
              <Link
                href={"/s"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
            <li>
              <Link
                href={"/"}
                className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
              >
                <AiOutlineSearch className="text-lg" />
                test
              </Link>
            </li>
          </ul>
        </div>
        {/* )} */}
      </div>
      {showSearch && (
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 z-20`}
          style={{ backgroundColor: "rgba(1,1,1, 0.6)" }}
          onClick={() => setShowSearch(false)}
        ></div>
      )}
    </Fragment>
  );
};

export default Search;
