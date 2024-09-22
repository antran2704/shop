import { useClerk, useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
   checkUserIsExit,
   createUser,
   getUser,
   login,
   logout,
} from "~/api-client";

import Footer from "~/components/Footer";
import Navbar from "~/components/Navbar";
import ScrollToTop from "~/components/ScrollToTop";
import { injectRouter, injectStore } from "~/configs/axiosConfig";
import { getAuthLocal, setAuthLocal } from "~/helpers/auth";
import hanldeErrorAxios from "~/helpers/handleErrorAxios";
import { IUserInfor } from "~/interfaces";
import { IResponseLogin } from "~/interfaces/auth";
import { IResponse } from "~/interfaces/response";
import { useAppDispatch } from "~/store/hooks";
import { updateInforUserReducer } from "~/store/slice/user";

interface Props {
   children: JSX.Element;
}

const DefaultLayout: FC<Props> = ({ children }: Props) => {
   const router = useRouter();

   const dispatch = useAppDispatch();

   const { user } = useUser();
   const { getToken } = useAuth();
   const { signOut } = useClerk();

   const handleGetUser = async () => {
      await getUser()
         .then((res) => {
            dispatch(updateInforUserReducer(res.payload));
         })
         .catch((err) => err);
   };

   const handleLogin = async () => {
      const clerkToken: string | null = await getToken();

      if (!clerkToken) return;

      await login(clerkToken)
         .then(({ payload }: IResponse<IResponseLogin>) => {
            setAuthLocal("accessToken", payload.accessToken.value);
            setAuthLocal("refreshToken", payload.refreshToken.value);
            setAuthLocal("apiKey", payload.apiKey);
            setAuthLocal("publicKey", payload.publicKey);
         })
         .catch((err) => err);

      handleGetUser();
   };

   const handleCreateUser = async () => {
      const inforUser: Partial<IUserInfor> = {
         email: user?.primaryEmailAddress?.emailAddress,
         name: user?.fullName as string,
         avartar: user?.imageUrl,
      };

      await createUser(inforUser)
         .then(() => {
            handleLogin();
         })
         .catch((err) => {
            const { message } = hanldeErrorAxios(err);

            if (message === "USER_ALREADY_EXITED") {
               logout();
               signOut();
            }

            return err;
         });
   };

   const handleCheckUserIsExit = async (userId: string) => {
      checkUserIsExit(userId)
         .then(({ message }) => {
            if (message === "NEW_USER") {
               handleCreateUser();
            } else {
               handleLogin();
            }
         })
         .catch((err) => err);
   };

   useEffect(() => {
      const accessToken = getAuthLocal("accessToken") as string;
      const refreshToken = getAuthLocal("refreshToken") as string;
      const publicToken = getAuthLocal("publicKey") as string;
      if (user && !accessToken && !refreshToken && !publicToken) {
         handleCheckUserIsExit(user.id);
      }

      if (user && accessToken && refreshToken && publicToken) {
         handleGetUser();
      }
   }, [user]);

   useEffect(() => {
      injectRouter(signOut, router);
      injectStore(dispatch);
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
            }}>
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
                     className="h-11 sm:w-9/12 w-full bg-white px-5 py-2 outline-0 sm:rounded-none rounded-md"
                  />
                  <button className="h-11 sm:w-3/12 w-1/2 sm:rounded-none rounded-md px-5 text-white bg-primary">
                     Subscribe
                  </button>
               </form>
            </div>
         </section>
         <Footer />
         {/* <NewFeed /> */}
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
