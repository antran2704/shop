import Link from "next/link";
import { Fragment, ReactNode, memo } from "react";

interface Props {
  title: string;
  type: "BUTTON" | "LINK";
  path?: string;
  className?: string;
  onClick?: () => void;
  Icon?: ReactNode;
}

const PrimaryButton = (props: Props) => {
  const { title, type, path = "/", className, Icon, onClick } = props;
  console.log("re-render btn", title)

  switch (type) {
    case "BUTTON":
      return (
        <button
          className={`flex items-center justify-center ${className} transition-all ease-linear duration-100 gap-2`}
          onClick={onClick}
        >
          {Icon}
          {title}
        </button>
      );

    case "LINK":
      return (
        <Link
          href={path}
          className={`flex items-center justify-center ${className} transition-all ease-linear duration-100 gap-2`}
        >
          {Icon}
          {title}
        </Link>
      );

    default:
      return <Fragment></Fragment>;
  }
};

export default memo(PrimaryButton);
