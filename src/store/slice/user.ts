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
      avartar: null,
   },
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      updateInforUserReducer: (state, action) => {
         state.infor = action.payload;
      },
      logoutReducer: (state) => {
         state.infor = initialState.infor;
      },
   },
});

export const getUser = (state: RootState) => state.user;

export const { updateInforUserReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
