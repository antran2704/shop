import { memo, Fragment } from "react";
import { IVariant } from "~/interfaces";
import FilterCheckBoxItem from "./Item";
import FilterLayout from "../Layout";

interface Props {
  name: string;
  title: string;
  items: IVariant[];
}

const FilterCheckBox = (props: Props) => {
  const { name, title, items } = props;
  return (
    <FilterLayout title={title}>
      <Fragment>
        {items.map((item: IVariant) => (
          <FilterCheckBoxItem key={item._id} data={item} name={name} />
        ))}
      </Fragment>
    </FilterLayout>
  );
};

export default memo(FilterCheckBox);
