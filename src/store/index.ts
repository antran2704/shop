import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "~/store/reducer";
import userReducer from "./slice/user";

const store = configureStore({
   reducer: {
      data: rootReducer,
      user: userReducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         immutableCheck: false,
         serializableCheck: false,
      }),
   devTools: true,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
