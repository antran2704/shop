import { GetStaticProps } from "next";
import { ReactElement, useEffect, useState } from "react";
import { getBlogStatic, getBlogsStatic, otherBlogs } from "~/api-client";
import { IBlog, TagBlog } from "~/interfaces/blog";
import DefaultLayout from "~/layouts/DefaultLayout";
import "react-quill/dist/quill.snow.css";

// hight light color for text editor
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { useRouter } from "next/router";
import { PrimaryLoading } from "~/components/Loading";
import { getDateTime } from "~/helpers/datetime";
import Link from "next/link";
import clsx from "clsx";
import OtherBlog from "~/components/Blog/OtherBlog";
import { NextPageWithLayout } from "~/interfaces";

interface Props {
    blog: IBlog;
}

const REFRESH_TIME = 60; //Refresh in 1 day

hljs.configure({
    languages: ["javascript", "html", "css"],
    ignoreUnescapedHTML: true,
    throwUnescapedHTML: true
});

const BlogDetail: NextPageWithLayout<Props> = (props: Props) => {
    const { blog } = props;
    const router = useRouter();

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleGetOtherBlogs = async (blogId: string) => {
        if (!blogId) return;

        setLoading(true);

        try {
            const data = await otherBlogs(blogId);

            if (data.status === 200) {
                setBlogs(data.payload);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetOtherBlogs(blog._id);
    }, []);

    if (router.isFallback && !blog) {
        return <PrimaryLoading />;
    }

    return (
        <div className="container__cus  py-10">
            <div className="bg-white p-5 max-w-[800px] mx-auto rounded-md">
                <h1 className="lg:text-3xl md:text-2xl text-xl font-semibold">
                    {blog.title}
                </h1>

                <div className="py-5">
                    <div className="flex items-center gap-2">
                        <img
                            src="https://images.unsplash.com/photo-1716847214513-dfac4f00635b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="avartar"
                            title="avartar"
                            loading="lazy"
                            width="auto"
                            height="auto"
                            className="w-16 h-16 object-cover object-center rounded-full overflow-hidden"
                        />

                        <div>
                            <h3 className="md:text-lg text-base">
                                {blog.author?.name}
                            </h3>
                            <p className="md:text-base text-sm">
                                {getDateTime(blog.updatedAt as string)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="quill ql-snow">
                    <div
                        className="ql-editor"
                        dangerouslySetInnerHTML={{
                            __html: blog.content
                        }}
                    />
                </div>

                {!!blog.tags.length && (
                    <div className="py-5">
                        <h4 className="md:text-lg text-base font-semibold">
                            #Tag
                        </h4>
                        <ul className="flex items-center flex-wrap py-2 gap-2">
                            {blog.tags.map((item: TagBlog) => (
                                <li key={item.tag._id}>
                                    <Link
                                        href={`/blogs/tag/${item.tag.slug}`}
                                        className={clsx(
                                            "flex items-center justify-center text-base px-5 py-1 hover:bg-primary hover:text-white border rounded-lg cursor-pointer transition-all ease-linear duration-100"
                                        )}>
                                        {item.tag.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="py-5">
                <OtherBlog
                    title="Bài viết nổi bật khác"
                    isLoading={loading}
                    items={blogs}
                />
            </div>
        </div>
    );
};

export default BlogDetail;

BlogDetail.getLayout = function getLayout(page: ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug: string = params?.slug as string;

    try {
        const res = await getBlogStatic(slug);
        const blog: IBlog = res.payload;

        return {
            props: { blog },
            revalidate: REFRESH_TIME
        };
    } catch (error: any) {
        return {
            props: { blog: null },
            revalidate: REFRESH_TIME,
            notFound: true
        };
    }
};

export async function getStaticPaths() {
    const res = await getBlogsStatic(1);
    const blogs = await res.payload;

    const paths = blogs.map((blog: IBlog) => ({
        params: { slug: blog.slug }
    }));

    return { paths, fallback: true };
}
