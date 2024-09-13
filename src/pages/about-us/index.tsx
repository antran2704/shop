import { ReactElement } from "react";
import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Header from "~/components/Header";
import Seo from "~/components/Seo";
import DefaultLayout from "~/layouts/DefaultLayout";

const AboutUsPage = () => {
   return (
      <div>
         <Seo
            title="Shop Antran | Abou Us"
            description="Description Shop Antran About Us Page"
         />

         <Header
            title={"About Us"}
            breadcrumbs={[
               { label: "Home", url_path: "/" },
               { label: "About us", url_path: "/about-us" },
            ]}
         />
         <section className="container__cus px-5">
            <div className="flex lg:flex-nowrap flex-wrap items-center justify-between py-10 gap-10">
               <div className="lg:w-6/12 w-full">
                  <p className="text-2xl font-medium">Provide the best</p>
                  <h2 className="text-3xl font-medium">Handmade Products.</h2>
                  <p className="text-lg my-4">
                     Contrary to popular belief, Lorem Ipsum is not simply
                     random text. It has roots in a piece of classical Latin
                     literature from 45 BC, making it over 2000 years old.
                     Richard McClintock, a Latin professor at Hampden-Sydney
                     College in Virginia, looked up one of the more obscure
                     Latin words, consectetur, from a Lorem Ipsum passage, and
                     going through the cites of the word in classical
                     literature, discovered the undoubtable source. Lorem Ipsum
                     comes from sections 1.10.32 and 1.10.33 of "de Finibus
                     Bonorum et Malorum" (The Extremes of Good and Evil) by
                     Cicero, written in 45 BC.
                  </p>
                  <p className="text-lg">
                     This book is a treatise on the theory of ethics, very
                     popular during the Renaissance. The first line of Lorem
                     Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
                     section 1.10.32.
                  </p>
               </div>
               <div className="lg:w-[450px] lg:h-[450px] mx-auto">
                  <img
                     src="/images/about1.webp"
                     alt="about image"
                     className="w-full"
                  />
               </div>
            </div>
         </section>
         {/* Team Member */}
         <section className="container__cus px-5">
            <div className="py-10">
               <h2 className="md:w-1/2 w-full text-4xl font-bold text-center mx-auto">
                  Team Member
               </h2>
               <p className="md:w-1/2 w-full text-lg text-center mx-auto my-1">
                  Our creative team members
               </p>

               <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 mt-10 gap-5">
                  <div className="flex flex-col items-center justify-center px-5 py-10 border border-[#e4ecf2]">
                     <img
                        src="/images/team1.avif"
                        alt="team image"
                        className="rounded-full"
                     />
                     <h3 className="text-lg text-primary mt-5">DIRECTOR</h3>
                     <h2 className="text-xl font-medium">Halbard Ali</h2>
                  </div>
                  <div className="flex flex-col items-center justify-center px-5 py-10 border border-[#e4ecf2]">
                     <img
                        src="/images/team2.avif"
                        alt="team image"
                        className="rounded-full"
                     />
                     <h3 className="text-lg text-primary mt-5">CEO</h3>
                     <h2 className="text-xl font-medium">Joan Bro</h2>
                  </div>
                  <div className="flex flex-col items-center justify-center px-5 py-10 border border-[#e4ecf2]">
                     <img
                        src="/images/team3.avif"
                        alt="team image"
                        className="rounded-full"
                     />
                     <h3 className="text-lg text-primary mt-5">DESIGNER</h3>
                     <h2 className="text-xl font-medium">Albard Melan</h2>
                  </div>
                  <div className="flex flex-col items-center justify-center px-5 py-10 border border-[#e4ecf2]">
                     <img
                        src="/images/team4.avif"
                        alt="team image"
                        className="rounded-full"
                     />
                     <h3 className="text-lg text-primary mt-5">MANAGER</h3>
                     <h2 className="text-xl font-medium">Luchi Deniel</h2>
                  </div>
               </div>
            </div>
         </section>

         {/* Client Feedback */}
         <section className="client__feedback container__cus px-5 overflow-hidden">
            <div className="py-10">
               <h2 className="md:w-1/2 w-full text-4xl font-bold text-center mx-auto">
                  Client Feedback
               </h2>
               <p className="md:w-1/2 w-full text-lg text-center mx-auto my-1">
                  The valuable opinion of our clients.
               </p>

               <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={20}
                  loop={true}
                  enabled={true}
                  autoplay={{
                     delay: 4000,
                  }}
                  slidesPerView={1}
                  breakpoints={{
                     800: {
                        slidesPerView: 2,
                     },
                  }}
                  pagination={{ clickable: true }}
                  className="my-10">
                  <SwiperSlide className="flex items-start justify-between lg:p-10 p-6 border border-[#e4ecf2] gap-10">
                     <img
                        src="/images/team1.avif"
                        alt="image"
                        className="w-[120p] h-[120px]"
                     />
                     <div>
                        <p className="lg:text-lg text-base">
                           Lorem ipsum ctetur elit, sed do eius mod tempor
                           incididunt ut labore et dolore magna aliqua.
                        </p>
                        <h2 className="lg:text-xl text-base font-medium mt-5">
                           Lanal Julman
                        </h2>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex items-start justify-between lg:p-10 p-6 border border-[#e4ecf2] gap-10">
                     <img
                        src="/images/team1.avif"
                        alt="image"
                        className="w-[120p] h-[120px]"
                     />
                     <div>
                        <p className="lg:text-lg text-base">
                           Lorem ipsum ctetur elit, sed do eius mod tempor
                           incididunt ut labore et dolore magna aliqua.
                        </p>
                        <h2 className="lg:text-xl text-base font-medium mt-5">
                           Lanal Julman
                        </h2>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex items-start justify-between lg:p-10 p-6 border border-[#e4ecf2] gap-10">
                     <img
                        src="/images/team1.avif"
                        alt="image"
                        className="w-[120p] h-[120px]"
                     />
                     <div>
                        <p className="lg:text-lg text-base">
                           Lorem ipsum ctetur elit, sed do eius mod tempor
                           incididunt ut labore et dolore magna aliqua.
                        </p>
                        <h2 className="lg:text-xl text-base font-medium mt-5">
                           Lanal Julman
                        </h2>
                     </div>
                  </SwiperSlide>
                  <SwiperSlide className="flex items-start justify-between lg:p-10 p-6 border border-[#e4ecf2] gap-10">
                     <img
                        src="/images/team1.avif"
                        alt="image"
                        className="w-[120p] h-[120px]"
                     />
                     <div>
                        <p className="lg:text-lg text-base">
                           Lorem ipsum ctetur elit, sed do eius mod tempor
                           incididunt ut labore et dolore magna aliqua.
                        </p>
                        <h2 className="lg:text-xl text-base font-medium mt-5">
                           Lanal Julman
                        </h2>
                     </div>
                  </SwiperSlide>
               </Swiper>
            </div>
         </section>
      </div>
   );
};

export default AboutUsPage;

AboutUsPage.getLayout = function getLayout(page: ReactElement) {
   return <DefaultLayout>{page}</DefaultLayout>;
};
