import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParentCategories } from "~/hooks/useCategories";
import { IDataCategory, IQueryParam } from "~/interfaces";

import CategoryItem from "~/components/Category/Item";
import CategoryLoading from "~/components/Category/Loading";

const selectField: IQueryParam<Partial<IDataCategory>> = {
  title: "1",
  slug: "1",
  thumbnail: "1",
};

const ListParentCategories = () => {
  const { categories, loadingCategories } = useParentCategories(selectField);

  return (
    <Swiper
      modules={[Navigation]}
      cssMode={true}
      slidesPerView={3}
      spaceBetween={20}
      navigation={true}
      breakpoints={{
        478: {
          slidesPerView: 4,
        },
        650: {
          slidesPerView: 6,
        },
        990: {
          slidesPerView: 10,
        },
      }}
    >
      {!loadingCategories &&
        categories.map((category: IDataCategory) => (
          <SwiperSlide key={category._id}>
            <CategoryItem data={category} />
          </SwiperSlide>
        ))}

      {loadingCategories &&
        [...new Array(6)].map((item, index: number) => (
          <SwiperSlide key={index}>
            <CategoryLoading />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default ListParentCategories;
