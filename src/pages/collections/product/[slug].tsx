import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, FC, useEffect, useState, MouseEvent, Fragment } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
// gallery
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiFillCheckCircle,
} from "react-icons/ai";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineZoomOutMap,
} from "react-icons/md";

import {
  IProduct,
  IOptionProduct,
  IOrderProduct,
} from "~/interfaces/apiResponse";

import { GetListCart } from "~/store/actions";

import percentPromotionPrice from "~/helpers/percentPromotionPrice";

import Header from "~/components/Header";
import ProductQuantity from "~/components/ProductQuantity";

interface Props {
  query: any;
  productData: IProduct;
  listImages: string[];
}

const tags: string[] = ["Description", "Reviews", "Shipping Policy"];

const CollectionItem: FC<Props> = (props: Props) => {
  const { query, productData, listImages } = props;
  const router = useRouter();

  const dispatch = useDispatch();

  const firstRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const [showPopup, setShow] = useState<boolean>(false);
  const [totalProduct, setTotalProduct] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>(listImages[0]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [message, setMessage] = useState({
    messageSize: "",
    messageColor: "",
  });

  const handleChangeImage = (e: MouseEvent<HTMLImageElement>) => {
    setCurrentImage(e.currentTarget.src);
  };

  const handleChangeLine = (e: MouseEvent<HTMLButtonElement>): void => {
    const width = e.currentTarget.clientWidth;
    const offSetLeft = e.currentTarget.offsetLeft;
    const lineEl = lineRef.current;
    if (lineEl) {
      lineEl.style.width = width + "px";
      lineEl.style.left = offSetLeft + "px";
      setCurrentTag(e.currentTarget.name);
    }
  };

  const hanldeAddCart = () => {
    if (productData.listSizes.length > 0 || productData.listColors.length > 0) {
      if (productData.listSizes.length > 0 && !query.size) {
        setMessage({ ...message, messageSize: "Please choose your size!!!" });
        return;
      }

      if (productData.listColors.length > 0 && !query.color) {
        setMessage({ ...message, messageColor: "Please choose your color!!!" });
        return;
      }
    }

    let exitIndex = 0;
    const dataProduct: IOrderProduct = {
      name: productData.name,
      slug: router.asPath,
      count: totalProduct,
      price: productData.promotionPrice
        ? productData.promotionPrice
        : productData.price,
      size: query.size || undefined,
      color: query.color || undefined,
      avatarProduct: listImages[0],
    };
    const listCarted = JSON.parse(localStorage.getItem("listCart") || "[]");
    const exitItem = listCarted.find((item: IOrderProduct, index: number) => {
      if (item.name === dataProduct.name && item.slug === dataProduct.slug) {
        exitIndex = index;
        return item;
      }
    });

    if (exitItem) {
      listCarted[exitIndex] = {
        ...exitItem,
        count: exitItem.count + dataProduct.count,
      };
      localStorage.setItem("listCart", JSON.stringify(listCarted));
      setShow(true);
    } else {
      listCarted.push(dataProduct);
      localStorage.setItem("listCart", JSON.stringify(listCarted));
      setShow(true);
    }
    dispatch(GetListCart());
  };

  useEffect(() => {
    const lineEl = lineRef.current;
    const firstEl = firstRef.current;
    if (lineEl && firstEl) {
      const width = firstEl.clientWidth;
      const offSetLeft = firstEl.offsetLeft;
      lineEl.style.width = width + "px";
      lineEl.style.left = offSetLeft + "px";
      setCurrentTag(firstEl.name);
    }
  }, []);
  return (
    <div>
      <Header
        title={productData.name}
        listBackLinks={[
          { title: "Home", link: "/" },
          {
            title: productData.category.title,
            link: `/collections/${productData.category.slug}`,
          },
        ]}
      />

      <section className="container__cus">
        <div className="flex lg:flex-nowrap flex-wrap items-start lg:justify-between justify-center my-14 lg:gap-5 gap-8">
          <div className="relative lg:w-5/12 sm:w-6/12 w-full">
            <img className="w-full" src={currentImage} alt="product image" />
            <div>
              {/* gallery image */}
              <LightGallery
                elementClassNames="absolute top-0 left-4 flex items-center w-full mt-4 gap-2"
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
              >
                <a href={listImages[0]} className="w-1/4">
                  <MdOutlineZoomOutMap className="text-2xl" />
                  <img
                    className="w-full hidden"
                    src={listImages[0]}
                    alt="product image"
                  />
                </a>
                {listImages
                  .slice(1, listImages.length)
                  .map((image: string, index: number) => (
                    <a href={image} key={index} className="w-1/4  hidden">
                      <img className="w-full" src={image} alt="product image" />
                    </a>
                  ))}
              </LightGallery>

              {/* slide image */}
              <Swiper
                className="flex items-center w-full mt-4 gap-2"
                slidesPerView={3}
                spaceBetween={20}
                breakpoints={{
                  800: {
                    slidesPerView: 4,
                  },
                }}
              >
                {listImages.map((image: string, index: number) => (
                  <SwiperSlide
                    key={index}
                    className={`w-1/4 border ${
                      currentImage.includes(image)
                        ? "border-primary"
                        : "border-white"
                    } cursor-pointer`}
                  >
                    <img
                      className="w-full"
                      src={image}
                      onClick={handleChangeImage}
                      alt="product image"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="lg:w-6/12 w-full">
            <div className="pb-5 mb-5 border-b border-borderColor">
              <h3 className="text-2xl font-medium">{productData.name}</h3>
              {/* price */}
              <div className="flex flex-wrap items-end my-3 gap-3">
                {productData.promotionPrice && (
                  <Fragment>
                    <h3 className="text-2xl font-medium text-[#6a7779] line-through">
                      ${productData.promotionPrice}.00
                    </h3>
                    <h2 className="text-3xl font-medium">
                      ${productData.price}.00
                    </h2>
                    <span className="text-sm font-medium text-white px-2 py-0.5 bg-primary rounded-md">
                      Save -
                      {percentPromotionPrice(
                        productData.price,
                        productData.promotionPrice
                      )}
                      %
                    </span>
                  </Fragment>
                )}
                {!productData.promotionPrice && (
                  <h2 className="text-3xl font-medium">${productData.price}</h2>
                )}
              </div>
              <p className="text-base text-[#071c1f]">
                {productData.shortDescription}
              </p>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  Sold:
                </span>
                <p>{productData.sold}</p>
              </div>
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  Brand:
                </span>
                <p>{productData.brand ? productData.brand : "Updating"}</p>
              </div>
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  Quantity:
                </span>
                <p>{productData.quantity}</p>
              </div>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex items-center">
                {productData.listSizes.length > 0 && (
                  <Fragment>
                    <span className="text-base font-medium min-w-[100px]">
                      Size:
                    </span>
                    <form className="flex flex-wrap items-center gap-2">
                      {productData.listSizes.map(
                        (size: IOptionProduct, index: number) => (
                          <input
                            key={index}
                            type="submit"
                            name="size"
                            value={size.value}
                            className={`text-sm px-4 py-0.5 font-medium hover:text-white ${
                              query.size === size.value
                                ? "bg-primary text-white"
                                : ""
                            } hover:bg-primary border border-borderColor transition-all ease-linear duration-100 cursor-pointer`}
                          />
                        )
                      )}
                    </form>
                  </Fragment>
                )}
              </div>
              <p className="text-lg text-primary font-medium mt-3">
                {message.messageSize}
              </p>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex flex-wrap items-center gap-3">
                <div className="lg:w-3/12 w-6/12">
                  <ProductQuantity
                    totalProduct={totalProduct}
                    setTotalProduct={setTotalProduct}
                  />
                </div>
                <div className="lg:w-8/12 sm:flex-nowrap flex-wrap w-full flex items-center h-14 gap-3">
                  <button className="sm:w-6/12 w-full h-full">
                    <p
                      className="flex items-center justify-center w-full h-full text-base font-medium text-white hover:text-dark bg-primary hover:bg-white px-4 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100"
                      onClick={hanldeAddCart}
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                      Add to cart
                    </p>
                  </button>
                  <button className="sm:w-6/12 w-full h-full">
                    <p className="flex items-center justify-center w-full h-full text-base font-medium text-white bg-dark hover:bg-primary px-4 transition-all ease-linear duration-100 gap-2">
                      Buy it now
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container__cus">
        <div className="my-10">
          <div
            className={`product__tags relative flex items-center border-b-2 border-borderColor sm:overflow-x-visible overflow-x-scroll gap-10`}
          >
            {tags.map((tag: string, index: number) => (
              <button
                key={index}
                ref={index === 0 ? firstRef : null}
                name={tag}
                className={`text-lg whitespace-nowrap font-medium ${
                  tag === currentTag ? "text-primary" : ""
                } py-3`}
                onClick={handleChangeLine}
              >
                {tag}
              </button>
            ))}

            <span
              ref={lineRef}
              className="absolute h-0.5 bg-primary -bottom-0.5 left-0 transition-all ease-linear duration-200"
            ></span>
          </div>
          <div className="mt-10">
            {currentTag === "Description" && (
              <div>
                <p className="text-lg mb-5">{productData.description}</p>
              </div>
            )}

            {/* Reviews */}
            {currentTag === "Reviews" && (
              <div className="p-6 border border-borderColor rounded">
                <h2 className="text-2xl font-medium">Customer Reviews</h2>
                <p className="text-base mt-5">No reviews yet</p>
              </div>
            )}

            {/* Shipping Policy */}
            {currentTag === "Shipping Policy" && (
              <div className="flex flex-col items-start gap-10">
                <div className="flex flex-col items-start gap-4">
                  <h3 className="text-2xl font-medium">Shipping policy</h3>
                  <p className="text-lg italic font-medium">
                    It's important to start by clarifying to customers that your
                    order processing times are separate from the shipping times
                    they see at checkout.
                  </p>
                  <p className="text-lg">
                    All orders are processed within X to X business days
                    (excluding weekends and holidays) after receiving your order
                    confirmation email. You will receive another notification
                    when your order has shipped.
                  </p>
                  <p className="text-lg italic font-medium">
                    Include any other pertinent information towards the
                    beginning, such as potential delays due to a high volume of
                    orders or postal service problems that are outside of your
                    control.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <h3 className="text-2xl font-medium">Local delivery</h3>
                  <p className="text-lg italic font-medium">
                    If you offer local delivery or in-store pickup to customers
                    in your area, you can dedicate a section of your shipping
                    policy page to explain the process or create a separate
                    shipping page specifically for local customers.
                  </p>
                  <p className="text-lg">
                    Free local delivery is available for orders over $X within
                    [area of coverage]. For orders under $X, we charge $X for
                    local delivery.
                  </p>
                  <p className="text-lg">
                    Deliveries are made from [delivery hours] on [available
                    days]. We will contact you via text message with the phone
                    number you provided at checkout to notify you on the day of
                    our arrival.
                  </p>
                  <p className="text-lg italic font-medium">
                    You can list out the ZIP/postal codes you service and/or
                    consider embedding a map here so customers can easily see if
                    they are within your local delivery range.
                  </p>
                </div>
                <div className="flex flex-col items-start gap-4">
                  <h3 className="text-2xl font-medium">In-store pickup</h3>
                  <p className="text-lg">
                    You can skip the shipping fees with free local pickup at
                    [list the locations where in-store pickup is available].
                    After placing your order and selecting local pickup at
                    checkout, your order will be prepared and ready for pick up
                    within X to X business days. We will send you an email when
                    your order is ready along with instructions.
                  </p>
                  <p className="text-lg">
                    Our in-store pickup hours are [store hours] on [available
                    days of the week]. Please have your order confirmation email
                    with you when you come.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Category */}
      <section className="category my-10">
        <div className="container__cus">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-normal text-[#1e1e1e]">
              Shop By Category
            </p>
            <div className="flex items-center gap-2">
              <button className="category__btn-prev flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-primary rounded-full transition-all duration-100">
                <MdKeyboardArrowLeft className="text-3xl text-[#9ea18e] hover:text-white" />
              </button>
              <button className="category__btn-next flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-primary rounded-full transition-all duration-100">
                <MdKeyboardArrowRight className="text-3xl text-[#9ea18e] hover:text-white" />
              </button>
            </div>
          </div>
          <div className="lg:p-8 md:p-6 p-4 rounded-md border border-[#e5e5e5] ">
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={20}
              navigation={{
                nextEl: ".category__btn-next",
                prevEl: ".category__btn-prev",
              }}
              breakpoints={{
                478: {
                  slidesPerView: 3,
                },
                650: {
                  slidesPerView: 4,
                },
                990: {
                  slidesPerView: 5,
                },
              }}
            >
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-1.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Architecture Art Lorem
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-2.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Theater Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-3.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Ceramics Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-4.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Sculpture Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-5.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Painting Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-1.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Architecture Art Lorem
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-2.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Theater Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-3.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Ceramics Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-4.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Sculpture Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
              <SwiperSlide className="w-2/12">
                <Link href={"/"} className="w-ful">
                  <img
                    src="/images/category-5.avif"
                    alt="image category"
                    className="w-full rounded-xl"
                  />
                </Link>
                <p className="text-base font-normal text-[#1e1e1e] text-center mt-3 truncate">
                  Painting Art
                </p>
                <a
                  href="#"
                  className="block w-full text-sm font-medium text-primary text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* popups */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-30">
          <div
            className="abosulte w-full h-full z-10"
            style={{ backgroundColor: "rgba(1, 1, 1, 0.6)" }}
            onClick={() => setShow(false)}
          ></div>
          <div
            className="absolute top-[50%] left-[50%] py-6 px-8 min-w-[500px] bg-white shadow-sm rounded-md z-20"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <AiOutlineClose
              className="text-2xl ml-auto mb-2 cursor-pointer"
              onClick={() => setShow(false)}
            />
            <div className="flex items-center gap-5">
              <img
                src={listImages[0]}
                alt="image"
                className="w-[100px] h-100px"
              />
              <div>
                <h2 className="text-lg font-medium">
                  X. Complementary Product 2
                </h2>
                <p className="flex items-center text-lg">
                  <AiFillCheckCircle className="text-xl text-[#28a745]" />
                  Successfully added to your Cart
                </p>
                <div className="flex items-center mt-5 gap-5">
                  <Link
                    href={"/cart"}
                    className="flex items-center justify-center text-sm font-medium text-white hover:text-dark bg-primary hover:bg-white px-4 py-2 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100"
                  >
                    View cart
                  </Link>
                  <button className="flex items-center justify-center text-sm font-medium text-white bg-dark hover:bg-primary px-4 py-2 transition-all ease-linear border border-transparent duration-100 gap-2">
                    Check out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionItem;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query;

  const productData: IProduct = await axios
    .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/product/${slug}`)
    .then((res) => res.data.payload);

  const listImages: string[] = productData.listImages;
  return {
    props: {
      productData,
      listImages,
      query,
    },
  };
};
