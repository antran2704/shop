import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import Pagination from "rc-pagination";

import { FaFilter } from "react-icons/fa";

import Header from "~/components/Header";
import FilterCheckBox from "~/components/Filter/FilterCheckBox";
import ProductItem from "~/components/Product/Item";
import ProductLoading from "~/components/Product/Loading";

import { useCategory } from "~/hooks/useCategories";
import {
    IAttribute,
    IBreadcrumb,
    IFilter,
    IProductData,
    IProductHome,
    IVariant,
    NextPageWithLayout
} from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import useGetAttributes from "~/hooks/useAttributes";
import { useProductsInCategory } from "~/hooks/useProducts";
import LayoutClose from "~/components/Layout/LayoutClose";
import FilterLinks from "~/components/Filter/FilterLinks";
import FilterPrice from "~/components/Filter/FilterPrice";
import ListParentCategories from "~/components/Category/List";

const Layout = DefaultLayout;

const filterPrice: IVariant[] = [
    { _id: "1", name: "Dưới 500.000VND", value: "0.500000", public: true },
    {
        _id: "2",
        name: "500.000VND - 1.000.000VND",
        value: "500000.1000000",
        public: true
    },
    {
        _id: "3",
        name: "1.000.000VND - 1.500.000VND",
        value: "1000000.1500000",
        public: true
    },
    {
        _id: "4",
        name: "1.500.000VND - 2.000.000VND",
        value: "1500000.2000000",
        public: true
    },
    {
        _id: "5",
        name: "Trên 2.000.000VND",
        value: "2000000.1000000000",
        public: true
    }
];

