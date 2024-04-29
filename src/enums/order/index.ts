export enum EOrderStatus {
    PENDING = "pending",
    CANCLE = "cancle",
    PROCESSING = "processing",
    DELIVERED = "delivered"
}

export enum ESelectOrderStatus {
    ALL = "all",
    PENDING = "pending",
    CANCLE = "cancle",
    PROCESSING = "processing",
    DELIVERED = "delivered"
}

export enum EPaymentStatus {
    PENDING = "pending",
    CANCLE = "cancle",
    SUCCESS = "success"
}

export enum EPaymentMethod {
    VNPAY = "vnpay",
    COD = "cod",
    BANKING = "banking",
    CASH = "cash",
    CARD = "card"
}
