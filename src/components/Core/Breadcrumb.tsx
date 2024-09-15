import clsx from "clsx";
import Link from "next/link";
import { Fragment, memo } from "react";
import { IBreadcrumb, IBreadcrumbItem } from "~/interfaces/breadcrumb";

const Breadcrumb = (props: IBreadcrumb) => {
   const { items, separator = "/", className } = props;
   return (
      <ul className={clsx("flex items-center flex-wrap gap-2", className)}>
         {items.map((item: IBreadcrumbItem, index: number) => (
            <Fragment key={index}>
               <li
                  className={clsx(
                     "text-sm hover:text-primary",
                     item.className,
                  )}>
                  {item.path && <Link href={item.path}>{item.title}</Link>}

                  {!item.path && item.title}
               </li>

               {index !== items.length - 1 && <span>{separator}</span>}
            </Fragment>
         ))}
      </ul>
   );
};

export default memo(Breadcrumb);
