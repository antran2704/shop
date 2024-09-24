import Link from "next/link";
import {
   useState,
   useEffect,
   Fragment,
   ReactElement,
   useMemo,
   useCallback,
} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useForm } from "react-hook-form";

import Header from "~/components/Header";
import ImageCus from "~/components/Image";
import {
   ICartItem,
   ICoupon,
   IMethodPayment,
   IQueryParam,
   NextPageWithLayout,
} from "~/interfaces";
import PrimaryButton from "~/components/Button/PrimaryButton";
import { useAppSelector } from "~/store/hooks";
import { useCart, useCartItems } from "~/hooks/useCart";
import {
   formatBigNumber,
   getValueCoupon,
} from "~/helpers/number/fomatterCurrency";
import DefaultLayout from "~/layouts/DefaultLayout";
import { useRouter } from "next/router";
import { createPayment, getDiscount } from "~/api-client";
import { toast } from "react-toastify";
import { AiFillCloseCircle } from "react-icons/ai";
import { InputText } from "~/components/InputField";
import {
   ICreateOrder,
   IOrderProduct,
   IOrder,
   IOrderAddress,
} from "~/interfaces/order";
import {
   ENUM_ORDER_STATUS,
   ENUM_PAYMENT_METHOD,
   ENUM_PAYMENT_STATUS,
   ENUM_PROCESS_ORDER,
} from "~/enums";
import { createOrder, updatePaymentStatusOrder } from "~/api-client/order";
import { CART_KEY, checkInventoryItems } from "~/api-client/cart";

import { SpinLoading } from "~/components/Loading";

import { InfoFormOrder } from "./components";
import paymentMethods from "~/data/paymentMethods";
import hanldeErrorAxios from "~/helpers/handleErrorAxios";

const initInforCustomer: IOrderAddress = {
   shipping_name: "",
   shipping_address: "",
   shipping_phone: "",
   shipping_email: "",
};

const schema = object().shape({
   shipping_name: string().trim().required("Vui lòng nhập"),
   shipping_address: string().trim().required("Vui lòng nhập"),
   shipping_phone: string().trim().required("Vui lòng nhập"),
   shipping_email: string()
      .trim()
      .email("Không đúng định dạng email")
      .required("Vui lòng nhập"),
});

const Layout = DefaultLayout;

