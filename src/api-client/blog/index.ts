import axios from "axios";
import qs from "qs";
import httpConfig from "~/configs/axiosConfig";

import { IFilterBlog } from "~/interfaces/blog";

const BLOG_KEY = {
   ALL_BLOG: "all_blog",
   TAG_BLOG: "tag_blog",
   OTHER_BLOG: "other_blog",
};

const getBlogs = async (page: number = 1) => {
   return await httpConfig.get(`/blogs?page=${page}`).then((res) => res.data);
};

const getBlogsStatic = async (page: number = 1) => {
   return await axios
      .get(`${process.env.ENDPOINT_SERVER}/blogs?page=${page}`)
      .then((res) => res.data);
};

const getBlog = async (slug: string) => {
   return await httpConfig.get(`/blogs/${slug}`).then((res) => res.data);
};

const getBlogStatic = async (slug: string) => {
   return await axios
      .get(`${process.env.ENDPOINT_SERVER}/blogs/${slug}`)
      .then((res) => res.data);
};

const searchBlog = async (filter: IFilterBlog) => {
   const parseQuery = qs.stringify(filter, {
      filter: (prefix, value) => value || undefined,
   });
   return await httpConfig
      .get(`/blogs/search${parseQuery && "?" + parseQuery}`)
      .then((res) => res.data);
};

const otherBlogs = async (blogId: string) => {
   return await httpConfig
      .get(`/blogs/other/${blogId}`)
      .then((res) => res.data);
};

export {
   getBlogs,
   getBlog,
   getBlogsStatic,
   getBlogStatic,
   searchBlog,
   otherBlogs,
   BLOG_KEY,
};
