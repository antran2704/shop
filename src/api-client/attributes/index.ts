import { AxiosGet } from "~/configs/axiosConfig";
import { parseQueryString } from "~/helpers/url";
import { ISearch } from "~/interfaces/paramater";

const ATTRIBUTE_KEY = {
   ATTRIBUTE_ALL: "get_all",
};

const getAttributes = async (paramater: ISearch) => {
   const parseParamater = parseQueryString(paramater);

   return await AxiosGet("/attributes" + parseParamater);
};

export { getAttributes, ATTRIBUTE_KEY };
