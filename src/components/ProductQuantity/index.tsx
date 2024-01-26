import {
  FC,
  ChangeEvent,
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
      setMessage("Not enough inventory");
      return;
    }

    setTotalProduct(value);
  };

  const handleChangeCount = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const isValidCount = checkValidCount(value);

    if (!isValidCount || value === 0) {
      setTotalProduct(1);
      return;
    }

    if (max && value > max) {
      setMessage("Not enough inventory");
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
      <div className="flex items-center w-full h-14">
        <button
          onClick={onDecrease}
          className="flex items-center justify-center text-xl font-medium w-4/12 h-full border border-borderColor"
        >
          -
        </button>
        <input
          type="text"
          onChange={handleChangeCount}
          value={total}
          className="flex items-center justify-center text-base text-center font-medium w-4/12 h-full border border-borderColor"
        />
        <button
          onClick={onIncrease}
          className="flex items-center justify-center text-xl font-medium w-4/12 h-full border border-borderColor"
        >
          +
        </button>
      </div>

      {message && <p className="text-sm font-medium text-primary">{message}</p>}
    </div>
  );
};

export default memo(ProductQuantity);
