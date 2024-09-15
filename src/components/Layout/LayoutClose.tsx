import clsx from "clsx";
import { Fragment, memo, useEffect } from "react";

interface Props {
   disableScroll?: boolean;
   show?: boolean;
   className?: string;
   handleClose?: () => void;
}

const LayoutClose = (props: Props) => {
   const { disableScroll = true, show = false, className, handleClose } = props;

   useEffect(() => {
      const element = document.getElementById("body");

      if (show && element && disableScroll) {
         element.style.overflowY = "hidden";
      }

      return () => {
         if (element && disableScroll) {
            element.style.overflowY = "scroll";
         }
      };
   }, [show]);

   return (
      <div
         className={clsx(
            "w-full fixed top-0 bottom-0 left-0 right-0 transition-all ease-linear duration-75 z-30",
            [show ? "opacity-100" : "opacity-0 pointer-events-none"],
            className,
         )}
         style={{ backgroundColor: "rgba(1,1,1, 0.6)" }}
         onClick={handleClose && handleClose}
      />
   );
};

export default memo(LayoutClose);
