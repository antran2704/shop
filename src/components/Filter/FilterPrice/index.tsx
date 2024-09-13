import { memo, Fragment } from "react";
import { IVariant } from "~/interfaces";
import FilterPriceItem from "./Item";
import FilterLayout from "../Layout";
import ShowMore from "~/components/ShowMore";

interface Props {
   name: string;
   title: string;
   items: IVariant[];
}

const FilterPrice = (props: Props) => {
   const { name, title, items } = props;
   return (
      <FilterLayout title={title}>
         <ShowMore maxHeight={100} className="w-full">
            <Fragment>
               {items.map((item: IVariant) => (
                  <FilterPriceItem key={item._id} data={item} name={name} />
               ))}
            </Fragment>
         </ShowMore>
      </FilterLayout>
   );
};

export default memo(FilterPrice);
