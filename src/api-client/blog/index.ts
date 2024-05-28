import axios from "axios";
import qs from "qs";

import { AxiosGet } from "~/configs/axiosConfig";
import { IFilter } from "~/interfaces";

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
    return await axios
        .get(`${process.env.ENDPOINT_SERVER}/blogs/${slug}`)
        .then((res) => res.data);
};

const searchBlog = async (filter: IFilter | null) => {
    const parseQuery = qs.stringify(filter, { indices: false });
    return await AxiosGet(`/blogs/search`).then((res) => res.data);
};

export {
    getBlogs,
    getBlog,
    getBlogsStatic,
    getBlogStatic,
    searchBlog,
    BLOG_KEY
};
