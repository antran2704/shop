import clsx from "clsx";
import { memo } from "react";
import { IFilterItem } from "~/interfaces";

interface Props {
   data: IFilterItem;
   name?: string;
   checked?: boolean;
   classNames?: {
      label?: string;
      box?: string;
   };
   onChange?: (data: string) => void;
}

const Checkbox = (props: Props) => {
   const { data, name, checked, classNames, onChange } = props;

   return (
      <div className="flex w-full items-center gap-2">
         <input
            type="checkbox"
            onChange={() => onChange && onChange(data.value)}
            id={data.id}
            name={name}
            value={data.value}
            checked={checked}
            className={clsx("min-w-5 w-5 h-5 rounded-md", [classNames?.box])}
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

export default memo(Checkbox);
