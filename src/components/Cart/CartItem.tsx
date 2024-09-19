import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

import ProductQuantity from "~/components/ProductQuantity";
import { ICartItem, SendCartItem } from "~/interfaces";
import ImageCus from "~/components/Image";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import { CART_KEY, updateCart } from "~/api-client/cart";
import { useAppSelector } from "~/store/hooks";
import useDebounce from "~/hooks/useDebounce";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import ModalConfirm from "../Modal/ModalConfirm";
import CartItemLoading from "./CartItemLoading";
import { useCart } from "~/hooks/useCart";

interface Props {
   data: ICartItem;
   onDelete: (data: ICartItem) => void;
}

const CartItem: FC<Props> = (props: Props) => {
   const { data, onDelete } = props;
   const { infor } = useAppSelector((state) => state.user);
   const { cart } = useCart(!!infor._id);

   const { mutate } = useSWRConfig();

   const [totalProduct, setTotalProduct] = useState<number>(0);
   const total = useDebounce(totalProduct.toString(), 1000);

   const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

   const updateCartItem = async (quantity: number) => {
      if (!cart) return;
      const dataSend: SendCartItem = {
         product_id: data.product._id as string,
         variation_id: data.variation?._id as string | null,
         quantity,
      };

      await updateCart(cart._id, dataSend)
         .then(() => {
            mutate(CART_KEY.CART_USER);
            mutate(CART_KEY.CART_ITEMS);
            toast.success("Thay đổi số lượng thành công", {
               position: toast.POSITION.BOTTOM_RIGHT,
            });
         })
         .catch((err) => err);
   };

   useEffect(() => {
      if (totalProduct > 0 && totalProduct !== data.quantity) {
         updateCartItem(totalProduct);
      }
   }, [total]);

   useEffect(() => {
      setTotalProduct(data.quantity);
   }, [data]);

   return (
      <li
         className={`flex md:flex-row flex-col items-center justify-between w-full bg-white lg:pb-5 p-5 ${
            data.inventory < data.quantity
               ? "border-primary"
               : "border-transparent"
         } border-2 rounded-md gap-5`}>
         <div
            className={`flex md:flex-row flex-col items-center md:w-6/12 ${
               data.inventory <= 0 ? "opacity-80" : ""
            }  gap-5`}>
            <Link
               href={`/collections/product/${data.product._id}.${data.product.slug}`}
               className="lg:w-[140px] lg:h-[140px] lg:min-w-[140px] lg:min-h-[140px] md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]">
               <ImageCus
                  src={
                     ((process.env.NEXT_PUBLIC_IMAGE_ENDPOINT as string) +
                        data.product.thumbnail) as string
                  }
                  title={data.product.title as string}
                  alt={data.product.title as string}
                  className="w-full h-full object-fill object-center rounded-md"
               />
            </Link>

            <div>
               {!data.variation && (
                  <Link
                     href={`/collections/product/${data.product._id}.${data.product.slug}`}
                     className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2">
                     {data.product.title}
                  </Link>
               )}

               {data.variation && (
                  <Link
                     href={`/collections/product/${data.product._id}.${data.product.slug}`}
                     className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2">
                     {data.variation.title}
                  </Link>
               )}

               {data.variation && (
                  <Link
                     href={`/collections/product/${data.product._id}.${data.product.slug}`}
                     className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2">
                     {data?.options}
                  </Link>
               )}

               <p className="w-full lg:text-base md:text-sm md:text-start text-center">
                  {(data.promotion_price as number) > 0
                     ? formatBigNumber(data.promotion_price as number)
                     : formatBigNumber(data.price as number)}
                  {" VND"}
               </p>

               <div className="mt-2">
                  <p className="w-full lg:text-base md:text-sm md:text-start text-center">
                     Còn <span className="text-primary">{data.inventory}</span>{" "}
                     sản phẩm
                  </p>
               </div>
            </div>
         </div>

         <div>
            {data.inventory > 0 ? (
               <ProductQuantity
                  initValue={data.quantity}
                  max={data.inventory}
                  onChange={(value) => setTotalProduct(value)}
               />
            ) : (
               <p className="w-32 min-w-32 text-sm text-primary font-medium text-center">
                  Sold out
               </p>
            )}
         </div>

         <p className="min-w-28 w-28 lg:text-base md:text-sm text-center">
            {(data.promotion_price as number) > 0
               ? formatBigNumber(
                    (data.promotion_price as number) * data.quantity,
                 )
               : formatBigNumber((data.price as number) * data.quantity)}
            {" VND"}
         </p>

         <div className="flex items-center justify-center w-fit p-5">
            <FaRegTrashAlt
               className="text-xl hover:text-primary cursor-pointer"
               onClick={() => setShowModalConfirm(!showModalConfirm)}
            />
         </div>

         {showModalConfirm && (
            <ModalConfirm
               title="Confirm"
               onClick={() => {
                  onDelete(data);
                  setShowModalConfirm(!showModalConfirm);
               }}
               onClose={() => {
                  setShowModalConfirm(!showModalConfirm);
               }}
               show={showModalConfirm}>
               <p className="text-lg text-center">
                  Bạn có muốn xóa sản phẩm{" "}
                  <strong>
                     {data.variation
                        ? data.variation.title
                        : data.product.title}
                  </strong>{" "}
                  khỏi giỏ hàng
               </p>
            </ModalConfirm>
         )}
      </li>
   );
};

export default CartItem;
