import { FC, useState, useRef, useEffect, ChangeEvent } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface IFilterPrice {
  gte: string;
  lte: string;
}

interface Props {
  titleFilter: string;
  listFilterItem?: string[];
  typeFilter: string;
  isShow: boolean;
  query?: any;
}

const FilterItem: FC<Props> = (props: Props) => {
  const { titleFilter, isShow, listFilterItem, typeFilter, query } = props;

  const formPriceInit: IFilterPrice = {
    gte: "",
    lte: "",
  };

  const listFilterRef = useRef<HTMLUListElement>(null);
  const [show, setShow] = useState<boolean>(isShow);
  const [price, setPrice] = useState<IFilterPrice>(formPriceInit);

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

  const onChangePrice = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setPrice({ ...price, [name]: value });
  };

  const handleCheckedBox = (item: string): boolean => {
    if (
      typeof query[titleFilter.toLowerCase()] === "string" &&
      query[titleFilter.toLowerCase()] === item
    ) {
      return true;
    }

    if (typeof query[titleFilter.toLowerCase()] === "object") {
      const isChecked = query[titleFilter.toLowerCase()].find((value: any) => {
        return value === item ? true : false;
      });

      return isChecked;
    }
    return false;
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

    if (query.lte && query.gte && typeFilter === "price") {
      setPrice({ lte: query.lte, gte: query.gte });
    }
  }, []);

  return (
    <div className="w-full pb-4 mb-8 border-b border-borderColor">
      <h2
        className="flex items-center justify-between text-xl font-medium"
        onClick={handleShowFilter}
      >
        {titleFilter}
        <MdKeyboardArrowDown className="text-2xl" />
      </h2>

      <ul
        ref={listFilterRef}
        className={`flex flex-col items-start mt-2 
          transition-all ease-linear duration-200 overflow-hidden gap-3`}
      >
        {/* checkBox */}
        {typeFilter === "checkBox" &&
          listFilterItem?.map((item: string, index: number) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={handleCheckedBox(item)}
                name={titleFilter.toLowerCase()}
                value={item}
                className="w-5 h-5"
              />
              <p className="text-base">{item}</p>
            </li>
          ))}

        {/* type price */}
        {typeFilter === "price" && (
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-base mb-1">From $</span>
                <input
                  name="gte"
                  type="number"
                  value={price.gte}
                  required={price.lte.length > 0 ? true : false}
                  onChange={onChangePrice}
                  placeholder="0"
                  className="w-[100px] h-10 text-base p-2 border rounded"
                />
              </div>
              <div>
                <span className="block text-base mb-1">To $</span>
                <input
                  name="lte"
                  type="number"
                  required={price.gte.length > 0 ? true : false}
                  onChange={onChangePrice}
                  value={price.lte}
                  placeholder="110.00"
                  className="w-[100px] h-10 text-base p-2 border rounded"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-primary text-white text-lg font-medium px-5 py-2 mt-3"
            >
              Filter
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};

export default FilterItem;
