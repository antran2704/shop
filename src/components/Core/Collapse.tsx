import clsx from "clsx";
import { useEffect, useRef, useState, memo } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface Props {
   children: JSX.Element | JSX.Element[];
   title?: string;
   maxHeight?: number | null;
   borderBottom?: boolean;
   className?: string;
}

const Collapse = (props: Props) => {
   const {
      children,
      maxHeight = null,
      className,
      title,
      borderBottom = true,
   } = props;
   const listFilterRef = useRef<HTMLDivElement>(null);
   const [show, setShow] = useState<boolean>(false);
   const [isShowBtn, setShowBtn] = useState<boolean>(false);

   const handleShowMore = (): void => {
      const element = listFilterRef.current;
      if (element) {
         if (show) {
            element.style.maxHeight = maxHeight + "px";
            setShow(false);
         } else {
            const height = element.scrollHeight;
            element.style.maxHeight = height + "px";
            setShow(true);
         }
      }
   };

   useEffect(() => {
      if (!maxHeight) return;

      const element = listFilterRef.current;
      if (element) {
         const height = element.scrollHeight;
         if (height > maxHeight) {
            element.style.maxHeight = maxHeight + "px";
            setShowBtn(true);
         }
      }
   }, [maxHeight]);

   return (
      <div className={clsx("pb-2", className)}>
         {title && (
            <h4 className="flex items-center justify-between md:text-base text-sm font-medium capitalize">
               {title}
            </h4>
         )}

         <div
            ref={listFilterRef}
            className={`flex flex-col items-start mt-2 
          transition-all ease-linear duration-200 overflow-hidden gap-3`}>
            {children}
         </div>

         {isShowBtn && (
            <button
               type="button"
               onClick={handleShowMore}
               className="flex items-center w-full text-xs text-primary outline-none border-none mt-2">
               {show ? "Thu gọn" : "Xem thêm"}
               {!show && <MdKeyboardArrowDown className="text-xl" />}
               {show && <MdKeyboardArrowUp className="text-xl" />}
            </button>
         )}

         {borderBottom && (
            <span className="block w-full h-0.5 bg-neutral-200 mt-4" />
         )}
      </div>
   );
};

export default memo(Collapse);
