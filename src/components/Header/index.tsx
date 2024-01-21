import Link from "next/link";
import { IBreadcrumb } from "~/interfaces";

interface Props {
  title: string;
  breadcrumbs: IBreadcrumb[];
}

const Header = (props: Props) => {
  const { title, breadcrumbs } = props;
  return (
    <header
      className="flex items-center lg:h-[200px] md:h-[140px] h-auto py-10 bg-cover bg-center"
      style={{
        backgroundImage: "url(/images/breadcrumb_1.webp)",
      }}
    >
      <div className="container__cus w-full px-5">
        <h1 className="sm:block hidden lg:text-4xl md:text-2xl text-xl font-medium mb-2 capitalize">
          {title}
        </h1>
        <div className="flex flex-wrap items-center text-lg gap-2">
          {breadcrumbs.map((item: IBreadcrumb, index: number) => {
            if (breadcrumbs.length - 1 !== index) {
              return (
                <div className="flex items-center gap-2" key={index}>
                  <Link
                    href={`${item.url_path}`}
                    className="hover:text-primary capitalize"
                  >
                    {item.label}
                  </Link>
                  <span>|</span>
                </div>
              );
            } else {
              return (
                <span className="text-primary capitalize" key={index}>
                  {item.label}
                </span>
              );
            }
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
