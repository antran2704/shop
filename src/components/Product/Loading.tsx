import { memo } from "react";

const ProductLoading = () => {
   return (
      <div
         className={`relative w-full text-[#1e1e1e] border rounded-md overflow-hidden transition-all ease-linear duration-100`}>
         <div className="block w-full h-full">
            <div className="skelaton w-full lg:h-[220px] md:h-[180px] h-[160px]" />
            <div className="px-2 py-2">
               <p className="skelaton w-full h-5 text-base font-normal line-clamp-2"></p>

               <div className="skelaton h-5 w-[140px] my-1"></div>
               <div className="skelaton h-5 w-[100px] my-1"></div>
            </div>
         </div>
      </div>
   );
};

export default memo(ProductLoading);
