import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo, ReactElement } from "react";

import { AiOutlineClose, AiFillCheckCircle } from "react-icons/ai";

import Header from "~/components/Header";
import ImageCus from "~/components/Image";
import {
   getProductBySlugStatic,
   getStockProduct,
   getProductsStatic,
   getVariations,
   getOtherProducts,
} from "~/api-client";
import {
   IProduct,
   IProductStock,
   IProductChild,
   NextPageWithLayout,
   ICategoryBreadcrumb,
   ISelectProductOption,
   IListProduct,
} from "~/interfaces";
import { GetStaticProps } from "next";

import DefaultLayout from "~/layouts/DefaultLayout";
import Seo from "~/components/Seo";
import { IBreadcrumbItem } from "~/interfaces/breadcrumb";
import { IResponse, IResponseWithPagination } from "~/interfaces/response";
import { MainInfo, ProductGallery } from "./components";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import ListProducts from "~/components/Product/List";

interface Props {
   product: IProduct;
}

const Layout = DefaultLayout;

const REFRESH_TIME = 60; //Refresh in 1 day

const ProductPage: NextPageWithLayout<Props> = (props: Props) => {
   const { product } = props;

   const router = useRouter();
   const { product_param: slug } = router.query;

   const [productStock, setProductStock] = useState<IProductStock>({
      inventory: 1,
      price: 0,
      promotion_price: 0,
   });

   const [currentImage, setCurrentImage] = useState<string>("");

   const [productChildren, setProductChildren] = useState<IProductChild[]>([]);
   const [productChild, setProductChild] = useState<IProductChild | null>(null);

   const [otherProduct, setOtherProduct] = useState<IListProduct[]>([]);
   const [otherProductLoading, setOtherProductLoading] =
      useState<boolean>(true);

   const [selectOption, setSelectOption] = useState<ISelectProductOption>({});

   const [currentId, setCurrentId] = useState<string | null>(null);

   const [showPopup, setShow] = useState<boolean>(false);

   const breadcrumbs: IBreadcrumbItem[] = useMemo(() => {
      const items: IBreadcrumbItem[] = product.breadcrumbs.map(
         (item: ICategoryBreadcrumb) => ({
            title: item.title,
            path: `/collections/${item.slug}.${item._id}`,
         }),
      );

      return [...items, { title: product.title }];
   }, [product]);

   // const { otherProducts, loadingOtherProducts } = useOtherProducts(
   //    !!product,
   //    (product?.category?._id as string) || "",
   //    product?._id as string,
   //    1,
   // );

   const onChangeOption = (value: ISelectProductOption) => {
      setSelectOption(value);
   };

   const handleChangeImage = (image: string) => {
      setCurrentImage(image);
   };

   const handleGetOtherProduct = async (productId: string) => {
      setOtherProductLoading(true);

      await getOtherProducts([productId], {
         take: 16,
         page: 1,
         order: ORDER_PARAMATER_ENUM.DESC,
      })
         .then(({ payload }: IResponseWithPagination<IListProduct[]>) => {
            setOtherProduct(payload);
         })
         .catch((err) => err);

      setOtherProductLoading(false);
   };

   const handleGetChild = () => {
      const values = Object.values(selectOption);

      const item = productChildren.find((child: IProductChild) => {
         const optitons = child.options;

         return optitons.every((option: string) => values.includes(option));
      });

      if (item) {
         if (item.thumbnail) {
            setCurrentImage(item.thumbnail);
         }

         setProductChild(item);
         handleGetStock(item._id as string);
      }
   };

   const handleGetProductChildren = async (product_id: string) => {
      await getVariations(product_id)
         .then(({ payload }: IResponseWithPagination<IProductChild[]>) => {
            setProductChildren(payload);
         })
         .catch((err) => err);
   };

   const handleGetStock = async (productId: string) => {
      if (productId === currentId) return;

      getStockProduct(productId)
         .then(({ payload }: IResponse<IProductStock>) => {
            setProductStock(payload);
            setCurrentId(productId);
         })
         .catch((err) => err);
   };

   // const hanldeBuyNow = useCallback(async () => {
   //    if (!user || !infor._id) {
   //       openSignIn({ redirectUrl: router.asPath });
   //       return;
   //    }

   //    const keysSelect = Object.keys(selectOption);

   //    if (keysSelect.length !== product.options.length) {
   //       setMessage("Please select options");
   //       return;
   //    }

   //    let data = {} as SendCartItem;

   //    if (variation) {
   //       data = {
   //          product_id: variation.product_id as string,
   //          variation_id: variation._id,
   //          quantity: totalProduct,
   //       };
   //    } else {
   //       data = {
   //          product_id: product._id as string,
   //          variation_id: null,
   //          quantity: totalProduct,
   //       };
   //    }

   //    try {
   //       const { status } = await increaseCart(infor._id as string, data);

   //       if (status === 201) {
   //          mutate(CART_KEY.CART_USER);
   //          mutate(CART_KEY.CART_ITEMS);
   //          router.push("/cart");
   //       }
   //    } catch (error: any) {
   //       if (!error.response) return;

   //       const res = error.response;

   //       if (
   //          res.status === 400 &&
   //          res.data.message === "Quantity order bigger than inventory"
   //       ) {
   //          toast.warning(
   //             "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
   //             {
   //                position: toast.POSITION.TOP_RIGHT,
   //             },
   //          );
   //       }
   //    }
   // }, [selectOption, user, infor, totalProduct, variation]);

   // const hanldeAddCart = useCallback(async () => {
   //    if (!user || !infor._id) {
   //       openSignIn({ redirectUrl: router.asPath });
   //       return;
   //    }

   //    const keysSelect = Object.keys(selectOption);

   //    if (keysSelect.length !== product.options.length) {
   //       setMessage("Please select options");
   //       return;
   //    }

   //    let data = {} as SendCartItem;

   //    if (variation) {
   //       data = {
   //          product_id: variation.product_id as string,
   //          variation_id: variation._id,
   //          quantity: totalProduct,
   //       };
   //    } else {
   //       data = {
   //          product_id: product._id as string,
   //          variation_id: null,
   //          quantity: totalProduct,
   //       };
   //    }

   //    try {
   //       const { status } = await increaseCart(infor._id as string, data);

   //       if (status === 201) {
   //          mutate(CART_KEY.CART_USER);
   //          mutate(CART_KEY.CART_ITEMS);
   //          toast.success("Thêm thành công", {
   //             position: toast.POSITION.TOP_CENTER,
   //          });
   //       }
   //    } catch (error: any) {
   //       if (!error.response) return;

   //       const res = error.response;

   //       if (
   //          res.status === 400 &&
   //          res.data.message === "Quantity order bigger than inventory"
   //       ) {
   //          toast.warning(
   //             "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
   //             {
   //                position: toast.POSITION.TOP_RIGHT,
   //             },
   //          );
   //       }
   //    }
   // }, [selectOption, user, infor, totalProduct, variation]);

   useEffect(() => {
      if (product && product._id) {
         setCurrentImage(product.gallery[0]);
         handleGetProductChildren(product._id);
         handleGetStock(product._id);
         handleGetOtherProduct(product._id);
      }
   }, [slug, product]);

   useEffect(() => {
      if (
         product &&
         product.options.length === Object.keys(selectOption).length
      ) {
         handleGetChild();
      }

      if (
         product &&
         product.options.length !== Object.keys(selectOption).length
      ) {
         handleGetStock(product._id as string);
         setProductChild(null);
      }
   }, [selectOption]);

   return (
      <div>
         <Seo title={product.title} description={product.description} />
         <Header
            title={product.title}
            breadcrumbs={{
               items: breadcrumbs,
            }}
         />

         <section className="container__cus">
            <div className="flex lg:flex-nowrap flex-wrap items-start lg:justify-between justify-center my-14 gap-10">
               {/* content left */}
               <div className="lg:sticky relative lg:top-20 lg:w-5/12 sm:w-10/12 w-full bg-white p-5 rounded-md select-none overflow-hidden">
                  <ProductGallery
                     currentImg={currentImage}
                     product={product}
                     onChangeImg={handleChangeImage}
                  />
               </div>

               {/* content right */}
               <div className="lg:w-7/12 w-full flex flex-col gap-5">
                  {/* <div className="w-full bg-white p-5 rounded-md">
                     <div className="pb-5 mb-5 border-b border-borderColor">
                        <h2 className="lg:text-2xl md:text-xl text-lg font-medium">
                           {!variation ? product.title : variation.title}
                        </h2>

                        <div className="flex flex-wrap items-end my-3 gap-3">
                           {productStock.promotion_price > 0 ? (
                              <Fragment>
                                 <h3 className="md:text-2xl text-lg font-medium text-primary">
                                    {formatBigNumber(
                                       productStock.promotion_price,
                                    )}{" "}
                                    {CURRENCY_CHARACTER}
                                 </h3>
                                 <h3 className="md:text-lg text-lg font-medium text-[#6a7779] line-through">
                                    {formatBigNumber(productStock.price)}{" "}
                                    {CURRENCY_CHARACTER}
                                 </h3>

                                 <sup className="text-xs font-medium text-white px-2 py-1 bg-primary rounded-md">
                                    Giảm{" "}
                                    {getPercentPromotionPrice(
                                       productStock.price,
                                       productStock.promotion_price,
                                    )}
                                    %
                                 </sup>
                              </Fragment>
                           ) : (
                              <h3 className="md:text-2xl text-lg font-medium text-primary">
                                 {formatBigNumber(productStock.price)}{" "}
                                 {CURRENCY_CHARACTER}
                              </h3>
                           )}
                        </div>

                        <p className="md:text-base text-sm text-[#071c1f]">
                           {product.shortDescription}
                        </p>
                     </div>
                     <div className="pb-5 mb-5 border-b border-borderColor">
                        <div className="flex items-center text-sm mb-5">
                           <span className="md:text-base text-sm font-medium min-w-[100px]">
                              Đã bán:
                           </span>
                           {!variation && (
                              <p>{formatBigNumber(product.sold)}</p>
                           )}
                           {variation && (
                              <p>{formatBigNumber(variation.sold)}</p>
                           )}
                        </div>
                        <div className="flex items-center text-sm mb-5">
                           <span className="md:text-base text-sm font-medium min-w-[100px]">
                              Kho:
                           </span>
                           <p>{formatBigNumber(productStock.inventory)}</p>
                        </div>
                     </div>

                     {product._id &&
                        product.options.length > 0 &&
                        product.options.map((option: IOptionProduct) => (
                           <div
                              key={option._id}
                              className="pb-5 mb-5 border-b border-borderColor">
                              <div className="flex items-start mb-5 gap-5">
                                 <span className="md:text-base text-sm font-medium min-w-[100px]">
                                    {option.name}:
                                 </span>
                                 <div className="flex flex-wrap items-center gap-2">
                                    {option.values.map(
                                       (value: string, index: number) => (
                                          <button
                                             key={index}
                                             onClick={() =>
                                                onSelectOption(
                                                   option.code,
                                                   value,
                                                )
                                             }
                                             className={`text-sm px-4 py-1 hover:text-white ${
                                                selectOption[option.code] ===
                                                value
                                                   ? "bg-primary text-white"
                                                   : ""
                                             } hover:bg-primary border border-borderColor rounded-md transition-all ease-linear duration-100 cursor-pointer`}>
                                             {value}
                                          </button>
                                       ),
                                    )}
                                 </div>
                              </div>
                              {message && !selectOption[option.code] && (
                                 <p className="text-base text-red-500">
                                    {message}
                                 </p>
                              )}
                           </div>
                        ))}

                     {product && (
                        <div>
                           {productStock.inventory > 0 ? (
                              <div>
                                 <div className="flex items-center w-full my-5 gap-5">
                                    <span className="md:text-base text-sm font-medium min-w-[100px]">
                                       Số lượng:
                                    </span>
                                    <div className="flex items-center gap-5">
                                       <ProductQuantity
                                          total={totalProduct}
                                          max={productStock.inventory}
                                          setTotalProduct={setTotalProduct}
                                       />
                                       <p className="sm:block hidden text-sm text-nowrap">
                                          {formatBigNumber(
                                             productStock.inventory,
                                          )}{" "}
                                          sản phẩm có sẵn
                                       </p>
                                    </div>
                                 </div>
                                 <div className="flex items-center sm:flex-nowrap flex-wrap gap-3">
                                    <PrimaryButton
                                       title="Add to cart"
                                       Icon={ICON.AiOutlineShoppingCart}
                                       onClick={hanldeAddCart}
                                       className="lg:w-fit w-full min-w-[140px] h-12 md:text-base text-sm hover:text-white text-dark px-4 hover:bg-primary bg-white rounded border hover:border-primary border-dark "
                                       type="BUTTON"
                                    />
                                    <PrimaryButton
                                       title="Buy it now"
                                       className="lg:w-fit w-full min-w-[140px] h-12 md:text-base text-sm text-white bg-primary rounded px-4 gap-2"
                                       type="BUTTON"
                                       onClick={hanldeBuyNow}
                                    />
                                 </div>
                              </div>
                           ) : (
                              <p className="text-base font-medium text-primary">
                                 Sold out
                              </p>
                           )}
                        </div>
                     )}
                  </div>

                  <div className="w-full bg-white p-5 rounded-md">
                     <h3 className="text-lg font-medium min-w-[100px]">
                        Mô tả
                     </h3>

                     <ShowMore maxHeight={140}>
                        <p className="text-base text-justify">
                           {product.description}
                        </p>
                     </ShowMore>
                  </div>

                  {product.specifications.map(
                     (specification: ISpecificationsProduct) => (
                        <div
                           key={specification._id}
                           className="w-full bg-white p-5 rounded-md">
                           <h3 className="text-base font-medium">
                              {specification.name}
                           </h3>

                           <div className="mt-5">
                              {specification.attributes.map(
                                 (
                                    attribute: ISpecificationAttributes,
                                    index: number,
                                 ) => (
                                    <div
                                       key={attribute._id}
                                       className={`flex items-start justify-between pb-2 ${
                                          index !==
                                          specification.attributes.length - 1
                                             ? "mb-5 border-b border-borderColor"
                                             : ""
                                       } gap-5`}>
                                       <h4 className="w-2/4 text-base">
                                          {attribute.name}
                                       </h4>

                                       <ShowMore maxHeight={70}>
                                          <p className="text-base">
                                             {attribute.value}
                                          </p>
                                       </ShowMore>
                                    </div>
                                 ),
                              )}
                           </div>
                        </div>
                     ),
                  )} */}
                  <MainInfo
                     product={product}
                     productChild={productChild}
                     productStock={productStock}
                     selectOption={selectOption}
                     onChangeOption={onChangeOption}
                  />
               </div>
               {/* content right */}
            </div>
         </section>

         <section className="container__cus py-10">
            <ListProducts
               title="Có thể bạn thích"
               isLoading={otherProductLoading}
               items={otherProduct}
            />
         </section>

         {/* popups */}
         {showPopup && (
            <div className="fixed top-0 left-0 right-0 bottom-0 z-30">
               <div
                  className="abosulte w-full h-full z-10"
                  style={{ backgroundColor: "rgba(1, 1, 1, 0.6)" }}
                  onClick={() => setShow(false)}></div>
               <div
                  className="absolute top-[50%] left-[50%] py-6 px-8 min-w-[500px] bg-white shadow-sm rounded-md z-20"
                  style={{ transform: "translate(-50%, -50%)" }}>
                  <AiOutlineClose
                     className="text-2xl ml-auto mb-2 cursor-pointer"
                     onClick={() => setShow(false)}
                  />
                  <div className="flex items-center gap-5">
                     <ImageCus
                        src={product.gallery[0]}
                        alt="image"
                        title="image"
                        className="w-[100px] h-100px"
                     />
                     <div>
                        <h2 className="text-lg font-medium">
                           X. Complementary Product 2
                        </h2>
                        <p className="flex items-center text-lg">
                           <AiFillCheckCircle className="text-xl text-[#28a745]" />
                           Successfully added to your Cart
                        </p>
                        <div className="flex items-center mt-5 gap-5">
                           <Link
                              href={"/cart"}
                              className="flex items-center justify-center text-sm font-medium text-white hover:text-dark bg-primary hover:bg-white px-4 py-2 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100">
                              View cart
                           </Link>
                           <button className="flex items-center justify-center text-sm font-medium text-white bg-dark hover:bg-primary px-4 py-2 transition-all ease-linear border border-transparent duration-100 gap-2">
                              Check out
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProductPage;

ProductPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const product_param: string[] = (params?.product_param as string).split(".");
   const productId: string = product_param[1];

   try {
      const res = await getProductBySlugStatic(productId);
      const product: IProduct = res.payload;

      return {
         props: { product },
         revalidate: REFRESH_TIME,
      };
   } catch (error: any) {
      return {
         props: { product: null },
         revalidate: REFRESH_TIME,
         notFound: true,
      };
   }
};

export async function getStaticPaths() {
   const res = await getProductsStatic();
   const products = await res.payload;

   const paths = products.map((product: IProduct) => ({
      params: { product_param: `${product._id}.${product.slug}` },
   }));

   return { paths, fallback: true };
}
