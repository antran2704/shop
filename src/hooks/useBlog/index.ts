import useSWR, { SWRConfiguration } from "swr";
import { BLOG_KEY, getBlogs, searchBlog } from "~/api-client";
import { TAG_BLOG_KEY, getTagBlogs } from "~/api-client/tagBlog";
import { initPagination } from "~/data";
import { IFilterBlog, IHomeBlog, ITagBlog } from "~/interfaces";

// refesh 30 minute
const REFESH_TIME = 1000 * 60 * 30;

const fetcherTagBlogs = async (page: number) => {
   try {
      const res = await getTagBlogs(page);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const fetcherBlogs = async (page: number) => {
   try {
      const res = await getBlogs(page);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const fetcherBlogsWithTag = async (params: IFilterBlog) => {
   try {
      const res = await searchBlog(params);
      if (res.status === 200) {
         return res;
      }
   } catch (error) {
      console.log(error);
   }
};

const useBlogs = (page: number = 1, options?: Partial<SWRConfiguration>) => {
   const { data, isLoading, mutate, error } = useSWR(
      [BLOG_KEY.ALL_BLOG, page],
      () => fetcherBlogs(page),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      blogs: data.payload as IHomeBlog[],
      pagination: data.pagination,
      loadingBlogs: isLoading,
      error,
      mutate,
   };
};

const useBlogsWithTag = (
   params: IFilterBlog,
   options?: Partial<SWRConfiguration>,
) => {
   const { data, isLoading, mutate, error } = useSWR(
      [BLOG_KEY.TAG_BLOG, params],
      () => fetcherBlogsWithTag(params),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      blogs: data.payload as IHomeBlog[],
      pagination: data.pagination,
      loadingBlogs: isLoading,
      error,
      mutate,
   };
};

const useBlogsTag = (page: number = 1, options?: Partial<SWRConfiguration>) => {
   const { data, isLoading, mutate, error } = useSWR(
      [TAG_BLOG_KEY.TAG_ALL, page],
      () => fetcherTagBlogs(page),
      {
         ...options,
         revalidateOnFocus: false,
         dedupingInterval: REFESH_TIME,
         fallbackData: { payload: [], pagination: initPagination },
      },
   );

   return {
      tags: data.payload as ITagBlog[],
      pagination: data.pagination,
      loadingTags: isLoading,
      error,
      mutate,
   };
};

export { useBlogs, useBlogsWithTag, useBlogsTag };
