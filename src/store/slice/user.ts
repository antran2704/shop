import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { IUserInfor } from "~/interfaces";

interface IInitData {
    infor: IUserInfor;
}

const initialState: IInitData = {
    infor: {
        _id: null,
        name: "",
        email: "",
        avartar: null
    }
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateInforUserReducer: (state, action) => {
            state.infor = action.payload;
        }
    }
});

export const getUser = (state: RootState) => state.user;

export const { updateInforUserReducer } = userSlice.actions;
export default userSlice.reducer;
