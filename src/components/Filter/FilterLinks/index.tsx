import { Fragment, memo } from "react";
import FilterLayout from "../Layout";
import Link from "next/link";
import { IDataCategory } from "~/interfaces";

interface Props {
  name: string;
  items: Partial<IDataCategory>[];
  path: string;
}

const FilterLinks = (props: Props) => {
  const { name, items, path } = props;

  return (
    <FilterLayout name={name}>
      <Fragment>
        {items.map((item: Partial<IDataCategory>) => (
          <li key={item._id}>
            <Link
              href={`${path}/${item.slug}.${item._id}`}
              className="block w-full text-sm hover:text-primary capitalize"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </Fragment>
    </FilterLayout>
  );
};

export default memo(FilterLinks);
