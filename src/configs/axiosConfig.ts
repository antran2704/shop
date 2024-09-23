import { SignOut } from "@clerk/types";
import axios from "axios";
import { NextRouter } from "next/router";
import jwt, { JwtPayload } from "jsonwebtoken";

import { getRefreshToken } from "~/api-client";
import { clearAuthLocal, getAuthLocal, setAuthLocal } from "~/helpers/auth";
import { AppDispatch } from "~/store";
import { logoutReducer } from "~/store/slice/user";
import MESSAGE_ERROR from "~/common/error";

const httpConfig = axios.create({
   timeout: 30000,
});

// const AxiosGet = async (
//    path: string,
//    config?: AxiosRequestConfig | undefined,
// ) => {
//    return await http.get(path, { ...config }).then((res) => res.data);
// };

// const AxiosPost = async <T>(
//    path: string,
//    data: T,
//    config?: AxiosRequestConfig | undefined,
// ) => {
//    return await http
//       .post(path, { ...data }, { ...config })
//       .then((res) => res.data);
// };

// const AxiosPatch = async <T>(
//    path: string,
//    data: T,
//    config?: AxiosRequestConfig | undefined,
// ) => {
//    return await http
//       .patch(path, { ...data }, { ...config })
//       .then((res) => res.data);
// };

// const AxiosDelete = async <T>(
//    path: string,
//    config?: AxiosRequestConfig | undefined,
// ) => {
//    return await http.delete(path, { ...config }).then((res) => res.data);
// };

let isRefresh = false;
const resfreshTokenUrl: string =
   (process.env.NEXT_PUBLIC_ENDPOINT_API as string) + "/user/refreshToken";
const MAX_RETRY: number = 3;

let router: NextRouter;
let signOutClerk: SignOut;
let dispatch: AppDispatch;

const handleLogout = async () => {
   clearAuthLocal();
   dispatch(logoutReducer());
   signOutClerk(() => router.push("/"));
};

export const injectRouter = (_signOutClerk: SignOut, _router: NextRouter) => {
   signOutClerk = _signOutClerk;
   router = _router;
};

export const injectStore = (_dispatch: AppDispatch) => {
   dispatch = _dispatch;
};

// http.interceptors.response.use(
//    function (response) {
//       return response;
//    },
//    async (error) => {
//       if (error.code === "ERR_NETWORK") {
//          toast.error("Please check your network", {
//             position: toast.POSITION.TOP_RIGHT,
//          });

//          return Promise.reject(error);
//       }

//       const response = error.response;
//       if (!response) return Promise.reject(error);

//       if (response.status === 500) {
//          // toast.error("Error in server, please try again", {
//          //     position: toast.POSITION.TOP_RIGHT
//          // });

//          return Promise.reject(error);
//       }

//       if (response.status === 403) {
//          // toast.error("Forbidden, please login", {
//          //     position: toast.POSITION.TOP_RIGHT
//          // });
//          return Promise.reject(error);
//       }

//       if (
//          response.status === 404 &&
//          response.data.message === "Not found key token"
//       ) {
//          handleLogout();
//          return Promise.reject(error);
//       }

//       const originalRequest = error.config;

//       if (response.status === 401) {
//          // if (originalRequest.method === "post") {
//          //     return Promise.reject(error);
//          // }

//          if (!isRefresh && !originalRequest._retry) {
//             isRefresh = true;

//             const { status } = await getRefreshToken();
//             if (status === 200) {
//                isRefresh = false;

//                originalRequest._retry = true;
//                return Promise.resolve(http(originalRequest));
//             }
//          } else {
//             handleLogout();
//          }
//       }

//       return Promise.reject(error);
//    },
// );

httpConfig.interceptors.request.use(
   async (config) => {
      const accessToken = getAuthLocal("accessToken") as string;
      const refreshToken = getAuthLocal("refreshToken") as string;
      const publicToken = getAuthLocal("publicKey") as string;
      const apiKeyToken = getAuthLocal("apiKey") as string;

      // controller for cancle request to server if refreshToken expried
      const controller = new AbortController();

      // check accesstoken already have on browser
      if (accessToken && publicToken) {
         const decoded: JwtPayload = jwt.decode(accessToken) as JwtPayload;
         if (!decoded) {
            await router.push("/login");

            controller.abort();
            return {
               ...config,
               signal: controller.signal,
            };
         }

         const accessTokenExp: number = decoded?.exp as number;
         const currentTime: number = Math.floor(new Date().getTime() / 1000);

         // check accessToken still live or was expried
         if (currentTime >= accessTokenExp && !isRefresh) {
            isRefresh = true;
            try {
               const { status, payload } = await getRefreshToken(refreshToken);

               if (status === 200) {
                  setAuthLocal("accessToken", payload.newAccessToken);

                  // Retry the original request with the new token
                  config.headers.Authorization = `Bearer ${payload.newAccessToken}`;
                  config.headers["Public-Key"] = publicToken;
                  config.headers["X-Api-Key"] = apiKeyToken;
                  isRefresh = false;
                  return config;
               }
            } catch (error) {
               isRefresh = false;
               controller.abort();

               return {
                  ...config,
                  signal: controller.signal,
               };
            }
         }

         config.headers.Authorization = `Bearer ${accessToken}`;
         config.headers["Public-Key"] = publicToken;
         config.headers["X-Api-Key"] = apiKeyToken;
      }

      if (!accessToken || !refreshToken || !publicToken) {
         handleLogout();
         controller.abort();

         return {
            ...config,
            signal: controller.signal,
         };
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

// Add a response interceptor
httpConfig.interceptors.response.use(
   (response) => {
      return response;
   },
   async (error) => {
      if (!error.response) {
         return Promise.reject(error);
      }

      const url: string = error.config.url;

      if (
         error.response.status === 401 &&
         url === resfreshTokenUrl &&
         error.response.data.message === MESSAGE_ERROR.JWT_EXPRIED
      ) {
         isRefresh = false;
         handleLogout();
      }

      // If the error status is 401 and there is no originalRequest._retry flag,
      // it means the token has expired and we need to refresh it
      // if retry more than 3 times, logout user
      if (error.response.status === 401 && url !== resfreshTokenUrl) {
         if (!error.config.retry || error.config.retry <= MAX_RETRY) {
            error.config.retry = error.config.retry
               ? error.config.retry + 1
               : 1;
            return httpConfig(error.config);
         }
      }

      return Promise.reject(error);
   },
);

export default httpConfig;
