import { Breadcrumb } from "../Core";
import { IBreadcrumb } from "~/interfaces/breadcrumb";

interface Props {
   title: string;
   breadcrumbs?: IBreadcrumb | null;
}

const Header = (props: Props) => {
   const { title, breadcrumbs = null } = props;
   return (
      <header
         className="flex items-center lg:h-[200px] md:h-[140px] h-auto py-10 bg-cover bg-center"
         style={{
            backgroundImage: "url(/images/breadcrumb_1.webp)",
         }}>
         <div className="container__cus w-full px-5">
            <div className="md:w-2/3 w-full">
               <h1 className="lg:text-3xl md:text-2xl text-xl font-medium mb-2 capitalize line-clamp-2">
                  {title}
               </h1>
               {breadcrumbs && (
                  <Breadcrumb
                     items={[
                        { title: "Trang chủ", path: "/" },
                        ...breadcrumbs.items,
                     ]}
                     separator={breadcrumbs.separator}
                  />
               )}
            </div>
         </div>
      </header>
   );
};

export default Header;
