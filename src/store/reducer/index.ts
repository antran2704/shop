import { createReducer } from "@reduxjs/toolkit";
import { ClearCarts,GetListCart } from "../actions";

const initialState: any = {
  listCarts: [],
  categories: [],
  totalCart: 0,
  totalPrice: 0,
};

const rootReducer = createReducer(initialState, (builder) => {
  builder.addCase(GetListCart, (state) => {
    const listCarts = JSON.parse(localStorage.getItem("listCart") || "[]");
    const totalCart = listCarts.reduce((total: number, item: any) => {
      return (total += item.count);
    }, 0);
    const totalPrice = listCarts.reduce(
      (total: number, item: any) => {
        return (total += item.count * item.price);
      },
      0
    );

    state.listCarts = listCarts;
    state.totalCart = totalCart;
    state.totalPrice = totalPrice;
  });

  builder.addCase(ClearCarts, (state) => {
    const newListCarts: [] = [];
    localStorage.setItem("listCart", JSON.stringify(newListCarts));
    state.listCarts = newListCarts;
    state.totalCart = 0;
    state.totalPrice = 0;
  });
});

export default rootReducer;
