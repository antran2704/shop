import Link from "next/link";
import { IHomeBlog } from "~/interfaces/blog";

interface Props {
    data: IHomeBlog;
}

const BlogItem = (props: Props) => {
    const { data } = props;

    return (
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
            <Link href={`/blogs/${data.slug}`} className="block relative pb-[100%]">
                <img
                    className="absolute top-0 right-0 left-0 bottom-0 h-full w-full object-cover object-center"
                    src={process.env.NEXT_PUBLIC_IMAGE_ENDPOINT + data.thumbnail}
                    alt={data.meta_title}
                    title={data.meta_title}
                    width="auto"
                    height="auto"
                />
            </Link>
            <div className="py-4 px-6">
                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {data.title}
                </h1>
                <p className="w-full min-h-[76px] text-base mb-3 line-clamp-3">
                    {data.description}
                </p>
            </div>
        </div>
    );
};

export default BlogItem;
