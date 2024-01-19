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
      href={`/collections/${data._id}`}
      className="flex flex-col items-center justify-center text-[#1e1e1e] hover:text-primary"
    >
      <ImageCus
        src={data.thumbnail || ""}
        alt="image category"
        title="image category"
        className="w-full h-[160px] rounded-md"
      />

      <p className="block w-full text-sm font-medium text-center mt-3">
        {data.title}
      </p>
    </Link>
  );
};

export default memo(CategoryItem);
