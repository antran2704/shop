import { useEffect, useRef, useState, memo } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface Props {
  title: string;
  children: JSX.Element;
}

const FilterLayout = (props: Props) => {
  const { title, children } = props;
  const listFilterRef = useRef<HTMLUListElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const [isShowBtn, setShowBtn] = useState<boolean>(false);

  const handleShowMore = (): void => {
    const element = listFilterRef.current;
    if (element) {
      if (show) {
        element.style.maxHeight = "120px";
        setShow(false);
      } else {
        element.style.maxHeight = "unset";
        setShow(true);
      }
    }
  };

  useEffect(() => {
    const element = listFilterRef.current;
    if (element) {
      const height = element.scrollHeight;
      if (height > 140) {
        setShowBtn(true);
      }
    }
  }, []);

  return (
    <div className="w-full pb-4 mb-8 border-b border-borderColor">
      <h4 className="flex items-center justify-between text-base font-medium capitalize">
        {title}
      </h4>

      <ul
        ref={listFilterRef}
        className={`flex flex-col items-start max-h-[120px] mt-2 
          transition-all ease-linear duration-200 overflow-hidden gap-3`}
      >
        {children}
      </ul>

      {isShowBtn && (
        <button
          type="button"
          onClick={handleShowMore}
          className="flex items-center w-full text-xs text-primary outline-none border-none mt-2"
        >
          {show ? "Thu gọn" : "Xem thêm"}
          {!show && <MdKeyboardArrowDown className="text-xl" />}
          {show && <MdKeyboardArrowUp className="text-xl" />}
        </button>
      )}
    </div>
  );
};

export default FilterLayout;
