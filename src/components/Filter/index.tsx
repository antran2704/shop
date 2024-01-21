import { useState, useRef, useEffect, memo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IVariant } from "~/interfaces";
import FilterItem from "./Item";

interface Props {
  name: string;
  listFilterItem: IVariant[];
  isShow: boolean;
}

const Filter = (props: Props) => {
  const { name, isShow, listFilterItem } = props;

  const listFilterRef = useRef<HTMLUListElement>(null);
  const [show, setShow] = useState<boolean>(isShow);
  
  const handleShowFilter = (): void => {
    const element = listFilterRef.current;
    if (element) {
      const height = element.scrollHeight;
      if (show) {
        element.style.height = "0px";
        setShow(false);
      } else {
        element.style.height = height + "px";
        setShow(true);
      }
    }
  };

  useEffect(() => {
    const element = listFilterRef.current;
    if (element) {
      if (!isShow) {
        element.style.height = 0 + "px";
      } else {
        const height = element.scrollHeight;
        element.style.height = height + "px";
      }
    }
  }, []);

  return (
    <div className="w-full pb-4 mb-8 border-b border-borderColor">
      <h4
        className="flex items-center justify-between md:text-lg text-base font-medium capitalize"
        onClick={handleShowFilter}
      >
        {name}
        <MdKeyboardArrowDown className="text-2xl" />
      </h4>

      <ul
        ref={listFilterRef}
        className={`flex flex-col items-start h-0 mt-2 
          transition-all ease-linear duration-200 overflow-hidden gap-3`}
      >
        {/* checkBox */}
        {listFilterItem.map((item: IVariant) => (
          <FilterItem key={item._id} data={item} name={name} />
        ))}
      </ul>
    </div>
  );
};

export default memo(Filter);
