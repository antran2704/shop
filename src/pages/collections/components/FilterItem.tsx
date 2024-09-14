import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IFilterItem } from "~/interfaces";

interface Props {
   data: IFilterItem;
   type?: "checkbox" | "radio" | "link";
   name?: string;
   checked?: boolean;
   classNames?: {
      label?: string;
      box?: string;
   };
   value?: string | string[];
   onChange?: (data: string) => void;
}

const FilterItem = (props: Props) => {
   const {
      data,
      type = "checkbox",
      name,
      checked,
      classNames,
      value,
      onChange,
   } = props;

   // const [select, setSelect] = useState<string | string[]>(
   //    type === "checkbox" ? [] : "",
   // );

   // const onSelectRadio = (selectValue: string) => {
   //    setSelect(selectValue);
   //    if (onChange) onChange(selectValue);
   // };

   // const onSelectCheckbox = (selectValue: string) => {
   //    let newValue = [...(select as string[])];

   //    if (newValue && newValue.includes(selectValue)) {
   //       newValue = newValue.filter((item) => item !== selectValue);
   //    } else {
   //       newValue = [selectValue];
   //    }

   //    setSelect(newValue);

   //    if (onChange) onChange(newValue);
   // };

   // useEffect(() => {
   //    if (value) {
   //       setSelect(value);
   //    }
   // }, [value]);

   return (
      <div className="w-full">
         {type === "link" && (
            <Link
               href={data.path ? data.path : "/"}
               className={clsx(
                  "block w-full text-sm hover:text-primary capitalize cursor-pointer",
                  [classNames?.label],
               )}>
               {data.label}
            </Link>
         )}

         {type === "checkbox" && (
            <div className="flex items-center gap-2">
               <input
                  type="checkbox"
                  onChange={() => onChange && onChange(data.value)}
                  id={data.id}
                  name={name}
                  value={data.value}
                  checked={checked}
                  className={clsx("min-w-5 w-5 h-5 rounded-md", [
                     classNames?.box,
                  ])}
               />
               <label
                  htmlFor={data.id}
                  className={clsx(
                     "flex items-center w-full text-sm hover:text-primary capitalize cursor-pointer",
                     [classNames?.label],
                  )}>
                  {data.label}
               </label>
            </div>
         )}

         {type === "radio" && (
            <div className="flex items-center gap-2">
               <input
                  type="radio"
                  onChange={() => onChange && onChange(data.value)}
                  id={data.id}
                  name={name}
                  checked={checked}
                  value={data.value}
                  className={clsx("min-w-3 w-3 h-3 rounded-md", [
                     classNames?.box,
                  ])}
               />
               <label
                  htmlFor={data.id}
                  className={clsx(
                     "flex items-center w-full text-sm hover:text-primary capitalize cursor-pointer",
                     [classNames?.label],
                  )}>
                  {data.label}
               </label>
            </div>
         )}
      </div>
   );
};

export default FilterItem;
