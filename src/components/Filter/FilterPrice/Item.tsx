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

  const onClick = () => {
    if (router.isReady && inpRef.current) {
      const isChecked = inpRef.current.checked;
      inpRef.current.checked = !isChecked;
    }
  };

  useEffect(() => {
    if (router.isReady && inpRef.current) {
      const isChecked = handleChecked(data.value);
      inpRef.current.checked = isChecked;
    }
  }, [query]);

  return (
    <li className="flex items-center cursor-pointer gap-2">
      <input
        ref={inpRef}
        id={data.value}
        type="radio"
        name={name.toLowerCase()}
        value={data.value}
        className="min-w-3 w-3 h-3 rounded-md"
      />

      <p className="text-xs capitalizez" onClick={onClick}>
        {data.name}
      </p>
    </li>
  );
};

export default memo(FilterPriceItem);
