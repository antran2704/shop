import { Fragment } from "react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useBanners } from "~/hooks/useBanner";
import { Banner } from "~/interfaces/banner";

const Banners = () => {
    const { banners, loadingBanner } = useBanners();

    if (banners.length === 0 && loadingBanner) {
        return <Fragment></Fragment>;
    }

    return (
        <Swiper
            modules={[Navigation, Pagination, EffectFade, Autoplay]}
            effect="fade"
            slidesPerView={1}
            loop={true}
            enabled={true}
            speed={600}
            autoplay={{
                delay: 8000
            }}
            breakpoints={{
                960: {
                    navigation: {
                        enabled: true
                    }
                }
            }}
            navigation={{ enabled: false }}
            pagination={{ clickable: true }}
            className="w-full h-full">
            {banners.map((banner: Banner) => (
                <SwiperSlide key={banner._id}>
                    <div
                        className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${
                                process.env.NEXT_PUBLIC_IMAGE_ENDPOINT +
                                banner.image
                            })`
                        }}></div>
                </SwiperSlide>
            ))}
            {/* <SwiperSlide
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
                className="flex items-center justify-center text-base text-medium text-white bg-primary hover:bg-[#1e1e1e] transition-all duration-100 ease-linear px-5 py-2 rounded-md"
              >
                Shop Now
              </Link>
            </button>
          </div>
        </SwiperSlide> */}
        </Swiper>
    );
};

export default Banners;
