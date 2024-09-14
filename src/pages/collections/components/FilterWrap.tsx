import { Fragment, useEffect, useState } from "react";
import { IFilterItem } from "~/interfaces";
import { CollectionFilterItem } from ".";

interface Props {
   options: IFilterItem[];
   type?: "checkbox" | "radio" | "link";
   name?: string;
   classNames?: {
      label?: string;
      box?: string;
   };
   value?: string | string[];
   onChange?: (
      data: string | string[],
      options: IFilterItem | IFilterItem[],
   ) => void;
}

const FilterWrap = (props: Props) => {
   const {
      options,
      type = "checkbox",
      name,
      classNames,
      value,
      onChange,
   } = props;

   const [selected, setSelected] = useState<IFilterItem | IFilterItem[] | null>(
      type === "checkbox" ? [] : null,
   );

   const [selectedValue, setSelectedValue] = useState<string | string[]>(
      type === "checkbox" ? [] : "",
   );

   const onSelectRadio = (selectValue: string, option: IFilterItem) => {
      setSelected(option);
      setSelectedValue(selectValue);
      if (onChange) onChange(selectValue, option);
   };

   const onSelectCheckbox = (selectValue: string, option: IFilterItem) => {
      let newValue = [...(selected as IFilterItem[])];

      //   const isExited: boolean = newValue.some(
      //      (item: IFilterItem) => item.id === selectValue,
      //   );

      const isExited: boolean = (selectedValue as string[]).some(
         (item: string) => item === selectValue,
      );

      if (isExited) {
         newValue = newValue.filter((item) => item.value !== selectValue);
      } else {
         newValue.push(option);
      }

      const valueOfSelected: string[] = newValue.map(
         (item: IFilterItem) => item.value,
      );

      setSelected(newValue);
      setSelectedValue(valueOfSelected);

      if (onChange) onChange(valueOfSelected, newValue);
   };

   useEffect(() => {
      if (value === null || value === undefined) {
         setSelectedValue(type === "checkbox" ? [] : "");
         setSelected(type === "checkbox" ? [] : null);
      } else {
         setSelectedValue(value);
      }
   }, [value]);

   return (
      <Fragment>
         {options.map((option: IFilterItem) => (
            <CollectionFilterItem
               key={option.id}
               type={type}
               name={name}
               data={option}
               classNames={classNames}
               checked={
                  selectedValue === option.value ||
                  selectedValue?.includes(option.value)
               }
               onChange={(value: string) => {
                  if (type === "checkbox") {
                     onSelectCheckbox(value, option);
                  }

                  if (type === "radio") {
                     onSelectRadio(value, option);
                  }
               }}
            />
         ))}
      </Fragment>
   );
};

export default FilterWrap;
