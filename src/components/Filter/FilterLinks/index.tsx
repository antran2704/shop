import { Fragment, memo } from "react";
import FilterLayout from "../Layout";
import Link from "next/link";
import { IDataCategory } from "~/interfaces";
import ShowMore from "~/components/ShowMore";

interface Props {
    title: string;
    items: Partial<IDataCategory>[];
    path: string;
}

const FilterLinks = (props: Props) => {
    const { title, items, path } = props;

    return (
        <FilterLayout title={title}>
            <ShowMore maxHeight={120} className="w-full">
                <Fragment>
                    {items.map((item: Partial<IDataCategory>) => (
                        <li key={item._id} className="w-full">
                            <Link
                                href={`${path}/${item.slug}.${item._id}`}
                                className="block w-full text-sm hover:text-primary capitalize">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </Fragment>
            </ShowMore>
        </FilterLayout>
    );
};

export default memo(FilterLinks);
