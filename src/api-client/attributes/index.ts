import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";
import { parseQueryString } from "~/helpers/url";
import { ISearch } from "~/interfaces/paramater";

const ATTRIBUTE_KEY = {
   ATTRIBUTE_ALL: "get_all",
};

const getAttributes = async (paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater);

   return await httpConfig
      .get(BASE_URL + "/attributes" + parseParamater)
      .then((res) => res.data);
};

export { getAttributes, ATTRIBUTE_KEY };
