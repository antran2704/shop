import { memo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import LayoutClose from "~/components/Layout/LayoutClose";

interface Props {
    children: JSX.Element;
    title: string;
    show: boolean;
    onClick: () => void;
    onClose: () => void;
}

const ModalConfirm = (props: Props) => {
    const { title, show, children, onClose, onClick } = props;

    return (
        <div className="fade_up fixed top-0 left-0 right-0 bottom-0 z-[9999]">
            <div className="scroll absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-1/2 w-full max-h-[600px] bg-white p-5 rounded-lg overflow-y-auto z-40">
                <div
                    onClick={onClose}
                    className="w-fit text-3xl ml-auto px-5 cursor-pointer">
                    <AiOutlineCloseCircle />
                </div>
                <h2 className="md:text-2xl sm:text-xl text-lg font-medium text-text text-center mb-5">
                    {title}
                </h2>

                {children}

                <div className="flex sm:flex-nowrap flex-wrap justify-between items-center w-full mt-5 gap-2">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center sm:w-auto w-full text-base font-medium whitespace-nowrap hover:text-white text-dark hover:bg-primary bg-white rounded border hover:border-primary border-dark px-6 py-2 gap-2 transition-all ease-linear duration-100">
                        Cancle
                    </button>
                    <button
                        onClick={onClick}
                        className="flex items-center justify-center sm:w-auto w-full text-base font-medium text-white whitespace-nowrap bg-primary px-6 py-2 opacity-90 hover:opacity-100 transition-all ease-linear border border-transparent duration-100 rounded-lg gap-2">
                        Confirm
                    </button>
                </div>
            </div>

            {show && (
                <LayoutClose disableScroll={false} handleClose={onClose} />
            )}
        </div>
    );
};

export default memo(ModalConfirm);
