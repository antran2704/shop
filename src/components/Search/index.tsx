import Link from "next/link";
import {
  ChangeEvent,
  Fragment,
  useRef,
  useState,
  memo,
  useEffect,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IProductHome } from "~/interfaces";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";

interface Props {
  placeholder?: string;
  searchText: string | null;
  listItem: IProductHome[];
  noResult: boolean;
  onClearText: () => void;
  onChange: (value: string) => void;
}

const Search = (props: Props) => {
  const {
    searchText,
    placeholder = "Search....",
    listItem,
    noResult = false,
    onChange,
    onClearText,
  } = props;

  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);
  const inpSearchRef = useRef<HTMLInputElement>(null);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  useEffect(() => {
    if (showSearch) {
      setShowSearch(false);
      onClearText();
    }
  }, [router.pathname]);

  return (
    <Fragment>
      <div
        ref={searchRef}
        className={`relative flex items-center justify-end w-full h-10 px-1 py-1 pl-2 bg-white border  rounded-md transition-all ease-linear duration-100 z-30`}
      >
        <div className="min-w-6">
          <AiOutlineSearch className="sm:text-2xl text-xl w-full cursor-pointer" />
        </div>
        <input
          ref={inpSearchRef}
          type="text"
          value={searchText || ""}
          onChange={onChangeValue}
          onFocus={() => {
            searchRef.current?.classList.add("border-dark");
            setShowSearch(true);
          }}
          onBlur={() => searchRef.current?.classList.remove("border-dark")}
          placeholder={placeholder}
          className={`w-full px-2 outline-none transition-all ease-linear duration-100`}
        />
        {searchText && (
          <div onClick={onClearText} className="min-w-6">
            <IoMdClose className="text-xl w-full cursor-pointer" />
          </div>
        )}

        <div
          className={`absolute ${
            showSearch ? "block" : "hidden"
          } top-[110%] left-0 right-0 bg-white overflow-hidden rounded-md shadow-lg`}
        >
          {noResult && listItem.length === 0 && (
            <div className="flex flex-col items-center justify-center py-1 gap-2">
              {/* <img
                src="/no_result.svg"
                alt="No Result"
                className="w-[160px] h-[160px]"
              /> */}

              <p className="text-base font-medium">No Result</p>
            </div>
          )}
          {!noResult && listItem.length > 0 && (
            <ul className="w-full">
              {listItem.map((item: IProductHome) => (
                <li key={item._id}>
                  <Link
                    href={`/collections/product/${item.slug}`}
                    className="flex items-center text-base hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 gap-2"
                  >
                    <AiOutlineSearch className="text-lg" />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
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

export default memo(Search);
