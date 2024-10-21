import Link from "next/link";

import { ICategory } from "~/interfaces/category";
import ImageCus from "../Image";
import { memo } from "react";

interface Props {
   data: ICategory;
}

const CategoryItem = (props: Props) => {
   const { data } = props;

   return (
      <Link
         href={`/collections/${data.slug}.${data._id}`}
         className="flex flex-col items-center justify-center text-[#1e1e1e] hover:text-primary">
         <div className="relative w-full pb-[100%]">
            <ImageCus
               src={data.thumbnail as string}
               alt="image category"
               title="image category"
               className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover object-center rounded-full"
            />
         </div>

         <p className="block w-full text-sm font-medium text-center mt-3">
            {data.title}
         </p>
      </Link>
   );
};

export default memo(CategoryItem);
