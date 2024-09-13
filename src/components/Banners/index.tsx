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
         className="w-full h-full">
         {banners.map((banner: Banner) => (
            <SwiperSlide key={banner._id}>
               <div
                  className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center"
                  style={{
                     backgroundImage: `url(${banner.image})`,
                  }}
               />
            </SwiperSlide>
         ))}
      </Swiper>
   );
};

export default Banners;