const CheckOut: NextPageWithLayout = () => {
   const router = useRouter();

   const { infor } = useAppSelector((state) => state.user);
   const { cart, loadingCart, mutate } = useCart(!!infor._id);
   const { cart_products } = useCartItems(!!cart, cart?._id as string);

   const infoForm = useForm<IOrderAddress>({
      defaultValues: initInforCustomer,
      resolver: yupResolver(schema) as any,
   });

   const [selectPayment, setSelectPayment] = useState<IMethodPayment | null>(
      null,
   );

   const [total, setTotal] = useState<number>(0);
   const [totalDiscount, setTotalDiscount] = useState<number>(0);
   const [subTotal, setSubTotal] = useState<number>(0);
   const [shippingCost] = useState<number>(0);
   const [coupon, setCoupon] = useState<ICoupon | null>(null);
   const [couponCode, setCouponCode] = useState<string | null>(null);

   const [paymentMethod, setPaymentMethod] =
      useState<ENUM_PAYMENT_METHOD | null>(null);

   const [isSaveInfor, setSaveInfor] = useState<boolean>(false);

   const handleCheckInventoryItems = async () => {
      await checkInventoryItems(cart._id as string).catch(() => {
         router.push("/cart");
      });
   };

   const handlePaymentMethod = async (
      order: IOrder,
      method: ENUM_PAYMENT_METHOD,
   ) => {
      switch (method) {
         case ENUM_PAYMENT_METHOD.COD:
            await updatePaymentStatusOrder(
               order.order_id,
               ENUM_PAYMENT_STATUS.SUCCESS,
            ).catch((err) => err);
            await router.push(`/checkout/${order.order_id}`);
            break;

         case ENUM_PAYMENT_METHOD.BANKING:
            await router.push(`/checkout/${order.order_id}`);
            break;

         case ENUM_PAYMENT_METHOD.VNPAY:
            await createPayment(order)
               .then((urlPayment) => {
                  router.push(urlPayment.payload);
               })
               .catch((err) => err);
            break;

         default:
            toast.error("Phương thức thanh toán không hợp lệ", {
               position: toast.POSITION.TOP_RIGHT,
            });
      }

      mutate(CART_KEY.CART_USER);
      mutate(CART_KEY.CART_ITEMS);
   };

   const onSubmit = async (values: IOrderAddress) => {
      if (!infor._id) return;

      if (!paymentMethod) {
         toast.error("Vui lòng lựa chọn phương thức thanh toán", {
            position: toast.POSITION.TOP_RIGHT,
         });

         return;
      }

      if (!cart || cart_products.length <= 0) {
         router.push("/cart");
         return;
      }

      if (!isSaveInfor && localStorage.getItem("inforCus")) {
         localStorage.removeItem("inforCus");
      }

      if (isSaveInfor) {
         localStorage.setItem("inforCus", JSON.stringify(values));
      }

      const items: IOrderProduct[] = cart_products.map((item: ICartItem) => {
         if (item.variation) {
            return {
               product_id: item.product._id,
               model_id: item.variation._id,
               image: item.product.thumbnail,
               model_name: item.variation.title,
               price: item.price,
               promotion_price: item.promotion_price,
               quantity: item.quantity,
            };
         }

         return {
            product_id: item.product._id,
            model_id: null,
            image: item.product.thumbnail,
            model_name: item.product.title,
            price: item.price,
            promotion_price: item.promotion_price,
            quantity: item.quantity,
         };
      });

      const dataOrder: ICreateOrder = {
         items,
         sub_total: subTotal,
         total,
         user_id: infor._id,
         address: values,
         // discount: coupon,
         discount: null,
         order_status: ENUM_ORDER_STATUS.PENDING,
         payment_status: ENUM_PAYMENT_STATUS.PENDING,
         payment_method: paymentMethod as ENUM_PAYMENT_METHOD,
         cancel: {
            canCancel: true,
            content: null,
         },
         currency: "",
         note: "",
         processing_info: [
            {
               label: ENUM_PROCESS_ORDER.ORDER_TIME,
               value: new Date().toISOString(),
            },
         ],
         shipping: {
            shipping_fee: 0,
            shipping_name: "Antran express",
         },
         total_before_discount: 0,
      };

      try {
         const newOrder = await createOrder(dataOrder);
         if (newOrder.status === 201) {
            handlePaymentMethod(newOrder.payload, paymentMethod);
         }
      } catch (error: any) {
         if (!error.response) {
            toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
               position: toast.POSITION.TOP_RIGHT,
            });

            const { message, status } = hanldeErrorAxios(error);

            if (status === 400 && message === "No item") {
               mutate(CART_KEY.CART_USER);
               mutate(CART_KEY.CART_ITEMS);
               router.push("/cart");
            }
         }
      }
   };

   const handleUseCoupon = useCallback(async () => {
      if (!couponCode || !infor._id) return;

      await getDiscount(couponCode, infor._id, subTotal)
         .then((payload) => {
            setCoupon(payload);
         })
         .catch((error) => {
            if (!error.response) {
               toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
                  position: toast.POSITION.TOP_RIGHT,
               });
            }

            toast.error("Mã khuyến mãi không hợp lệ", {
               position: toast.POSITION.TOP_RIGHT,
            });
         });

      setCouponCode(null);
   }, [couponCode]);

   const onRemoveCoupon = () => {
      setCoupon(null);
   };

   const handleCalTotal = useMemo(() => {
      let result = 0;
      if (!coupon) {
         result = subTotal + shippingCost;
         setTotal(result);
         return result;
      }

      if (coupon) {
         const couponValue = getValueCoupon(
            subTotal,
            coupon.discount_value,
            coupon.discount_type,
         );
         result = subTotal - couponValue + shippingCost;
         setTotalDiscount(result);
      }

      setTotal(result);
      return result;
   }, [subTotal, shippingCost, coupon]);

   // useEffect(() => {
   //    const inforCus: IOrderAddress | null =
   //       JSON.parse(localStorage.getItem("inforCus") as string) || null;

   //    if (inforCus) {
   //       setInforCustomer(inforCus);
   //       setSaveInfor(true);
   //    }

   //    if (!inforCus && infor._id) {
   //       setInforCustomer({
   //          ...inforCustomer,
   //          shipping_email: infor.email,
   //          shipping_name: infor.name,
   //       });
   //    }
   // }, [infor]);

   useEffect(() => {
      if (cart && cart.cart_count <= 0) {
         router.push("/cart");
      }

      if (cart) {
         setSubTotal(cart.cart_total);
      }
   }, [infor, cart]);

   useEffect(() => {
      if (cart && cart.cart_userId && cart_products.length > 0) {
         handleCheckInventoryItems();
      }
   }, [cart]);

   return (
      <div>
         <Header
            title="Check out"
            breadcrumbs={{
               items: [
                  { title: "Giỏ hàng", path: "/cart" },
                  { title: "Check out", path: "/checkout" },
               ],
            }}
         />

         <div className="container__cus">
            <div className="flex lg:flex-row flex-col-reverse items-start justify-between mt-10 gap-10">
               <div className="lg:w-6/12 w-full">
                  <h3 className="lg:text-2xl md:text-xl text-lg font-medium mb-3">
                     Thông tin
                  </h3>
                  {/* <form
                     onSubmit={(e) => handleSubmit(e)}
                     className="flex flex-col gap-3">
                     <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                        <InputEmail
                           name="email"
                           value={inforCustomer.shipping_email}
                           placeholder="Email..."
                           error={
                              invalidFields.includes("shipping_email")
                                 ? true
                                 : false
                           }
                           className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                           width="lg:w-8/12 w-full"
                           required={true}
                           getValue={handleChangeInforCus}
                        />
                        <InputNumber
                           name="phoneNumber"
                           error={
                              invalidFields.includes("shipping_phone")
                                 ? true
                                 : false
                           }
                           value={inforCustomer.shipping_phone}
                           placeholder="Phone number..."
                           className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                           width="lg:w-4/12 w-full"
                           required={true}
                           getValue={handleChangePhoneNumber}
                        />
                     </div>
                     <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                        <InputText
                           name="name"
                           error={
                              invalidFields.includes("shipping_name")
                                 ? true
                                 : false
                           }
                           value={inforCustomer.shipping_name}
                           placeholder="Full name..."
                           className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                           required={true}
                           getValue={handleChangeInforCus}
                        />
                     </div>
                     <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                        <InputText
                           name="address"
                           error={
                              invalidFields.includes("shipping_address")
                                 ? true
                                 : false
                           }
                           value={inforCustomer.shipping_address}
                           placeholder="Address..."
                           className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                           required={true}
                           getValue={handleChangeInforCus}
                        />
                     </div>
                     <div className="flex items-center w-full mt-3 cursor-pointer gap-2">
                        <input
                           onChange={(e) => setSaveInfor(e.target.checked)}
                           checked={isSaveInfor}
                           className="w-5 h-5"
                           type="checkbox"
                           id="checkSaveInfor"
                        />
                        <label
                           className="cursor-pointer"
                           htmlFor="checkSaveInfor">
                           Lưu thông tin cho lần thanh toán tiếp theo
                        </label>
                     </div>

                     <div>
                        <h4 className="md:text-lg text-base font-medium pt-5 pb-2">
                           Phương thức thanh toán
                        </h4>
                        <ul className="border-2 rounded-md">
                           {paymentMethods.map(
                              (method: IMethodPayment, index: number) => (
                                 <li key={method.id}>
                                    <label
                                       htmlFor={`method-${method.id}`}
                                       onClick={() => {
                                          setSelectPayment(method);
                                          setPaymentMethod(method.type);
                                       }}
                                       className={`flex items-center gap-2 px-4 py-3 ${
                                          index !== paymentMethods.length - 1
                                             ? "border-b"
                                             : ""
                                       } cursor-pointer`}>
                                       <input
                                          className="min-w-5 min-h-5 w-5 h-5"
                                          type="radio"
                                          name="payment_method"
                                          id={`method-${method.id}`}
                                       />
                                       <div className="flex items-center gap-2">
                                          {method.icon && (
                                             <ImageCus
                                                src={method.icon}
                                                title="payment"
                                                alt="payment"
                                                className="w-10 h-10 min-w-10 min-h-10"
                                             />
                                          )}
                                          <p className="block md:text-base text-sm w-full cursor-pointer">
                                             {method.title}
                                          </p>
                                       </div>
                                    </label>
                                    {selectPayment?.id === 3 &&
                                       method.id === 3 && (
                                          <ul className="px-5 py-2 border-t">
                                             <li className="lg:text-base text-sm">
                                                Ngân hàng: ACB
                                             </li>
                                             <li className="lg:text-base text-sm">
                                                STK: 6823577
                                             </li>
                                             <li className="lg:text-base text-sm">
                                                Chủ tài khoản: PHAM TRAN GIA AN
                                             </li>
                                             <li className="lg:text-base text-sm">
                                                Sau khi chuyển khoản thành công,
                                                chụp màn hình, gửi vào messenger
                                                hoặc zalo cho Antran Shop để
                                                kiểm tra thông tin chuyển khoản.
                                             </li>
                                          </ul>
                                       )}
                                 </li>
                              ),
                           )}
                        </ul>
                     </div>
                  </form> */}
                  <InfoFormOrder form={infoForm} />

                  <div className="flex items-center w-full mt-3 cursor-pointer gap-2">
                     <input
                        onChange={(e) => setSaveInfor(e.target.checked)}
                        checked={isSaveInfor}
                        className="w-5 h-5"
                        type="checkbox"
                        id="checkSaveInfor"
                     />
                     <label className="cursor-pointer" htmlFor="checkSaveInfor">
                        Lưu thông tin cho lần thanh toán tiếp theo
                     </label>
                  </div>

                  <div>
                     <h4 className="md:text-lg text-base font-medium pt-5 pb-2">
                        Phương thức thanh toán
                     </h4>
                     <ul className="border-2 rounded-md">
                        {paymentMethods.map(
                           (method: IMethodPayment, index: number) => (
                              <li key={method.id}>
                                 <label
                                    htmlFor={`method-${method.id}`}
                                    onClick={() => {
                                       setSelectPayment(method);
                                       setPaymentMethod(method.type);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-3 ${
                                       index !== paymentMethods.length - 1
                                          ? "border-b"
                                          : ""
                                    } cursor-pointer`}>
                                    <input
                                       className="min-w-5 min-h-5 w-5 h-5"
                                       type="radio"
                                       name="payment_method"
                                       id={`method-${method.id}`}
                                    />
                                    <div className="flex items-center gap-2">
                                       {method.icon && (
                                          <ImageCus
                                             src={method.icon}
                                             title="payment"
                                             alt="payment"
                                             className="w-10 h-10 min-w-10 min-h-10"
                                          />
                                       )}
                                       <p className="block md:text-base text-sm w-full cursor-pointer">
                                          {method.title}
                                       </p>
                                    </div>
                                 </label>
                                 {selectPayment?.id === 3 &&
                                    method.id === 3 && (
                                       <ul className="px-5 py-2 border-t">
                                          <li className="lg:text-base text-sm">
                                             Ngân hàng: ACB
                                          </li>
                                          <li className="lg:text-base text-sm">
                                             STK: 6823577
                                          </li>
                                          <li className="lg:text-base text-sm">
                                             Chủ tài khoản: PHAM TRAN GIA AN
                                          </li>
                                          <li className="lg:text-base text-sm">
                                             Sau khi chuyển khoản thành công,
                                             chụp màn hình, gửi vào messenger
                                             hoặc zalo cho Antran Shop để kiểm
                                             tra thông tin chuyển khoản.
                                          </li>
                                       </ul>
                                    )}
                              </li>
                           ),
                        )}
                     </ul>
                  </div>
                  <div className="flex lg:flex-nowrap flex-wrap items-center w-full mt-4 sm:gap-5 gap-2">
                     <PrimaryButton
                        title="Giỏ hàng"
                        type="LINK"
                        className="sm:w-auto w-full text-bsae font-medium text-white whitespace-nowrap bg-gray-500 px-4 py-2 opacity-80 hover:opacity-100 transition-all ease-linear border border-transparent rounded"
                        path="/cart"
                     />
                     <PrimaryButton
                        title="Mua hàng"
                        type="BUTTON"
                        onClick={infoForm.handleSubmit(onSubmit)}
                        className="sm:w-auto w-full text-base font-medium text-white whitespace-nowrap bg-primary px-4 py-2 opacity-90 hover:opacity-100 gap-2 border border-primary rounded"
                     />
                  </div>
               </div>
               <div className="lg:w-5/12 w-full">
                  {cart && !loadingCart && (
                     <Fragment>
                        <ul className="scroll flex flex-col lg:max-h-[600px] max-h-[400px] pt-5 overflow-auto gap-6">
                           {cart_products.map(
                              (item: ICartItem, index: number) => (
                                 <li
                                    key={index}
                                    className="flex items-center justify-between w-full pb-5 border-b border-borderColor gap-4">
                                    <div className="flex items-center gap-5">
                                       <Link
                                          href={`/product/${item.product.slug}.${item.product._id}`}
                                          className="relative">
                                          <span className="flex items-center justify-center absolute -top-2 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                                             {item.quantity}
                                          </span>
                                          <ImageCus
                                             src={
                                                ((process.env
                                                   .NEXT_PUBLIC_IMAGE_ENDPOINT as string) +
                                                   item.product
                                                      .thumbnail) as string
                                             }
                                             className="w-[60px] h-[60px] border border-borderColor rounded-lg"
                                             alt="img"
                                             title="img"
                                          />
                                       </Link>
                                       <Link
                                          href={`/collections/product/${item.product._id}.${item.product.slug}`}
                                          className="w-8/12">
                                          <h3 className="sm:text-base text-sm font-medium my-0">
                                             {item.variation
                                                ? item.variation.title
                                                : item.product.title}
                                          </h3>
                                          {item.variation && (
                                             <p className="sm:text-sm text-xs mt-2">
                                                {(item.promotion_price as number) >
                                                0
                                                   ? formatBigNumber(
                                                        item.promotion_price as number,
                                                     )
                                                   : formatBigNumber(
                                                        item.price as number,
                                                     )}
                                                {" VND "}X {item.quantity}
                                             </p>
                                          )}

                                          {!item.variation && (
                                             <p className="sm:text-sm text-xs mt-2">
                                                {(item.promotion_price as number) >
                                                0
                                                   ? formatBigNumber(
                                                        item.promotion_price as number,
                                                     )
                                                   : formatBigNumber(
                                                        item.price as number,
                                                     )}
                                                {" VND"}X {item.quantity}
                                             </p>
                                          )}
                                       </Link>
                                    </div>
                                    {item.variation && (
                                       <p className="sm:text-base text-sm font-medium">
                                          {(item.promotion_price as number) > 0
                                             ? formatBigNumber(
                                                  (item.promotion_price as number) *
                                                     item.quantity,
                                               )
                                             : formatBigNumber(
                                                  (item.price as number) *
                                                     item.quantity,
                                               )}
                                          {" VND "}
                                       </p>
                                    )}

                                    {!item.variation && (
                                       <p className="sm:text-base text-sm font-medium">
                                          {(item.promotion_price as number) > 0
                                             ? formatBigNumber(
                                                  (item.promotion_price as number) *
                                                     item.quantity,
                                               )
                                             : formatBigNumber(
                                                  (item.price as number) *
                                                     item.quantity,
                                               )}
                                          {" VND"}
                                       </p>
                                    )}
                                 </li>
                              ),
                           )}
                        </ul>

                        <div className="flex items-center py-5 border-b gap-5">
                           {/* <InputText
                              name="couponCode"
                              placeholder="Coupon code..."
                              className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                              value={couponCode || ""}
                              enableEnter={true}
                              onEnter={handleUseCoupon}
                              getValue={(name: string, value: string) =>
                                 setCouponCode(value.toUpperCase())
                              }
                           /> */}
                           <PrimaryButton
                              title="Coupon"
                              type="BUTTON"
                              onClick={handleUseCoupon}
                              className="sm:w-auto w-full text-base font-medium text-white whitespace-nowrap bg-primary px-4 py-2 opacity-90 hover:opacity-100 gap-2 border border-primary rounded"
                           />
                        </div>

                        <div className="py-5 border-b gap-10">
                           <div className="flex items-center justify-between py-1">
                              <p className="text-sm">Tạm tính:</p>
                              <p className="text-base">
                                 {formatBigNumber(subTotal)} VND
                              </p>
                           </div>

                           {coupon && (
                              <div className="flex items-center justify-between py-1">
                                 <p className="flex items-center text-sm gap-2">
                                    Mã giảm giá:{" "}
                                    <strong className="text-primary">
                                       {coupon.discount_code}
                                    </strong>
                                    <AiFillCloseCircle
                                       onClick={onRemoveCoupon}
                                       className="text-base hover:text-primary cursor-pointer"
                                    />
                                 </p>
                                 <p className="text-base">
                                    -{formatBigNumber(subTotal - totalDiscount)}{" "}
                                    VND
                                 </p>
                              </div>
                           )}

                           <div className="flex items-center justify-between py-1">
                              <p className="text-sm">Phí vận chuyển:</p>
                              <p className="text-base">
                                 {formatBigNumber(shippingCost)} VND
                              </p>
                           </div>
                        </div>

                        <div className="flex items-center justify-between mt-5 gap-5">
                           <p className="text-base font-medium">Total:</p>
                           <p className="text-base font-medium">
                              {formatBigNumber(handleCalTotal)} VND
                           </p>
                        </div>
                     </Fragment>
                  )}
               </div>
            </div>
         </div>

         {loadingCart && <SpinLoading className="text-3xl" />}
      </div>
   );
};

export default CheckOut;

CheckOut.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
