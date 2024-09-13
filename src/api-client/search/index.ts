import { AxiosGet } from "~/configs/axiosConfig";

const searchProducts = async (search: string, limit: number = 8) => {
   return await AxiosGet(`/products/search?search=${search}&limit=${limit}`);
};

const searchProductsMenu = async (search: string, limit: number = 8) => {
   return await AxiosGet(
      `/products/search?search=${search}&limit=${limit}&title=1&slug=1`,
   );
};

export { searchProducts, searchProductsMenu };
