import Link from "next/link";

import ImageCus from "~/components/Image";
import {
  CURRENCY_CHARACTER,
  formatBigNumber,
} from "~/helpers/number/fomatterCurrency";
import PrimaryButton from "../Button/PrimaryButton";
import { ItemOrder, Order } from "~/interfaces/order";
import { toast } from "react-toastify";
import { useAppSelector } from "~/store/hooks";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { CART_KEY, increaseCart } from "~/api-client/cart";
import { SendCartItem } from "~/interfaces";
import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { EOrderStatus } from "~/enums";

interface Props {
  order: Order;
}

const contentStatus = {
  pending: "Đang chờ xác nhận",
  processing: "Đang chuẩn bị hàng",
  delivered: "Giao thành công",
  cancle: "Đã hủy",
};

const statusStyle = {
  pending: "bg-pending",
  processing: "bg-blue-500",
  delivered: "bg-success",
  cancle: "bg-cancle",
};

const OrderItem = (props: Props) => {
  const { order } = props;

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { openSignIn } = useClerk();
  const { infor } = useAppSelector((state) => state.user);

  const hanldeBuyAgaint = async () => {
    if (!infor._id) {
      openSignIn({ redirectUrl: router.asPath });
      return;
    }

    try {
      for (const item of order.items) {
        let data = {
          product_id: item.product._id,
          variation_id: item.variation?._id,
          quantity: item.quantity,
        } as SendCartItem;

        const { status } = await increaseCart(infor._id as string, data);

        if (status === 201) {
          mutate(CART_KEY.CART_USER);
        }
      }

      toast.success(`Thêm sản phẩm thành công`, {
        position: toast.POSITION.TOP_RIGHT,
      });
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
          }
        );
      }
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between p-5 border-b gap-5">
        <p className="md:text-lg text-sm">
          Mã đơn hàng: <strong>#{order.order_id}</strong>
        </p>
        <p
          className={`md:text-sm text-xs text-center text-white py-2 px-5 rounded-md ${
            statusStyle[order.status]
          }`}
        >
          {contentStatus[order.status]}
        </p>
      </div>

      <ul className="flex flex-col rounded-md gap-5">
        {order.items.map((item: ItemOrder, index: number) => (
          <li key={index} className="w-full gap-5">
            <Link
              href={`/checkout/${order.order_id}`}
              target="_blank"
              className="flex md:flex-row flex-col items-center justify-between lg:pb-5 p-5 border-b"
            >
              <div className={`flex md:flex-row flex-col items-center gap-5`}>
                <div className="md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]">
                  <ImageCus
                    src={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT as string + item.product.thumbnail as string}
                    title={"order"}
                    alt={"order"}
                    className="w-full h-full object-fill object-center rounded-md"
                  />
                </div>

                <div className="lg:max-w-[800px] md:max-w-[400px] max-w-[300px]">
                  <h3 className="md:text-base text-sm hover:text-primary md:text-start text-center font-medium capitalize line-clamp-2">
                    {item.variation ? item.variation.title : item.product.title}
                  </h3>
                  {item.variation && (
                    <p className="w-full text-sm md:text-start text-center">
                      {item.variation.options?.join(" / ")}
                    </p>
                  )}
                  <p className="w-full text-sm md:text-start text-center py-2">
                    X {item.quantity}
                  </p>
                </div>
              </div>

              <p className="lg:text-base md:text-sm md:text-start text-center">
                {item.promotion_price > 0
                  ? formatBigNumber(item.promotion_price as number)
                  : formatBigNumber(item.price as number)}
                {CURRENCY_CHARACTER}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-end p-5">
        <p className="text-base mb-5">
          Thành tiền:{" "}
          <span className="text-primary">
            {formatBigNumber(order.total as number)}
          </span>{" "}
          {CURRENCY_CHARACTER}
        </p>

        {(order.status === EOrderStatus.DELIVERED ||
          order.status === EOrderStatus.CANCLE) && (
          <PrimaryButton
            title="Mua lại"
            type="BUTTON"
            className="w-fit text-sm font-medium text-white whitespace-nowrap bg-primary px-5 py-2 border border-primary rounded"
            onClick={hanldeBuyAgaint}
          />
        )}
      </div>
    </div>
  );
};

export default OrderItem;
