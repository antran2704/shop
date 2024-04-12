import Link from "next/link";

import { IDataCategory } from "~/interfaces";
import ImageCus from "../Image";
import { memo } from "react";

interface Props {
  data: IDataCategory;
}

const CategoryItem = (props: Props) => {
  const { data } = props;

  return (
    <Link
      href={`/collections/${data.slug}.${data._id}`}
      className="flex flex-col items-center justify-center text-[#1e1e1e] hover:text-primary"
    >
      <ImageCus
        src={
          ((process.env.NEXT_PUBLIC_IMAGE_ENDPOINT as string) +
            data.thumbnail) as string
        }
        alt="image category"
        title="image category"
        className="w-20 h-20 rounded-full"
      />

      <p className="block w-full text-sm font-medium text-center mt-3">
        {data.title}
      </p>
    </Link>
  );
};

export default memo(CategoryItem);
