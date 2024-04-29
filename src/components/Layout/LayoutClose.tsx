import { memo, useEffect } from "react";

interface Props {
    disableScroll?: boolean;
    handleClose: () => void;
}

const LayoutClose = (props: Props) => {
    const { disableScroll = true, handleClose } = props;

    useEffect(() => {
        const element = document.getElementById("body");

        if (element && disableScroll) {
            element.style.overflowY = "hidden";
        }

        return () => {
            if (element && disableScroll) {
                element.style.overflowY = "scroll";
            }
        };
    }, []);

    return (
        <div
            className="block fixed top-0 bottom-0 left-0 right-0 z-30"
            style={{ backgroundColor: "rgba(1,1,1, 0.6)" }}
            onClick={handleClose}></div>
    );
};

export default memo(LayoutClose);
