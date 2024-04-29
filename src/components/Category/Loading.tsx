import { memo } from "react";

const CategoryLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center text-[#1e1e1e] hover:text-primary">
            <div className="skelaton w-full h-[160px] rounded-md"></div>

            <p className="skelaton block w-full h-5 text-sm font-medium text-center mt-3"></p>
        </div>
    );
};

export default memo(CategoryLoading);
