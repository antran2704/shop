import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, FC, Fragment } from "react";
import { useUser, SignInButton, useClerk } from "@clerk/nextjs";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { initDataNavbar } from "~/data";

import { IProductHome, INavItem } from "~/interfaces";

import { searchProductsMenu } from "~/api-client/search";

import useDebounce from "~/hooks/useDebounce";

import LayoutClose from "~/components/Layout/LayoutClose";
import Search from "~/components/Search";
import ImageCus from "~/components/Image";
import { LOGO } from "~/configs/images";

import styles from "./Navbar.module.scss";
import { useAppSelector } from "~/store/hooks";
import { useCart } from "~/hooks/useCart";
import ModalCart from "../Modal/ModalCart";
import { logout } from "~/api-client";
import useClientY from "~/hooks/useClientY";

const Navbar: FC = () => {
    const { infor } = useAppSelector((state) => state.user);
    const { cart } = useCart(!!infor._id, infor._id as string);

    const { signOut } = useClerk();
    const { isSignedIn, user } = useUser();
    const router = useRouter();
    const top = useClientY();

    const [showNavbar, setShow] = useState<boolean>(false);
    const [showModalCart, setShowModalCart] = useState<boolean>(false);
    const [showNavbarMobile, setShowNavarMobile] = useState<boolean>(false);
    const [noResult, setNoResult] = useState<boolean>(false);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);

    const [currentNav, setCurrentNav] = useState([initDataNavbar]);
    const [typeShow, setTypeShow] = useState<"next" | "prev" | null>(null);

    const [listSearch, setListSearch] = useState<IProductHome[]>([]);
    const [searchText, setSearch] = useState<string | null>(null);
    const debouce = useDebounce(searchText, 1000);

    const onClearSearchText = useCallback(() => {
        setSearch(null);
    }, [searchText]);

    const onChangeValue = useCallback(
        (value: string) => {
            if (noResult) {
                setNoResult(false);
            }

            setSearch(value);
        },
        [searchText, noResult]
    );

    const onLogout = async () => {
        logout();
        await router.push("/");
        signOut();
    };

    const handleShowModal = (): void => {
        if (showNavbar) {
            setCurrentNav([initDataNavbar]);
        }
        setShow(!showNavbar);
    };

    const handleAddItem = (items: INavItem[]) => {
        setCurrentNav([...currentNav, items]);
        setTypeShow("next");
    };

    const handleBack = () => {
        const newCurrentMenu = currentNav.splice(0, currentNav.length - 1);
        setCurrentNav(newCurrentMenu);
        setTypeShow("prev");
    };

    const onShowSearchMobile = useCallback(() => {
        setShowNavarMobile(!showNavbarMobile);
    }, [showNavbarMobile]);

    const handelSearch = async () => {
        setSearchLoading(true);

        try {
            const response = await searchProductsMenu(searchText as string, 8);

            if (response.status === 200) {
                if (response.payload.length === 0) {
                    setNoResult(true);
                }

                setListSearch(response.payload);
            }
        } catch (error) {
            console.log(error);
        }

        setSearchLoading(false);
    };

    useEffect(() => {
        let timmer: ReturnType<typeof setTimeout>;

        if (typeShow) {
            timmer = setTimeout(() => {
                setTypeShow(null);
            }, 200);
        }

        return () => {
            if (timmer) {
                clearTimeout(timmer);
            }
        };
    }, [router.pathname, typeShow]);

    useEffect(() => {
        if (searchText) {
            handelSearch();
        } else {
            setListSearch([]);
        }
    }, [debouce]);

    useEffect(() => {
        if (showNavbarMobile) {
            setShowNavarMobile(false);
        }
    }, [router.pathname]);

    return (
        <header className="sticky top-0 left-0 right-0 z-30">
            <div className="relative w-full bg-white z-10">
                <div className="container__cus">
                    <nav className={`flex items-center justify-between py-3`}>
                        <div className="flex items-center md:w-3/12 sm:w-4/12 w-5/12 gap-3">
                            <HiMenu
                                className="xl:hidden block text-3xl w-6 min-w-6 cursor-pointer"
                                onClick={handleShowModal}
                            />
                            <Link
                                href="/"
                                className="lg:w-[200px] md:w-[160px] min-w-[100px]">
                                <img
                                    src={LOGO}
                                    alt="Logo"
                                    title="Logo"
                                    width="auto"
                                    height="auto"
                                    loading="lazy"
                                />
                            </Link>
                        </div>

                        <div className="lg:w-6/12 w-5/12 sm:block hidden">
                            <Search
                                loading={searchLoading}
                                searchText={searchText}
                                onChange={onChangeValue}
                                onClearText={onClearSearchText}
                                showSearchMobile={showNavbarMobile}
                                onShowSearchMobile={onShowSearchMobile}
                                listItem={listSearch}
                                noResult={noResult}
                            />
                        </div>

                        <div className="flex items-center justify-end lg:w-3/12 md:gap-4 gap-3">
                            <div>
                                {!showNavbarMobile && (
                                    <AiOutlineSearch
                                        onClick={() =>
                                            setShowNavarMobile(
                                                !showNavbarMobile
                                            )
                                        }
                                        className="sm:hidden block md:text-2xl text-xl cursor-pointer"
                                    />
                                )}
                            </div>

                            {isSignedIn && user && (
                                <div
                                    className="relative cursor-pointer"
                                    onClick={() => setShowModalCart(true)}>
                                    <AiOutlineShoppingCart className="relative lg:text-3xl md:text-2xl text-xl z-0" />
                                    {cart ? (
                                        <span className="flex items-center justify-center absolute -top-1 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                                            {cart.cart_count < 100
                                                ? cart.cart_count
                                                : 99}
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center absolute -top-1 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                                            0
                                        </span>
                                    )}
                                </div>
                            )}
                            {!isSignedIn && !user ? (
                                <SignInButton>
                                    <button className="block px-3 py-1 rounded-md bg-primary text-white lg:text-lg text-base">
                                        Login
                                    </button>
                                </SignInButton>
                            ) : (
                                <div className="relative group z-10">
                                    <Link href="/account">
                                        <ImageCus
                                            alt="avartar"
                                            title="avartar"
                                            className="w-8 min-w-8 h-8 rounded-full"
                                            src={user.imageUrl as string}
                                        />
                                    </Link>

                                    <ul className="absolute group-hover:top-[110%] top-[120%] bg-white min-w-[160px] right-0 text-base border rounded-md group-hover:opacity-100 opacity-0 pointer-events-none group-hover:pointer-events-auto shadow-lg ease-linear duration-100">
                                        <div className="absolute left-0 right-0 -top-3 h-3 bg-transparent"></div>
                                        <li>
                                            <Link
                                                href="/account"
                                                className="block px-4 py-2 cursor-pointer hover:text-primary">
                                                Tài khoản
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/account"
                                                className="block px-4 py-2 cursor-pointer hover:text-primary">
                                                Đơn hàng
                                            </Link>
                                        </li>
                                        <li
                                            onClick={onLogout}
                                            className="px-4 py-2 cursor-pointer hover:text-primary border-t">
                                            Đăng xuất
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* layout close modal */}
                        {showNavbar && (
                            <LayoutClose handleClose={handleShowModal} />
                        )}
                    </nav>

                    {/* navbar Tablet & Mobile */}
                    <div
                        className={`${styles.navbarMobile} ${
                            typeShow ? styles[typeShow] : ""
                        } ${
                            showNavbar ? styles.show : ""
                        } xl:hidden block fixed top-0 bottom-0 left-0 py-4 md:w-1/2 w-2/3 bg-white shadow-lg overflow-hidden z-40`}>
                        <div className="w-full mb-3 px-2">
                            {currentNav.length > 1 ? (
                                <BsArrowLeftShort
                                    className="text-3xl hover:text-primary cursor-pointer"
                                    onClick={handleBack}
                                />
                            ) : (
                                <IoMdCloseCircleOutline
                                    className="text-3xl hover:text-primary ml-auto cursor-pointer"
                                    onClick={handleShowModal}
                                />
                            )}
                        </div>
                        <ul>
                            {currentNav[currentNav.length - 1].map(
                                (item: INavItem, index: number) => (
                                    <li
                                        key={index}
                                        className={`${styles.navbarItem} w-full px-6`}>
                                        {!item.children && (
                                            <Link
                                                href={item.path || "/"}
                                                onClick={handleShowModal}
                                                className={`block w-full text-lg font-medium py-2 text-[#1e1e1e] ${
                                                    router.pathname ===
                                                    item.path
                                                        ? "text-primary"
                                                        : ""
                                                } hover:text-primary transition-all ease-linear duration-100`}>
                                                {item.name}
                                            </Link>
                                        )}

                                        {item.children && (
                                            <p
                                                onClick={() =>
                                                    handleAddItem(
                                                        item.children as INavItem[]
                                                    )
                                                }
                                                className={`flex items-center justify-between text-lg font-medium py-2 text-[#1e1e1e] ${
                                                    router.pathname ===
                                                    item.path
                                                        ? "text-primary"
                                                        : ""
                                                } hover:text-primary transition-all ease-linear duration-100  cursor-pointer`}>
                                                {item.name}

                                                <BsArrowRightShort className="text-3xl" />
                                            </p>
                                        )}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* navbar content on PC */}
            <div
                className={`relative lg:block hidden bg-white border ${
                    top > 300
                        ? "-translate-y-16 opacity-0 pointer-events-none"
                        : "translate-y-0 opacity-100"
                } shadow-md transition-all ease-linear duration-100 z-0`}>
                <ul className="container__cus xl:flex hidden w-full items-center justify-center px-5 py-4 transition-all ease-linear duration-100 gap-6">
                    {initDataNavbar.map((item: INavItem, index: number) => (
                        <li key={index} className={`${styles.navbarItem}`}>
                            {item.path ? (
                                <Link
                                    href={item.path}
                                    className={`text-base font-medium px-5 py-2 text-[#1e1e1e] ${
                                        router.pathname === item.path
                                            ? "text-primary"
                                            : ""
                                    } hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}>
                                    {item.name}
                                </Link>
                            ) : (
                                <p
                                    className={`text-base font-medium px-5 py-2 text-[#1e1e1e] ${
                                        router.pathname === item.path
                                            ? "text-primary"
                                            : ""
                                    } hover:text-primary transition-all ease-linear duration-100`}>
                                    {item.name}
                                </p>
                            )}

                            {item?.children && (
                                <ul
                                    className={`${styles.navbarMega} absolute left-0 right-0 flex items-start justify-center bg-white shadow-lg px-10 pb-10 pt-5 gap-10 z-10`}>
                                    {(!item.images ||
                                        item.images?.length == 0) && (
                                        <div className="w-full grid grid-cols-4 items-start justify-center gap-10">
                                            {item.children &&
                                                item.children.length > 0 &&
                                                item.children.map(
                                                    (
                                                        item: INavItem,
                                                        index: number
                                                    ) => (
                                                        <div key={index}>
                                                            <h3 className="block w-full text-lg font-normal text-[#1e1e1e] whitespace-nowrap pb-2 mb-3 border-b">
                                                                {item.name}
                                                            </h3>
                                                            <ul className="flex flex-col items-start gap-2">
                                                                {item.children?.map(
                                                                    (
                                                                        item: INavItem,
                                                                        index: number
                                                                    ) => (
                                                                        <li
                                                                            key={
                                                                                index
                                                                            }
                                                                            className="w-full">
                                                                            {item.path && (
                                                                                <Link
                                                                                    href={
                                                                                        item.path
                                                                                    }
                                                                                    className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                                                                        router.pathname ===
                                                                                        item.path
                                                                                            ? "text-primary"
                                                                                            : ""
                                                                                    }
                                     hover:text-primary transition-all ease-linear duration-100`}>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </Link>
                                                                            )}

                                                                            {!item.path && (
                                                                                <p
                                                                                    className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                                                                        router.pathname ===
                                                                                        item.path
                                                                                            ? "text-primary"
                                                                                            : ""
                                                                                    }
                                     hover:text-primary transition-all ease-linear duration-100`}>
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </li>
                                                                    )
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    )}

                                    {item.images && item.images?.length > 0 && (
                                        <Fragment>
                                            <div className="w-1/2 grid grid-cols-2 items-start gap-10">
                                                {item.images.map(
                                                    (
                                                        image: string,
                                                        index: number
                                                    ) => (
                                                        <ImageCus
                                                            key={index}
                                                            src={image}
                                                            alt="image"
                                                            title="image"
                                                            className="w-full h-full max-h-[400px] object-cover rounded-lg overflow-hidden"
                                                        />
                                                    )
                                                )}
                                            </div>

                                            <div className="w-1/2 grid grid-cols-2 items-start gap-10">
                                                {item.children &&
                                                    item.children.length > 0 &&
                                                    item.children.map(
                                                        (
                                                            item: INavItem,
                                                            index: number
                                                        ) => (
                                                            <div key={index}>
                                                                <h3 className="block w-full text-lg font-normal text-[#1e1e1e] whitespace-nowrap pb-2 mb-3 border-b">
                                                                    {item.name}
                                                                </h3>
                                                                <ul className="flex flex-col items-start gap-2">
                                                                    {item.children?.map(
                                                                        (
                                                                            item: INavItem,
                                                                            index: number
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    index
                                                                                }
                                                                                className="w-full">
                                                                                {item.path && (
                                                                                    <Link
                                                                                        href={
                                                                                            item.path
                                                                                        }
                                                                                        className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                                                                            router.pathname ===
                                                                                            item.path
                                                                                                ? "text-primary"
                                                                                                : ""
                                                                                        }
                                     hover:text-primary transition-all ease-linear duration-100`}>
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </Link>
                                                                                )}

                                                                                {!item.path && (
                                                                                    <p
                                                                                        className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                                                                            router.pathname ===
                                                                                            item.path
                                                                                                ? "text-primary"
                                                                                                : ""
                                                                                        }
                                     hover:text-primary transition-all ease-linear duration-100`}>
                                                                                        {
                                                                                            item.name
                                                                                        }
                                                                                    </p>
                                                                                )}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )
                                                    )}
                                            </div>
                                        </Fragment>
                                    )}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search on Mobile */}
            <div
                className={`w-full sm:hidden relative flex items-center ${
                    showNavbarMobile ? "px-5 py-2" : "h-0 p-0 overflow-hidden"
                } bg-white border shadow-md transition-all ease-linear duration-100 z-0 gap-2`}>
                <Search
                    searchText={searchText}
                    showSearchMobile={showNavbarMobile}
                    onChange={onChangeValue}
                    onClearText={onClearSearchText}
                    onShowSearchMobile={onShowSearchMobile}
                    loading={searchLoading}
                    listItem={listSearch}
                    noResult={noResult}
                />
                <IoMdCloseCircleOutline
                    onClick={onShowSearchMobile}
                    className="text-2xl cursor-pointer"
                />
            </div>

            {/* modal cart */}
            <ModalCart show={showModalCart} setShow={setShowModalCart} />
        </header>
    );
};

export default Navbar;
