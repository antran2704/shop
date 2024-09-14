import { v4 as uuidV4 } from "uuid";

import FilterLayout from "~/components/Filter/Layout";
import ShowMore from "~/components/ShowMore";
import { IFilterItem } from "~/interfaces";
import { Fragment, useState } from "react";
import useGetAttributes from "~/hooks/useAttributes";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import { IAttribute, IAttributeChild } from "~/interfaces/attribute";
import FilterWrap from "./FilterWrap";
import { parseQueryString } from "~/helpers/url";
import { useRouter } from "next/router";

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
   onSubmit: (filter: any) => void;
}

const FilterCollection = (props: Props) => {
   const { onSubmit } = props;

   const router = useRouter();

   const { attributes } = useGetAttributes({
      order: ORDER_PARAMATER_ENUM.ASC,
      page: 1,
      take: 16,
   });

   const [filter, setFilter] = useState<{ [x: string]: string | string[] }>({});

   const onFilter = (name: string, value: string | string[]) => {
      const itemSelects = { ...filter, [name]: value };
      setFilter(itemSelects);
   };

   const onFilterPrice = (value: string) => {
      const [minPrice, maxPrice] = value.split(".");
      const itemSelects = { ...filter, minPrice, maxPrice };
      setFilter(itemSelects);
   };

   const onSubmitFilter = () => {
      router.replace({ query: { id: router.query.id, ...filter } });
      onSubmit(filter);
   };

   const onClearFilter = () => {
      setFilter({});
      onSubmit({});
      router.replace({ query: { id: router.query.id } });
   };

   return (
      <Fragment>
         {attributes.map(
            (attribute: IAttribute) =>
               attribute.children.length > 0 && (
                  <FilterLayout key={attribute._id} title={attribute.name}>
                     <ShowMore maxHeight={100} className="w-full">
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
                           value={filter[attribute.code]}
                           onChange={(value) => onFilter(attribute.code, value)}
                        />
                     </ShowMore>
                  </FilterLayout>
               ),
         )}

         <FilterLayout title={"Giá bán"}>
            <div className="flex flex-col mt-5 gap-5">
               <FilterWrap
                  type="radio"
                  name={"price"}
                  options={filterPrice}
                  value={`${filter["minPrice"]}.${filter["maxPrice"]}`}
                  onChange={(value) => onFilterPrice(value as string)}
               />
            </div>
         </FilterLayout>

         <div className="sticky flex flex-col bg-white/50 backdrop-blur-sm bottom-0 py-2 gap-4">
            <button
               onClick={onSubmitFilter}
               type="submit"
               className="w-full flex items-center justify-center bg-primary text-white text-base capitalize font-medium px-5 py-2 rounded-md">
               Filter Now
            </button>
            <button
               //    onClick={() => router.replace({ query: { id } })}
               onClick={onClearFilter}
               type="button"
               className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-white text-base capitalize font-medium px-5 py-2 transition-all ease-linear duration-75 rounded-md">
               Clear Filter
            </button>
         </div>
      </Fragment>
   );
};

export default FilterCollection;
