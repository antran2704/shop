import useSWR, { SWRConfiguration } from "swr";
import {
    PRODUCT_KEY,
    getHotProducts,
    getOtherProducts,
    getProducts,
    getProductsInCategory
} from "~/api-client";
import { initPagination } from "~/data";
import { IFilter, IPagination, IProductData, IQueryParam } from "~/interfaces";

// refesh 1 hour
const REFESH_TIME = 1000 * 60 * 60;

const fetcherProducts = async (
    page: number,
    select?: IQueryParam<Partial<IProductData>>
) => {
    try {
        const res = await getProducts(page, select);

        if (res.status === 200) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

const fetcherOtherProducts = async (
    product_id: string,
    category_id: string,
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>
) => {
    const res = await getOtherProducts(product_id, category_id, page, select);

    if (res.status === 200) {
        return res;
    }
};

const fetcherHotProducts = async (
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>
) => {
    try {
        const res = await getHotProducts(page, select);

        if (res.status === 200) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

const fetcherProductsInCategory = async (
    category_id: string,
    filter: IFilter | null,
    page: number = 1
) => {
    try {
        const res = await getProductsInCategory(category_id, filter, page);

        if (res.status === 200) {
            return res;
        }
    } catch (error) {
        console.log(error);
    }
};

const useProducts = (
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>,
    options?: Partial<SWRConfiguration>
) => {
    const { data, isLoading, mutate, error } = useSWR(
        [PRODUCT_KEY.PRODUCTS_PAGE, page],
        () => fetcherProducts(page, select),
        {
            ...options,
            revalidateOnFocus: false,
            dedupingInterval: REFESH_TIME,
            keepPreviousData: true,
            fallbackData: { payload: [], pagination: initPagination }
        }
    );

    return {
        products: data.payload,
        pagination: data.pagination as IPagination,
        loadingProducts: isLoading,
        error,
        mutate
    };
};

const useHotProducts = (
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>,
    options?: Partial<SWRConfiguration>
) => {
    const { data, isLoading, mutate, error } = useSWR(
        [PRODUCT_KEY.PRODUCT_HOT, page],
        () => fetcherHotProducts(page, select),
        {
            ...options,
            revalidateOnFocus: false,
            dedupingInterval: REFESH_TIME,
            keepPreviousData: true,
            fallbackData: { payload: [], pagination: initPagination }
        }
    );

    return {
        hotProducts: data.payload,
        pagination: data.pagination as IPagination,
        loadingHotProducts: isLoading,
        error,
        mutate
    };
};

const useOtherProducts = (
    isReady: boolean,
    product_id: string,
    category_id: string,
    page: number = 1,
    select?: IQueryParam<Partial<IProductData>>,
    options?: Partial<SWRConfiguration>
) => {
    const { data, isLoading, mutate, error } = useSWR(
        isReady
            ? [PRODUCT_KEY.PRODUCTS_OTHER, category_id, product_id, page]
            : null,
        () => fetcherOtherProducts(category_id, product_id, page, select),
        {
            ...options,
            revalidateOnFocus: false,
            dedupingInterval: REFESH_TIME,
            keepPreviousData: true,
            fallbackData: { payload: [], pagination: initPagination }
        }
    );

    return {
        otherProducts: data.payload,
        pagination: data.pagination as IPagination,
        loadingOtherProducts: isLoading,
        error,
        mutate
    };
};

const useProductsInCategory = (
    isReady: boolean,
    category_id: string,
    filter: IFilter | null,
    page: number = 1,
    options?: Partial<SWRConfiguration>
) => {
    const {
        data,
        isLoading = true,
        mutate,
        error
    } = useSWR(
        isReady ? [PRODUCT_KEY.PRODUCTS_PAGE, category_id, filter, page] : null,
        () => fetcherProductsInCategory(category_id, filter, page),
        {
            ...options,
            revalidateOnFocus: false,
            dedupingInterval: REFESH_TIME,
            fallbackData: { payload: [], pagination: initPagination }
        }
    );

    return {
        products: data.payload,
        pagination: data.pagination as IPagination,
        loadingProducts: isLoading,
        error,
        mutate
    };
};

export { useProducts, useOtherProducts, useHotProducts, useProductsInCategory };
