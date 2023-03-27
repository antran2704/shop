import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRef, FC, MouseEvent, useEffect, useState } from "react";
// gallery
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineZoomOutMap,
} from "react-icons/md";

import Header from "~/components/Header";

interface Props {
  query: any;
}

const tags: string[] = ["Description", "Reviews", "Shipping Policy"];
const sizes: string[] = ["S", "M", "L", "XL"];
const listImages: string[] = [
  "/images/product/product1.webp",
  "/images/product/product2.webp",
  "/images/product/product3.webp",
  "/images/product/product4.webp",
  "/images/product/product1.webp",
  "/images/product/product2.webp",
  "/images/product/product3.webp",
  "/images/product/product4.webp",
];

const CollectionItem: FC<Props> = (props: Props) => {
  const { query } = props;

  const firstRef = useRef<HTMLButtonElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  const [totalProduct, setTotalProduct] = useState<number>(1);
  const [currentImage, setCurrentImage] = useState<string>(listImages[0]);
  const [currentTag, setCurrentTag] = useState<string>("");

  const handleDecreaseTotal = (): void => {
    if (totalProduct > 1) {
      setTotalProduct(totalProduct - 1);
    }
  };

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
        title={"Product"}
        listBackLinks={[
          { title: "Home", link: "/" },
          { title: "Collection item", link: "/collections/test" },
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
              <h3 className="text-2xl font-medium">
                X. Complementary Product 2
              </h3>
              <h2 className="text-3xl font-medium my-3">$29.00</h2>
              <p className="text-base text-[#071c1f]">
                The European languages are members of the same family. Their
                separate existence is a myth. For science, music, sport, etc,
                Europe uses the same vocabulary. The languages only differ in
                their grammar
              </p>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  SKU:
                </span>
                <p>102</p>
              </div>
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  Vendor:
                </span>
                <p>Vendor E</p>
              </div>
              <div className="flex items-center text-sm mb-5">
                <span className="text-base font-medium min-w-[100px]">
                  Type:
                </span>
                <p>Type E</p>
              </div>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex items-center">
                <span className="text-base font-medium min-w-[100px]">
                  Size:
                </span>
                <form className="flex flex-wrap items-center gap-2">
                  {sizes.map((size: string, index: number) => (
                    <input
                      key={index}
                      type="submit"
                      name="size"
                      value={size}
                      className={`text-sm px-4 py-0.5 font-medium hover:text-white ${
                        query.size === size ? "bg-primary text-white" : ""
                      } hover:bg-primary border border-borderColor transition-all ease-linear duration-100 cursor-pointer`}
                    />
                  ))}
                  {/* <button className="text-sm px-4 py-0.5 font-medium hover:text-white hover:bg-primary border border-borderColor transition-all ease-linear duration-100">
                    S
                  </button>
                  <button className="text-sm px-4 py-0.5 font-medium hover:text-white hover:bg-primary border border-borderColor transition-all ease-linear duration-100">
                    M
                  </button>
                  <button className="text-sm px-4 py-0.5 font-medium hover:text-white hover:bg-primary border border-borderColor transition-all ease-linear duration-100">
                    L
                  </button>
                  <button className="text-sm px-4 py-0.5 font-medium hover:text-white hover:bg-primary border border-borderColor transition-all ease-linear duration-100">
                    XXL
                  </button> */}
                </form>
              </div>
            </div>
            <div className="pb-5 mb-5 border-b border-borderColor">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center lg:w-3/12 w-6/12 h-14">
                  <button
                    onClick={handleDecreaseTotal}
                    className="flex items-center justify-center text-xl font-medium w-4/12 h-full border border-borderColor"
                  >
                    -
                  </button>
                  <button className="flex items-center justify-center text-base font-medium w-4/12 h-full border border-borderColor">
                    {totalProduct}
                  </button>
                  <button
                    onClick={() => setTotalProduct(totalProduct + 1)}
                    className="flex items-center justify-center text-xl font-medium w-4/12 h-full border border-borderColor"
                  >
                    +
                  </button>
                </div>
                <div className="lg:w-8/12 sm:flex-nowrap flex-wrap w-full flex items-center h-14 gap-3">
                  <button className="sm:w-6/12 w-full h-full">
                    <Link
                      className="flex items-center justify-center w-full h-full text-base font-medium text-white bg-primary px-4 gap-2 transition-all ease-linear duration-100"
                      href={"/"}
                    >
                      <AiOutlineShoppingCart className="text-2xl" />
                      Add to cart
                    </Link>
                  </button>
                  <button className="sm:w-6/12 w-full h-full">
                    <Link
                      className="flex items-center justify-center w-full h-full text-base font-medium text-white bg-dark hover:bg-primary px-4 transition-all ease-linear duration-100 gap-2"
                      href={"/"}
                    >
                      Buy it now
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container__cus">
        <div className="my-10">
          <div className="relative flex items-center border-b-2 border-borderColor overflow-x-auto gap-10">
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
                <p className="text-lg mb-5">
                  he European languages are members of the same family. Their
                  separate existence is a myth. For science, music, sport, etc,
                  Europe uses the same vocabulary. The languages only differ in
                  their grammar, their pronunciation and their most common
                  words. Everyone realizes why a new common language would be
                  desirable: one could refuse to pay expensive translators.
                </p>
                <p className="text-lg mb-5">
                  To achieve this, it would be necessary to have uniform
                  grammar, pronunciation and more common words. If several
                  languages coalesce, the grammar of the resulting language is
                  more simple and regular than that of the individual languages.
                  The new common language will be more simple and regular than
                  the existing European languages.
                </p>
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
    </div>
  );
};

export default CollectionItem;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      query,
    },
  };
};
