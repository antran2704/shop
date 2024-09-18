import { Fragment } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import ImageCus from "~/components/Image";
import { IProduct } from "~/interfaces";

interface Props {
   product: IProduct;
   currentImg: string | null;
   onChangeImg: (value: string) => void;
}

const ProductGallery = (props: Props) => {
   const { product, currentImg, onChangeImg } = props;

   return (
      <Fragment>
         <div className="relative w-full pb-[100%] rounded-md overflow-hidden">
            {currentImg && (
               <ImageCus
                  title={product.title}
                  alt={product.title}
                  src={currentImg}
                  className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
               />
            )}
         </div>
         <div>
            {/* gallery image */}
            <LightGallery
               elementClassNames="absolute top-0 left-0 right-0 bottom-0"
               speed={500}
               enableSwipe={true}
               plugins={[lgThumbnail, lgZoom]}>
               <a
                  href={currentImg ? currentImg : product.gallery[0]}
                  className="w-1/4">
                  <button className="absolute top-0 left-0 right-0 bottom-0"></button>
                  <ImageCus
                     className="w-full hidden"
                     src={currentImg ? currentImg : product.gallery[0]}
                     alt={product.title}
                     title={product.title}
                  />
               </a>
               {product.gallery
                  .slice(1, product.gallery.length)
                  .map((image: string, index: number) => (
                     <a
                        href={image}
                        key={index}
                        className="w-[100px] h-[100px] rounded-lg hidden">
                        <ImageCus
                           className="w-full"
                           src={image}
                           alt={product.title}
                           title={product.title}
                        />
                     </a>
                  ))}
            </LightGallery>

            <Swiper
               className="flex items-center w-full mt-4 gap-2"
               modules={[Navigation]}
               navigation={true}
               slidesPerView={3}
               spaceBetween={10}
               breakpoints={{
                  800: {
                     slidesPerView: 4,
                  },
               }}>
               {product.gallery.map((image: string, index: number) => (
                  <SwiperSlide
                     key={index}
                     className="cursor-pointer"
                     onClick={() => onChangeImg(image)}>
                     <ImageCus
                        title={product.title}
                        alt={product.title}
                        src={image}
                        className={`w-full xl:h-[120px] lg:h-[100px] sm:h-[160px] h-[120px] ${
                           currentImg && currentImg.includes(image)
                              ? "border-primary"
                              : "border-white"
                        } border-2 rounded-lg`}
                     />
                  </SwiperSlide>
               ))}
            </Swiper>
         </div>
      </Fragment>
   );
};

export default ProductGallery;
