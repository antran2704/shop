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

interface Props {
   title?: string;
}

const ListParentCategories = (props: Props) => {
   const { title } = props;

   const { categories, loadingCategories } = useParentCategories(selectField);

   return (
      <div className="bg-white p-5">
         {title && (
            <div className="flex items-center justify-between mb-3">
               <h3 className="text-xl font-medium text-[#1e1e1e]">{title}</h3>
            </div>
         )}
         <div className="py-2">
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
                     slidesPerView: 12,
                  },
               }}>
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
         </div>
      </div>
   );
};

export default ListParentCategories;
