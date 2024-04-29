import { AxiosGet } from "~/configs/axiosConfig";

const ATTRIBUTE_KEY = {
    ATTRIBUTE_ALL: "get_all"
};

const getAttributes = async () => {
    return await AxiosGet("/attributes/all");
};

export { getAttributes, ATTRIBUTE_KEY };
