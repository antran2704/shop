import Link from "next/link";
import { FC, Fragment } from "react";
import { AiFillStar } from "react-icons/ai";
import percentPromotionPrice from "~/helpers/percentPromotionPrice";
import { IProduct } from "~/interfaces/apiResponse";

interface Props {
  productData: IProduct;
}

const ProductItem: FC<Props> = (props: Props) => {
  const { productData } = props;
  return (
    <div className="relative md:p-4 p-3 rounded-md border border-borderColor">
      <Link href={`/collections/product/${productData.slug}`} className="w-ful">
        <img
          src={productData.thumbnail}
          alt="image category"
          className="w-full rounded-xl"
        />
      </Link>
      <p className="md:text-base text-sm font-normal text-[#1e1e1e] text-start mt-3 truncate">
        {productData.name}
      </p>
      {/* <div className="flex items-center my-1">
        {[...new Array(Math.floor(productData.stars))].map(
          (item, index: number) => (
            <AiFillStar key={index} className="text-sm text-[#ffc30e]" />
          )
        )}
        {[...new Array(5 - Math.floor(productData.stars))].map(
          (item, index: number) => (
            <AiFillStar key={index} className="text-sm text-[#dadada]" />
          )
        )}
      </div> */}
      <div className="flex items-center gap-2">
        {productData.promotionPrice && (
          <Fragment>
            <span className="inline-block md:text-base sm:text-sm text-xs text-[#1e1e1e]">
              ${productData.promotionPrice}.00
            </span>
            <span className="inline-block md:text-base sm:text-sm text-xs text-[#666] line-through">
              ${productData.price}.00
            </span>
          </Fragment>
        )}

        {!productData.promotionPrice && (
          <span className="inline-block md:text-base sm:text-sm text-xs text-[#1e1e1e]">
            ${productData.price}.00
          </span>
        )}
      </div>
      <button className="md:w-auto w-full mt-3">
        <Link
          href={`/collections/product/${productData.slug}`}
          className="flex items-center justify-center md:text-base sm:text-sm text-xs font-normal bg-[#f0f0f0] hover:bg-primary text-[#1e1e1e] hover:text-white py-2 md:px-4 px-2 rounded transition-all ease-linear duration-150"
        >
          Select option
        </Link>
      </button>
      {productData.promotionPrice && (
        <span className="absolute top-2 left-2 text-xs font-medium py-0.5 px-2 bg-primary text-white rounded">
          {percentPromotionPrice(productData.price, productData.promotionPrice)}
          %
        </span>
      )}
    </div>
  );
};

export default ProductItem;
