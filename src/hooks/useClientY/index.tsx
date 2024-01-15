import { useEffect, useState } from "react";

function useClientY() {
    const [top, setTop] = useState(globalThis.scrollY);

    const handleScrollTop = () => {
        const topCurrentValue = globalThis.scrollY || document.documentElement.scrollTop;
        setTop(topCurrentValue);
    }

    useEffect(() => {
        globalThis.addEventListener("scroll", handleScrollTop);

        return () => {
            globalThis.removeEventListener("scroll", handleScrollTop);
        }
    }, [top])

    return top;
}

export default useClientY;