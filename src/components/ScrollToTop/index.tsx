import { memo } from "react";
import useClientY from "~/hooks/useClientY";

const ScrollToTop = () => {
    const top = useClientY();

    const onClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div
            className={`fixed right-2 ${
                top > 150
                    ? "opacity-60 hover:opacity-100 bottom-5"
                    : "opacity-0 bottom-0 pointer-events-none"
            } cursor-pointer py-2 px-2 rounded-md bg-dark shadow-lg z-20 transition-all ease-linear duration-150`}
            onClick={onClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="text-white w-6 h-6">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l7.5-7.5 7.5 7.5m-15 6l7.5-7.5 7.5 7.5"
                />
            </svg>
        </div>
    );
};

export default memo(ScrollToTop);
