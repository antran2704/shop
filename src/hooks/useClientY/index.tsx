import { useEffect, useState } from "react";

function useClientY() {
   const [top, setTop] = useState(0);

   const handleScrollTop = () => {
      const topCurrentValue =
         window.scrollY || document.documentElement.scrollTop;
      setTop(topCurrentValue);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScrollTop);

      return () => {
         window.removeEventListener("scroll", handleScrollTop);
      };
   }, [top]);

   return top;
}

export default useClientY;
