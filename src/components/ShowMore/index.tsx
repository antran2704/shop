import { useEffect, useRef, useState, memo } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

interface Props {
    children: JSX.Element;
    maxHeight: number;
    className?: string;
}

const ShowMore = (props: Props) => {
    const { children, maxHeight, className } = props;
    const listFilterRef = useRef<HTMLUListElement>(null);
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
        const element = listFilterRef.current;
        if (element) {
            const height = element.scrollHeight;
            if (height > maxHeight) {
                element.style.maxHeight = maxHeight + "px";
                setShowBtn(true);
            }
        }
    }, []);

    return (
        <div className={className}>
            <ul
                ref={listFilterRef}
                className={`flex flex-col items-start mt-2 
          transition-all ease-linear duration-200 overflow-hidden gap-3`}>
                {children}
            </ul>

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
        </div>
    );
};

export default memo(ShowMore);
