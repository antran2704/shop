import { ChangeEvent, forwardRef, KeyboardEvent, LegacyRef } from "react";
import { TippyInfor } from "../Tippy";
import { IInputNumber } from "~/interfaces";
import { revertPriceToString } from "~/helpers/number/fomatterCurrency";
import handleCheckValidNumber from "~/helpers/number";

const InputNumberField = (
   props: IInputNumber,
   ref: LegacyRef<HTMLInputElement>,
) => {
   const {
      title,
      className,
      width,
      name,
      placeholder,
      value,
      infor = null,
      readonly = false,
      required = false,
      enableEnter = false,
      error,
      errorMsg,
      onEnter,
      onChange,
   } = props;

   const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
      if (readonly) return;

      const value = Number(revertPriceToString(e.target.value));

      const valid = handleCheckValidNumber(value);

      if (valid && onChange) onChange(value);

      if (value <= 0 && onChange) onChange(0);
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
               <span
                  id={name}
                  className="block text-base text-[#1E1E1E] font-medium">
                  {title}
               </span>

               {infor && <TippyInfor content={infor} />}
            </div>
         )}

         <input
            required={required}
            name={name}
            value={value}
            placeholder={placeholder}
            readOnly={readonly}
            ref={ref}
            onKeyUp={(e) => {
               if (enableEnter) {
                  onKeyUp(e);
               }
            }}
            onInput={handleChangeValue}
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
      </div>
   );
};

export default forwardRef(InputNumberField);
