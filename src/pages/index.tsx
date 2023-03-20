import Link from "next/link";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  return (
    <div>
      {/* banner */}
      <section
        id="banner"
        className="w-full lg:h-[500px] md:h-[450px] sm:h-[400px] h-[340px] "
      >
        <Swiper
          modules={[Navigation, Pagination, EffectFade, Autoplay]}
          effect="fade"
          slidesPerView={1}
          loop={true}
          enabled={true}
          speed={600}
          autoplay={{
            delay: 8000,
          }}
          breakpoints={{
            960: {
              navigation: {
                enabled: true,
              },
            },
          }}
          navigation={{ enabled: false }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          <SwiperSlide
            className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center md:pl-24 px-5"
            style={{ backgroundImage: "url(/images/banner1.webp)" }}
          >
            <div className="lg:w-6/12 sm:w-8/12 w-full">
              <p className="banner__subtitle text-xl text-normal text-[#1e1e1e]">
                Best Wooden Products
              </p>
              <h2 className="banner__title lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-[#1e1e1e] font-semibold mt-4 md:mb-8 mb-4">
                New Sell Handmade Collection
              </h2>
              <button className="banner__btn border-0">
                <Link
                  href={"/"}
                  className="flex items-center justify-center text-base text-medium text-white bg-[#9ea18e] hover:bg-[#1e1e1e] transition-all duration-100 ease-linear px-5 py-2 rounded-md"
                >
                  Shop Now
                </Link>
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide
            className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center md:pl-24 px-5"
            style={{ backgroundImage: "url(/images/banner2.webp)" }}
          >
            <div className="lg:w-6/12 sm:w-8/12 w-full">
              <p className="banner__subtitle text-xl text-normal text-[#1e1e1e]">
                Best Wooden Products
              </p>
              <h2 className="banner__title lg:text-6xl md:text-5xl sm:text-4xl text-3xl text-[#1e1e1e] font-semibold mt-4 md:mb-8 mb-4">
                New Sell Handmade Collection
              </h2>
              <button className="banner__btn border-0">
                <Link
                  href={"/"}
                  className="flex items-center justify-center text-base text-medium text-white bg-[#9ea18e] hover:bg-[#1e1e1e] transition-all duration-100 ease-linear px-5 py-2 rounded-md"
                >
                  Shop Now
                </Link>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Category */}
      <section className="category my-10">
        <div className="container__cus">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-normal text-[#1e1e1e]">
              Shop By Category
            </p>
            <div className="flex items-center gap-2">
              <button className="category__btn-prev flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-[#9ea18e] rounded-full transition-all duration-100">
                <MdKeyboardArrowLeft className="text-3xl text-[#9ea18e] hover:text-white" />
              </button>
              <button className="category__btn-next flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-[#9ea18e] rounded-full transition-all duration-100">
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
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
                  className="block w-full text-sm font-medium text-[#9ea18e] text-center hover:underline"
                >
                  View more
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* Best Seller */}
      <section className="trending my-10">
        <div className="container__cus">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xl font-normal text-[#1e1e1e]">Best Seller</p>
            <div className="flex items-center gap-2">
              <button className="trending__btn-prev flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-[#9ea18e] rounded-full transition-all duration-100">
                <MdKeyboardArrowLeft className="text-3xl text-[#9ea18e] hover:text-white" />
              </button>
              <button className="trending__btn-next flex items-center justify-center w-8 h-8 bg-[#f0f0f0] hover:bg-[#9ea18e] rounded-full transition-all duration-100">
                <MdKeyboardArrowRight className="text-3xl text-[#9ea18e] hover:text-white" />
              </button>
            </div>
          </div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={2}
            spaceBetween={10}
            navigation={{
              nextEl: ".trending__btn-next",
              prevEl: ".trending__btn-prev",
            }}
            breakpoints={{
              478: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              650: {
                slidesPerView: 4,
                spaceBetween: 18,
              },
              990: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide className="relative w-2/12 md:p-4 p-3 rounded-md border border-[#e5e5e5]">
              <Link href={"/"} className="w-ful">
                <img
                  src="/images/category-1.avif"
                  alt="image category"
                  className="w-full rounded-xl"
                />
              </Link>
              <p className="md:text-base text-sm font-normal text-[#1e1e1e] text-start mt-3 truncate">
                Chinese Style Black Iron Table Lamp
              </p>
              <div className="flex items-center my-1">
                <AiFillStar className="text-sm text-[#ffc30e]" />
                <AiFillStar className="text-sm text-[#ffc30e]" />
                <AiFillStar className="text-sm text-[#ffc30e]" />
                <AiFillStar className="text-sm text-[#ffc30e]" />
                <AiFillStar className="text-sm text-[#ffc30e]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block md:text-base sm:text-sm text-xs text-[#1e1e1e]">
                  $250.00
                </span>
                <span className="inline-block md:text-base sm:text-sm text-xs text-[#666] line-through">
                  $290.00
                </span>
              </div>
              <button className="md:w-auto w-full mt-3">
                <Link
                  href={"/"}
                  className="flex items-center justify-center md:text-base sm:text-sm text-xs font-normal bg-[#f0f0f0] hover:bg-[#9ea18e] text-[#1e1e1e] hover:text-white py-2 md:px-4 px-2 rounded"
                >
                  Select option
                </Link>
              </button>
              <span className="absolute top-2 left-2 text-xs font-medium py-0.5 px-2 bg-[#7e7e7e] text-[#ffffff] rounded">
                -13%
              </span>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Brands */}
      <section className="my-10">
        <div className="container__cus">
          <Swiper
            modules={[Autoplay]}
            loop={true}
            enabled={true}
            autoplay={{
              delay: 4000,
            }}
            slidesPerView={2}
            breakpoints={{
              478: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              650: {
                slidesPerView: 4,
                spaceBetween: 18,
              },
              990: {
                slidesPerView: 6,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <img src="/images/brand-1.avif" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-2.avif" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-3.webp" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-4.webp" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-1.avif" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-2.avif" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-3.webp" alt="banner" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/images/brand-4.webp" alt="banner" />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Get Our Latets Update  */}
      <section
        className="flex items-center justify-center w-full h-[370px] bg-cover bg-center md:pl-24 px-5 mt-10"
        style={{ backgroundImage: "url(/images/newsletter-parallax.webp)", backgroundAttachment: "fixed" }}
      >
        <div>
          <h2 className="text-3xl text-[#1e1e1e] text-center font-medium">
            Get Our Latets Update !
          </h2>
          <p className="text-lg text-center text-[#555555] mt-2">
            Subscribe to our latest newsletter to get news about special
            discounts.
          </p>
          <form className="flex flex-wrap items-center justify-center mt-8 overflow-hidden sm:gap-0 gap-3">
            <input
              required
              type="email"
              placeholder="Your Email Address"
              className="h-11 sm:w-9/12 w-full bg-white px-5 py-2 outline-0"
            />
            <button className="h-11 sm:w-3/12 w-1/2 px-5 text-white bg-[#9ea18e]">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
