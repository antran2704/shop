import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { CiCircleCheck, CiCircleRemove, CiCircleInfo } from "react-icons/ci";
import ImageCus from "~/components/Image";
import { getOrder } from "~/api-client/order";
import { InputText } from "~/components/InputField";
import paymentMethods from "~/data/paymentMethods";
import { IMethodPayment, NextPageWithLayout } from "~/interfaces";
import { ItemOrder, Order } from "~/interfaces/order";
import Link from "next/link";
import {
  formatBigNumber,
  getValueCoupon,
} from "~/helpers/number/fomatterCurrency";
import { EPaymentMethod, EPaymentStatus } from "~/enums";
import PrimaryButton from "~/components/Button/PrimaryButton";
import DefaultLayout from "~/layouts/DefaultLayout";

const Layout = DefaultLayout;

const CheckoutOrderIdPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { order_id } = router.query;

  const [order, setOrder] = useState<Order | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<IMethodPayment | null>(
    null
  );
  console.log(order);
  const handleGetOrder = async (order_id: string) => {
    try {
      const { status, payload } = await getOrder(order_id);

      if (status === 200) {
        const payment = paymentMethods.find(
          (method: IMethodPayment) => method.type === payload.payment_method
        );

        setOrder(payload);
        setPaymentMethod(payment as IMethodPayment);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      handleGetOrder(order_id as string);
    }
  }, [router.isReady]);

  return (
    <div>
      <div className="container__cus">
        <div className="flex items-start mt-10 gap-5">
          {order?.payment_status === EPaymentStatus.SUCCESS && (
            <CiCircleCheck className="w-12 h-12 text-green-400" />
          )}
          {order?.payment_status === EPaymentStatus.CANCLE && (
            <CiCircleRemove className="w-12 h-12 text-red-400" />
          )}
          {order?.payment_status === EPaymentStatus.PENDING && (
            <CiCircleInfo className="w-12 h-12 text-blue-400" />
          )}
          <div>
            <h2 className="text-lg font-medium">
              {order?.payment_status === EPaymentStatus.SUCCESS &&
                "Đặt hàng thành công"}
              {order?.payment_status === EPaymentStatus.CANCLE &&
                "Đặt hàng thất bại"}
              {order?.payment_status === EPaymentStatus.PENDING &&
                "Chờ đối soát giao dịch"}
            </h2>
            <p className="text-base">Mã đơn hàng: #{order_id}</p>
          </div>
        </div>

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
                      value={order.user_infor.email}
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
                      value={order.user_infor.phoneNumber}
                      placeholder="Phone number..."
                      className="h-8 bg-transparent"
                      width="w-full"
                      required={true}
                    />
                    <InputText
                      title="Full Name"
                      name="name"
                      readonly={true}
                      value={order.user_infor.name}
                      placeholder="Full name..."
                      className="h-8 bg-transparent"
                      required={true}
                    />
                    <InputText
                      title="Address"
                      name="address"
                      readonly={true}
                      value={order.user_infor.address}
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
                    className="inline-block text-primary px-1"
                  >
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
                  {order.items.map((item: ItemOrder, index: number) => (
                    <li
                      key={index}
                      className="flex items-center justify-between w-full pb-5 border-b border-borderColor gap-4"
                    >
                      <div className="flex items-center gap-5">
                        <Link
                          href={`/collections/product/${item.product.slug}`}
                          className="relative"
                        >
                          <span className="flex items-center justify-center absolute -top-2 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                            {item.quantity}
                          </span>
                          <ImageCus
                            src={item.product.thumbnail as string}
                            className="w-[60px] h-[60px] border border-borderColor rounded-lg"
                            alt="img"
                            title="img"
                          />
                        </Link>
                        <Link
                          href={`/collections/product/${item.product.slug}`}
                          className="w-8/12"
                        >
                          <h3 className="sm:text-base text-sm font-medium my-0">
                            {item.variation
                              ? item.variation.title
                              : item.product.title}
                          </h3>
                        </Link>
                      </div>
                      <p className="sm:text-base text-sm font-medium">
                        {(item.promotion_price as number) > 0
                          ? formatBigNumber(
                              (item.promotion_price as number) * item.quantity
                            )
                          : formatBigNumber(
                              (item.price as number) * item.quantity
                            )}
                        {" VND "}
                      </p>
                    </li>
                  ))}
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
                            order.discount.discount_type
                          )
                        )}{" "}
                        VND
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between py-1">
                    <p className="text-sm">Phí vận chuyển:</p>
                    <p className="text-base">
                      {formatBigNumber(order.shipping_cost)} VND
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
      </div>
    </div>
  );
};

export default CheckoutOrderIdPage;

CheckoutOrderIdPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
