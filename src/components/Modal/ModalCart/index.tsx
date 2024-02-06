import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

import { useCart } from "~/hooks/useCart";
import { useAppSelector } from "~/store/hooks";

import LayoutClose from "~/components/Layout/LayoutClose";
import ImageCus from "~/components/Image";

import styles from "./ModalCart.module.scss";
import { ICartItem, SendDeleteCartItem } from "~/interfaces";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import { CART_KEY, deleteItemCart } from "~/api-client/cart";
import { useSWRConfig } from "swr";
import ModalConfirm from "../ModalConfirm";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ModalCart = (props: Props) => {
  const { show, setShow } = props;

  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { infor } = useAppSelector((state) => state.user);
  const { cart, loadingCart } = useCart(!!infor._id, infor._id as string);

  const [selectItem, setSelectItem] = useState<ICartItem | null>(null);
  const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

  const handeDeleteItem = async (data: ICartItem) => {
    if (!infor._id || !data) return;

    const dataSend: SendDeleteCartItem = {
      product_id: data.product._id as string,
      variation_id: data.variation?._id as string | null,
    };
    try {
      const { status, payload } = await deleteItemCart(infor._id, dataSend);

      console.log(payload);

      if (status === 201) {
        mutate(CART_KEY.CART_USER);
        setSelectItem(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (show) {
      setShow(false);
    }
  }, [router.pathname]);

  return (
    <div
      className={`${styles.modalCart} ${
        show ? styles.show : ""
      } fixed top-0 bottom-0 left-0 right-0 z-50`}
    >
      <div
        className={`${styles.modalCartContent} fixed flex flex-col items-start top-0 bottom-0 right-0 py-6 px-6 sm:w-[400px] w-full bg-white shadow-sm rounded-l-md z-40 gap-5`}
      >
        <div className="flex w-full items-center justify-between pb-3 border-b border-borderColor gap-10">
          <p className="text-base font-medium">Cart</p>
          <AiOutlineClose
            className="text-xl ml-auto mb-2 cursor-pointer"
            onClick={() => setShow(false)}
          />
        </div>
        <ul className="scrollHidden flex flex-col w-full h-[80vh] pb-3 border-b border-borderColor gap-3 overflow-y-auto ">
          {cart &&
            cart.cart_products.map((item: ICartItem, index: number) => (
              <li key={index}>
                <Link
                  href={`/collections/product/${item.product.slug}`}
                  className="relative flex items-center pb-3 px-2 border-b border-borderColor gap-4"
                >
                  <div className="h-20">
                    <ImageCus
                      src={item.product.thumbnail as string}
                      className="sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] rounded-lg"
                      alt="img"
                      title="img"
                    />
                  </div>
                  <div className="w-6/12">
                    <p className="sm:text-base text-sm font-medium hover:text-primary line-clamp-2">
                      {item.variation
                        ? item.variation.title
                        : item.product.title}
                    </p>
                    {item.variation && (
                      <div className="flex items-center gap-2">
                        {item.variation.options?.join("/")}
                      </div>
                    )}
                    {item.variation && (
                      <p className="sm:text-base text-sm mt-2">
                        {(item.variation.promotion_price as number) > 0
                          ? formatBigNumber(
                              item.variation.promotion_price as number
                            )
                          : formatBigNumber(item.variation.price as number)}
                        {" VND "}X {item.quantity}
                      </p>
                    )}

                    {!item.variation && (
                      <p className="sm:text-base text-sm mt-2">
                        {(item.product.promotion_price as number) > 0
                          ? formatBigNumber(
                              item.product.promotion_price as number
                            )
                          : formatBigNumber(item.product.price as number)}
                        {" VND"}X {item.quantity}
                      </p>
                    )}
                  </div>

                  <AiFillCloseCircle
                    onClick={() => {
                      setSelectItem(item);
                      setShowModalConfirm(!showModalConfirm);
                    }}
                    className="absolute top-0 right-2 text-2xl hover:text-primary cursor-pointer"
                  />
                </Link>
              </li>
            ))}
        </ul>
        <div className="flex w-full items-center justify-between pb-3 gap-3">
          <p className="text-lg font-medium">Subtotal:</p>
          <p className="text-lg text-primary font-medium">
            {cart ? formatBigNumber(cart.cart_total) : 0} VND
          </p>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap justify-between items-center w-full gap-2">
          <Link
            href={"/cart"}
            className="flex items-center justify-center sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap hover:text-dark bg-primary hover:bg-white px-8 py-2 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100"
          >
            View cart
          </Link>
          <button className="flex items-center justify-center sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap bg-dark hover:bg-primary px-8 py-2 transition-all ease-linear border border-transparent duration-100 gap-2">
            Check out
          </button>
        </div>
      </div>

      {show && <LayoutClose handleClose={() => setShow(!show)} />}

      {showModalConfirm && selectItem && (
        <ModalConfirm
          title="Confirm"
          onClick={() => {
            handeDeleteItem(selectItem as ICartItem);
            setShowModalConfirm(!showModalConfirm);
          }}
          onClose={() => {
            setSelectItem(null);
            setShowModalConfirm(!showModalConfirm);
          }}
          show={showModalConfirm}
        >
          <p className="text-lg text-center">
            Bạn có muốn xóa sản phẩm{" "}
            <strong>
              {selectItem.variation
                ? selectItem.variation.title
                : selectItem.product.title}
            </strong>{" "}
            khỏi giỏ hàng
          </p>
        </ModalConfirm>
      )}
    </div>
  );
};

export default ModalCart;
