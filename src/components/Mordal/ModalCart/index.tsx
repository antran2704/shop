import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

import { useCart } from "~/hooks/useCart";
import { useAppSelector } from "~/store/hooks";

import LayoutClose from "~/components/Layout/LayoutClose";
import ImageCus from "~/components/Image";

import styles from "./ModalCart.module.scss";
import { CartItem } from "~/interfaces";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ModalCart = (props: Props) => {
  const { show, setShow } = props;

  const router = useRouter();

  const { infor } = useAppSelector((state) => state.user);
  const { cart, loadingCart } = useCart(!!infor._id, infor._id as string);

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
        className={`${styles.modalCartContent} fixed flex flex-col items-start top-0 bottom-0 right-0 py-6 px-8 sm:w-[400px] w-full bg-white shadow-sm rounded-l-md z-40 gap-5`}
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
            cart.cart_products.map((item: CartItem, index: number) => (
              <li
                key={index}
                className="flex items-center pb-3 px-2 border-b border-borderColor gap-4"
              >
                <div className="relative h-20">
                  <ImageCus
                    src={item.product.thumbnail as string}
                    className="sm:w-[80px] sm:h-[80px] w-[60px] h-[60px]"
                    alt="img"
                    title="img"
                  />
                  <AiFillCloseCircle
                    onClick={() => {
                      // handleDeleteProductInCart(cart.cart_products, index);
                      // dispatch(GetListCart());
                    }}
                    className="absolute -top-0.5 -left-1 text-2xl hover:text-primary cursor-pointer"
                  />
                </div>
                <div className="w-8/12">
                  <Link
                    href={`/collections/product/${item.product.slug}`}
                    className="sm:text-base text-sm font-medium hover:text-primary"
                  >
                    {item.variation ? item.variation.title : item.product.title}
                  </Link>
                  {item.variation && (
                    <div className="flex items-center gap-2">
                      {item.variation.options?.join("/")}
                    </div>
                  )}
                  {item.variation && (
                    <p className="sm:text-base text-sm mt-2">
                      {formatBigNumber(item.variation.price * item.quantity)}{" "}
                      VND
                    </p>
                  )}

                  {!item.variation && (
                    <p className="sm:text-base text-sm mt-2">
                      {formatBigNumber(item.product.price * item.quantity)}{" "}
                      VND
                    </p>
                  )}
                </div>
              </li>
            ))}
        </ul>
        <div className="flex w-full items-center justify-between pb-3 gap-3">
          <p className="text-lg font-medium">Subtotal:</p>
          <p className="text-lg text-primary font-medium">
            {cart ? cart.cart_total : 0}
          </p>
        </div>
        <div className="flex sm:flex-nowrap flex-wrap justify-between items-center w-full pb-3gap-2">
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
    </div>
  );
};

export default ModalCart;
