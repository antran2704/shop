import Link from "next/link";
import { Fragment } from "react";
import { AiFillStar } from "react-icons/ai";
import {
  CURRENCY_CHARACTER,
  formatBigNumber,
  getPercentPromotionPrice,
} from "~/helpers/number/fomatterCurrency";

import { IProductHome } from "~/interfaces";
import ImageCus from "../Image";

interface Props {
  data: IProductHome;
  hoverScale?: boolean;
}

const ProductItem = (props: Props) => {
  const { data, hoverScale = false } = props;

  return (
    <div
      className={`group relative w-full text-[#1e1e1e] ${
        hoverScale ? "hover:scale-105" : ""
      } hover:shadow-lg border rounded-md overflow-hidden transition-all ease-linear duration-100`}
    >
      <Link
        href={`/collections/product/${data._id}`}
        className="block w-full h-full"
      >
        <ImageCus
          src={data.thumbnail || ""}
          title={data.title}
          alt={data.title}
          className="w-full lg:h-[220px] md:h-[180px] h-[160px]"
        />
        <div className="px-2 py-2">
          <p className="group-hover:text-primary  h-[48px] text-base font-normal line-clamp-2">
            {data.title}
          </p>

          <div className="flex items-center my-1">
            {[...new Array(Math.floor(3))].map((item, index: number) => (
              <AiFillStar key={index} className="text-sm text-[#ffc30e]" />
            ))}
            {[...new Array(5 - Math.floor(3))].map((item, index: number) => (
              <AiFillStar key={index} className="text-sm text-[#dadada]" />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {data.promotion_price > 0 && (
              <Fragment>
                <span className="inline-block md:text-base sm:text-sm text-xs font-medium text-primary">
                  {formatBigNumber(data.promotion_price)} {CURRENCY_CHARACTER}
                </span>
                {/* <span className="inline-block md:text-base sm:text-sm text-xs text-[#666] line-through">
                  {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
                </span> */}
              </Fragment>
            )}

            {!data.promotion_price && (
              <span className="inline-block md:text-base sm:text-sm text-xs font-medium text-primary">
                {formatBigNumber(data.price)} {CURRENCY_CHARACTER}
              </span>
            )}
          </div>
        </div>

        {data.promotion_price > 0 && (
          <div className="absolute top-0 right-0 bg-primary">
            <p className="text-xs text-center font-medium text-white w-10 px-1 py-1">
              {getPercentPromotionPrice(data.price, data.promotion_price)}%
            </p>
          </div>
        )}
      </Link>
    </div>
  );
};

export {ProductItem};
