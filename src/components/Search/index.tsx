import {
   ChangeEvent,
   Fragment,
   useRef,
   useState,
   memo,
   useEffect,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import { SpinLoading } from "../Loading";
import { IListProduct } from "~/interfaces";

interface Props {
   placeholder?: string;
   searchText: string | null;
   listItem: IListProduct[];
   loading?: boolean;
   noResult: boolean;
   showSearchMobile: boolean;
   onShowSearchMobile: () => void;
   onClearText: () => void;
   onChange: (value: string) => void;
}

const Search = (props: Props) => {
   const {
      searchText,
      placeholder = "Search....",
      listItem,
      noResult = false,
      loading = false,
      showSearchMobile,
      onShowSearchMobile,
      onChange,
      onClearText,
   } = props;

   const router = useRouter();

   const searchRef = useRef<HTMLDivElement>(null);
   const inpSearchRef = useRef<HTMLInputElement>(null);

   const [showSearch, setShowSearch] = useState<boolean>(false);

   const onClick = (item: IListProduct) => {
      setShowSearch(false);

      if (showSearchMobile) {
         onShowSearchMobile();
      }

      router.push(`/collections/product/${item._id}.${item.slug}`);
   };

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
            className={`relative flex items-center justify-between w-full h-10 px-1 py-1 pl-2 bg-white border  rounded-md transition-all ease-linear duration-100 z-30`}>
            <div className="min-w-6 w-6 h-6">
               <AiOutlineSearch className="w-full h-full cursor-pointer" />
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
               className={`flex-1 px-2 outline-none transition-all ease-linear duration-100`}
            />
            {searchText && (
               <div onClick={onClearText} className="min-w-6 w-6 h-6">
                  <IoMdClose className="text-xl w-full h-full cursor-pointer" />
               </div>
            )}

            <div
               className={`absolute ${
                  showSearch ? "block" : "hidden"
               } top-[110%] left-0 right-0 bg-white overflow-hidden rounded-md shadow-lg`}>
               {!loading && searchText && noResult && listItem.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-1 gap-2">
                     {/* <img
                src="/no_result.svg"
                alt="No Result"
                className="w-[160px] h-[160px]"
              /> */}

                     <p className="text-base font-medium">No Result</p>
                  </div>
               )}

               {loading && searchText && (
                  <div className="relative flex items-center justify-center h-8 py-2 px-3">
                     <SpinLoading className="text-2xl" />
                  </div>
               )}

               {!loading && !noResult && listItem.length > 0 && (
                  <ul className="w-full">
                     {listItem.map((item: IListProduct) => (
                        <li
                           onClick={() => onClick(item)}
                           key={item._id}
                           className="flex items-center hover:bg-[#e5e5e5] py-2 px-3 transition-all ease-linear duration-75 cursor-pointer gap-2">
                           <AiOutlineSearch className="min-w-6 w-6 h-6" />
                           <p className="text-base line-clamp-2">
                              {item.title}
                           </p>
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
               onClick={() => setShowSearch(false)}></div>
         )}
      </Fragment>
   );
};

export default memo(Search);
