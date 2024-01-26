import { useRouter } from "next/router";
import { FC, memo, useEffect, useRef } from "react";
import { IVariant } from "~/interfaces";

interface Props {
  name: string;
  data: IVariant;
}

const FilterCheckBoxItem: FC<Props> = (props: Props) => {
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

    if (typeof query[name.toLowerCase()] === "object") {
      return (query[name.toLowerCase()] as string[]).some((value: string) => {
        return value === item;
      });
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
      const isChecked = handleChecked(data.name);
      inpRef.current.checked = isChecked;
    }
  }, [query]);

  return (
    <li className="flex items-start w-full cursor-pointer gap-2" onClick={onClick}>
      <input
        ref={inpRef}
        type="checkbox"
        name={name.toLowerCase()}
        value={data.name}
        className="min-w-5 w-5 h-5 rounded-md"
      />
      <p className="text-sm capitalize">{data.name}</p>
    </li>
  );
};

export default memo(FilterCheckBoxItem);
