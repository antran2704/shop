import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { Fragment, useCallback, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSWRConfig } from "swr";
import { CART_KEY, increaseCart } from "~/api-client/cart";
import PrimaryButton from "~/components/Button/PrimaryButton";
import Collapse from "~/components/Collapse";
import ProductQuantity from "~/components/ProductQuantity";
import {
   CURRENCY_CHARACTER,
   formatBigNumber,
   getPercentPromotionPrice,
} from "~/helpers/number/fomatterCurrency";
import { useCart } from "~/hooks/useCart";
import {
   IOptionProduct,
   IProduct,
   IProductChild,
   IProductStock,
   ISelectProductOption,
   ISpecificationAttributes,
   ISpecificationsProduct,
   SendCartItem,
} from "~/interfaces";
import { useAppSelector } from "~/store/hooks";

interface Props {
   product: IProduct;
   productChild: IProductChild | null;
   productStock: IProductStock;
   selectOption: ISelectProductOption;
   onChangeOption: (value: ISelectProductOption) => void;
}

const MainInfo = (props: Props) => {
   const { product, productChild, productStock, selectOption, onChangeOption } =
      props;
   const router = useRouter();

   const { infor } = useAppSelector((state) => state.user);
   const { cart } = useCart(!!infor._id);
   const { mutate } = useSWRConfig();

   const { user } = useUser();
   const { openSignIn } = useClerk();

   const [message, setMessage] = useState<string | null>(null);
   const [totalProduct, setTotalProduct] = useState<number>(1);

   const onSelectOption = (key: string, value: string) => {
      if (message) {
         setMessage(null);
      }

      if (selectOption[key] === value) {
         let newOption = selectOption;
         delete newOption[key];

         onChangeOption({ ...newOption });
         return;
      }

      onChangeOption({ ...selectOption, [key]: value });
   };

   const hanldeBuyNow = useCallback(async () => {
      if (!user || !infor._id) {
         openSignIn({ redirectUrl: router.asPath });
         return;
      }

      const keysSelect = Object.keys(selectOption);

      if (keysSelect.length !== product.options.length) {
         setMessage("Please select options");
         return;
      }

      let data = {} as SendCartItem;

      if (productChild) {
         data = {
            product_id: productChild.product_id as string,
            variation_id: productChild._id,
            quantity: totalProduct,
         };
      } else {
         data = {
            product_id: product._id as string,
            variation_id: null,
            quantity: totalProduct,
         };
      }

      try {
         const { status } = await increaseCart(cart._id as string, data);

         if (status === 201) {
            mutate(CART_KEY.CART_USER);
            mutate(CART_KEY.CART_ITEMS);
            router.push("/cart");
         }
      } catch (error: any) {
         if (!error.response) return;

         const res = error.response;

         if (
            res.status === 400 &&
            res.data.message === "Quantity order bigger than inventory"
         ) {
            toast.warning(
               "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
               {
                  position: toast.POSITION.TOP_RIGHT,
               },
            );
         }
      }
   }, [selectOption, user, cart, infor, totalProduct, productChild]);

   const hanldeAddCart = useCallback(async () => {
      if (!user || !infor._id) {
         openSignIn({ redirectUrl: router.asPath });
         return;
      }

      const keysSelect = Object.keys(selectOption);

      if (keysSelect.length !== product.options.length) {
         setMessage("Please select options");
         return;
      }

      let data = {} as SendCartItem;

      if (productChild) {
         data = {
            product_id: productChild.product_id as string,
            variation_id: productChild._id,
            quantity: totalProduct,
         };
      } else {
         data = {
            product_id: product._id as string,
            variation_id: null,
            quantity: totalProduct,
         };
      }
      try {
         const { status } = await increaseCart(cart._id as string, data);

         if (status === 201) {
            mutate(CART_KEY.CART_USER);
            mutate(CART_KEY.CART_ITEMS);
            toast.success("Thêm thành công", {
               position: toast.POSITION.TOP_CENTER,
            });
         }
      } catch (error: any) {
         if (!error.response) return;

         const res = error.response;

         if (
            res.status === 400 &&
            res.data.message === "Quantity order bigger than inventory"
         ) {
            toast.warning(
               "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
               {
                  position: toast.POSITION.TOP_RIGHT,
               },
            );
         }
      }
   }, [selectOption, user, infor, cart, totalProduct, productChild]);

   return (
      <Fragment>
         <div className="w-full bg-white p-5 rounded-md">
            <div className="pb-5 mb-5 border-b border-borderColor">
               <h2 className="lg:text-2xl md:text-xl text-lg font-medium">
                  {!productChild ? product.title : productChild.title}
               </h2>

               {/* price */}
               <div className="flex flex-wrap items-end my-3 gap-3">
                  {productStock.promotion_price > 0 ? (
                     <Fragment>
                        <h3 className="md:text-2xl text-lg font-medium text-primary">
                           {formatBigNumber(productStock.promotion_price)}{" "}
                           {CURRENCY_CHARACTER}
                        </h3>
                        <h3 className="md:text-lg text-lg font-medium text-[#6a7779] line-through">
                           {formatBigNumber(productStock.price)}{" "}
                           {CURRENCY_CHARACTER}
                        </h3>

                        <sup className="text-xs font-medium text-white px-2 py-1 bg-primary rounded-md">
                           Giảm{" "}
                           {getPercentPromotionPrice(
                              productStock.price,
                              productStock.promotion_price,
                           )}
                           %
                        </sup>
                     </Fragment>
                  ) : (
                     <h3 className="md:text-2xl text-lg font-medium text-primary">
                        {formatBigNumber(productStock.price)}{" "}
                        {CURRENCY_CHARACTER}
                     </h3>
                  )}
               </div>

               <p className="md:text-base text-sm text-[#071c1f]">
                  {product.shortDescription}
               </p>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
               <div className="flex items-center text-sm mb-5">
                  <span className="md:text-base text-sm font-medium min-w-[100px]">
                     Đã bán:
                  </span>
                  {!productChild && <p>{formatBigNumber(product.sold)}</p>}
                  {productChild && <p>{formatBigNumber(productChild.sold)}</p>}
               </div>
               <div className="flex items-center text-sm mb-5">
                  <span className="md:text-base text-sm font-medium min-w-[100px]">
                     Kho:
                  </span>
                  <p>{formatBigNumber(productStock.inventory)}</p>
               </div>
            </div>

            {product.options.length > 0 &&
               product.options.map((option: IOptionProduct) => (
                  <div
                     key={option._id}
                     className="pb-5 mb-5 border-b border-borderColor">
                     <div className="flex items-start mb-5 gap-5">
                        <span className="md:text-base text-sm font-medium min-w-[100px]">
                           {option.name}:
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                           {option.values.map(
                              (value: string, index: number) => (
                                 <button
                                    key={index}
                                    onClick={() =>
                                       onSelectOption(option.code, value)
                                    }
                                    className={`text-sm px-4 py-1 hover:text-white ${
                                       selectOption[option.code] === value
                                          ? "bg-primary text-white"
                                          : ""
                                    } hover:bg-primary border border-borderColor rounded-md transition-all ease-linear duration-100 cursor-pointer`}>
                                    {value}
                                 </button>
                              ),
                           )}
                        </div>
                     </div>
                     {message && !selectOption[option.code] && (
                        <p className="text-base text-red-500">{message}</p>
                     )}
                  </div>
               ))}

            <div>
               {productStock.inventory > 0 ? (
                  <div>
                     <div className="flex items-center w-full my-5 gap-5">
                        <span className="md:text-base text-sm font-medium min-w-[100px]">
                           Số lượng:
                        </span>
                        <div className="flex items-center gap-5">
                           <ProductQuantity
                              initValue={totalProduct}
                              max={productStock.inventory}
                              onChange={(value) => setTotalProduct(value)}
                           />
                           <p className="sm:block hidden text-sm text-nowrap">
                              {formatBigNumber(productStock.inventory)} sản phẩm
                              có sẵn
                           </p>
                        </div>
                     </div>
                     <div className="flex items-center sm:flex-nowrap flex-wrap gap-3">
                        <PrimaryButton
                           title="Thêm vào giỏ hàng"
                           Icon={
                              <AiOutlineShoppingCart className="lg:text-2xl text-xl" />
                           }
                           onClick={hanldeAddCart}
                           className="lg:w-fit w-full min-w-[140px] h-12 text-sm hover:text-white text-dark px-4 hover:bg-primary bg-white rounded border hover:border-primary border-dark "
                           type="BUTTON"
                        />
                        <PrimaryButton
                           title="Mua ngay"
                           className="lg:w-fit w-full min-w-[140px] h-12 text-sm text-white bg-primary rounded px-4 gap-2"
                           type="BUTTON"
                           onClick={hanldeBuyNow}
                        />
                     </div>
                  </div>
               ) : (
                  <p className="text-base font-medium text-primary">Sold out</p>
               )}
            </div>
         </div>

         <div className="w-full bg-white p-5 rounded-md">
            {/* <h3 className="text-lg font-medium min-w-[100px]">Mô tả</h3> */}

            <Collapse title="Mô tả" borderBottom={false} maxHeight={140}>
               <p className="text-sm text-justify">{product.description}</p>
            </Collapse>
         </div>

         {product.specifications.map(
            (specification: ISpecificationsProduct) => (
               <div
                  key={specification._id}
                  className="w-full bg-white p-5 rounded-md">
                  <h3 className="text-base font-medium">
                     {specification.name}
                  </h3>

                  <div className="mt-5">
                     {specification.attributes.map(
                        (
                           attribute: ISpecificationAttributes,
                           index: number,
                        ) => (
                           <div
                              key={index}
                              className={`flex items-start justify-between pb-2 ${
                                 index !== specification.attributes.length - 1
                                    ? "mb-5 border-b border-borderColor"
                                    : ""
                              } gap-5`}>
                              <h4 className="w-2/4 text-base">
                                 {attribute.name}
                              </h4>

                              <Collapse borderBottom={false} maxHeight={70}>
                                 <p className="text-base">{attribute.value}</p>
                              </Collapse>
                           </div>
                        ),
                     )}
                  </div>
               </div>
            ),
         )}
      </Fragment>
   );
};

export default MainInfo;
