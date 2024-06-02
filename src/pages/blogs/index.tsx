import { useRouter } from "next/router";
import { Fragment, ReactElement } from "react";
import BlogItem from "~/components/Blog/BlogItem";
import LoadingBlog from "~/components/Blog/BlogLoading";
import { useBlogs } from "~/hooks/useBlog";
import { IHomeBlog } from "~/interfaces/blog";
import BlogLayout from "~/layouts/BlogLayout";
import DefaultLayout from "~/layouts/DefaultLayout";

const BlogsPage = () => {
    const router = useRouter();
    const pageParam: number = router.query.page ? Number(router.query.page) : 1;

    const { blogs, pagination, loadingBlogs } = useBlogs(pageParam);

    const onChangeTag = (tagId: string) => {
        router.push(`/blogs/tag/${tagId}`);
    };

    const onPagination = (page: number) => {
        router.replace({
            query: { ...router.query, page }
        });
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

export default BlogsPage;

BlogsPage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
