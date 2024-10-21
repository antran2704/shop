import { ReactElement } from "react";

import Header from "~/components/Header";
import Seo from "~/components/Seo";
import { NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";

const Layout = DefaultLayout;

const Contact: NextPageWithLayout = () => {
   return (
      <div>
         <Seo
            title="Shop Antran | Contact"
            description="Description Shop Antran Contact Page"
         />

         <Header
            title={"Contact"}
            breadcrumbs={{
               items: [{ title: "Contact", path: "/contact" }],
            }}
         />
         <section className="my-16">
            <div className="container__cus flex lg:flex-nowrap flex-wrap items-start justify-between gap-5">
               <div
                  className="lg:w-1/3 w-full md:h-[320px] h-[260px] flex flex-col items-center justify-center py-10 px-8 rounded gap-2"
                  style={{ boxShadow: "0px 0px 2px rgba(1,1,1 ,0.4)" }}>
                  <img src="/images/email.webp" alt="logo contact" />
                  <h2 className="md:text-xl text-lg font-medium">
                     Email Address
                  </h2>
                  <p className="md:text-lg text-base">
                     Phamtrangiaan27@gmail.com
                  </p>
               </div>
               <div
                  className="lg:w-1/3 w-full md:h-[320px] h-[260px] flex flex-col items-center justify-center py-10 px-8 rounded gap-2"
                  style={{ boxShadow: "0px 0px 2px rgba(1,1,1 ,0.4)" }}>
                  <img src="/images/phone.avif" alt="logo contact" />
                  <h2 className="md:text-xl text-lg font-medium">
                     Phone Number
                  </h2>
                  <p className="md:text-lg text-base">0946003423</p>
               </div>
               <div
                  className="lg:w-1/3 w-full md:h-[320px] h-[260px] flex flex-col items-center justify-center py-10 px-8 rounded gap-2"
                  style={{ boxShadow: "0px 0px 2px rgba(1,1,1 ,0.4)" }}>
                  <img src="/images/location.avif" alt="logo contact" />
                  <h2 className="md:text-xl text-lg font-medium">
                     Office Address
                  </h2>
                  <p className="md:text-lg text-base text-center">
                     55 Nguyễn Kiệm, phường 3, Quận Gò Vấp, TP.HCM
                  </p>
               </div>
            </div>
         </section>

         {/* import map */}
         <iframe
            className="w-full lg:h-[800px] md:h-[600px] h-[400px]"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15675.414698607303!2d106.68809554999999!3d10.8225079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1679327498606!5m2!1svi!2s"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>

         {/* Form */}
         <section className="container__cus">
            <div className="py-10">
               <h2 className="text-2xl font-medium mb-5">Send Message</h2>
               <form className="flex flex-col items-start gap-3">
                  <div className="w-full flex sm:flex-nowrap flex-wrap items-center justify-between sm:gap-6 gap-3">
                     <input
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="sm:w-6/12 w-full md:text-lg text-base px-5 py-2 border border-[#ddd]"
                     />
                     <input
                        required
                        type="email"
                        placeholder="Enter email address"
                        className="sm:w-6/12 w-full md:text-lg text-base px-5 py-2 border border-[#ddd]"
                     />
                  </div>
                  <div className="w-full flex sm:flex-nowrap flex-wrap items-center justify-between sm:gap-6 gap-3">
                     <input
                        required
                        type="text"
                        placeholder="Enter phone number"
                        className="sm:w-6/12 w-full md:text-lg text-base px-5 py-2 border border-[#ddd]"
                     />
                     <input
                        required
                        type="text"
                        placeholder="Enter subject"
                        className="sm:w-6/12 w-full md:text-lg text-base px-5 py-2 border border-[#ddd]"
                     />
                  </div>
                  <textarea
                     cols={30}
                     rows={10}
                     placeholder="Enter your message"
                     className="w-full h-[150px] md:text-lg text-base px-5 py-2 border border-[#ddd]"></textarea>
                  <button className="h-11 sm:w-2/12 w-full px-5 text-white bg-primary">
                     Subscribe
                  </button>
               </form>
            </div>
         </section>
      </div>
   );
};

export default Contact;

Contact.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
