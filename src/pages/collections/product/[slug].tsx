import Link from "next/link";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
  Fragment,
  useMemo,
  useCallback,
  ReactElement,
} from "react";

import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  AiOutlineShoppingCart,
  AiOutlineClose,
  AiFillCheckCircle,
} from "react-icons/ai";

import Header from "~/components/Header";
import ImageCus from "~/components/Image";
import ProductQuantity from "~/components/ProductQuantity";
import { getProductBySlug, getProductBySlugStatic, getProducts, getProductsStatic, getVariations } from "~/api-client";
import {
  IBreadcrumb,
  IDataCategory,
  IOptionProduct,
  IProductData,
  ISpecificationAttributes,
  ISpecificationsProduct,
  IValueOption,
  IVariantProduct,
  NextPageWithLayout,
  SendCartItem,
} from "~/interfaces";
import { GetStaticProps } from "next";
import {
  CURRENCY_CHARACTER,
  formatBigNumber,
  getPercentPromotionPrice,
} from "~/helpers/number/fomatterCurrency";
import DefaultLayout from "~/layouts/DefaultLayout";
import ShowMore from "~/components/ShowMore";
import ListProducts from "~/components/Product/List";
import { useOtherProducts } from "~/hooks/useProducts";
import Seo from "~/components/Seo";
import { PrimaryLoading } from "~/components/Loading";
import { useUser, useClerk } from "@clerk/nextjs";
import { CART_KEY, increaseCart } from "~/api-client/cart";
import { useAppSelector } from "~/store/hooks";
import { useSWRConfig } from "swr";
import { toast } from "react-toastify";
import PrimaryButton from "~/components/Button/PrimaryButton";

interface Props {
  product: IProductData;
}

interface ISelectOption {
  [x: string]: string;
}

const Layout = DefaultLayout;

const ICON = {
  AiOutlineShoppingCart: (
    <AiOutlineShoppingCart className="lg:text-2xl text-xl" />
  ),
};

const REFRESH_TIME = 60; //Refresh in 1 day

