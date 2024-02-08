import { memo } from "react";

const CartItemLoading = () => {
  return (
    <li className="flex md:flex-row flex-col items-center justify-between w-full lg:pb-5 p-5 border border-borderColor rounded-md gap-5">
      <div className="flex md:flex-row flex-col items-center gap-5">
        <div className="skelaton lg:w-[140px] lg:h-[140px] lg:min-w-[140px] lg:min-h-[140px] md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]"></div>

        <div>
          <p className="skelaton w-2/4 h-3"></p>
          <p className="skelaton h-1/4"></p>
        </div>
      </div>

      <div className="skelaton w-20 h-5"></div>
      <p className="skelaton w-20 h-5"></p>
      <div className="skelaton w-12 h-10"></div>
    </li>
  );
};

export default memo(CartItemLoading);