const CollectionItem: NextPageWithLayout = () => {
    const router = useRouter();
    const { id, page, ...query } = router.query;
    const currentPage = page ? Number(page) : 1;

    const btnSubmitFilterRef = useRef<HTMLButtonElement>(null);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [breadcrumbs, setBreadcrumbs] = useState<IBreadcrumb[]>([]);

    const category_id =
        router.isReady && id ? (id as string).split(".")[1] : null;

    const { products, pagination, loadingProducts } = useProductsInCategory(
        router.isReady,
        category_id as string,
        query as IFilter,
        currentPage
    );

    const { category } = useCategory(router.isReady, category_id as string);

    const { attributes, loadingAttributes } = useGetAttributes();

    const handleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    useEffect(() => {
        if (showFilter) {
            setShowFilter(false);
        }
    }, [router.query]);

    useEffect(() => {
        if (category && category._id) {
            const items: IBreadcrumb[] = category.breadcrumbs.map(
                (item: any) => ({
                    label: item.title,
                    url_path: `/collections/${item.slug}.${item._id}`
                })
            );

            setBreadcrumbs([
                { label: "Home", url_path: `/` },
                ...items,
                {
                    label: category.title,
                    url_path: `/collections/${category.slug}.${category._id}`
                }
            ]);
        }
    }, [category]);

    return (
        <div>
            <Header
                title={category?._id ? category.title : ""}
                breadcrumbs={breadcrumbs}
            />

            <div className="container__cus">
                <div className="flex lg:flex-nowrap flex-wrap items-start justify-between my-10 gap-5">
                    <div className="lg:w-2/12 lg:block hidden bg-white p-5 rounded-lg">
                        {router.isReady && !loadingAttributes && (
                            <form>
                                {category && category.childrens.length > 0 && (
                                    <FilterLinks
                                        title="Danh mục sản phẩm"
                                        path="/collections"
                                        items={category.childrens}
                                    />
                                )}

                                {router.isReady &&
                                    attributes.map((attribute: IAttribute) => (
                                        <FilterCheckBox
                                            key={attribute._id}
                                            title={attribute.name}
                                            name={attribute.code}
                                            items={attribute.variants}
                                        />
                                    ))}

                                <FilterPrice
                                    title="GIÁ SẢN PHẨM"
                                    items={filterPrice}
                                    name="filterPrice"
                                />

                                <button
                                    ref={btnSubmitFilterRef}
                                    type="submit"
                                    className="w-full flex items-center justify-center bg-primary text-white text-base capitalize font-medium px-5 py-2 mt-3">
                                    Filter Now
                                </button>
                                <button
                                    onClick={() =>
                                        router.replace({ query: { id } })
                                    }
                                    type="button"
                                    className="w-full flex items-center justify-center bg-[#d2d2d2] hover:bg-primary text-white text-base capitalize font-medium px-5 py-2 mt-3 transition-all ease-linear duration-75">
                                    Clear Filter
                                </button>
                            </form>
                        )}

                        {(!router.isReady || loadingAttributes) && (
                            <ul className="w-full flex flex-col gap-2">
                                {[...new Array(10)].map(
                                    (item: any, index: number) => (
                                        <li
                                            className="skelaton w-full h-4"
                                            key={index}></li>
                                    )
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="lg:w-10/12 w-full bg-white p-5 rounded-lg">
                        <div className="flex items-center lg:justify-end justify-between gap-5">
                            <div
                                onClick={handleShowFilter}
                                className="lg:hidden flex items-center hover:text-primary cursor-pointer">
                                <FaFilter className="text-lg min-w-10 w-10" />
                                <p className="text-sm font-medium">Filter</p>
                            </div>
                            {products.length > 0 && (
                                <Fragment>
                                    <p className="flex items-center justify-end lg:text-base md:text-sm text-xs text-right font-medium gap-1">
                                        <span>Showing</span>
                                        {pagination.currentPage === 1
                                            ? 1
                                            : pagination.pageSize *
                                                  pagination.currentPage -
                                              1 +
                                              1}
                                        <span>-</span>
                                        {pagination.pageSize *
                                            pagination.currentPage >
                                        pagination.totalItems
                                            ? pagination.totalItems
                                            : pagination.pageSize *
                                              pagination.currentPage}
                                        <span>of</span>
                                        {pagination.totalItems}
                                        <span>result</span>
                                    </p>
                                </Fragment>
                            )}
                        </div>
                        {router.isReady &&
                            !loadingProducts &&
                            products.length === 0 && (
                                <Fragment>
                                    <h3 className="text-2xl text-center">
                                        No item
                                    </h3>
                                    <Link
                                        className="block text-xl text-center hover:text-primary hover:underline font-medium mt-2"
                                        href={"/"}>
                                        Back to home
                                    </Link>
                                </Fragment>
                            )}

                        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-5 gap-4">
                            {!loadingProducts &&
                                products.length > 0 &&
                                products.map(
                                    (product: IProductHome, index: number) => (
                                        <ProductItem
                                            key={index}
                                            data={product}
                                        />
                                    )
                                )}

                            {(!router.isReady || loadingProducts) &&
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
                                    router.replace({
                                        query: { ...router.query, page }
                                    })
                                }
                                total={pagination.totalItems}
                                pageSize={pagination.pageSize}
                            />
                        )}
                    </div>

                    <div className="lg:hidden block">
                        <div
                            className={`fixed top-0 bottom-0 ${
                                showFilter
                                    ? "right-0 opacity-100"
                                    : "-right-56 opacity-0 pointer-events-none"
                            } md:w-1/2 w-3/4 bg-white p-5 shadow-xl transition-all ease-linear duration-100 z-40`}>
                            <form>
                                <div className="scroll max-h-[80vh] overflow-y-auto">
                                    {category &&
                                        category.childrens.length > 0 && (
                                            <FilterLinks
                                                title="Danh mục sản phẩm"
                                                path="/collections"
                                                items={category.childrens}
                                            />
                                        )}

                                    {router.isReady &&
                                        attributes.map(
                                            (attribute: IAttribute) => (
                                                <FilterCheckBox
                                                    key={attribute._id}
                                                    title={attribute.name}
                                                    name={attribute.code}
                                                    items={attribute.variants}
                                                />
                                            )
                                        )}

                                    <FilterPrice
                                        title="GIÁ SẢN PHẨM"
                                        items={filterPrice}
                                        name="filterPrice"
                                    />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 flex sm:flex-nowrap flex-wrap items-center h-auto justify-center bg-white p-5 border-t gap-2">
                                    <button
                                        ref={btnSubmitFilterRef}
                                        type="submit"
                                        className="sm:w-2/4 w-full flex items-center justify-center bg-primary text-white text-lg font-medium px-5 py-2 rounded-md">
                                        Filter Now
                                    </button>
                                    <button
                                        onClick={() =>
                                            router.replace({ query: { id } })
                                        }
                                        type="button"
                                        className="sm:w-2/4 w-full flex items-center justify-center bg-black hover:bg-primary text-white text-lg capitalize font-medium px-5 py-2 transition-all ease-linear duration-75 rounded-md">
                                        Clear Filter
                                    </button>
                                </div>
                            </form>
                        </div>
                        {showFilter && (
                            <LayoutClose
                                handleClose={handleShowFilter}
                                disableScroll={false}
                            />
                        )}
                    </div>
                </div>
            </div>

            <section className="py-5">
                <ListParentCategories title="Danh mục" />
            </section>
        </div>
    );
};

export default CollectionItem;

CollectionItem.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};
