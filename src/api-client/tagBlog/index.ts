import { AxiosGet } from "~/configs/axiosConfig";

const TAG_BLOG_KEY = {
    TAG_ALL: "tag_all"
};

const getTagBlogs = async (page: number = 1) => {
    return await AxiosGet(`/blogs-tag?page=${page}`);
};

export { getTagBlogs, TAG_BLOG_KEY };
