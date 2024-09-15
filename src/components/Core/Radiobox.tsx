import clsx from "clsx";
import { memo } from "react";
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
   onChange?: (data: string) => void;
}

const Radiobox = (props: Props) => {
   const { data, name, checked, classNames, onChange } = props;

   return (
      <div className="w-full flex items-center gap-2">
         <input
            type="radio"
            onChange={() => onChange && onChange(data.value)}
            id={data.id}
            name={name}
            checked={checked}
            value={data.value}
            className={clsx("min-w-3 w-3 h-3 rounded-md", [classNames?.box])}
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
   );
};

export default memo(Radiobox);
