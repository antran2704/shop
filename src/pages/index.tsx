import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { Navigation, Pagination, EffectFade, Autoplay, Parallax } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Interface
import ProductItem from "~/components/Product/Item";
import { IDataCategory, IProductHome, NextPageWithLayout } from "~/interfaces";
import Brands from "~/components/Brands";
import DefaultLayout from "~/layouts/DefaultLayout";

const Layout = DefaultLayout;

const Home: NextPageWithLayout = () => {
  const [categories, setCategories] = useState<IDataCategory[]>([]);
  const [products, setProducts] = useState<IProductHome[]>([]);

  const getCategories = async () => {
    try {
      const data = await axios
        .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/categories`)
        .then((res) => res.data);

      setCategories(data.payload);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const data: any = await axios
        .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/products`)
        .then((res) => res.data);

      if (data.status === 200) {
        setProducts(data.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
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
              {categories.map((category: IDataCategory) => (
                <SwiperSlide key={category._id}>
                  <Link
                    href={`/collections/${category._id}`}
                    className="flex flex-col items-center justify-center text-[#1e1e1e] hover:text-primary"
                  >
                    <img
                      src={category.thumbnail || ""}
                      alt="image category"
                      className="w-full h-[160px] rounded-md"
                    />

                    <p className="block w-full text-sm font-medium text-center mt-3">
                      {category.title}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container__cus bg-white p-5 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-medium text-[#1e1e1e]">Sản phẩm Hot 🔥</h3>
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
              {products.map((product: IProductHome) => (
                <SwiperSlide key={product._id}>
                  <ProductItem data={product} key={product._id} />
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
              {products.map((product: IProductHome) => (
                <SwiperSlide key={product._id}>
                  <ProductItem data={product} key={product._id} />
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
            {products.map((product: IProductHome) => (
              <ProductItem hoverScale={true} data={product} key={product._id} />
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
