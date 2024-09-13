import { FC, FormEvent, KeyboardEvent, memo } from "react";
import { TippyInfor } from "../Tippy";
import { IInputText } from "~/interfaces";
import { AiOutlineClose } from "react-icons/ai";

const InputText: FC<IInputText> = (props: IInputText) => {
   const {
      id,
      title,
      width,
      className,
      name,
      placeholder,
      value,
      infor = null,
      readonly = false,
      required = false,
      enableEnter = false,
      enableClearAll = false,
      error,
      onEnter,
      onClear,
      getValue,
   } = props;

   const onClearAll = () => {
      if (readonly) return;

      if (getValue && id) {
         getValue(name, "", id);
      }

      if (getValue) {
         getValue(name, "");
      }
   };

   const handleChangeValue = (e: FormEvent<HTMLInputElement>) => {
      if (readonly) return;

      const name = e.currentTarget.name;
      const value = e.currentTarget.value;

      if (getValue && id) {
         getValue(name, value, id);
      }

      if (getValue) {
         getValue(name, value);
      }
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

         <div className="relative">
            <input
               required={required}
               name={name}
               value={value}
               placeholder={placeholder}
               readOnly={readonly}
               onKeyUp={(e) => {
                  if (enableEnter) {
                     onKeyUp(e);
                  }
               }}
               onChange={handleChangeValue}
               type="text"
               className={`w-full ${className ? className : ""} ${
                  error && "border-red-600"
               } ${
                  readonly
                     ? "pointer-events-none cursor-not-allowed opacity-80"
                     : ""
               }`}
            />

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

export default memo(InputText);
