import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Interface
import { IDataCategory, IProductHome, NextPageWithLayout } from "~/interfaces";
import Brands from "~/components/Brands";
import DefaultLayout from "~/layouts/DefaultLayout";
import Seo from "~/components/Seo";
import { useCategoriesAll } from "~/hooks/useCategories";
import { useProducts } from "~/hooks/useProducts";
import CategoryItem from "~/components/Category/Item";
import CategoryLoading from "~/components/Category/Loading";
import ProductLoading from "~/components/Product/Loading";
import ProductItem from "~/components/Product/Item";

const Layout = DefaultLayout;

const Home: NextPageWithLayout = () => {
  const { categories, loadingCategories } = useCategoriesAll();
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
                  className="flex items-center justify-center text-base text-medium text-white bg-primary hover:bg-[#1e1e1e] transition-all duration-100 ease-linear px-5 py-2 rounded-md"
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
            <Swiper
              modules={[Navigation]}
              cssMode={true}
              slidesPerView={2}
              spaceBetween={20}
              navigation={true}
              breakpoints={{
                478: {
                  slidesPerView: 3,
                },
                650: {
                  slidesPerView: 4,
                },
                990: {
                  slidesPerView: 6,
                },
              }}
            >
              {!loadingCategories &&
                categories.map((category: IDataCategory) => (
                  <SwiperSlide key={category._id}>
                    <CategoryItem data={category} />
                  </SwiperSlide>
                ))}

              {loadingCategories &&
                [...new Array(6)].map((item, index: number) => (
                  <SwiperSlide key={index}>
                    <CategoryLoading />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container__cus bg-white p-5 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-[#1e1e1e]">
              Sản phẩm Hot 🔥
            </h3>
          </div>
          <div>
            <Swiper
              modules={[Navigation]}
              slidesPerView={2}
              spaceBetween={20}
              navigation={true}
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
              {!loadingProducts &&
                products.map((product: IProductHome) => (
                  <SwiperSlide key={product._id}>
                    <ProductItem data={product} key={product._id} />
                  </SwiperSlide>
                ))}

              {loadingProducts &&
                [...new Array(5)].map((item, index: number) => (
                  <SwiperSlide key={index}>
                    <ProductLoading />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container__cus bg-white p-5 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-[#1e1e1e]">
              Có thể bạn thích
            </h3>
          </div>
          <div>
            <Swiper
              modules={[Navigation]}
              cssMode={true}
              slidesPerView={2}
              spaceBetween={20}
              navigation={true}
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
              {!loadingProducts &&
                products.map((product: IProductHome) => (
                  <SwiperSlide key={product._id}>
                    <ProductItem data={product} key={product._id} />
                  </SwiperSlide>
                ))}

              {loadingProducts &&
                [...new Array(5)].map((item, index: number) => (
                  <SwiperSlide key={index}>
                    <ProductLoading />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container__cus bg-white p-5 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xl font-medium text-[#1e1e1e]">Sản phẩm gợi ý</p>
          </div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
            {!loadingProducts &&
              products.map((product: IProductHome) => (
                <ProductItem
                  hoverScale={true}
                  data={product}
                  key={product._id}
                />
              ))}

            {loadingProducts &&
              [...new Array(5)].map((item, index: number) => (
                <ProductLoading key={index} />
              ))}
          </div>
        </div>
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
