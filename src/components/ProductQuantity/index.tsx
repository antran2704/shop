import {
   FC,
   ChangeEvent,
   KeyboardEvent,
   useState,
   useEffect,
   memo,
} from "react";
import checkValidCount from "~/helpers/number";

interface Props {
   initValue?: number;
   total: number;
   max?: number;
   onChange?: (value: number) => void;
}

const ProductQuantity: FC<Props> = (props: Props) => {
   const { total, max, initValue, onChange } = props;
   const [message, setMessage] = useState<string | null>(null);
   const [count, setCount] = useState<number>(1);

   const onDecrease = (value: number): void => {
      if (value <= 0) {
         setCount(1);
      } else {
         setCount(value);
      }

      if (onChange) onChange(value <= 0 ? 1 : value);
   };

   const onIncrease = (value: number): void => {
      if (max && value > max) {
         setCount(max);
      } else {
         setCount(value);
      }

      if (onChange) onChange(max && value > max ? max : value);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.key;

      if (keyCode === "ArrowUp") {
         onIncrease(count + 1);
      }

      if (keyCode === "ArrowDown") {
         onDecrease(count - 1);
      }
   };

   const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
      let value = Number(e.target.value);
      const isValidCount = checkValidCount(value);

      if (!isValidCount || value === 0) {
         value = 1;
      }

      if (max && value > max) {
         value = max;
      }

      setCount(Number(value));
   };

   useEffect(() => {
      if (message) {
         setMessage(null);
      }
   }, [count]);

   useEffect(() => {
      if (initValue) {
         setCount(initValue);
      }
   }, []);

   return (
      <div className="w-full">
         <div className="flex items-center w-full">
            <button
               onClick={() => onDecrease(count - 1)}
               className="flex items-center justify-center text-2xl w-10 h-10 border border-borderColor">
               -
            </button>
            <input
               type="text"
               onKeyDown={onKeyDown}
               onChange={handleChangeCount}
               onBlur={() => {
                  if (onChange) onChange(count);
               }}
               value={count}
               className="flex items-center justify-center text-sm text-center w-12 h-10 border border-borderColor"
            />
            <button
               onClick={() => onIncrease(count + 1)}
               className="flex items-center justify-center text-2xl w-10 h-10 border border-borderColor">
               +
            </button>
         </div>
      </div>
   );
};

export default memo(ProductQuantity);
