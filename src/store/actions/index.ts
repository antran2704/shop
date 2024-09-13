import { createAction } from "@reduxjs/toolkit";

export const GetListCart = createAction<void>("GetListCart");
export const ClearCarts = createAction<void>("ClearCarts");

export const handleDeleteProductInCart = (listCarts: any[], index: number) => {
   let currentListCarts: any[] = [...listCarts];

   if (currentListCarts.length > 1) {
      currentListCarts.splice(index, currentListCarts.length - 1);
   } else {
      currentListCarts = [];
   }
   localStorage.setItem("listCart", JSON.stringify(currentListCarts));
};
