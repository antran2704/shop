import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageCus from "../Image";

const listBrand: string[] = [
    "/images/brand-1.avif",
    "/images/brand-2.avif",
    "/images/brand-3.webp",
    "/images/brand-4.webp",
    "/images/brand-1.avif",
    "/images/brand-2.avif",
    "/images/brand-3.webp",
    "/images/brand-4.webp",
    "/images/brand-1.avif",
    "/images/brand-2.avif",
    "/images/brand-3.webp",
    "/images/brand-4.webp",
    "/images/brand-1.avif",
    "/images/brand-2.avif",
    "/images/brand-3.webp",
    "/images/brand-4.webp"
];

const breakpointsSwiper = {
    478: {
        slidesPerView: 3,
        spaceBetween: 14
    },
    650: {
        slidesPerView: 4,
        spaceBetween: 18
    },
    990: {
        slidesPerView: 6,
        spaceBetween: 20
    }
};

const Brands = () => {
    return (
        <div>
            <Swiper
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                speed={3000}
                slidesPerView={2}
                loop={true}
                enabled={true}
                breakpoints={breakpointsSwiper}
                freeMode={true}>
                {listBrand.map((brand: string, index: number) => (
                    <SwiperSlide key={index}>
                        <ImageCus
                            title="Brand"
                            src={brand}
                            alt="Brand"
                            className="mx-auto"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Brands;
