import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback, FC, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiFillCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { IoMdCloseCircleOutline } from "react-icons/io";

import { initDataNavbar } from "~/data";

import { IProductHome, INavItem } from "~/interfaces";

import { RootState } from "~/store";
import { GetListCart, handleDeleteProductInCart } from "~/store/actions";

import { searchProductsMenu } from "~/api-client/search";

import useDebounce from "~/hooks/useDebounce";

import LayoutClose from "~/components/Layout/LayoutClose";
import Search from "~/components/Search";
import ImageCus from "~/components/Image";
import { LOGO } from "~/configs/images";

import styles from "./Navbar.module.scss";
import AuthNavbar from "../Auth";

const Navbar: FC = () => {
  const dispatch = useDispatch();
  const { listCarts, totalCart, totalPrice } = useSelector(
    (state: RootState) => state.data
  );

  const router = useRouter();
  const [showNavbar, setShow] = useState<boolean>(false);
  const [showNavbarMobile, setShowNavarMobile] = useState<boolean>(false);
  const [showModalCart, setShowModalCart] = useState<boolean>(false);
  const [noResult, setNoResult] = useState<boolean>(false);

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

  const handelSearch = async () => {
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
  };

  useEffect(() => {
    let timmer: ReturnType<typeof setTimeout>;
    setShowModalCart(false);

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
      <nav
        className={`flex items-center justify-between px-5 py-3 bg-white shadow-md`}
      >
        <div className="flex items-center w-3/12 gap-3">
          <HiMenu
            className="xl:hidden block text-3xl cursor-pointer"
            onClick={handleShowModal}
          />
          <Link href="/" className="lg:w-[200px] md:w-[160px] w-[100px]">
            <img
              src={LOGO}
              alt="Logo"
              title="Logo"
              className="w-100"
              width="auto"
              height="auto"
              loading="lazy"
            />
          </Link>
        </div>

        <div className="lg:w-6/12 w-5/12 sm:block hidden">
          <Search
            searchText={searchText}
            onChange={onChangeValue}
            onClearText={onClearSearchText}
            listItem={listSearch}
            noResult={noResult}
          />
        </div>

        <div className="flex items-center justify-end w-3/12 md:gap-4 gap-3">
          <div>
            {!showNavbarMobile && (
              <AiOutlineSearch
                onClick={() => setShowNavarMobile(!showNavbarMobile)}
                className="sm:hidden block md:text-2xl text-xl cursor-pointer"
              />
            )}
          </div>

          <div
            className="relative cursor-pointer"
            onClick={() => setShowModalCart(true)}
          >
            <AiOutlineShoppingCart className="relative lg:text-3xl md:text-2xl text-xl z-0" />
            <span className="flex items-center justify-center absolute -top-1 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
              {totalCart < 100 ? totalCart : "99"}
            </span>
          </div>
          <button className="px-3 py-1 rounded-md bg-primary text-white lg:text-lg text-base">
            Login
          </button>
          {/* <div>
            <AuthNavbar />
          </div> */}
        </div>

        {/* layout close modal */}
        {showNavbar && <LayoutClose handleClose={handleShowModal} />}
      </nav>

      {/* navbar Tablet & Mobile */}
      <div
        className={`${styles.navbarMobile} ${
          typeShow ? styles[typeShow] : ""
        } ${
          showNavbar ? styles.show : ""
        } xl:hidden block fixed top-0 bottom-0 left-0 px-6 py-4 md:w-1/2 w-full bg-white shadow-lg overflow-hidden z-40`}
      >
        <div className="w-full mb-3">
          {currentNav.length > 1 ? (
            <BsArrowLeftShort
              className="text-3xl cursor-pointer"
              onClick={handleBack}
            />
          ) : (
            <AiOutlineClose
              className="text-2xl ml-auto cursor-pointer"
              onClick={handleShowModal}
            />
          )}
        </div>
        <ul>
          {currentNav[currentNav.length - 1].map(
            (item: INavItem, index: number) => (
              <li key={index} className={`${styles.navbarItem} w-full`}>
                {!item.children && (
                  <Link
                    href={item.path || "/"}
                    onClick={handleShowModal}
                    className={`block w-full text-lg font-medium py-2 text-[#1e1e1e] ${
                      router.pathname === item.path ? "text-primary" : ""
                    } hover:text-primary transition-all ease-linear duration-100`}
                  >
                    {item.name}
                  </Link>
                )}

                {item.children && (
                  <p
                    onClick={() => handleAddItem(item.children as INavItem[])}
                    className={`flex items-center justify-between text-lg font-medium py-2 text-[#1e1e1e] ${
                      router.pathname === item.path ? "text-primary" : ""
                    } hover:text-primary transition-all ease-linear duration-100  cursor-pointer`}
                  >
                    {item.name}

                    <BsArrowRightShort className="text-3xl" />
                  </p>
                )}
              </li>
            )
          )}
        </ul>
      </div>

      {/* navbar content on PC */}
      <ul className="xl:flex hidden w-full items-center justify-center bg-white border px-5 py-5 shadow-md gap-6">
        {initDataNavbar.map((item: INavItem, index: number) => (
          <li key={index} className={`${styles.navbarItem}`}>
            {item.path ? (
              <Link
                href={item.path}
                className={`text-base font-medium px-5 py-2 text-[#1e1e1e] ${
                  router.pathname === item.path ? "text-primary" : ""
                } hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}
              >
                {item.name}
              </Link>
            ) : (
              <p
                className={`text-base font-medium px-5 py-2 text-[#1e1e1e] ${
                  router.pathname === item.path ? "text-primary" : ""
                } hover:text-primary transition-all ease-linear duration-100`}
              >
                {item.name}
              </p>
            )}

            {item?.children && (
              <ul
                className={`${styles.navbarMega} absolute left-0 right-0 flex items-start justify-center bg-white shadow-lg px-5 pb-10 pt-5 gap-10 z-10`}
              >
                {(!item.images || item.images?.length == 0) && (
                  <div className="w-full grid grid-cols-4 items-start justify-center gap-10">
                    {item.children &&
                      item.children.length > 0 &&
                      item.children.map((item: INavItem, index: number) => (
                        <div key={index}>
                          <h3 className="block w-full text-lg font-normal text-[#1e1e1e] whitespace-nowrap pb-2 mb-3 border-b">
                            {item.name}
                          </h3>
                          <ul className="flex flex-col items-start gap-2">
                            {item.children?.map(
                              (item: INavItem, index: number) => (
                                <li key={index} className="w-full">
                                  {item.path && (
                                    <Link
                                      href={item.path}
                                      className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                        router.pathname === item.path
                                          ? "text-primary"
                                          : ""
                                      }
                                 hover:text-primary transition-all ease-linear duration-100`}
                                    >
                                      {item.name}
                                    </Link>
                                  )}

                                  {!item.path && (
                                    <p
                                      className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                        router.pathname === item.path
                                          ? "text-primary"
                                          : ""
                                      }
                                 hover:text-primary transition-all ease-linear duration-100`}
                                    >
                                      {item.name}
                                    </p>
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      ))}
                  </div>
                )}

                {item.images && item.images?.length > 0 && (
                  <Fragment>
                    <div className="w-1/2 grid grid-cols-2 items-start gap-10">
                      {item.images.map((image: string, index: number) => (
                        <ImageCus
                          key={index}
                          src={image}
                          alt="image"
                          title="image"
                          className="w-full h-full max-h-[400px] object-cover rounded-lg overflow-hidden"
                        />
                      ))}
                    </div>

                    <div className="w-1/2 grid grid-cols-2 items-start gap-10">
                      {item.children &&
                        item.children.length > 0 &&
                        item.children.map((item: INavItem, index: number) => (
                          <div key={index}>
                            <h3 className="block w-full text-lg font-normal text-[#1e1e1e] whitespace-nowrap pb-2 mb-3 border-b">
                              {item.name}
                            </h3>
                            <ul className="flex flex-col items-start gap-2">
                              {item.children?.map(
                                (item: INavItem, index: number) => (
                                  <li key={index} className="w-full">
                                    {item.path && (
                                      <Link
                                        href={item.path}
                                        className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                          router.pathname === item.path
                                            ? "text-primary"
                                            : ""
                                        }
                                 hover:text-primary transition-all ease-linear duration-100`}
                                      >
                                        {item.name}
                                      </Link>
                                    )}

                                    {!item.path && (
                                      <p
                                        className={`block w-full text-base font-normal text-[#1e1e1e] whitespace-nowrap ${
                                          router.pathname === item.path
                                            ? "text-primary"
                                            : ""
                                        }
                                 hover:text-primary transition-all ease-linear duration-100`}
                                      >
                                        {item.name}
                                      </p>
                                    )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        ))}
                    </div>
                  </Fragment>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Search on Mobile */}
      <div
        className={`w-full sm:hidden flex items-center ${
          showNavbarMobile ? "px-5 py-2" : "h-0 p-0 overflow-hidden"
        } bg-white border shadow-mdtransition-all ease-linear duration-100 gap-2`}
      >
        <Search
          searchText={searchText}
          onChange={onChangeValue}
          onClearText={onClearSearchText}
          listItem={listSearch}
          noResult={noResult}
        />
        <IoMdCloseCircleOutline
          onClick={() => setShowNavarMobile(!showNavbarMobile)}
          className="text-2xl cursor-pointer"
        />
      </div>

      {/* modal cart */}
      <div
        className={`${styles.modalCart} ${
          showModalCart ? styles.show : ""
        } fixed top-0 bottom-0 left-0 right-0 z-30`}
      >
        <div
          className={`${styles.modalCartLayout} abosulte w-full h-full z-10`}
          style={{ backgroundColor: "rgba(1, 1, 1, 0.6)" }}
          onClick={() => setShowModalCart(false)}
        ></div>
        <div
          className={`${styles.modalCartContent} absolute flex flex-col items-start h-full top-0 py-6 px-8 sm:w-[400px] w-full bg-white shadow-sm rounded-l-md z-20 gap-5`}
        >
          <div className="flex w-full items-center justify-between pb-3 border-b border-borderColor gap-10">
            <p className="text-base font-medium">Cart</p>
            <AiOutlineClose
              className="text-xl ml-auto mb-2 cursor-pointer"
              onClick={() => setShowModalCart(false)}
            />
          </div>
          <ul className="scrollHidden flex flex-col w-full h-[80vh] pb-3 border-b border-borderColor gap-3 overflow-y-auto ">
            {listCarts.map((item: any, index: number) => (
              <li
                key={index}
                className="flex items-center pb-3 px-2 border-b border-borderColor gap-4"
              >
                <div className="relative h-20">
                  <ImageCus
                    src={item.avatarProduct}
                    className="sm:w-[80px] sm:h-[80px] w-[60px] h-[60px]"
                    alt="img"
                    title="img"
                  />
                  <AiFillCloseCircle
                    onClick={() => {
                      handleDeleteProductInCart(listCarts, index);
                      dispatch(GetListCart());
                    }}
                    className="absolute -top-0.5 -left-1 text-2xl hover:text-primary cursor-pointer"
                  />
                </div>
                <div className="w-8/12">
                  <Link
                    href={item.slug}
                    className="sm:text-base text-sm font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                  <div className="flex items-center gap-2">
                    {item.size && (
                      <span className="sm:text-sm text-xs">
                        Size: {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="sm:text-sm text-xs">
                        Color: {item.color}
                      </span>
                    )}
                  </div>
                  <p className="sm:text-base text-sm mt-2">
                    {item.count} X ${item.price}.00
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex w-full items-center justify-between pb-3 gap-3">
            <p className="text-lg font-medium">Subtotal:</p>
            <p className="text-lg text-primary font-medium">${totalPrice}.00</p>
          </div>
          <div className="flex sm:flex-nowrap flex-wrap justify-between items-center w-full pb-3 border-b border-borderColor gap-2">
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
      </div>
    </header>
  );
};

export default Navbar;
