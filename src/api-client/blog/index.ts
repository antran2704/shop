import axios from "axios";
import { AxiosGet } from "~/configs/axiosConfig";

const BLOG_KEY = {
    BLOG_ALL: "blog_all"
};

const getBlogs = async (page: number = 1) => {
    return await AxiosGet(`/blogs?page=${page}`);
};

const getBlogsStatic = async (page: number = 1) => {
    return await axios
        .get(`${process.env.ENDPOINT_SERVER}/blogs?page=${page}`)
        .then((res) => res.data);
};

const getBlog = async (slug: string) => {
    return await AxiosGet(`/blogs/${slug}`);
};

const getBlogStatic = async (slug: string) => {
    return await axios.get(`${process.env.ENDPOINT_SERVER}/blogs/${slug}`).then(res => res.data);
};

export { getBlogs, getBlog, getBlogsStatic, getBlogStatic, BLOG_KEY };
