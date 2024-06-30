import { Dispatch, SetStateAction, memo, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineClose } from "react-icons/ai";

import { useCart, useCartItems } from "~/hooks/useCart";
import { useAppSelector } from "~/store/hooks";

import LayoutClose from "~/components/Layout/LayoutClose";

import styles from "./ModalCart.module.scss";
import { ICartItem, SendDeleteCartItem } from "~/interfaces";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import { CART_KEY, deleteItemCart } from "~/api-client/cart";
import { useSWRConfig } from "swr";
import ModalConfirm from "../ModalConfirm";
import ModalCartItem from "./Item";
import ModalCartItemLoading from "./ItemLoading";
import PrimaryButton from "~/components/Button/PrimaryButton";

interface Props {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
}

const ModalCart = (props: Props) => {
    const { show, setShow } = props;

    const router = useRouter();
    const { mutate } = useSWRConfig();
    const { infor } = useAppSelector((state) => state.user);
    const { cart } = useCart(!!infor._id, infor._id as string);
    const { cart_products, loadingCartItems } = useCartItems(
        !!infor._id,
        infor._id as string,
        { refreshWhenHidden: true }
    );

    const [selectItem, setSelectItem] = useState<ICartItem | null>(null);
    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

    const handeDeleteItem = async (data: ICartItem) => {
        if (!infor._id || !data) return;

        const dataSend: SendDeleteCartItem = {
            product_id: data.product._id as string,
            variation_id: data.variation?._id as string | null
        };
        try {
            const { status } = await deleteItemCart(infor._id, dataSend);

            if (status === 201) {
                mutate(CART_KEY.CART_USER);
                mutate(CART_KEY.CART_ITEMS);
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
            } fixed top-0 bottom-0 left-0 right-0 z-50`}>
            <div
                className={`${styles.modalCartContent} fixed flex flex-col items-start top-0 bottom-0 right-0 py-6 px-6 sm:w-[400px] w-full bg-white shadow-sm rounded-l-md z-40 gap-5`}>
                <div className="flex w-full items-center justify-between pb-3 border-b border-borderColor gap-10">
                    <p className="text-base font-medium">Cart</p>
                    <AiOutlineClose
                        className="text-xl ml-auto mb-2 cursor-pointer"
                        onClick={() => setShow(false)}
                    />
                </div>
                <ul className="scrollHidden flex flex-col w-full h-[80vh] pb-3 border-b border-borderColor gap-3 overflow-y-auto ">
                    {cart &&
                        !loadingCartItems &&
                        cart_products.map((item: ICartItem, index: number) => (
                            <ModalCartItem
                                key={index}
                                data={item}
                                setSelectItem={setSelectItem}
                                showModalConfirm={showModalConfirm}
                                setShowModalConfirm={setShowModalConfirm}
                            />
                        ))}

                    {!cart_products.length &&
                        loadingCartItems &&
                        [...new Array(3)].map(
                            (item: ICartItem, index: number) => (
                                <ModalCartItemLoading key={index} />
                            )
                        )}
                </ul>
                <div className="flex w-full items-center justify-between pb-3 gap-3">
                    <p className="text-lg font-medium">Subtotal:</p>
                    <p className="text-lg text-primary font-medium">
                        {cart ? formatBigNumber(cart.cart_total) : 0} VND
                    </p>
                </div>
                <div className="flex sm:flex-nowrap flex-wrap justify-between items-center w-full gap-2">
                    <PrimaryButton
                        title="View cart"
                        type="LINK"
                        className="sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap hover:text-dark bg-primary hover:bg-white px-8 py-2 gap-2 border border-primary hover:border-dark rounded"
                        path="/cart"
                    />

                    <PrimaryButton
                        title="Check out"
                        type="LINK"
                        className="sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap bg-dark hover:bg-primary px-8 py-2 border border-transparent rounded"
                        path="/checkout"
                    />
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
                    show={showModalConfirm}>
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

export default memo(ModalCart);
