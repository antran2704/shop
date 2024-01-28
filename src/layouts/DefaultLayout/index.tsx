import { useClerk, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkUserIsExit, createUser, getUser, login } from "~/api-client";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ScrollToTop from "~/components/ScrollToTop";
import { IUserInfor } from "~/interfaces";
import { GetListCart } from "~/store/actions";

interface Props {
  children: JSX.Element;
}

const DefaultLayout: FC<Props> = ({ children }: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const checkAuth = async () => {
    try {
      await getUser();
    } catch (err) {
      // signOut(() => router.push("/"));
    }
  };

  const handleLogin = async (email: string) => {
    try {
      await login(email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = async () => {
    const inforUser: Partial<IUserInfor> = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: user?.fullName as string,
      avartar: user?.imageUrl,
    };

    try {
      const { status } = await createUser(inforUser);
      if (status === 201) {
        await handleLogin(inforUser.email as string);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckUserIsExit = async (userId: string) => {
    try {
      const { status } = await checkUserIsExit(userId);
      if (status === 200) {
        await checkAuth();
      }
    } catch (error: any) {
      if (!error.response) {
        toast.error("Error in server, please try again", {
          position: toast.POSITION.TOP_RIGHT,
        });

        return;
      }
      const response = error.response.data;
      if (response.status === 404) {
        await handleCreateUser();
      }
      console.log(error);
    }
  };

  // useEffect(() => {
  //   dispatch(GetListCart());
  // }, []);

  useEffect(() => {
    if (isLoaded && user) {
      handleCheckUserIsExit(user.id);
    }
  }, [user, isLoaded]);

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
