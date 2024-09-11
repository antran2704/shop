import { ReactElement } from "react";

// Interface
import { NextPageWithLayout } from "~/interfaces";

import Brands from "~/components/Brands";
import DefaultLayout from "~/layouts/DefaultLayout";
import Seo from "~/components/Seo";
import { useHotProducts, useProducts } from "~/hooks/useProducts";
import ListParentCategories from "~/components/Category/List";
import ListProducts from "~/components/Product/List";
import Banners from "~/components/Banners";

const Layout = DefaultLayout;

const Home: NextPageWithLayout = () => {
    const { products, loadingProducts } = useProducts(1);

    const { hotProducts, loadingHotProducts } = useHotProducts(1);

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
                    isLoading={loadingProducts}
                    items={products}
                />
            </section>

            <section className="container__cus py-5">
                <ListProducts
                    title="Sản phẩm gợi ý"
                    isLoading={loadingProducts}
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
