import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { FC, Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "rc-pagination";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { IProduct, IPagination } from "~/interfaces/apiResponse";

import Header from "~/components/Header";
import FilterItem from "~/components/Filter";
import ProductItem from "~/components/ProductItem";

interface Props {
  query: any;
}

const initPagination = {
  pageSize: 0,
  totalItems: 0,
  currentPage: 0,
};

const CollectionItem: FC<Props> = (props: Props) => {
  const router = useRouter();

  const { query } = props;
  const { id } = query;
  const currentPage = query.page ? Number(query.page) : 1;

  const btnSubmitFilterRef = useRef<HTMLButtonElement>(null);
  const [categoryData, setCategoryData] = useState<any>();
  const [products, setProducts] = useState<any>([]);
  const [pagination, setPagination] = useState<IPagination>(initPagination);

  const handleGetCategory = async () => {
    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/categories/id/${id}`)
        .then((res) => res.data);

      if (response.status === 200) {
        setCategoryData(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProducts = async () => {
    try {
      const response = await axios
        .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/products/category/${id}`)
        .then((res) => res.data);

      if (response.status === 200) {
        setProducts(response.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handeChangePage = async (page: number) => {
  //   const currentUrl = router.asPath;
  //   const index = router.asPath.indexOf("?");
  //   router.query.page = page.toString();
  //   if (index !== -1) {
  //     if (currentUrl.includes(`page=${currentPage}`)) {
  //       const newUrl = currentUrl.replace(
  //         `page=${currentPage}`,
  //         `page=${page}`
  //       );
  //       router.push(
  //         `/collections/${categoryData?.slug}?${newUrl.slice(index + 1)}`
  //       );
  //     } else {
  //       router.push(
  //         `/collections/${categoryData?.slug}?${router.asPath.slice(
  //           index + 1
  //         )}&page=${page}`
  //       );
  //     }
  //   } else {
  //     router.push(`/collections/${categoryData?.slug}?page=${page}`);
  //   }
  // };

  // useEffect(() => {
  //   const arrs = id[id.length - 1].split("-");
  //   let newString = "";
  //   const newArrs = arrs.map((item: string) => {
  //     return item.split("").map((chart, index) => {
  //       if (index === 0) {
  //         return item[0].toUpperCase();
  //       } else {
  //         return chart;
  //       }
  //     });
  //   });

  //   newArrs.map((items: string[]) => {
  //     items.map((item: string, index: number) => {
  //       if (index === items.length - 1) {
  //         newString += `${item} `;
  //       } else {
  //         newString += item;
  //       }
  //     });
  //   });
  //   setBreadcrumb(newString);
  // }, [id]);

  // handle get data of current category
  // useEffect(() => {
  //   const getCategory = async () => {
  //     try {
  //       const data: ICategory = await axios
  //         .get(`${process.env.NEXT_PUBLIC_ENDPOINT_API}/category/${}`)
  //         .then((res) => res.data.payload);

  //       setCategoryData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getCategory();
  // }, []);

  // handle get items of current category
  // useEffect(() => {
  //   const getCategoryAndProducts = async () => {
  //     const index = router.asPath.indexOf("?");
  //     let listProducts: IListProduct;

  //     try {
  //       if (index !== -1) {
  //         listProducts = await axios
  //           .get(
  //             `${
  //               process.env.NEXT_PUBLIC_ENDPOINT_API
  //             }/product/getAllProductsInCategory/${
  //               categoryData?._id
  //             }?${router.asPath.slice(index + 1)}&page=${currentPage}`
  //           )
  //           .then((res) => res.data);
  //       } else {
  //         listProducts = await axios
  //           .get(
  //             `${process.env.NEXT_PUBLIC_ENDPOINT_API}/product/getAllProductsInCategory/${categoryData?._id}?page=${currentPage}`
  //           )
  //           .then((res) => res.data);
  //       }
  //       console.log(listProducts);
  //       setListProducts(listProducts.payload);
  //       setPagination(listProducts.pagination);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   if (categoryData?._id) {
  //     getCategoryAndProducts();
  //   }
  // }, [currentPage, categoryData]);

  useEffect(() => {
    handleGetCategory();
    handleGetProducts();
  }, []);
  return (
    <div>
      <Header
        title={categoryData?.title || ""}
        listBackLinks={[{ title: "Home", link: "/" }]}
      />
      <div className="container__cus">
        <div className="flex lg:flex-nowrap flex-wrap items-start justify-between my-10 gap-10">
          <div className="lg:w-3/12 w-full">
            <form>
              {/* {categoryData?.filters.map(
                (item: IFilterCategory, index: number) => (
                  <FilterItem
                    key={index}
                    titleFilter={item.title}
                    typeFilter="checkBox"
                    isShow={true}
                    listFilterItem={item.listFilterItem}
                    query={query}
                  />
                )
              )} */}

              <FilterItem
                titleFilter="Price"
                isShow={true}
                typeFilter="price"
                query={query}
              />

              <button
                ref={btnSubmitFilterRef}
                type="submit"
                className="w-full flex items-center justify-center bg-primary text-white text-lg font-medium px-5 py-2 mt-3"
              >
                Filter Now
              </button>
            </form>
          </div>
          <div className="lg:w-9/12 w-full">
            {pagination?.totalItems > 0 && (
              <p className="flex items-center justify-end text-lg text-right font-medium gap-1">
                <span>Showing</span>
                {pagination.currentPage === 1
                  ? 1
                  : pagination.pageSize * pagination.currentPage - 1 + 1}
                <span>-</span>
                {pagination.pageSize * pagination.currentPage >
                pagination.totalItems
                  ? pagination.totalItems
                  : pagination.pageSize * pagination.currentPage}
                <span>of</span>
                {pagination.totalItems}
                <span>result</span>
              </p>
            )}
            {products.length === 0 && (
              <Fragment>
                <h3 className="text-2xl text-center">
                  No item in category <strong>{categoryData?.title}</strong>
                </h3>
                <Link
                  className="block text-xl text-center hover:text-primary hover:underline font-medium mt-2"
                  href={"/"}
                >
                  Back to home
                </Link>
              </Fragment>
            )}
            <div className="grid md:grid-cols-3 grid-cols-2 mt-5 gap-4">
              {products.length > 0 &&
                products.map((product: IProduct, index: number) => (
                  <ProductItem key={index} productData={product} />
                ))}
            </div>

            {/* pagination */}
            {pagination?.totalItems > pagination?.pageSize && (
              <Pagination
                current={currentPage}
                className="pagination"
                // onChange={(page) => handeChangePage(page)}
                total={pagination.totalItems}
                pageSize={pagination.pageSize}
              />
            )}
          </div>
        </div>
      </div>
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
