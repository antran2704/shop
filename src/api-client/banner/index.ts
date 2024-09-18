import axios from "axios";
import { BASE_URL } from "~/common/api";

const BANNER_KEY = {
   BANNER_ALL: "banner_all",
};

const getBanners = async () => {
   return await axios.get(BASE_URL + "/banners").then((res) => res.data);
};

export { getBanners, BANNER_KEY };
