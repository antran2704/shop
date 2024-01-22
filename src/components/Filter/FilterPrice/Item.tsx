import { useRouter } from "next/router";
import { FC, memo, useEffect, useRef } from "react";
import { IVariant } from "~/interfaces";

interface Props {
  name: string;
  data: IVariant;
}

const FilterPriceItem: FC<Props> = (props: Props) => {
  const { data, name } = props;

  const router = useRouter();
  const query = router.query;

  const inpRef = useRef<HTMLInputElement>(null);

  const handleChecked = (item: string): boolean => {
    if (
      typeof query[name.toLowerCase()] === "string" &&
      query[name.toLowerCase()] === item
    ) {
      return true;
    }

    return false;
  };
  useEffect(() => {
    if (router.isReady && inpRef.current) {
      const isChecked = handleChecked(data.value);
      inpRef.current.checked = isChecked;
    }
  }, [query]);

  return (
    <li className="flex items-start gap-2">
      <input
        ref={inpRef}
        type="radio"
        name={name.toLowerCase()}
        value={data.value}
        className="min-w-5 w-5 h-5 rounded-md"
      />
      <p className="text-sm capitalize">{data.name}</p>
    </li>
  );
};

export default memo(FilterPriceItem);
