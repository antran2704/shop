import Link from "next/link";
import { ICartItem, IProductInfo } from "~/interfaces";

import ImageCus from "~/components/Image";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import { AiFillCloseCircle } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProductInfo } from "~/api-client";

interface Props {
   data: ICartItem;
}

const CheckoutItem = (props: Props) => {
   const { data } = props;

   const [infoProduct, setInfoProduct] = useState<IProductInfo>({
      inventory: 1,
      price: 0,
      promotion_price: 0,
   });

   const handleGetInfo = async (productId: string) => {
      const { status, payload } = await getProductInfo(productId);

      if (status === 200) {
         setInfoProduct(payload);
      }
   };

   useEffect(() => {
      if (data.variation) {
         handleGetInfo(data.variation._id as string);
      } else {
         handleGetInfo(data.product._id as string);
      }
   }, []);

   return (
      <li className="flex items-center justify-between w-full pb-5 border-b border-borderColor gap-4">
         <div className="flex items-center gap-5">
            <Link
               href={`/collections/product/${data.product._id}.${data.product.slug}`}
               className="relative">
               <span className="flex items-center justify-center absolute -top-2 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                  {data.quantity}
               </span>
               <ImageCus
                  src={
                     ((process.env.NEXT_PUBLIC_IMAGE_ENDPOINT as string) +
                        data.product.thumbnail) as string
                  }
                  className="w-[60px] h-[60px] border border-borderColor rounded-lg"
                  alt="img"
                  title="img"
               />
            </Link>
            <Link
               href={`/collections/product/${data.product._id}.${data.product.slug}`}
               className="w-8/12">
               <h3 className="sm:text-base text-sm font-medium my-0">
                  {data.variation ? data.variation.title : data.product.title}
               </h3>
               {data.variation && (
                  <p className="sm:text-sm text-xs mt-2">
                     {(infoProduct.promotion_price as number) > 0
                        ? formatBigNumber(infoProduct.promotion_price as number)
                        : formatBigNumber(infoProduct.price as number)}
                     {" VND "}X {data.quantity}
                  </p>
               )}

               {!data.variation && (
                  <p className="sm:text-sm text-xs mt-2">
                     {(infoProduct.promotion_price as number) > 0
                        ? formatBigNumber(infoProduct.promotion_price as number)
                        : formatBigNumber(infoProduct.price as number)}
                     {" VND"}X {data.quantity}
                  </p>
               )}
            </Link>
         </div>
         {data.variation && (
            <p className="sm:text-base text-sm font-medium">
               {(infoProduct.promotion_price as number) > 0
                  ? formatBigNumber(
                       (infoProduct.promotion_price as number) * data.quantity,
                    )
                  : formatBigNumber(
                       (infoProduct.price as number) * data.quantity,
                    )}
               {" VND "}
            </p>
         )}

         {!data.variation && (
            <p className="sm:text-base text-sm font-medium">
               {(infoProduct.promotion_price as number) > 0
                  ? formatBigNumber(
                       (infoProduct.promotion_price as number) * data.quantity,
                    )
                  : formatBigNumber(
                       (infoProduct.price as number) * data.quantity,
                    )}
               {" VND"}
            </p>
         )}
      </li>
   );
};

export default CheckoutItem;
