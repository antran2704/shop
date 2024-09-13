import { memo } from "react";

const ModalCartItemLoading = () => {
   return (
      <li>
         <div className="flex items-start pb-3 px-2 border-b border-borderColor gap-4">
            <div className="skelaton sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] rounded-lg"></div>
            <div className="w-6/12">
               <p className="skelaton h-3 w-full"></p>
               <p className="skelaton h-3 w-2/4 mt-1"></p>

               <p className="skelaton h-3 w-1/4 mt-2"></p>
            </div>
         </div>
      </li>
   );
};

export default memo(ModalCartItemLoading);
