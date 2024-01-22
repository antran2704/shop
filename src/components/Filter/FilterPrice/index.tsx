import { memo, Fragment } from "react";
import { IVariant } from "~/interfaces";
import FilterPriceItem from "./Item";
import FilterLayout from "../Layout";

interface Props {
  name: string;
  title: string;
  items: IVariant[];
}

const FilterPrice = (props: Props) => {
  const { name, title, items } = props;
  return (
    <FilterLayout title={title}>
      <Fragment>
        {items.map((item: IVariant) => (
          <FilterPriceItem key={item._id} data={item} name={name} />
        ))}
      </Fragment>
    </FilterLayout>
  );
};

export default memo(FilterPrice);