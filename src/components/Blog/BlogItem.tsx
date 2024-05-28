import Link from "next/link";
import { IHomeBlog } from "~/interfaces/blog";

interface Props {
    data: IHomeBlog;
}

const BlogItem = (props: Props) => {
    const { data } = props;

    return (
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg lg:hover:shadow-lg lg:hover:-translate-y-1 transition-all ease-linear duration-75 overflow-hidden">
            <Link href={`/blogs/${data.slug}`} className="block">
                <div className="relative pb-[100%]">
                    <img
                        className="absolute top-0 right-0 left-0 bottom-0 h-full w-full object-cover object-center"
                        src={
                            process.env.NEXT_PUBLIC_IMAGE_ENDPOINT +
                            data.thumbnail
                        }
                        alt={data.meta_title}
                        title={data.meta_title}
                        width="auto"
                        height="auto"
                    />
                </div>

                <div className="py-4 px-6">
                    <h1 className="title-font md:text-lg text-base font-medium text-gray-900 mb-3 line-clamp-2">
                        {data.title}
                    </h1>
                    <p className="w-full min-h-[76px] text-base mb-3 line-clamp-3">
                        {data.description}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default BlogItem;
