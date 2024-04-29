import { AxiosGet } from "~/configs/axiosConfig";

const getVariations = async (product_id: string) => {
    return await AxiosGet(`/variations/all/${product_id}`);
};

const getVariation = async (variation_id: string) => {
    return await AxiosGet(`/variations/item/${variation_id}`);
};

export { getVariations, getVariation };
