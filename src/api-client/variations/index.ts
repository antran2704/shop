import axios from "axios";
import { BASE_URL } from "~/common/api";

const getVariations = async (product_id: string) => {
   return await axios
      .get(BASE_URL + `/variations/${product_id}`)
      .then((res) => res.data);
};

const getVariation = async (variation_id: string) => {
   return await axios
      .get(BASE_URL + `/variations/item/${variation_id}`)
      .then((res) => res.data);
};

export { getVariations, getVariation };
