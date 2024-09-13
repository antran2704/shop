import { v4 as uuidV4 } from "uuid";

import FilterLayout from "~/components/Filter/Layout";
import ShowMore from "~/components/ShowMore";
import { IFilterItem } from "~/interfaces";
import { CollectionFilterItem } from ".";
import { Fragment } from "react";
import useGetAttributes from "~/hooks/useAttributes";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import { IAttribute, IAttributeChild } from "~/interfaces/attribute";

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

const FilterCollection = () => {
   const { attributes } = useGetAttributes({
      order: ORDER_PARAMATER_ENUM.ASC,
      page: 1,
      take: 16,
   });

   return (
      <Fragment>
         {attributes.map(
            (attribute: IAttribute) =>
               attribute.children.length > 0 && (
                  <FilterLayout key={attribute._id} title={attribute.name}>
                     <ShowMore maxHeight={100} className="w-full">
                        {attribute.children.map((child: IAttributeChild) => (
                           <CollectionFilterItem
                              key={child._id}
                              type="checkbox"
                              name={attribute.code}
                              data={{
                                 id: child._id,
                                 label: child.name,
                                 value: child.name,
                              }}
                           />
                        ))}
                     </ShowMore>
                  </FilterLayout>
               ),
         )}

         <FilterLayout title={"Giá bán"}>
            <div className="flex flex-col mt-5 gap-5">
               {filterPrice.map((item) => (
                  <CollectionFilterItem
                     key={item.id}
                     type="radio"
                     name="price"
                     data={item}
                  />
               ))}
            </div>
         </FilterLayout>

         <div className="sticky flex flex-col bg-white/50 backdrop-blur-sm bottom-0 py-2 gap-4">
            <button
               type="submit"
               className="w-full flex items-center justify-center bg-primary text-white text-base capitalize font-medium px-5 py-2 rounded-md">
               Filter Now
            </button>
            <button
               //    onClick={() => router.replace({ query: { id } })}
               type="button"
               className="w-full flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-white text-base capitalize font-medium px-5 py-2 transition-all ease-linear duration-75 rounded-md">
               Clear Filter
            </button>
         </div>
      </Fragment>
   );
};

export default FilterCollection;
