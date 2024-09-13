import {
   FC,
   ChangeEvent,
   KeyboardEvent,
   Dispatch,
   SetStateAction,
   useState,
   useEffect,
   memo,
} from "react";
import checkValidCount from "~/helpers/number";

interface Props {
   total: number;
   max?: number;
   setTotalProduct: Dispatch<SetStateAction<number>>;
}

const ProductQuantity: FC<Props> = (props: Props) => {
   const { total, max, setTotalProduct } = props;
   const [message, setMessage] = useState<string | null>(null);

   const onDecrease = (): void => {
      const value = total - 1;

      if (value <= 0) {
         setTotalProduct(1);
         return;
      }

      setTotalProduct(value);
   };

   const onIncrease = (): void => {
      const value = total + 1;

      if (max && value > max) {
         setTotalProduct(max);
         return;
      }

      setTotalProduct(value);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.key;

      if (keyCode === "ArrowUp") {
         onIncrease();
      }

      if (keyCode === "ArrowDown") {
         onDecrease();
      }
   };

   const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const isValidCount = checkValidCount(value);

      if (!isValidCount || value === 0) {
         setTotalProduct(1);
         return;
      }

      if (max && value > max) {
         setTotalProduct(max);
         return;
      }

      setTotalProduct(Number(value));
   };

   useEffect(() => {
      if (message) {
         setMessage(null);
      }
   }, [total]);

   return (
      <div className="w-full">
         <div className="flex items-center w-full">
            <button
               onClick={onDecrease}
               className="flex items-center justify-center text-2xl w-10 h-10 border border-borderColor">
               -
            </button>
            <input
               type="text"
               onKeyDown={onKeyDown}
               onChange={handleChangeCount}
               value={total}
               className="flex items-center justify-center text-sm text-center w-12 h-10 border border-borderColor"
            />
            <button
               onClick={onIncrease}
               className="flex items-center justify-center text-2xl w-10 h-10 border border-borderColor">
               +
            </button>
         </div>
      </div>
   );
};

export default memo(ProductQuantity);
