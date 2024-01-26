import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { IProductData } from "~/interfaces";

import ProductLoading from "~/components/Product/Loading";
import ProductItem from "~/components/Product/Item";

interface Props {
  title?: string;
  items: IProductData[];
  isLoading: boolean;
}

const ListProducts = (props: Props) => {
  const { title, items, isLoading } = props;

  return (
    <div className="w-full bg-white p-5 rounded-lg overflow-hidden">
      {title && <div className="flex items-center justify-between mb-3">
        <h3 className="text-xl font-medium text-[#1e1e1e]">{title}</h3>
      </div>}
      <div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={2}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {!isLoading &&
            items.map((product: IProductData) => (
              <SwiperSlide key={product._id}>
                <ProductItem data={product} key={product._id} />
              </SwiperSlide>
            ))}

          {isLoading &&
            [...new Array(5)].map((item, index: number) => (
              <SwiperSlide key={index}>
                <ProductLoading />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ListProducts;
