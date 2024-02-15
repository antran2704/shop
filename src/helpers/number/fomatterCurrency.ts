const CURRENCY_CHARACTER = "VND";

const formatBigNumber = (value: number) => {
  return new Intl.NumberFormat("de-DE").format(value);
};

const getPercentPromotionPrice = (price: number, promotion_price: number) => {
  if (price < promotion_price) {
    return 0;
  }

  return Math.ceil((promotion_price / price) * 100);
};

const revertPriceToString = (value: string) => {
  if (typeof value !== "string") return;

  return value.split(".").join("");
};

const getValueCoupon = (
  subTotal: number,
  couponValue: number,
  couponType: string
) => {
  if (couponType === "percentage") {
    return (subTotal * couponValue) / 100;
  } else {
    return couponValue;
  }
};

export {
  CURRENCY_CHARACTER,
  formatBigNumber,
  revertPriceToString,
  getPercentPromotionPrice,
  getValueCoupon
};
