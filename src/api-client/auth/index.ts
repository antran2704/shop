import axios from "axios";
import { BASE_URL } from "~/common/api";
import httpConfig from "~/configs/axiosConfig";
import { IUserInfor } from "~/interfaces";

const login = async (email: string) => {
   return await axios
      .post(BASE_URL + "/user/login", { email })
      .then((res) => res.data);
};

const getUser = async () => {
   return await httpConfig.get(BASE_URL + "/user").then((res) => res.data);
};

const createUser = async (payload: Partial<IUserInfor>) => {
   return await axios.post(BASE_URL + "/user", payload).then((res) => res.data);
};

const getRefreshToken = async (refreshToken: string) => {
   return await httpConfig
      .post(BASE_URL + "/refreshToken", {
         refreshToken,
      })
      .then((res) => res.data)
      .then((res) => res.data);
};

const checkUserIsExit = async (userId: string) => {
   return await axios
      .post(BASE_URL + "/private", { userId })
      .then((res) => res.data);
};

const logout = async () => {
   return await axios.post(BASE_URL + "/user/logout").then((res) => res.data);
};

export { checkUserIsExit, createUser, login, getRefreshToken, getUser, logout };
