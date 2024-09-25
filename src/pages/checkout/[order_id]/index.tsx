import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo } from "react-icons/ci";
import ImageCus from "~/components/Image";
import { getOrder } from "~/api-client/order";
import { InputText } from "~/components/InputField";
import paymentMethods from "~/data/paymentMethods";
import { IMethodPayment, NextPageWithLayout } from "~/interfaces";
import { IOrder, IOrderProduct } from "~/interfaces/order";
import Link from "next/link";
import {
   formatBigNumber,
   getValueCoupon,
} from "~/helpers/number/fomatterCurrency";
import {
   ENUM_ORDER_STATUS,
   ENUM_PAYMENT_STATUS,
   EPaymentStatus,
} from "~/enums";
import PrimaryButton from "~/components/Button/PrimaryButton";
import DefaultLayout from "~/layouts/DefaultLayout";
import { SpinLoading } from "~/components/Loading";
import ListProducts from "~/components/Product/List";
import { useProducts } from "~/hooks/useProducts";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";

const Layout = DefaultLayout;

const stepWidth = ["w-0", "w-1/3", "w-2/3", "w-full"];

const CheckoutOrderIdPage: NextPageWithLayout = () => {
   const router = useRouter();
   const { order_id } = router.query;

   const { products, loadingProducts } = useProducts({
      page: 1,
      take: 16,
      order: ORDER_PARAMATER_ENUM.DESC,
   });

   const [order, setOrder] = useState<IOrder | null>(null);
   const [paymentMethod, setPaymentMethod] = useState<IMethodPayment | null>(
      null,
   );
   const [step, setStep] = useState<number>(0);
   const [loading, setLoading] = useState<boolean>(true);

   const handleGetOrder = async (order_id: string) => {
      setLoading(true);

      try {
         const { status, payload } = await getOrder(order_id);

         if (status === 200) {
            const payment = paymentMethods.find(
               (method: IMethodPayment) =>
                  method.type === payload.payment_method,
            );

            if (payload.status === "pending") {
               setStep(1);
            }

            if (payload.status === "processing") {
               setStep(2);
            }

            if (payload.status === "delivered") {
               setStep(3);
            }

            setOrder(payload);
            setPaymentMethod(payment as IMethodPayment);
         }
      } catch (error) {
         console.log(error);
      }

      setLoading(false);
   };

   useEffect(() => {
      if (router.isReady) {
         handleGetOrder(order_id as string);
      }
   }, [router.isReady]);

   return (
      <div>
         <div className="container__cus">
            {!loading && (
               <div>
                  {order?.order_status !== ENUM_ORDER_STATUS.CANCEL && (
                     <div className="flex items-start mt-10 gap-5">
                        {order?.payment_status ===
                           ENUM_PAYMENT_STATUS.SUCCESS && (
                           <CiCircleCheck className="w-12 h-12 text-green-400" />
                        )}
                        {order?.payment_status === ENUM_PAYMENT_STATUS.FAIL && (
                           <CiCircleRemove className="w-12 h-12 text-red-400" />
                        )}
                        {order?.payment_status ===
                           ENUM_PAYMENT_STATUS.PENDING && (
                           <CiCircleInfo className="w-12 h-12 text-blue-400" />
                        )}
                        <div>
                           <h2 className="text-lg font-medium">
                              {order?.payment_status ===
                                 ENUM_PAYMENT_STATUS.SUCCESS &&
                                 "Đặt hàng thành công"}
                              {order?.payment_status ===
                                 ENUM_PAYMENT_STATUS.FAIL &&
                                 "Đặt hàng thất bại"}
                              {order?.payment_status ===
                                 ENUM_PAYMENT_STATUS.PENDING &&
                                 "Chờ đối soát giao dịch"}
                           </h2>
                           <p className="text-base">Mã đơn hàng: #{order_id}</p>
                        </div>
                     </div>
                  )}

                  {order?.order_status === ENUM_ORDER_STATUS.CANCEL && (
                     <div className="flex items-start mt-10 gap-5">
                        <CiCircleRemove className="w-12 h-12 text-red-400" />
                        <div>
                           <h2 className="text-lg font-medium">
                              Đơn hàng đã bị hủy
                           </h2>
                           <h3>Lý do: {order.cancel.content}</h3>
                           <p className="text-base">Mã đơn hàng: #{order_id}</p>
                        </div>
                     </div>
                  )}

                  {order &&
                     order?.order_status !== ENUM_ORDER_STATUS.CANCEL &&
                     order.payment_status !== ENUM_PAYMENT_STATUS.FAIL && (
                        <div className="relative flex items-start w-fit my-5 mx-auto gap-20">
                           <div className="relative flex flex-col items-center z-10">
                              <div
                                 className={`flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 ${
                                    step >= 0
                                       ? "border-green-400"
                                       : "border-[#e0e0e0]"
                                 }`}>
                                 <ImageCus
                                    alt="payment logo"
                                    title="payment logo"
                                    src="/payments/bill.png"
                                    className={`${
                                       step >= 0
                                          ? "text-green-400"
                                          : "text-[#e0e0e0]"
                                    } w-6 h-6`}
                                 />
                              </div>
                              <p className="max-w-28 text-base text-center mt-2">
                                 Đơn hàng đã đặt
                              </p>
                           </div>
                           <div className="relative flex flex-col items-center z-10">
                              <div
                                 className={`flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 ${
                                    step >= 1
                                       ? "border-green-400"
                                       : "border-[#e0e0e0]"
                                 }`}>
                                 <ImageCus
                                    alt="payment logo"
                                    title="payment logo"
                                    src="/payments/box.svg"
                                    className={`${
                                       step >= 1
                                          ? "text-green-400"
                                          : "text-[#e0e0e0]"
                                    } w-6 h-6`}
                                 />
                              </div>
                              <p className="max-w-28 text-base text-center mt-2">
                                 Đơn hàng đang được chuẩn bị
                              </p>
                           </div>
                           <div className="relative flex flex-col items-center z-10">
                              <div
                                 className={`flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 ${
                                    step >= 2
                                       ? "border-green-400"
                                       : "border-[#e0e0e0]"
                                 }`}>
                                 <ImageCus
                                    alt="payment logo"
                                    title="payment logo"
                                    src="/payments/truck.svg"
                                    className={`${
                                       step >= 2
                                          ? "text-green-400"
                                          : "text-[#e0e0e0]"
                                    } w-6 h-6`}
                                 />
                              </div>
                              <p className="max-w-28 text-base text-center mt-2">
                                 Đơn hàng đang giao
                              </p>
                           </div>
                           <div className="relative flex flex-col items-center z-10">
                              <div
                                 className={`flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 ${
                                    step >= 3
                                       ? "border-green-400"
                                       : "border-[#e0e0e0]"
                                 }`}>
                                 <ImageCus
                                    alt="payment logo"
                                    title="payment logo"
                                    src="/payments/delivery.svg"
                                    className={`${
                                       step >= 3
                                          ? "text-green-400"
                                          : "text-[#e0e0e0]"
                                    } w-6 h-6`}
                                 />
                              </div>
                              <p className="max-w-28 text-base text-center mt-2">
                                 Đơn hàng giao thành công
                              </p>
                           </div>

                           <div className="payment__line absolute left-10 top-8 h-1 z-0">
                              <div className="absolute left-0 right-0 h-1 bg-[#e0e0e0]"></div>
                              <div
                                 className={`absolute left-0 ${stepWidth[step]} h-1 bg-green-400`}></div>
                           </div>
                        </div>
                     )}

                  <div className="flex lg:flex-row flex-col-reverse items-start justify-between mt-5 gap-10">
                     <div className="lg:w-6/12 w-full">
                        <div>
                           {order && (
                              <div className="w-full p-4 mt-5 border-2 rounded-md">
                                 <h3 className="text-lg font-medium mb-3">
                                    Thông tin khách hàng
                                 </h3>
                                 <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                                    <InputText
                                       name="email"
                                       value={order.address.shipping_email}
                                       title="Email"
                                       readonly={true}
                                       placeholder="Email..."
                                       className="h-8 bg-transparent"
                                       width="w-full"
                                       required={true}
                                    />
                                    <InputText
                                       title="Phone Number"
                                       name="phoneNumber"
                                       readonly={true}
                                       value={order.address.shipping_phone}
                                       placeholder="Phone number..."
                                       className="h-8 bg-transparent"
                                       width="w-full"
                                       required={true}
                                    />
                                    <InputText
                                       title="Full Name"
                                       name="name"
                                       readonly={true}
                                       value={order.address.shipping_name}
                                       placeholder="Full name..."
                                       className="h-8 bg-transparent"
                                       required={true}
                                    />
                                    <InputText
                                       title="Address"
                                       name="address"
                                       readonly={true}
                                       value={order.address.shipping_address}
                                       placeholder="Address..."
                                       className="h-8 bg-transparent"
                                       required={true}
                                    />
                                 </div>
                              </div>
                           )}

                           {paymentMethod && (
                              <div className="w-full p-4 mt-5 border-2 rounded-md">
                                 <h4 className="md:text-lg text-base font-medium pb-2">
                                    Phương thức thanh toán
                                 </h4>
                                 {paymentMethod && (
                                    <div>
                                       <div className="flex items-center gap-2">
                                          <ImageCus
                                             src={paymentMethod.icon as string}
                                             title="payment"
                                             alt="payment"
                                             className="w-10 h-10 min-w-10 min-h-10"
                                          />
                                          <p className="block md:text-base text-sm w-full">
                                             {paymentMethod.title}
                                          </p>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           )}

                           <div className="flex items-center justify-between py-5 gap-5">
                              <p className="text-base">
                                 Cần hỗ trợ?
                                 <Link
                                    href="tel:0946003423"
                                    className="inline-block text-primary px-1">
                                    Liên hệ chúng tôi
                                 </Link>
                              </p>

                              <PrimaryButton
                                 title="Trang chủ"
                                 type="LINK"
                                 className="sm:w-auto w-full text-base font-medium text-white whitespace-nowrap bg-primary px-4 py-2 opacity-90 hover:opacity-100 gap-2 border border-primary rounded"
                                 path="/"
                              />
                           </div>
                        </div>
                     </div>
                     <div className="lg:w-5/12 w-full">
                        {order && (
                           <Fragment>
                              <ul className="scroll flex flex-col lg:max-h-[600px] max-h-[400px] pt-5 overflow-auto gap-6">
                                 {order.items.map(
                                    (item: IOrderProduct, index: number) => (
                                       <li
                                          key={index}
                                          className="flex items-center justify-between w-full pb-5 border-b border-borderColor gap-4">
                                          <div className="flex items-center gap-5">
                                             <Link
                                                href={`/products/${item.model_name}.${item.product_id}`}
                                                className="relative">
                                                <span className="flex items-center justify-center absolute -top-2 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                                                   {item.quantity}
                                                </span>
                                                <ImageCus
                                                   src={item.image}
                                                   className="w-[60px] h-[60px] border border-borderColor rounded-lg"
                                                   alt="img"
                                                   title="img"
                                                />
                                             </Link>
                                             <Link
                                                href={`/products/${item.model_name}.${item.product_id}`}
                                                className="w-8/12">
                                                <h3 className="sm:text-base text-sm font-medium my-0">
                                                   {item.model_name}
                                                </h3>
                                             </Link>
                                          </div>
                                          <p className="sm:text-base text-sm font-medium">
                                             {(item.promotion_price as number) >
                                             0
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
                                       </li>
                                    ),
                                 )}
                              </ul>

                              <div className="py-5 border-b gap-10">
                                 <div className="flex items-center justify-between py-1">
                                    <p className="text-sm">Tạm tính:</p>
                                    <p className="text-base">
                                       {formatBigNumber(order.sub_total)} VND
                                    </p>
                                 </div>

                                 {order.discount && (
                                    <div className="flex items-center justify-between py-1">
                                       <p className="flex items-center text-sm gap-2">
                                          Mã giảm giá:{" "}
                                          <strong className="text-primary">
                                             {order.discount.discount_code}
                                          </strong>
                                       </p>
                                       <p className="text-base">
                                          -{" "}
                                          {formatBigNumber(
                                             getValueCoupon(
                                                order.sub_total,
                                                order.discount.discount_value,
                                                order.discount.discount_type,
                                             ),
                                          )}{" "}
                                          VND
                                       </p>
                                    </div>
                                 )}

                                 <div className="flex items-center justify-between py-1">
                                    <p className="text-sm">Phí vận chuyển:</p>
                                    <p className="text-base">
                                       {formatBigNumber(
                                          order.shipping.shipping_fee,
                                       )}{" "}
                                       VND
                                    </p>
                                 </div>
                              </div>

                              <div className="flex items-center justify-between mt-5 gap-5">
                                 <p className="text-base font-medium">Total:</p>
                                 <p className="text-base font-medium">
                                    {formatBigNumber(order.total)} VND
                                 </p>
                              </div>
                           </Fragment>
                        )}
                     </div>
                  </div>

                  <section className="py-10">
                     <ListProducts
                        title="Có thể bạn thích"
                        isLoading={loadingProducts}
                        items={products}
                     />
                  </section>
               </div>
            )}

            {loading && (
               <div className="w-full h-[120px] flex items-center justify-center bg-white mt-4">
                  <SpinLoading className="h-8 w-8" />
               </div>
            )}
         </div>
      </div>
   );
};

export default CheckoutOrderIdPage;

CheckoutOrderIdPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
