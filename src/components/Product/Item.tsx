import Link from "next/link";
import { Fragment, memo } from "react";
import {
   CURRENCY_CHARACTER,
   formatBigNumber,
   getPercentPromotionPrice,
} from "~/helpers/number/fomatterCurrency";

import ImageCus from "../Image";
import { IListProduct } from "~/interfaces";

interface Props {
   data: IListProduct;
   hoverScale?: boolean;
}

const ProductItem = (props: Props) => {
   const { data, hoverScale = false } = props;
   return (
      <div
         className={`group relative w-full text-[#1e1e1e] ${
            hoverScale ? "hover:scale-105" : ""
         } lg:hover:shadow-lg border rounded-md overflow-hidden transition-all ease-linear duration-100`}>
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
            <div className="px-2 pt-2 pb-4">
               <div className="h-10">
                  <p className="group-hover:text-primary text-base font-normal line-clamp-2">
                     {data.title}
                  </p>
               </div>
               <div className="flex items-center flex-wrap pt-4 h-14">
                  {/* Show when promotion price > 0 */}
                  {data.promotion_price > 0 && (
                     <Fragment>
                        <span className="block md:text-base text-sm font-medium pr-2 text-primary">
                           {formatBigNumber(data.promotion_price)}
                           {CURRENCY_CHARACTER}
                        </span>
                        <span className="block text-xs text-[#666] line-through">
                           {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
                        </span>
                     </Fragment>
                  )}

                  {/* Show when haven't promotion price*/}
                  {!data.promotion_price && (
                     <span className="inline-block md:text-base text-sm font-medium text-primary">
                        {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
                     </span>
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

            {data.inventory === 0 && (
               <div className="absolute top-0 right-0 bg-primary">
                  <p className="text-xs text-center font-medium text-white p-1">
                     Sold out
                  </p>
               </div>
            )}
         </Link>
      </div>
   );
};

export default memo(ProductItem);
