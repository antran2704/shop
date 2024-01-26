import { createAction } from "@reduxjs/toolkit";

export const GetListCart = createAction<void>("GetListCart");
export const ClearCarts = createAction<void>("ClearCarts");

// get Categories
export const GetCategories = createAction<any[]>("GetCategories")

export const handleDeleteProductInCart = (
  listCarts: any[],
  index: number
) => {
  let currentListCarts: any[] = [...listCarts];
  
  if (currentListCarts.length > 1) {
    currentListCarts.splice(index, currentListCarts.length - 1);
  } else {
    currentListCarts = [];
  }
  localStorage.setItem("listCart", JSON.stringify(currentListCarts));
};