const ProductPage: NextPageWithLayout<Props> = (props: Props) => {
  const { product } = props;

  const router = useRouter();
  const { slug } = router.query;
  const { infor } = useAppSelector((state) => state.user);

  const { mutate } = useSWRConfig();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [totalProduct, setTotalProduct] = useState<number>(1);
  const [inventory, setInventory] = useState<number>(0);

  const [currentImage, setCurrentImage] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);

  const [variations, setVariations] = useState<IVariantProduct[]>([]);
  const [variation, setVariation] = useState<IVariantProduct | null>(null);

  const [selectOption, setSelectOption] = useState<ISelectOption>({});

  const [showPopup, setShow] = useState<boolean>(false);

  const { otherProducts, loadingOtherProducts } = useOtherProducts(
    !!product,
    product?.category._id as string,
    product?._id as string,
    1,
    { title: "1", slug: "1", thumbnail: "1", price: "1", promotion_price: "1" }
  );

  const onSelectOption = (key: string, value: string) => {
    if (message) {
      setMessage(null);
    }

    if (selectOption[key] === value) {
      let newOption = selectOption;
      delete newOption[key];

      setSelectOption({ ...newOption });
      return;
    }

    setSelectOption({ ...selectOption, [key]: value });
  };

  const getBreadcrumbs = useMemo(
    () =>
      (breadcrumbs: IDataCategory[]): IBreadcrumb[] => {
        return breadcrumbs.map((breadcrumb: IDataCategory) => ({
          label: breadcrumb.title,
          url_path: `/collections/${breadcrumb.slug}.${breadcrumb._id}`,
        }));
      },
    []
  );

  const handleChangeImage = (image: string) => {
    setCurrentImage(image);
  };

  const handleGetVariation = () => {
    const keys = Object.keys(selectOption);
    const values = Object.values(selectOption);

    if (keys.length < product.options.length) {
      setVariation(null);
      setTotalProduct(1);
      setInventory(product.inventory);
      return;
    }

    const item = variations.find((variation: IVariantProduct) => {
      const optitons = variation.options;

      return optitons.every((option: string) => values.includes(option));
    });

    if (item) {
      if (item.thumbnail) {
        setCurrentImage(item.thumbnail);
      }

      setVariation(item);
      setTotalProduct(1);
      setInventory(item.inventory);
    }
  };

  const handleGetVariations = async (product_id: string) => {
    const res = await getVariations(product_id);
    if (res.status === 200) {
      setVariations(res.payload);
    }
  };

  const hanldeBuyNow = useCallback(async () => {
    if (!user || !infor._id) {
      openSignIn({ redirectUrl: router.asPath });
      return;
    }

    const keysSelect = Object.keys(selectOption);

    if (keysSelect.length !== product.options.length) {
      setMessage("Please select options");
      return;
    }

    let data = {} as SendCartItem;

    if (variation) {
      data = {
        product_id: variation.product_id as string,
        variation_id: variation._id,
        quantity: totalProduct,
      };
    } else {
      data = {
        product_id: product._id as string,
        variation_id: null,
        quantity: totalProduct,
      };
    }

    try {
      const { status } = await increaseCart(infor._id as string, data);

      if (status === 201) {
        mutate(CART_KEY.CART_USER);
        router.push("/cart");
      }
    } catch (error: any) {
      if (!error.response) return;

      const res = error.response;

      if (
        res.status === 400 &&
        res.data.message === "Quantity order bigger than inventory"
      ) {
        toast.warning(
          "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  }, [selectOption, user, infor, totalProduct, variation]);

  const hanldeAddCart = useCallback(async () => {
    if (!user || !infor._id) {
      openSignIn({ redirectUrl: router.asPath });
      return;
    }

    const keysSelect = Object.keys(selectOption);

    if (keysSelect.length !== product.options.length) {
      setMessage("Please select options");
      return;
    }

    let data = {} as SendCartItem;

    if (variation) {
      data = {
        product_id: variation.product_id as string,
        variation_id: variation._id,
        quantity: totalProduct,
      };
    } else {
      data = {
        product_id: product._id as string,
        variation_id: null,
        quantity: totalProduct,
      };
    }

    try {
      const { status, payload } = await increaseCart(infor._id as string, data);

      if (status === 201) {
        mutate(CART_KEY.CART_USER);
        toast.success("Thêm thành công", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
    } catch (error: any) {
      if (!error.response) return;

      const res = error.response;

      if (
        res.status === 400 &&
        res.data.message === "Quantity order bigger than inventory"
      ) {
        toast.warning(
          "Bạn đã có sản phẩm này trong giỏ hàng, không thể thêm số lượng",
          {
            position: toast.POSITION.TOP_RIGHT,
          }
        );
      }
    }
  }, [selectOption, user, infor, totalProduct, variation]);

  useEffect(() => {
    if (product && product._id) {
      setCurrentImage(product.gallery[0]);
      handleGetVariations(product._id);
      setInventory(product.inventory);
    }
  }, [slug]);

  useEffect(() => {
    if (product && product.options.length > 0) {
      handleGetVariation();
    }
  }, [selectOption]);

  if (router.isFallback && !product) {
    return <PrimaryLoading />;
  }

  return (
    <div>
      <Seo title={product.title} description={product.description} />
      <Header
        title={product.title}
        breadcrumbs={[
          { label: "Home", url_path: "/" },
          ...getBreadcrumbs(product.breadcrumbs as IDataCategory[]),
          { label: product.title, url_path: "/" },
        ]}
      />

      <section className="container__cus">
        <div className="flex lg:flex-nowrap flex-wrap items-start lg:justify-between justify-center my-14 gap-10">
          <div className="lg:sticky relative lg:top-20 lg:w-5/12 sm:w-10/12 w-full bg-white p-5 rounded-md select-none overflow-hidden">
            <div className="w-full lg:h-[500px] h-[400px] rounded-md overflow-hidden">
              <ImageCus
                title={product.title}
                alt={product.title}
                src={currentImage}
                className="w-full h-full"
              />
            </div>
            <div>
              {/* gallery image */}
              <LightGallery
                elementClassNames="absolute top-0 left-0 right-0 bottom-0"
                speed={500}
                enableSwipe={true}
                plugins={[lgThumbnail, lgZoom]}
              >
                <a href={product.gallery[0]} className="w-1/4">
                  <button className="absolute top-0 left-0 right-0 bottom-0"></button>
                  <ImageCus
                    className="w-full hidden"
                    src={product.gallery[0]}
                    alt={product.title}
                    title={product.title}
                  />
                </a>
                {product.gallery
                  .slice(1, product.gallery.length)
                  .map((image: string, index: number) => (
                    <a
                      href={image}
                      key={index}
                      className="w-[100px] h-[100px] rounded-lg hidden"
                    >
                      <ImageCus
                        className="w-full"
                        src={image}
                        alt={product.title}
                        title={product.title}
                      />
                    </a>
                  ))}
              </LightGallery>

              <Swiper
                className="flex items-center w-full mt-4 gap-2"
                modules={[Navigation]}
                navigation={true}
                slidesPerView={3}
                spaceBetween={10}
                breakpoints={{
                  800: {
                    slidesPerView: 4,
                  },
                }}
              >
                {product.gallery.map((image: string, index: number) => (
                  <SwiperSlide
                    key={index}
                    className="cursor-pointer"
                    onClick={() => handleChangeImage(image)}
                  >
                    <ImageCus
                      title={product.title}
                      alt={product.title}
                      src={image}
                      className={`w-full lg:h-[100px] h-[120px] ${
                        currentImage.includes(image)
                          ? "border-primary"
                          : "border-white"
                      } border-2 rounded-lg`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="lg:w-7/12 w-full flex flex-col gap-5">
            <div className="w-full bg-white p-5 rounded-md">
              <div className="pb-5 mb-5 border-b border-borderColor">
                <h2 className="lg:text-2xl md:text-xl text-lg font-medium">
                  {!variation ? product.title : variation.title}
                </h2>

                {!variation && (
                  <div className="flex flex-wrap items-end my-3 gap-3">
                    {product.promotion_price > 0 ? (
                      <Fragment>
                        <h3 className="md:text-xl text-lg font-medium text-[#6a7779] line-through">
                          {formatBigNumber(product.price)} {CURRENCY_CHARACTER}
                        </h3>
                        <h3 className="md:text-2xl text-lg font-medium">
                          {formatBigNumber(product.promotion_price)}{" "}
                          {CURRENCY_CHARACTER}
                        </h3>
                        <sup className="md:text-sm text-xs font-medium text-white px-2 py-1 bg-primary rounded-md">
                          Save {" "}
                          {getPercentPromotionPrice(
                            product.price,
                            product.promotion_price
                          )}
                          %
                        </sup>
                      </Fragment>
                    ) : (
                      <h3 className="md:text-2xl text-lg font-medium">
                        {formatBigNumber(product.price)} {CURRENCY_CHARACTER}
                      </h3>
                    )}
                  </div>
                )}

                {variation && (
                  <div className="flex flex-wrap items-end my-3 gap-3">
                    {variation.promotion_price > 0 ? (
                      <Fragment>
                        <h3 className="lg:text-2xl md:text-xl text-lg font-medium text-[#6a7779] line-through">
                          {formatBigNumber(variation.price)} {CURRENCY_CHARACTER}
                        </h3>
                        <h2 className="lg:text-3xl md:text-2xl text-lg font-medium">
                          {formatBigNumber(variation.promotion_price)} {CURRENCY_CHARACTER}
                        </h2>
                        <span className="md:text-sm text-xs font-medium text-white px-2 py-0.5 bg-primary rounded-md">
                          Save {" "}
                          {getPercentPromotionPrice(
                            variation.price,
                            variation.promotion_price
                          )}
                          %
                        </span>
                      </Fragment>
                    ) : (
                      <h2 className="lg:text-3xl md:text-2xl text-lg font-medium">
                        {formatBigNumber(variation.price)} {CURRENCY_CHARACTER}
                      </h2>
                    )}
                  </div>
                )}
                <p className="md:text-base text-sm text-[#071c1f]">
                  {product.shortDescription}
                </p>
              </div>
              <div className="pb-5 mb-5 border-b border-borderColor">
                <div className="flex items-center text-sm mb-5">
                  <span className="md:text-base text-sm font-medium min-w-[100px]">
                    Sold:
                  </span>
                  {!variation && <p>{formatBigNumber(product.sold)}</p>}
                  {variation && <p>{formatBigNumber(variation.sold)}</p>}
                </div>
                <div className="flex items-center text-sm mb-5">
                  <span className="md:text-base text-sm font-medium min-w-[100px]">
                    Brand:
                  </span>
                  Brand
                </div>
                <div className="flex items-center text-sm mb-5">
                  <span className="md:text-base text-sm font-medium min-w-[100px]">
                    Inventory:
                  </span>
                  <p>
                    {!variation
                      ? formatBigNumber(product.inventory)
                      : formatBigNumber(variation.inventory)}
                  </p>
                </div>
              </div>

              {product._id &&
                product.options.length > 0 &&
                product.options.map((option: IOptionProduct) => (
                  <div
                    key={option._id}
                    className="pb-5 mb-5 border-b border-borderColor"
                  >
                    <div className="flex items-start mb-5 gap-5">
                      <span className="md:text-base text-sm font-medium min-w-[100px]">
                        {option.name}:
                      </span>
                      <div className="flex flex-wrap items-center gap-2">
                        {option.values.map((value: IValueOption) => (
                          <button
                            key={value._id}
                            onClick={() =>
                              onSelectOption(option.code, value.label)
                            }
                            className={`text-sm px-4 py-1 hover:text-white ${
                              selectOption[option.code] === value.label
                                ? "bg-primary text-white"
                                : ""
                            } hover:bg-primary border border-borderColor rounded-md transition-all ease-linear duration-100 cursor-pointer`}
                          >
                            {value.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    {message && !selectOption[option.code] && (
                      <p className="text-base text-red-500">{message}</p>
                    )}
                  </div>
                ))}

              {product && (
                <div>
                  {inventory > 0 ? (
                    <div>
                      <div className="flex items-center w-full my-5 gap-5">
                        <span className="md:text-base text-sm font-medium min-w-[100px]">
                          Số lượng:
                        </span>
                        <div className="flex items-center gap-5">
                          <ProductQuantity
                            total={totalProduct}
                            max={inventory}
                            setTotalProduct={setTotalProduct}
                          />
                          <p className="sm:block hidden text-sm text-nowrap">
                            {!variation
                              ? formatBigNumber(product.inventory)
                              : formatBigNumber(variation.inventory)}{" "}
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
              <h3 className="text-lg font-medium min-w-[100px]">Mô tả</h3>

              <ShowMore maxHeight={140}>
                <p className="text-base text-justify">{product.description}</p>
              </ShowMore>
            </div>

            {product.specifications.map(
              (specification: ISpecificationsProduct) => (
                <div
                  key={specification._id}
                  className="w-full bg-white p-5 rounded-md"
                >
                  <h3 className="text-base font-medium">
                    {specification.name}
                  </h3>

                  <div className="mt-5">
                    {specification.attributes.map(
                      (attribute: ISpecificationAttributes, index: number) => (
                        <div
                          key={attribute._id}
                          className={`flex items-start justify-between pb-2 ${
                            index !== specification.attributes.length - 1
                              ? "mb-5 border-b border-borderColor"
                              : ""
                          } gap-5`}
                        >
                          <h4 className="w-2/4 text-base">{attribute.name}</h4>

                          <ShowMore maxHeight={70}>
                            <p className="text-base">{attribute.value}</p>
                          </ShowMore>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="container__cus py-10">
        <ListProducts
          title="Có thể bạn thích"
          isLoading={loadingOtherProducts}
          items={otherProducts}
        />
      </section>

      {/* popups */}
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-30">
          <div
            className="abosulte w-full h-full z-10"
            style={{ backgroundColor: "rgba(1, 1, 1, 0.6)" }}
            onClick={() => setShow(false)}
          ></div>
          <div
            className="absolute top-[50%] left-[50%] py-6 px-8 min-w-[500px] bg-white shadow-sm rounded-md z-20"
            style={{ transform: "translate(-50%, -50%)" }}
          >
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
                    className="flex items-center justify-center text-sm font-medium text-white hover:text-dark bg-primary hover:bg-white px-4 py-2 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100"
                  >
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
  try {
    const res = await getProductBySlugStatic(params?.slug as string);
    const product: IProductData = res.payload;

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

  const paths = products.map((product: IProductData) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: true };
}
