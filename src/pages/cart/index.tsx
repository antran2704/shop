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
    deleteAllItemsCart
} from "~/api-client/cart";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import ModalConfirm from "~/components/Modal/ModalConfirm";
import ListProducts from "~/components/Product/List";
import { useProducts } from "~/hooks/useProducts";
import { useRouter } from "next/router";
import PrimaryButton from "~/components/Button/PrimaryButton";

const Layout = DefaultLayout;

const Cart: NextPageWithLayout = () => {
    const router = useRouter();

    const { infor } = useAppSelector((state) => state.user);

    const { cart } = useCart(!!infor._id, infor._id as string, {
        refreshWhenHidden: true
    });

    const { cart_products, loadingCartItems } = useCartItems(
        !!infor._id,
        infor._id as string,
        {
            refreshWhenHidden: true
        }
    );

    const { products, loadingProducts } = useProducts();

    const { mutate } = useSWRConfig();

    const [showModalConfirm, setShowModalConfirm] = useState<boolean>(false);

    const onCheckout = async () => {
        try {
            const res = await checkInventoryItems(
                cart.cart_userId as string,
                cart
            );
            if (res.status === 200) {
                router.push("/checkout");
            }
        } catch (error: any) {
            if (!error.response) {
                toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

            const response = error.response;

            if (
                response.status === 400 &&
                response.data.message === "Out of stock"
            ) {
                toast.warn("Một vài sản phẩm có sự thay đổi hoặc hết hàng", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

            console.log(error);
        }
    };

    const handleCheckInventoryItems = async () => {
        try {
            await checkInventoryItems(cart.cart_userId as string, cart);
        } catch (error: any) {
            if (!error.response) {
                toast.error("Lỗi hệ thống, vui lòng thử lại sau", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

            const response = error.response;

            if (
                response.status === 400 &&
                response.data.message === "Out of stock"
            ) {
                toast.warn("Một vài sản phẩm có sự thay đổi hoặc hết hàng", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }

            console.log(error);
        }
    };

    const handleClearCart = async () => {
        if (!infor._id) return;

        try {
            const { status } = await deleteAllItemsCart(infor._id);

            if (status === 201) {
                mutate(CART_KEY.CART_USER);
                mutate(CART_KEY.CART_ITEMS);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (cart_products.length > 0) {
            handleCheckInventoryItems();
        }
    }, [loadingCartItems]);

    return (
        <div>
            <Header
                title={"Cart"}
                breadcrumbs={[
                    { label: "Home", url_path: "/" },
                    { label: "Cart", url_path: "/" }
                ]}
            />

            <section className="container__cus">
                {cart && !loadingCartItems && cart_products.length > 0 && (
                    <div>
                        <ul className="flex flex-col items-start my-10 gap-5">
                            {cart_products.map(
                                (item: ICartItem, index: number) => (
                                    <CartItem data={item} key={index} />
                                )
                            )}
                        </ul>
                        <div className="flex lg:flex-nowrap flex-wrap items-start justify-between gap-5">
                            <div className="lg:w-4/12 w-full">
                                <PrimaryButton
                                    title="Clear cart"
                                    type="BUTTON"
                                    onClick={() =>
                                        setShowModalConfirm(!showModalConfirm)
                                    }
                                    className="sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap hover:text-dark bg-primary hover:bg-white px-8 py-2 gap-2 border border-primary hover:border-dark rounded"
                                />
                            </div>
                            <div className="lg:w-6/12 w-full sm:mt-0 mt-8">
                                <h3 className="text-xl font-medium mb-5">
                                    Cart Totals
                                </h3>
                                <table className="table-auto flex items-center bg-white">
                                    <thead className="w-6/12 md:text-lg text-base">
                                        <tr className="block w-full">
                                            <th className="block w-full text-start p-4 border border-borderColor">
                                                Total
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="w-6/12 md:text-lg text-base">
                                        <tr className="block w-full">
                                            <td className="block w-full text-start p-4 border border-borderColor">
                                                {cart
                                                    ? formatBigNumber(
                                                          cart.cart_total
                                                      )
                                                    : 0}{" "}
                                                VND
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <PrimaryButton
                                    title="Proceed to Checkout"
                                    type="BUTTON"
                                    onClick={onCheckout}
                                    className="w-full text-lg font-medium text-white whitespace-nowrap hover:text-dark bg-primary hover:bg-white px-8 py-3 mt-4 gap-2 border border-primary hover:border-dark rounded transition-all ease-linear duration-100"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {!cart && (
                    <div>
                        <ul className="flex flex-col items-start my-10 lg:gap-5 gap-10">
                            {[...new Array(3)].map(
                                (item: any, index: number) => (
                                    <CartItemLoading key={index} />
                                )
                            )}
                        </ul>
                    </div>
                )}

                {cart && cart_products.length <= 0 && (
                    <div className="py-10">
                        <h2 className="text-3xl font-medium">Shopping Cart</h2>
                        <h3 className="text-xl font-medium mt-2">
                            Your cart is currently empty.
                        </h3>
                    </div>
                )}
            </section>

            {showModalConfirm && (
                <ModalConfirm
                    title="Confirm"
                    onClick={() => {
                        handleClearCart();
                        setShowModalConfirm(!showModalConfirm);
                    }}
                    onClose={() => {
                        setShowModalConfirm(!showModalConfirm);
                    }}
                    show={showModalConfirm}>
                    <p className="text-lg text-center">
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
