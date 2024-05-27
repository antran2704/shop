import { useRouter } from "next/router";
import Pagination from "rc-pagination";
import { ReactElement, useEffect, useState } from "react";
import { getBlogs } from "~/api-client";
import BlogItem from "~/components/Blog/BlogItem";
import { initPagination } from "~/data";
import { IPagination } from "~/interfaces";
import { IHomeBlog } from "~/interfaces/blog";
import DefaultLayout from "~/layouts/DefaultLayout";

const BlogsPage = () => {
    const router = useRouter();
    const { page } = router.query;
    const [currentPage, setCurrentPage] = useState<number>(
        page ? Number(page) : 1
    );

    const [blogs, setBlogs] = useState<IHomeBlog[]>([]);
    const [pagination, setPagination] = useState<IPagination>(initPagination);

    const handleGetBlogs = async (page: number = 1) => {
        try {
            const data = await getBlogs(page);

            if (data.status === 200) {
                setBlogs(data.payload);
                setPagination(data.pagination);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetBlogs(currentPage);
    }, [currentPage]);

    return (
        <section className="container__cus py-5">
            <h1 className="lg:text-2xl md:text-xl text-lg font-semibold">
                Blog
            </h1>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 py-5 gap-5">
                {blogs.map((blog: IHomeBlog) => (
                    <BlogItem key={blog._id} data={blog} />
                ))}
            </div>

            {pagination.totalItems > pagination.pageSize && (
                <Pagination
                    current={pagination.currentPage}
                    className="pagination"
                    onChange={(page) => {
                        router.replace({
                            query: { ...router.query, page }
                        });
                        setCurrentPage(page);
                    }}
                    total={pagination.totalItems}
                    pageSize={pagination.pageSize}
                />
            )}
        </section>
    );
};

export default BlogsPage;

BlogsPage.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};
