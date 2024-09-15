import { v4 as uuidV4 } from "uuid";

import Collapse from "~/components/Collapse";
import {
   ICategory,
   ICategoryChild,
   IFilterItem,
   IProductSearch,
} from "~/interfaces";
import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";

import useGetAttributes from "~/hooks/useAttributes";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import { IAttribute, IAttributeChild } from "~/interfaces/attribute";
import FilterWrap from "./FilterWrap";

const filterPrice: IFilterItem[] = [
   { id: uuidV4(), label: "Dưới 500.000VND", value: "0.50000" },
   {
      id: uuidV4(),
      label: "500.000VND - 1.000.000VND",
      value: "500000.1000000",
   },
   {
      id: uuidV4(),
      label: "1.000.000VND - 1.500.000VND",
      value: "1000000.1500000",
   },
   {
      id: uuidV4(),
      label: "1.500.000VND - 2.000.000VND",
      value: "1500000.2000000",
   },
   {
      id: uuidV4(),
      label: "Trên 2.000.000VND",
      value: "2000000.1000000000",
   },
];

interface Props {
   category?: ICategory | null;
   paramater?: IProductSearch;
   handleFilter: (filter: any) => void;
   handleClearFilter: () => void;
}

const FilterCollection = (props: Props) => {
   const {
      category = null,
      paramater,
      handleFilter,
      handleClearFilter,
   } = props;

   const { attributes } = useGetAttributes({
      order: ORDER_PARAMATER_ENUM.ASC,
      page: 1,
      take: 16,
   });

   const [filter, setFilter] = useState<IProductSearch>(
      paramater ? paramater : ({} as IProductSearch),
   );

   const onFilter = (name: string, value: string | string[]) => {
      const itemSelects = { ...filter, [name]: value };
      setFilter(itemSelects);
   };

   const onFilterPrice = (value: string) => {
      const [minPrice, maxPrice] = value.split(".");
      const itemSelects = {
         ...filter,
         minPrice: +minPrice,
         maxPrice: +maxPrice,
      };
      setFilter(itemSelects);
   };

   const onSubmitFilter = () => {
      handleFilter(filter);
   };

   const onClearFilter = () => {
      setFilter({} as IProductSearch);
      handleClearFilter();
   };

   return (
      <div className="w-full relative z-40">
         <div className="scroll lg:h-fit h-[80vh] overflow-y-auto">
            {/* Sub category */}
            {category && !!category.children.length && (
               <Collapse
                  maxHeight={100}
                  title={"Danh mục con"}
                  className="w-full">
                  {category.children.map((child: ICategoryChild) => (
                     <Link
                        key={child._id}
                        href={
                           child.slug
                              ? `/collections/${child.slug}.${child._id}`
                              : "/"
                        }
                        className={clsx(
                           "block w-full text-sm hover:text-primary capitalize cursor-pointer",
                        )}>
                        {child.title}
                     </Link>
                  ))}
               </Collapse>
            )}

            {attributes.map(
               (attribute: IAttribute) =>
                  attribute.children.length > 0 && (
                     <Collapse
                        key={attribute._id}
                        maxHeight={100}
                        title={attribute.name}
                        className="w-full">
                        <FilterWrap
                           key={attribute._id}
                           type="checkbox"
                           name={attribute.code}
                           options={attribute.children.map(
                              (child: IAttributeChild) => ({
                                 id: child._id,
                                 label: child.name,
                                 value: child.name,
                              }),
                           )}
                           value={
                              filter[attribute.code]
                                 ? (filter[attribute.code] as string[])
                                 : []
                           }
                           onChange={(value) => onFilter(attribute.code, value)}
                        />
                     </Collapse>
                  ),
            )}

            <Collapse title={"Giá bán"}>
               <div className="flex flex-col mt-5 gap-5">
                  <FilterWrap
                     type="radio"
                     name={"price"}
                     options={filterPrice}
                     value={`${filter["minPrice"]}.${filter["maxPrice"]}`}
                     onChange={(value) => onFilterPrice(value as string)}
                  />
               </div>
            </Collapse>
         </div>

         <div className="sticky flex flex-col bg-white/50 backdrop-blur-sm bottom-0 py-2 gap-4">
            <button
               onClick={onSubmitFilter}
               type="submit"
               className="w-full flex items-center justify-center bg-primary text-white text-base capitalize font-medium px-5 py-2 rounded-md">
               Lọc
            </button>
            <button
               onClick={onClearFilter}
               type="button"
               className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-white text-base capitalize font-medium px-5 py-2 transition-all ease-linear duration-75 rounded-md">
               Hủy bộ lọc
            </button>
         </div>
      </div>
   );
};

export default FilterCollection;
