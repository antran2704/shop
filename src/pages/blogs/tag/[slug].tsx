import { useRouter } from "next/router";
import { Fragment, ReactElement, useState } from "react";
import BlogItem from "~/components/Blog/BlogItem";
import LoadingBlog from "~/components/Blog/BlogLoading";
import { useBlogsWithTag } from "~/hooks/useBlog";
import { IFilterBlog, IHomeBlog } from "~/interfaces";
import BlogLayout from "~/layouts/BlogLayout";
import DefaultLayout from "~/layouts/DefaultLayout";

const TagBlogsPage = () => {
   const router = useRouter();
   const slug: string = router.query.slug as string;

   const { page, search } = router.query;
   const pageParam: number = page ? Number(page) : 1;
   const searchParam: string | null = search ? (search as string) : null;

   const [params, setParams] = useState<IFilterBlog>({
      search: searchParam,
      tag: slug,
      page: pageParam,
      limit: 16,
   });

   const { blogs, pagination, loadingBlogs } = useBlogsWithTag(params);

   const onChangeTag = (slug: string) => {
      setParams({ ...params, page: 1, tag: slug, search: null });
      router.push(`/blogs/tag/${slug}`);
   };

   const onPagination = (page: number) => {
      router.replace({
         query: { ...router.query, page },
      });

      setParams({ ...params, page });
   };

   return (
      <BlogLayout
         title="Blog"
         pagination={pagination}
         onPagination={onPagination}
         onChangeTag={onChangeTag}
         message={
            !loadingBlogs && !blogs.length
               ? " Không tìm thấy bài viết nào"
               : null
         }>
         <Fragment>
            {!loadingBlogs &&
               !!blogs.length &&
               blogs.map((blog: IHomeBlog) => (
                  <BlogItem key={blog._id} data={blog} />
               ))}

            {loadingBlogs &&
               [...new Array(3)].map((_, index: number) => (
                  <LoadingBlog key={index} />
               ))}
         </Fragment>
      </BlogLayout>
   );
};

export default TagBlogsPage;

TagBlogsPage.getLayout = function getLayout(page: ReactElement) {
   return <DefaultLayout>{page}</DefaultLayout>;
};
