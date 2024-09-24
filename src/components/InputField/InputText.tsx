import { forwardRef, KeyboardEvent, LegacyRef } from "react";
import { TippyInfor } from "../Tippy";
import { IInputText } from "~/interfaces";
import { AiOutlineClose } from "react-icons/ai";

const InputText = (props: IInputText, ref: LegacyRef<HTMLInputElement>) => {
   const {
      title,
      width,
      className,
      placeholder,
      value,
      infor = null,
      readonly = false,
      enableEnter = false,
      enableClearAll = false,
      error,
      errorMsg,
      onEnter,
      onClear,
      onChange,
   } = props;

   const onClearAll = () => {
      if (readonly) return;

      if (onClear) onClear();
   };

   const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
      if (readonly) return;

      const key = e.key;
      if (key === "Enter" && onEnter) {
         onEnter();
      }
   };
   return (
      <div className={`${width ? width : "w-full"}`}>
         {title && (
            <div className="flex items-center mb-1 gap-2">
               <span className="block text-base text-[#1E1E1E] font-medium">
                  {title}
               </span>

               {infor && <TippyInfor content={infor} />}
            </div>
         )}

         <div className="relative">
            <input
               value={value}
               placeholder={placeholder}
               ref={ref}
               onChange={onChange}
               onKeyUp={(e) => {
                  if (enableEnter) {
                     onKeyUp(e);
                  }
               }}
               type="text"
               className={`w-full ${className ? className : ""} ${
                  error && "border-red-500"
               } ${
                  readonly
                     ? "pointer-events-none cursor-not-allowed opacity-80"
                     : ""
               }`}
            />

            {error && <p className="text-sm text-red-500">{errorMsg}</p>}

            {enableClearAll && (
               <AiOutlineClose
                  onClick={onClearAll}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-lg min-w-10 px-3 cursor-pointer h-full"
               />
            )}
         </div>
      </div>
   );
};

export default forwardRef(InputText);
