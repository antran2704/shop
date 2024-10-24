import clsx from "clsx";
import Link from "next/link";
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
   onChange?: (data: IFilterItem, name?: string) => void;
}

const FilterItem = (props: Props) => {
   const {
      data,
      type = "checkbox",
      name,
      checked,
      classNames,
      onChange,
   } = props;

   const onSelect = (data: IFilterItem, name?: string) => {
      if (onChange) onChange(data, name);
   };

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
                  onChange={() => onSelect(data, name)}
                  id={data.id}
                  name={name}
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
                  onChange={() => onSelect(data, name)}
                  id={data.id}
                  name={name}
                  checked={checked}
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
