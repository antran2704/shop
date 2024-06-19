import Link from "next/link";
import { ICartItem, IProductInfo } from "~/interfaces";

import ImageCus from "~/components/Image";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import { AiFillCloseCircle } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getProductInfo } from "~/api-client";

interface Props {
    data: ICartItem;
    showModalConfirm: boolean;
    setSelectItem: Dispatch<SetStateAction<ICartItem | null>>;
    setShowModalConfirm: Dispatch<SetStateAction<boolean>>;
}

const ModalCartItem = (props: Props) => {
    const { data, showModalConfirm, setSelectItem, setShowModalConfirm } =
        props;

    const [infoProduct, setInfoProduct] = useState<IProductInfo>({
        inventory: 1,
        price: 0,
        promotion_price: 0
    });

    const handleGetInfo = async (productId: string) => {
        const { status, payload } = await getProductInfo(productId);

        if (status === 200) {
            setInfoProduct(payload);
        }
    };

    useEffect(() => {
        if (data.variation) {
            handleGetInfo(data.variation._id as string);
        } else {
            handleGetInfo(data.product._id as string);
        }
    }, []);

    return (
        <li>
            <div className="relative flex items-center pb-3 px-2 border-b border-borderColor gap-4">
                <Link
                    href={`/collections/product/${data.product._id}.${data.product.slug}`}
                    className="h-20">
                    <ImageCus
                        src={
                            ((process.env
                                .NEXT_PUBLIC_IMAGE_ENDPOINT as string) +
                                data.product.thumbnail) as string
                        }
                        className="sm:w-[80px] sm:h-[80px] w-[60px] h-[60px] rounded-lg"
                        alt="img"
                        title="img"
                    />
                </Link>
                <Link
                    href={`/collections/product/${data.product._id}.${data.product.slug}`}
                    className="w-6/12">
                    <p className="sm:text-base text-sm font-medium hover:text-primary line-clamp-2">
                        {data.variation
                            ? data.variation.title
                            : data.product.title}
                    </p>
                    {data.variation && (
                        <div className="flex items-center gap-2">
                            {data.variation.options?.join("/")}
                        </div>
                    )}
                    {data.variation && (
                        <p className="sm:text-base text-sm mt-2">
                            {(infoProduct.promotion_price as number) > 0
                                ? formatBigNumber(
                                      infoProduct.promotion_price as number
                                  )
                                : formatBigNumber(
                                      infoProduct.price as number
                                  )}
                            {" VND "}X {data.quantity}
                        </p>
                    )}

                    {!data.variation && (
                        <p className="sm:text-base text-sm mt-2">
                            {(infoProduct.promotion_price as number) > 0
                                ? formatBigNumber(
                                      infoProduct.promotion_price as number
                                  )
                                : formatBigNumber(infoProduct.price as number)}
                            {" VND"}X {data.quantity}
                        </p>
                    )}
                </Link>

                <AiFillCloseCircle
                    onClick={() => {
                        setSelectItem(data);
                        setShowModalConfirm(!showModalConfirm);
                    }}
                    className="absolute top-0 right-2 text-2xl hover:text-primary cursor-pointer"
                />
            </div>
        </li>
    );
};

export default ModalCartItem;
