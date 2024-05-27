import { GetStaticProps } from "next";
import { ReactElement } from "react";
import { getBlog, getBlogStatic, getBlogsStatic } from "~/api-client";
import { IBlog } from "~/interfaces/blog";
import DefaultLayout from "~/layouts/DefaultLayout";
import "react-quill/dist/quill.snow.css";

// hight light color for text editor
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";
import { useRouter } from "next/router";
import { PrimaryLoading } from "~/components/Loading";

interface Props {
    blog: IBlog;
}

const REFRESH_TIME = 60; //Refresh in 1 day

hljs.configure({
    languages: ["javascript", "html", "css"],
    ignoreUnescapedHTML: true,
    throwUnescapedHTML: true
});
// hljs.registerLanguage("javascript ", javascript);

const BlogDetail = (props: Props) => {
    const { blog } = props;
    const router = useRouter();

    if (router.isFallback && !blog) {
        return <PrimaryLoading />;
    }

    return (
        <div className="container__cus py-10">
            <h1>detail blog</h1>
            <div className="quill ql-snow">
                <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{
                        __html: blog.content
                    }}
                />
            </div>
            {/* <CustomEditor content={blog.content} /> */}
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
