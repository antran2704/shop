/* eslint-disable no-unused-vars */

export enum ENUM_PAYMENT_STATUS {
   CHECKING = "CHECKING",
   PENDING = "PENDING",
   SUCCESS = "SUCCESS",
   FAIL = "FAIL",
}

export enum ENUM_ORDER_STATUS {
   PENDING = "PENDING",
   PROCESS = "PROCESS",
   SHIPPING = "SHIPPING",
   SUCCESS = "SUCCESS",
   CANCEL = "CANCEL",
}

export enum ENUM_PROCESS_ORDER {
   ORDER_TIME = "ORDER_TIME",
   PAYMENT_TIME = "PAYMENT_TIME",
   PROCESS_TIME = "PROCESS_TIME",
   SHIP_TIME = "SHIP_TIME",
   COMPLETED_TIME = "COMPLETED_TIME",
   CANCEL_TIME = "CANCEL_TIME",
}

export enum ENUM_PAYMENT_METHOD {
   COD = "COD",
   CARD = "CARD",
   CASH = "CASH",
   VNPAY = "VNPAY",
   BANKING = "BANKING",
}

export enum ENUM_ORDER_CANCEL_OPTION {
   OUT_OF_STOCK = "OUT_OF_STOCK",
   OTHER = "OTHER",
}

export enum EOrderStatus {
   PENDING = "pending",
   CANCLE = "cancle",
   PROCESSING = "processing",
   DELIVERED = "delivered",
}

export enum ESelectOrderStatus {
   ALL = "all",
   PENDING = "pending",
   CANCLE = "cancle",
   PROCESSING = "processing",
   DELIVERED = "delivered",
}

export enum EPaymentStatus {
   PENDING = "pending",
   CANCLE = "cancle",
   SUCCESS = "success",
}

export enum EPaymentMethod {
   VNPAY = "vnpay",
   COD = "cod",
   BANKING = "banking",
   CASH = "cash",
   CARD = "card",
}
