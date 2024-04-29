import axios from "axios";
import { AxiosGet, AxiosPost } from "~/configs/axiosConfig";
import { IUserInfor } from "~/interfaces";

const login = async (email: string) => {
    return await AxiosPost("/users/login", { email });
};

const getUser = async () => {
    return await AxiosGet("/users");
};

const createUser = async (payload: Partial<IUserInfor>) => {
    return await AxiosPost("/users", payload);
};

const getRefreshToken = async () => {
    return await AxiosGet("/users/refreshToken");
};

const checkUserIsExit = async (userId: string) => {
    return await AxiosPost("/private", { userId });
};

const logout = async () => {
    return await AxiosPost("/users/logout", {});
};

export { checkUserIsExit, createUser, login, getRefreshToken, getUser, logout };
