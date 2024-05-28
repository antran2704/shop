import { useRouter } from "next/router";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { getBlogs } from "~/api-client";
import BlogItem from "~/components/Blog/BlogItem";
import LoadingBlog from "~/components/Blog/BlogLoading";
import { initPagination } from "~/data";
import { IPagination } from "~/interfaces";
import { IHomeBlog } from "~/interfaces/blog";
import BlogLayout from "~/layouts/BlogLayout";
import DefaultLayout from "~/layouts/DefaultLayout";

const TagBlogsPage = () => {
    const router = useRouter();

    const { page } = router.query;
    const [currentPage, setCurrentPage] = useState<number>(
        page ? Number(page) : 1
    );

    const [blogs, setBlogs] = useState<IHomeBlog[]>([]);
    const [pagination, setPagination] = useState<IPagination>(initPagination);

    const [loading, setLoading] = useState<boolean>(true);

    const handleGetBlogs = async (page: number = 1) => {
        setLoading(true);

        try {
            const data = await getBlogs(page);

            if (data.status === 200) {
                setBlogs(data.payload);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    const onPagination = (page: number) => {
        router.replace({
            query: { ...router.query, page }
        });
        setCurrentPage(page);
    };

    useEffect(() => {
        handleGetBlogs(currentPage);
    }, [currentPage]);

    return (
        <BlogLayout
            title="Blog"
            pagination={pagination}
            onPagination={onPagination}>
            <Fragment>
                {!loading &&
                    blogs.map((blog: IHomeBlog) => (
                        <BlogItem key={blog._id} data={blog} />
                    ))}

                {loading &&
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
