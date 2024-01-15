import Link from "next/link";
import { FC } from "react";

interface IBackLink {
  title: String;
  link: String;
}

interface Props {
  title: String;
  listBackLinks: IBackLink[];
}

const Header: FC<Props> = (props: Props) => {
  const { title, listBackLinks } = props;
  return (
    <header
      className="flex items-center lg:h-[200px] md:h-[140px] h-auto py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/breadcrumb_1.webp)",
      }}
    >
      <div className="container__cus w-full px-5">
        <h1 className="sm:block hidden lg:text-4xl md:text-2xl text-xl font-medium mb-2">{title}</h1>
        <div className="flex flex-wrap items-center text-lg gap-2">
          {listBackLinks.map((item: IBackLink, index: number) => (
            <div className="flex items-center gap-2" key={index}>
              <Link href={`${item.link}`}>{item.title}</Link>
              <span>|</span>
            </div>
          ))}

          <span className="text-primary">{title}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
