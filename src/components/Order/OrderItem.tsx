import Link from "next/link";

import ImageCus from "~/components/Image";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import PrimaryButton from "../Button/PrimaryButton";
import { ItemOrder, Order } from "~/interfaces/order";

interface Props {
  order: Order;
}

const OrderItem = (props: Props) => {
  const { order } = props;

  return (
    <ul className="flex flex-col bg-white rounded-md gap-5">
      {order.items.map((item: ItemOrder, index: number) => (
        <li key={index} className="w-full gap-5">
          <div className="flex md:flex-row flex-col items-center justify-between lg:pb-5 p-5">
            <div className={`flex md:flex-row flex-col items-center gap-5`}>
              <Link
                href={`/collections/produc/${item.product.slug}`}
                className="md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]"
              >
                <ImageCus
                  src={item.product.thumbnail as string}
                  title={"order"}
                  alt={"order"}
                  className="w-full h-full object-fill object-center rounded-md"
                />
              </Link>

              <div>
                <Link
                  href={`/collections/product`}
                  className="md:text-base text-sm hover:text-primary md:text-start text-center capitalize line-clamp-2"
                >
                  {item.variation ? item.variation.title : item.product.title}
                </Link>
                {item.variation && (
                  <p className="w-full text-sm md:text-start text-center">
                    {item.variation.options?.join(" / ")}
                  </p>
                )}
              </div>
            </div>

            <p className="lg:text-base md:text-sm md:text-start text-center">
              X {item.quantity}
            </p>
            <p className="lg:text-base md:text-sm md:text-start text-center">
              Đang chờ lấy hàng
            </p>
            <p className="lg:text-base md:text-sm md:text-start text-center">
              {formatBigNumber(item.price as number)}
              {" VND"}
            </p>
          </div>

          <div className="flex items-center justify-end mt-5 p-5 border-t">
            <PrimaryButton
              title="Mua lại"
              type="LINK"
              className="w-fit text-sm font-medium text-white whitespace-nowrap bg-primary px-5 py-2 border border-primary rounded"
              path="/cart"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderItem;
