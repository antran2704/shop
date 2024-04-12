import { SignOut } from "@clerk/types";
import axios, { AxiosRequestConfig } from "axios";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { getRefreshToken, logout } from "~/api-client";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT_API
});

const AxiosGet = async (
  path: string,
  config?: AxiosRequestConfig | undefined
) => {
  return await http.get(path, { ...config }).then((res) => res.data);
};

const AxiosPost = async <T>(
  path: string,
  data: T,
  config?: AxiosRequestConfig | undefined
) => {
  return await http
    .post(path, { ...data }, { ...config })
    .then((res) => res.data);
};

const AxiosPatch = async <T>(
  path: string,
  data: T,
  config?: AxiosRequestConfig | undefined
) => {
  return await http
    .patch(path, { ...data }, { ...config })
    .then((res) => res.data);
};

const AxiosDelete = async <T>(
  path: string,
  config?: AxiosRequestConfig | undefined
) => {
  return await http.delete(path, { ...config }).then((res) => res.data);
};

let isRefresh = false;
let router: NextRouter;
let signOutClerk: SignOut;

const handleLogout = () => {
  isRefresh = false;
  logout();
  signOutClerk(() => router.push("/"));
};

export const injectRouter = (_signOutClerk: SignOut, _router: NextRouter) => {
  signOutClerk = _signOutClerk;
  router = _router;
};

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.code === "ERR_NETWORK") {
      toast.error("Please check your network", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return Promise.reject(error);
    }

    const response = error.response;
    if (!response) return Promise.reject(error);

    if (response.status === 500) {
      toast.error("Error in server, please try again", {
        position: toast.POSITION.TOP_RIGHT,
      });

      return Promise.reject(error);
    }

    if (response.status === 403) {
      toast.error("Forbidden, please login", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return Promise.reject(error);
    }

    if (
      response.status === 404 &&
      response.data.message === "Not found key token"
    ) {
      handleLogout();
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (response.status === 401) {
      if (originalRequest.method === "post") {
        return Promise.reject(error);
      }

      if (!isRefresh && !originalRequest._retry) {
        isRefresh = true;

        const { status } = await getRefreshToken();
        if (status === 200) {
          isRefresh = false;

          originalRequest._retry = true;
          return Promise.resolve(http(originalRequest));
        }
      } else {
        handleLogout();
      }
    }

    return Promise.reject(error);
  }
);

export { AxiosGet, AxiosPost, AxiosPatch, AxiosDelete };
