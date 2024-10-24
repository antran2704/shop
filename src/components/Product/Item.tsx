import Link from "next/link";
import { Fragment, memo } from "react";
import { AiFillStar } from "react-icons/ai";
import {
   CURRENCY_CHARACTER,
   formatBigNumber,
   getPercentPromotionPrice,
} from "~/helpers/number/fomatterCurrency";

import { IProductHome } from "~/interfaces";
import ImageCus from "../Image";

interface Props {
   data: IProductHome;
   hoverScale?: boolean;
}

const ProductItem = (props: Props) => {
   const { data, hoverScale = false } = props;
   return (
      <div
         className={`group relative w-full text-[#1e1e1e] ${
            hoverScale ? "hover:scale-105" : ""
         } hover:shadow-lg border rounded-md overflow-hidden transition-all ease-linear duration-100`}>
         <Link
            href={`/products/${data._id}.${data.slug}`}
            className="block w-full h-full">
            <div className="relative pb-[100%] ">
               <ImageCus
                  src={data.thumbnail as string}
                  title={data.title}
                  alt={data.title}
                  className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-center object-cover"
               />
            </div>
            <div className="px-2 py-2 h-[120px]">
               <p className="group-hover:text-primary  h-[48px] text-base font-normal line-clamp-2">
                  {data.title}
               </p>

               <div className="pt-2">
                  {data.promotion_price > 0 && data.inventory > 0 && (
                     <Fragment>
                        <span className="block md:text-base text-sm font-medium text-primary">
                           {formatBigNumber(data.promotion_price)}{" "}
                           {CURRENCY_CHARACTER}
                        </span>
                        <span className="block text-sm text-[#666] line-through">
                           {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
                        </span>
                     </Fragment>
                  )}

                  {!data.promotion_price && data.inventory > 0 && (
                     <span className="inline-block md:text-base text-sm font-medium text-primary">
                        {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
                     </span>
                  )}

                  {data.inventory <= 0 && (
                     <p className="w-full md:text-base text-sm font-medium text-primary">
                        Sold out
                     </p>
                  )}
               </div>
            </div>

            {data.inventory > 0 && data.promotion_price > 0 && (
               <div className="absolute top-0 right-0 bg-primary">
                  <p className="text-xs text-center font-medium text-white w-10 p-1">
                     {getPercentPromotionPrice(
                        data.price,
                        data.promotion_price,
                     )}
                     %
                  </p>
               </div>
            )}
         </Link>
      </div>
   );
};

export default memo(ProductItem);
