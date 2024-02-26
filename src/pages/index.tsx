import Link from "next/link";
import { ReactElement } from "react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Interface
import { NextPageWithLayout } from "~/interfaces";

import Brands from "~/components/Brands";
import DefaultLayout from "~/layouts/DefaultLayout";
import Seo from "~/components/Seo";
import { useProducts } from "~/hooks/useProducts";
import ListParentCategories from "~/components/Category/List";
import ListProducts from "~/components/Product/List";

const Layout = DefaultLayout;

const Home: NextPageWithLayout = () => {
  const { products, loadingProducts } = useProducts(1);

  return (
    <div>
      <Seo
        title="Shop Antran | Home Page"
        description="Description Shop Antran Home Page"
      />

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
          <SwiperSlide>
            {/* <div className="lg:w-6/12 sm:w-8/12 w-full">
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
            </div> */}
            <div
              className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://theme.hstatic.net/1000197303/1001046599/14/collection_banner.jpg?v=8191)",
              }}
            ></div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="relative flex items-center sm:justify-start justify-center w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://theme.hstatic.net/1000197303/1001046599/14/slideshow_2.jpg?v=8191)",
              }}
            ></div>
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
                  className="flex items-center justify-center text-base text-medium text-white bg-primary hover:bg-[#1e1e1e] transition-all duration-100 ease-linear px-5 py-2 rounded-md"
                >
                  Shop Now
                </Link>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Category */}
      <section className="py-5">
        <div className="container__cus p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-[#1e1e1e]">Danh mục</h3>
          </div>
          <div className="p-5 border-2 rounded-md">
            <ListParentCategories />
          </div>
        </div>
      </section>

      <section className="container__cus py-5">
        <ListProducts
          title="Sản phẩm Hot 🔥"
          isLoading={loadingProducts}
          items={products}
        />
      </section>

      <section className="container__cus py-5">
        <ListProducts
          title="Có thể bạn thích"
          isLoading={loadingProducts}
          items={products}
        />
      </section>

      <section className="container__cus py-5">
        <ListProducts
          title="Sản phẩm gợi ý"
          isLoading={loadingProducts}
          items={products}
        />
      </section>

      {/* Brands */}
      <section className="py-10">
        <Brands />
      </section>
    </div>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
