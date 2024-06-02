import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "rc-pagination";
import { useEffect, useState } from "react";
import { getTagBlogs } from "~/api-client/tagBlog";
import { useBlogsTag } from "~/hooks/useBlog";
import { IPagination } from "~/interfaces";
import { ITagBlog } from "~/interfaces/tagBlog";

interface Props {
    children: JSX.Element;
    pagination: IPagination;
    title: string;
    message?: string | null;
    onPagination: (page: number) => void;
    onChangeTag: (tagId: string) => void;
}

const PATH_ALL: string = "/blogs";

const BlogLayout = (props: Props) => {
    const {
        children,
        pagination,
        title,
        message = null,
        onPagination,
        onChangeTag
    } = props;
    const router = useRouter();
    const tagSlug: string = router.query.slug as string;

    const { tags } = useBlogsTag(1);

    return (
        <section className="container__cus py-5">
            <h1 className="lg:text-2xl md:text-xl text-lg font-semibold">
                {title}
            </h1>

            <div className="flex items-start lg:flex-row flex-col-reverse justify-between py-5 gap-5">
                <div className="lg:w-8/12 w-full">
                    {message && (
                        <h3 className="w-full lg:text-2xl md:text-xl text-lg font-medium text-center py-10">
                            {message}
                        </h3>
                    )}
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-5">
                        {children}
                    </div>
                </div>

                <div className="lg:w-3/12 w-full">
                    <p className="text-base font-semibold">
                        CHỦ ĐỀ NỔI BẬT KHÁC
                    </p>

                    <ul className="flex items-center flex-wrap py-2 gap-2">
                        <li>
                            <Link
                                href={"/blogs"}
                                className={clsx(
                                    "flex items-center justify-center text-base px-5 py-1 hover:bg-primary hover:text-white border rounded-lg cursor-pointer transition-all ease-linear duration-100",
                                    [
                                        router.pathname === PATH_ALL &&
                                            "bg-primary text-white"
                                    ]
                                )}>
                                All
                            </Link>
                        </li>
                        {tags.map((tag: ITagBlog) => (
                            <li
                                onClick={() => onChangeTag(tag._id)}
                                key={tag._id}
                                className={clsx(
                                    "flex items-center justify-center text-base px-5 py-1 hover:bg-primary hover:text-white border rounded-lg cursor-pointer transition-all ease-linear duration-100",
                                    [
                                        tagSlug === tag._id &&
                                            "bg-primary text-white"
                                    ]
                                )}>
                                {tag.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {pagination.totalItems > 0 && (
                <Pagination
                    current={pagination.currentPage}
                    className="pagination"
                    onChange={onPagination}
                    total={pagination.totalItems}
                    pageSize={pagination.pageSize}
                />
            )}
        </section>
    );
};

export default BlogLayout;
