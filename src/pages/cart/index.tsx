import { ReactElement, useEffect, useState } from "react";
import Header from "~/components/Header";

import { ICartItem, NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import { useCart, useCartItems } from "~/hooks/useCart";
import { useAppSelector } from "~/store/hooks";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import CartItem from "~/components/Cart/CartItem";
import CartItemLoading from "~/components/Cart/CartItemLoading";
import {
   CART_KEY,
   checkInventoryItems,
   deleteAllItemsCart,
   deleteItemCart,
} from "~/api-client/cart";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import ModalConfirm from "~/components/Modal/ModalConfirm";
import ListProducts from "~/components/Product/List";
import { useProducts } from "~/hooks/useProducts";
import { useRouter } from "next/router";
import PrimaryButton from "~/components/Button/PrimaryButton";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";

const Layout = DefaultLayout;

const Cart: NextPageWithLayout = () => {
   const router = useRouter();

   const { infor } = useAppSelector((state) => state.user);

   const { cart } = useCart(!!infor._id);

   const { cart_products, loadingCartItems } = useCartItems(
      !!cart,
      cart?._id as string,
   );

   const { products, loadingProducts } = useProducts({
      page: 1,
      take: 16,
      order: ORDER_PARAMATER_ENUM.DESC,
   });

   const { mutate } = useSWRConfig();

   // const [items, setItems] = useState<ICartItem[]>([]);
   const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

   const onCheckout = async () => {
      try {
         const res = await checkInventoryItems(cart._id as string);
         if (res.status === 200) {
            router.push("/checkout");
         }
      } catch (error: any) {
         if (!error.response) {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
               position: toast.POSITION.TOP_RIGHT,
            });
         }

         const response = error.response;

         if (
            response.status === 400 &&
            response.data.message === "Out of stock"
         ) {
            toast.warn("Một vài sản phẩm có sự thay đổi hoặc hết hàng", {
               position: toast.POSITION.TOP_RIGHT,
            });
         }
      }
   };

   const handleDeleteItem = async (cartId: string, itemId: string) => {
      if (!cartId || !itemId) return;
      await deleteItemCart(cartId, itemId)
         .then(() => {
            mutate(CART_KEY.CART_USER);
            mutate(CART_KEY.CART_ITEMS);
         })
         .catch((err) => err);

      // try {
      //    const { status } = await deleteItemCart(infor._id, dataSend);

      //    if (status === 201) {
      //       // const newItems = items.filter(
      //       //     (item: ICartItem) =>
      //       //         item.product !== data.product &&
      //       //         item.variation !== data.variation
      //       // );

      //       // setItems([...newItems]);
      //       mutate(CART_KEY.CART_USER);
      //       mutate(CART_KEY.CART_ITEMS);
      //    }
      // } catch (error) {
      //    console.log(error);
      // }
   };

   const handleCheckInventoryItems = async () => {
      try {
         await checkInventoryItems(cart._id as string);
      } catch (error: any) {
         if (!error.response) {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
               position: toast.POSITION.TOP_RIGHT,
            });
         }

         const response = error.response;

         if (
            response.status === 400 &&
            response.data.message === "Out of stock"
         ) {
            toast.warn("Một vài sản phẩm có sự thay đổi hoặc hết hàng", {
               position: toast.POSITION.TOP_RIGHT,
            });
         }
      }
   };

   const handleClearCart = async () => {
      if (!infor._id) return;
      await deleteAllItemsCart(cart._id)
         .then(() => {
            mutate(CART_KEY.CART_USER);
            mutate(CART_KEY.CART_ITEMS);
         })
         .catch((err) => err);
   };

   useEffect(() => {
      if (cart_products.length > 0) {
         handleCheckInventoryItems();
      }
   }, [loadingCartItems]);

   return (
      <div>
         <Header
            title="Giỏ hàng"
            breadcrumbs={{
               items: [{ title: "Giỏ hàng" }],
            }}
         />

         <section className="container__cus">
            {cart && !loadingCartItems && cart_products.length > 0 && (
               <div>
                  <ul className="flex flex-col items-start my-10 gap-5">
                     {cart_products.map((item: ICartItem, index: number) => (
                        <CartItem
                           onDelete={() => handleDeleteItem(cart._id, item._id)}
                           data={item}
                           key={index}
                        />
                     ))}
                  </ul>
                  <div className="flex lg:flex-nowrap flex-wrap items-start justify-between gap-5">
                     <div className="lg:w-4/12 w-full">
                        <PrimaryButton
                           title="Xóa toàn bộ"
                           type="BUTTON"
                           onClick={() =>
                              setShowModalConfirm(!showModalConfirm)
                           }
                           className="sm:w-auto w-full text-lg font-medium hover:text-white whitespace-nowrap text-primary hover:bg-primary bg-white px-8 py-2 gap-2 border border-primary rounded"
                        />
                     </div>
                     <div className="lg:w-6/12 w-full sm:mt-0 mt-8">
                        <h3 className="text-xl font-medium mb-5">
                           Tổng quan đơn hàng
                        </h3>
                        <table className="table-auto flex items-center bg-white">
                           <thead className="w-6/12 md:text-lg text-base">
                              <tr className="block w-full">
                                 <th className="block w-full text-start p-4 border border-borderColor">
                                    Tổng
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="w-6/12 md:text-lg text-base">
                              <tr className="block w-full">
                                 <td className="block w-full text-start p-4 border border-borderColor">
                                    {cart
                                       ? formatBigNumber(cart.cart_total)
                                       : 0}{" "}
                                    VND
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                        <PrimaryButton
                           title="Thanh toán ngay"
                           type="BUTTON"
                           onClick={onCheckout}
                           className="w-full text-lg font-medium text-white whitespace-nowrap bg-primary px-8 py-3 mt-4 gap-2 border border-primary hover:border-dark rounded opacity-80 hover:opacity-100 transition-all ease-linear duration-100"
                        />
                     </div>
                  </div>
               </div>
            )}

            {!cart && (
               <div>
                  <ul className="flex flex-col items-start my-10 lg:gap-5 gap-10">
                     {[...new Array(3)].map((_, index: number) => (
                        <CartItemLoading key={index} />
                     ))}
                  </ul>
               </div>
            )}

            {cart && cart_products.length <= 0 && (
               <div className="py-10">
                  <h2 className="text-3xl font-medium">Mua sắm</h2>
                  <h3 className="text-xl font-medium mt-2">
                     Giỏ hàng của bạn đang trống
                  </h3>
               </div>
            )}
         </section>

         {showModalConfirm && (
            <ModalConfirm
               title="Xác nhận"
               onClick={() => {
                  handleClearCart();
                  setShowModalConfirm(!showModalConfirm);
               }}
               onClose={() => {
                  setShowModalConfirm(!showModalConfirm);
               }}
               show={showModalConfirm}>
               <p className="text-base text-center w-2/3 mx-auto">
                  Bạn có muốn xóa sản phẩm toàn bộ sản phẩm khỏi giỏ hàng
               </p>
            </ModalConfirm>
         )}

         {/* Category */}
         <section className="container__cus py-10">
            <ListProducts
               title="Có thể bạn thích"
               isLoading={loadingProducts}
               items={products}
            />
         </section>
      </div>
   );
};

export default Cart;
Cart.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
