import { ReactElement, useEffect, useState } from "react";

// Interface
import { IListProduct, NextPageWithLayout } from "~/interfaces";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import { IResponseWithPagination } from "~/interfaces/response";

import Brands from "~/components/Brands";
import DefaultLayout from "~/layouts/DefaultLayout";
import Seo from "~/components/Seo";
import ListParentCategories from "~/components/Category/List";
import ListProducts from "~/components/Product/List";
import Banners from "~/components/Banners";

import { useHotProducts } from "~/hooks/useProducts";

import { getProducts } from "~/api-client";

const Layout = DefaultLayout;

const Home: NextPageWithLayout = () => {
   const [products, setProducts] = useState<IListProduct[]>([]);

   const { hotProducts, loadingHotProducts } = useHotProducts(1);

   const [loading, setLoading] = useState<{
      products: boolean;
      hotProducts: boolean;
   }>({ products: true, hotProducts: true });

   const onLoading = (key: keyof typeof loading, value: boolean) => {
      setLoading({ ...loading, [key]: value });
   };

   const handleGetProducts = async () => {
      onLoading("products", true);

      await getProducts({
         page: 1,
         take: 16,
         order: ORDER_PARAMATER_ENUM.DESC,
      })
         .then(({ payload }: IResponseWithPagination<IListProduct[]>) => {
            setProducts(payload);
         })
         .catch((err) => err);

      onLoading("products", false);
   };

   useEffect(() => {
      handleGetProducts();
   }, []);

   return (
      <div>
         <Seo
            title="Shop Antran | Home Page"
            description="Description Shop Antran Home Page"
         />

         {/* banner */}
         <section
            id="banner"
            className="2xl:max-w-[1400px] w-full lg:h-[500px] md:h-[450px] sm:h-[400px] h-[340px] 2xl:mx-auto 2xl:px-5">
            <Banners />
         </section>

         {/* Category */}
         <section className="container__cus py-5">
            <ListParentCategories title="Danh mục" />
         </section>

         <section className="container__cus py-5">
            <ListProducts
               title="Sản phẩm Hot 🔥"
               isLoading={loadingHotProducts}
               items={hotProducts}
            />
         </section>

         <section className="container__cus py-5">
            <ListProducts
               title="Có thể bạn thích"
               isLoading={loading.products}
               items={products}
            />
         </section>

         <section className="container__cus py-5">
            <ListProducts
               title="Sản phẩm gợi ý"
               isLoading={loading.products}
               items={products}
            />
         </section>

         {/* Brands */}
         <section className="container__cus py-10 overflow-hidden">
            <Brands />
         </section>
      </div>
   );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
