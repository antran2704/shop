import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { IBlog } from "~/interfaces/blog";
import BlogItem from "./BlogItem";
import LoadingBlog from "./BlogLoading";

interface Props {
   title?: string;
   items: IBlog[];
   isLoading: boolean;
}

const OtherBlog = (props: Props) => {
   const { title, items, isLoading } = props;

   return (
      <div className="w-full bg-white p-5 rounded-lg overflow-hidden">
         {title && (
            <div className="flex items-center justify-between mb-3">
               <h3 className="lg:text-2xl md:text-xl text-lg font-semibold text-[#1e1e1e]">
                  {title}
               </h3>
            </div>
         )}
         <div>
            <Swiper
               modules={[Navigation]}
               slidesPerView={2}
               spaceBetween={20}
               navigation={true}
               breakpoints={{
                  640: {
                     slidesPerView: 2,
                  },
                  768: {
                     slidesPerView: 3,
                  },
                  1024: {
                     slidesPerView: 4,
                  },
               }}>
               {!isLoading &&
                  items.map((blog: IBlog) => (
                     <SwiperSlide key={blog._id}>
                        <BlogItem data={blog} key={blog._id} />
                     </SwiperSlide>
                  ))}

               {isLoading &&
                  [...new Array(5)].map((_, index: number) => (
                     <SwiperSlide key={index}>
                        <LoadingBlog />
                     </SwiperSlide>
                  ))}
            </Swiper>
         </div>
      </div>
   );
};

export default OtherBlog;
