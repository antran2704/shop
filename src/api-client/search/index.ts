import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";

const searchProductsMenu = async (search: string, limit: number = 8) => {
   return await httpConfig
      .get(
         BASE_URL +
            `/products/search?search=${search}&limit=${limit}&title=1&slug=1`,
      )
      .then((res) => res.data);
};

export { searchProductsMenu };
