import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";

import { RootState } from "~/store";
import { handleDeleteProductInCart, GetListCart } from "~/store/actions";

import ProductQuantity from "~/components/ProductQuantity";

interface Props {
  data: any;
  index: number;
}

const CartItem: FC<Props> = (props: Props) => {
  const { data, index } = props;

  const dispatch = useDispatch();
  const { listCarts } = useSelector((state: RootState) => state.data);

  const [totalProduct, setTotalProduct] = useState<number>(data.count);

  const handleDeleteItemCart = () => {
    handleDeleteProductInCart(listCarts, index);
    dispatch(GetListCart());
  };

  useEffect(() => {
    const currentListCarts = [...listCarts];
    currentListCarts[index] = {
      ...data,
      count: totalProduct,
    };
    localStorage.setItem("listCart", JSON.stringify(currentListCarts));
    dispatch(GetListCart());
  }, [totalProduct]);
  return (
    <li className="flex lg:flex-row flex-col items-center justify-between w-full lg:pb-5 p-5 border border-borderColor gap-5">
      <Link href={data.slug} className="lg:w-1/12 sm:w-6/12 w-10/12">
        <img src={data.avatarProduct} alt="image cart" className="w-full" />
      </Link>
      <div className="lg:w-4/12 w-full lg:text-start text-center">
        <Link
          href={data.slug}
          className="text-base font-medium hover:text-primary"
        >
          {data.name}
        </Link>
        <div className="flex items-center lg:justify-start justify-center gap-2">
          {data.size && <span className="text-sm">Size: {data.size}</span>}
          {data.color && <span className="text-sm">Color: {data.color}</span>}
        </div>
      </div>
      <p className="lg:w-1/12 w-full text-base text-center">${data.price}.00</p>
      <div className="lg:w-2/12 w-full">
        <ProductQuantity
          totalProduct={totalProduct}
          setTotalProduct={setTotalProduct}
        />
      </div>
      <p className="lg:w-1/12 w-full text-base text-center">
        ${totalProduct * data.price}.00
      </p>
      <div className="flex items-center justify-center lg:w-1/12 w-full">
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={handleDeleteItemCart}
        />
      </div>
    </li>
  );
};

export default CartItem;
