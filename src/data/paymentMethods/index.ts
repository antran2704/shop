import { EPaymentMethod } from "~/enums";
import { IMethodPayment } from "~/interfaces";

const paymentMethods: IMethodPayment[] = [
    {
        id: 1,
        title: "Thanh toán khi giao hàng (COD)",
        icon: "/payments/cod.svg",
        type: EPaymentMethod.COD
    },
    {
        id: 2,
        title: "Thanh toán Online VNPay",
        icon: "/payments/vnpay_icon.svg",
        type: EPaymentMethod.VNPAY
    },
    {
        id: 3,
        title: "Chuyển khoản qua ngân hàng",
        icon: "/payments/banking.svg",
        type: EPaymentMethod.BANKING
    }
];
export default paymentMethods;
