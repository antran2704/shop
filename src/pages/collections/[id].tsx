import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, ReactElement, useRef, useState } from "react";
import Pagination from "rc-pagination";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { FaFilter } from "react-icons/fa";

import Header from "~/components/Header";
import FilterItem from "~/components/Filter";
import ProductItem from "~/components/Product/Item";
import ProductLoading from "~/components/Product/Loading";
import CategoryItem from "~/components/Category/Item";
import CategoryLoading from "~/components/Category/Loading";

import { useCategoriesAll, useCategory } from "~/hooks/useCategories";
import {
  IAttribute,
  IDataCategory,
  IFilter,
  IPagination,
  IProductData,
  NextPageWithLayout,
} from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import useGetAttributes from "~/hooks/useAttributes";
import { useProductsInCategory } from "~/hooks/useProducts";
import LayoutClose from "~/components/Layout/LayoutClose";

const Layout = DefaultLayout;

const CollectionItem: NextPageWithLayout = () => {
  const router = useRouter();
  const { id, page, ...query } = router.query;
  const currentPage = page ? Number(page) : 1;

  const btnSubmitFilterRef = useRef<HTMLButtonElement>(null);
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const category_id =
    router.isReady && id ? (id as string).split(".")[1] : null;

  const { categories, loadingCategories } = useCategoriesAll();
  const { products, pagination, loadingProducts } = useProductsInCategory(
    router.isReady,
    category_id as string,
    query as IFilter,
    currentPage
  );

  console.log(products)

  const { category, loadingCategory } = useCategory(
    router.isReady,
    category_id as string
  );

  const { attributes } = useGetAttributes();

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div>
      {!loadingCategory && category?._id && (
        <Header
          title={category.title}
          breadcrumbs={[
            { label: "Home", url_path: "/" },
            { label: category.title, url_path: `/${category.slug}` },
          ]}
        />
      )}

      <div className="container__cus">
        <div className="flex lg:flex-nowrap flex-wrap items-start justify-between my-10 gap-10">
          <div className="lg:w-2/12 lg:block hidden">
            <form>
              {router.isReady &&
                attributes.map((attribute: IAttribute, index: number) => (
                  <FilterItem
                    key={attribute._id}
                    name={attribute.name}
                    isShow={index < 2 ? true : false}
                    listFilterItem={attribute.variants}
                  />
                ))}

              <button
                ref={btnSubmitFilterRef}
                type="submit"
                className="w-full flex items-center justify-center bg-primary text-white text-lg capitalize font-medium px-5 py-2 mt-3"
              >
                Filter Now
              </button>
              <button
                onClick={() => router.replace({ query: { id } })}
                type="button"
                className="w-full flex items-center justify-center bg-[#d2d2d2] hover:bg-primary text-white text-lg capitalize font-medium px-5 py-2 mt-3 transition-all ease-linear duration-75"
              >
                Clear Filter
              </button>
            </form>
          </div>
          <div className="lg:w-9/12 w-full">
            <div className="flex items-center lg:justify-end justify-between gap-5">
              <div
                onClick={handleShowFilter}
                className="lg:hidden block min-w-10 w-10 hover:text-primary cursor-pointer"
              >
                <FaFilter className="text-lg" />
              </div>
              {products.length > 0 && (
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
            </div>
            {!loadingProducts && products.length === 0 && (
              <Fragment>
                <h3 className="text-2xl text-center">No item</h3>
                <Link
                  className="block text-xl text-center hover:text-primary hover:underline font-medium mt-2"
                  href={"/"}
                >
                  Back to home
                </Link>
              </Fragment>
            )}

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-5 gap-4">
              {!loadingProducts &&
                products.length > 0 &&
                products.map((product: IProductData, index: number) => (
                  <ProductItem key={index} data={product} />
                ))}

              {loadingProducts &&
                [...new Array(5)].map((item, index: number) => (
                  <ProductLoading key={index} />
                ))}
            </div>

            {/* pagination */}
            {pagination.totalItems > pagination.pageSize && (
              <Pagination
                current={currentPage}
                className="pagination"
                onChange={(page) =>
                  router.replace({ query: { ...router.query, page } })
                }
                total={pagination.totalItems}
                pageSize={pagination.pageSize}
              />
            )}
          </div>

          <div
            className={`lg:hidden block fixed top-0 bottom-0 ${
              showFilter
                ? "right-0 opacity-100"
                : "-right-56 opacity-0 pointer-events-none"
            } md:w-1/2 w-3/4 bg-white p-5 shadow-xl transition-all ease-linear duration-100 z-40`}
          >
            <form>
              {router.isReady &&
                attributes.map((attribute: IAttribute, index: number) => (
                  <FilterItem
                    key={attribute._id}
                    name={attribute.name}
                    isShow={index < 2 ? true : false}
                    listFilterItem={attribute.variants}
                  />
                ))}

              <button
                ref={btnSubmitFilterRef}
                type="submit"
                className="w-full flex items-center justify-center bg-primary text-white text-lg font-medium px-5 py-2 mt-3"
              >
                Filter Now
              </button>
              <button
                onClick={() => router.replace({ query: { id } })}
                type="button"
                className="w-full flex items-center justify-center bg-[#d2d2d2] hover:bg-primary text-white text-lg capitalize font-medium px-5 py-2 mt-3 transition-all ease-linear duration-75"
              >
                Clear Filter
              </button>
            </form>
          </div>

          {showFilter && <LayoutClose handleClose={handleShowFilter} />}
        </div>
      </div>

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
    </div>
  );
};

export default CollectionItem;

CollectionItem.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
