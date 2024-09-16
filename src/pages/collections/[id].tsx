import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, ReactElement, useEffect, useState } from "react";
import Pagination from "rc-pagination";
import { FaFilter } from "react-icons/fa";
import clsx from "clsx";

import Header from "~/components/Header";
import ProductItem from "~/components/Product/Item";
import ProductLoading from "~/components/Product/Loading";
import DefaultLayout from "~/layouts/DefaultLayout";
import ListParentCategories from "~/components/Category/List";
import FilterCollection from "./components/Filter";

import {
   ICategory,
   ICategoryBreadcrumb,
   IListProduct,
   IPagination,
   IProductSearch,
   NextPageWithLayout,
} from "~/interfaces";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";

import { getCategory, getProducts } from "~/api-client";
import { initPagination } from "~/data";
import { IResponse, IResponseWithPagination } from "~/interfaces/response";
import { IBreadcrumb, IBreadcrumbItem } from "~/interfaces/breadcrumb";
import LayoutClose from "~/components/Layout/LayoutClose";
import { IoIosCloseCircle } from "react-icons/io";
import { NO_PRODUCT_IMAGE } from "~/common/image";

const Layout = DefaultLayout;

const CollectionItem: NextPageWithLayout = () => {
   const router = useRouter();

   const {
      id,
      page: pageParam,
      take: takeParam,
      minPrice,
      maxPrice,
      ...queryParam
   } = router.query;

   const [breadcrumb, setBreadcrumb] = useState<IBreadcrumb | null>(null);

   const categoryIdParam = id ? (id as string).split(".")[1] : null;

   const [category, setCategory] = useState<ICategory | null>(null);

   const [products, setProducts] = useState<IListProduct[]>([]);
   const [productParamater, setProductParamater] = useState<IProductSearch>({
      order: ORDER_PARAMATER_ENUM.DESC,
      page: pageParam ? Number(pageParam) : 1,
      take: takeParam && Number(takeParam) <= 100 ? Number(takeParam) : 16,
      minPrice: minPrice ? +minPrice : null,
      maxPrice: maxPrice ? +maxPrice : null,
      ...queryParam,
   });

   const [pagination, setPagination] = useState<IPagination>(initPagination);

   const [modalFilter, setModalFilter] = useState<boolean>(false);

   const [loading, setLoading] = useState<{
      product: boolean;
      category: boolean;
   }>({
      product: true,
      category: true,
   });

   const onLoading = (key: keyof typeof loading, value: boolean) => {
      setLoading({ ...loading, [key]: value });
   };

   const onModalFilter = () => {
      setModalFilter(!modalFilter);
   };

   const onSubmitFilter = (filter: IProductSearch) => {
      router.replace({ query: { id: router.query.id, ...filter } });
      setProductParamater({
         ...filter,
         page: 1,
         take: productParamater.take,
         category: categoryIdParam as string,
         order: productParamater.order,
      });
   };

   const onClearFilter = () => {
      router.replace({ query: { id: router.query.id } });
      setProductParamater({
         page: 1,
         take: productParamater.take,
         category: categoryIdParam as string,
         order: productParamater.order,
      });
   };

   const onChangePage = (nextPage: number) => {
      router.replace({
         query: { id: router.query.id, ...productParamater, page: nextPage },
      });
      setProductParamater({ ...productParamater, page: nextPage });
   };

   const handleGetCategory = async (categoryId: string) => {
      // onLoading("category", true);

      await getCategory(categoryId)
         .then(({ payload }: IResponse<ICategory>) => {
            // setup breadcrumb of category
            const lastChildIndex: number = payload.children.length - 1;
            const newBreadcrumb: IBreadcrumbItem[] = payload.children.map(
               (child: ICategoryBreadcrumb, index: number) => ({
                  title: child.title,
                  path:
                     index !== lastChildIndex
                        ? `${child.slug}.${child._id}`
                        : null,
               }),
            );

            setBreadcrumb({ ...breadcrumb, items: newBreadcrumb });
            setCategory(payload);
         })
         .catch((err) => err);

      // onLoading("category", false);
   };

   const handleGetProduct = async (paramater: IProductSearch) => {
      onLoading("product", true);

      await getProducts({ ...paramater, category: categoryIdParam as string })
         .then(
            ({
               payload,
               pagination,
            }: IResponseWithPagination<IListProduct[]>) => {
               setProducts(payload);
               setPagination(pagination);
            },
         )
         .catch((err) => err);

      onLoading("product", false);
   };

   useEffect(() => {
      if (modalFilter) {
         setModalFilter(false);
      }

      handleGetProduct(productParamater);
   }, [productParamater]);

   useEffect(() => {
      if (!categoryIdParam) return;

      handleGetCategory(categoryIdParam);
   }, [categoryIdParam]);

   return (
      <div>
         <Header
            title={category?._id ? category.title : ""}
            breadcrumbs={breadcrumb}
         />

         <div className="container__cus">
            <div className="flex lg:flex-nowrap flex-wrap items-start justify-between my-10 gap-5">
               <div
                  className={clsx(
                     "lg:relative fixed top-0 bottom-0 left-0 lg:w-3/12 md:w-6/12 w-10/12 bg-white p-5 rounded-lg  lg:translate-x-0 transition-all ease-linear duration-100 lg:z-0 z-40",
                     [modalFilter ? "translate-x-0" : "-translate-x-full"],
                  )}>
                  <div className="lg:hidden flex items-center justify-end">
                     <IoIosCloseCircle
                        onClick={onModalFilter}
                        className="text-3xl hover:text-primary cursor-pointer"
                     />
                  </div>
                  {/* Filter price and other option */}
                  <FilterCollection
                     category={category}
                     paramater={productParamater}
                     handleFilter={onSubmitFilter}
                     handleClearFilter={onClearFilter}
                  />
               </div>

               {/* Layout to close filter on Tablet/Mobile */}
               <LayoutClose show={modalFilter} handleClose={onModalFilter} />

               <div className="lg:w-9/12 w-full bg-white px-5 lg:py-10 py-5 rounded-lg">
                  <div className="flex items-center lg:justify-end justify-between gap-5">
                     <div
                        onClick={onModalFilter}
                        className="lg:hidden flex items-center hover:text-primary cursor-pointer">
                        <FaFilter className="text-lg min-w-10 w-10" />
                        <p className="text-sm font-medium">Bộ lọc</p>
                     </div>
                     {products.length > 0 && (
                        <Fragment>
                           <p className="flex items-center justify-end lg:text-base text-sm text-right gap-1">
                              <span>Hiển thị</span>
                              {pagination.take * pagination.page >
                              pagination.total
                                 ? pagination.total
                                 : pagination.take * pagination.page}
                              <span>trong</span>
                              {pagination.total}
                              <span>kết quả</span>
                           </p>
                        </Fragment>
                     )}
                  </div>
                  {!loading.product && products.length === 0 && (
                     <div className="flex flex-col items-center justify-center">
                        <img
                           src={NO_PRODUCT_IMAGE}
                           alt="No product"
                           title="No product"
                           className="lg:w-1/3 w-1/2"
                        />
                        <h3 className="text-xl text-center">
                           Không có sản phẩm nào
                        </h3>
                        <Link
                           className="block text-lg text-center text-primary hover:underline font-medium mt-2"
                           href={"/"}>
                           Quay về trang chủ
                        </Link>
                     </div>
                  )}

                  <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 mt-5 gap-4">
                     {!loading.product &&
                        products.map((product: IListProduct, index: number) => (
                           <ProductItem key={index} data={product} />
                        ))}

                     {loading.product &&
                        [...new Array(5)].map((_, index: number) => (
                           <ProductLoading key={index} />
                        ))}
                  </div>

                  {/* pagination */}
                  {pagination.total > pagination.take && (
                     <Pagination
                        current={pagination.page}
                        className="pagination"
                        onChange={onChangePage}
                        total={pagination.total}
                        pageSize={pagination.take}
                     />
                  )}
               </div>
            </div>

            <div className="py-5">
               <ListParentCategories title="Danh mục" />
            </div>
         </div>
      </div>
   );
};

export default CollectionItem;

CollectionItem.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
