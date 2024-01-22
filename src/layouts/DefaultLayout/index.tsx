import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ScrollToTop from "~/components/ScrollToTop";
import { GetListCart } from "~/store/actions";

interface Props {
  children: JSX.Element;
}

const DefaultLayout: FC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetListCart());
  }, []);

  return (
    <main className="bg-[#f5f5fa]">
      <Navbar />
      {children}
      <section
        className="flex items-center justify-center w-full h-[370px] bg-cover bg-center md:pl-24 px-5 mt-10"
        style={{
          backgroundImage: "url(/images/newsletter-parallax.webp)",
          backgroundAttachment: "fixed",
        }}
      >
        <div>
          <h2 className="text-3xl text-[#1e1e1e] text-center font-medium">
            Get Our Latets Update !
          </h2>
          <p className="text-lg text-center text-[#555555] mt-2">
            Subscribe to our latest newsletter to get news about special
            discounts.
          </p>
          <form className="flex flex-wrap items-center justify-center mt-8 overflow-hidden sm:gap-0 gap-3">
            <input
              required
              type="email"
              placeholder="Your Email Address"
              className="h-11 sm:w-9/12 w-full bg-white px-5 py-2 outline-0"
            />
            <button className="h-11 sm:w-3/12 w-1/2 px-5 text-white bg-primary">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <Footer />
      <ScrollToTop />
      <ToastContainer
        autoClose={5000}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </main>
  );
};

export default DefaultLayout;
