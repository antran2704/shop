import { ReactElement, useCallback, useEffect, useState } from "react";
import { IPagination, NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import ImageCus from "~/components/Image";
import { useUser, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import LayoutClose from "~/components/Layout/LayoutClose";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "~/api-client";
import { IOrder, IOrderSearch, ITypeSelecOrder } from "~/interfaces/order";
import { ENUM_ORDER_STATUS, ESelectOrderStatus } from "~/enums";
import { useAppSelector } from "~/store/hooks";
import OrderItem from "~/components/Order/OrderItem";
import Pagination from "rc-pagination";
import { SpinLoading } from "~/components/Loading";
import { InputText } from "~/components/InputField";
import ListProducts from "~/components/Product/List";
import { useProducts } from "~/hooks/useProducts";
import { getOrders } from "~/api-client/order";
import { IResponseWithPagination } from "~/interfaces/response";
import { initPagination } from "~/data";
import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";
import useDebounce from "~/hooks/useDebounce";

const Layout = DefaultLayout;

const typeList: ITypeSelecOrder[] = [
   {
      title: "Tất cả",
      type: ENUM_ORDER_STATUS.ALL,
   },
   {
      title: "Đang chờ xác nhận",
      type: ENUM_ORDER_STATUS.PENDING,
   },
   {
      title: "Đang chuẩn bị hàng",
      type: ENUM_ORDER_STATUS.PROCESS,
   },
   {
      title: "Giao thành công",
      type: ENUM_ORDER_STATUS.SUCCESS,
   },
   {
      title: "Đã hủy",
      type: ENUM_ORDER_STATUS.CANCEL,
   },
];

const AccountPage: NextPageWithLayout = () => {
   const router = useRouter();
   const {
      page: pageQuery,
      take: takeQuery,
      order: orderQuery,
      search: searchQuery,
      orderStatus: orderStatusQuery,
   } = router.query;

   const { signOut } = useClerk();
   const { isSignedIn, user } = useUser();

   const { products, loadingProducts } = useProducts({
      page: 1,
      take: 16,
      order: ORDER_PARAMATER_ENUM.DESC,
   });

   const [showClerk, setShowClerk] = useState<boolean>(false);
   const [selectShowType, setSelectShowType] = useState<ENUM_ORDER_STATUS>(
      ENUM_ORDER_STATUS.ALL,
   );

   const [orders, setOrders] = useState<IOrder[]>([]);
   const [paramater, setParamter] = useState<IOrderSearch>({
      page: pageQuery ? Number(pageQuery) : 1,
      take: takeQuery ? Number(takeQuery) : 16,
      order: orderQuery
         ? (orderQuery as ORDER_PARAMATER_ENUM)
         : ORDER_PARAMATER_ENUM.DESC,
      search: (searchQuery as string) || "",
      orderStatus: orderStatusQuery as ENUM_ORDER_STATUS,
   });
   const [pagination, setPagiantion] = useState<IPagination>(initPagination);

   const [search, setSearch] = useState<string>(
      paramater.search ? paramater.search : "",
   );

   const newSearch = useDebounce(search, 600);
   const [loading, setLoading] = useState<boolean>(true);

   const onShowClerk = () => {
      setShowClerk(!showClerk);
   };

   const onSearch = (value: string) => {
      setSearch(value);
   };

   const onSelectShowType = async (value: ENUM_ORDER_STATUS) => {
      const newParamater: IOrderSearch = {
         ...paramater,
         page: 1,
         search: "",
         orderStatus: value,
      };
      setSelectShowType(value);
      setParamter(newParamater);
      router.replace({ query: { ...newParamater } });
   };

   const onLogout = async () => {
      await logout();
      signOut();
   };

   const handleGetOrders = async (paramater: IOrderSearch) => {
      setLoading(true);

      await getOrders(paramater)
         .then(({ pagination, payload }: IResponseWithPagination<IOrder[]>) => {
            setOrders(payload);
            setPagiantion(pagination);
         })
         .catch((err) => err);

      setLoading(false);
   };

   useEffect(() => {
      if (newSearch !== paramater.search) {
         setParamter({ ...paramater, search: newSearch.trim(), page: 1 });
         router.replace({ query: { ...paramater, search: newSearch.trim() } });
      }
   }, [newSearch]);

   useEffect(() => {
      handleGetOrders(paramater);
   }, [paramater]);

   useEffect(() => {
      if (!user || !isSignedIn) {
         router.push("/");
      }
   }, [user]);

   return (
      <div className="relative mt-10">
         {user && (
            <div className="container__cus">
               <div className="flex items-center py-10 px-5 bg-white gap-5">
                  <ImageCus
                     alt="avartar"
                     title="avartar"
                     className="md:w-16 md:h-16 w-12 h-12 rounded-full"
                     src={user.imageUrl as string}
                  />

                  <div>
                     <h2 className="font-bold">{user.fullName}</h2>
                     <button
                        className="block hover:text-primary"
                        onClick={onShowClerk}>
                        Chỉnh sửa thông tin
                     </button>
                     <button
                        className="block hover:text-primary hover:underline"
                        onClick={onLogout}>
                        Đăng xuất
                     </button>
                  </div>
               </div>
            </div>
         )}

         <div className="container__cus">
            <div className="w-fit mx-auto">
               <ul className="scrollHidden flex items-center text-base mt-5 bg-white mx-auto rounded-md overflow-x-auto">
                  {typeList.map((item: ITypeSelecOrder, index: number) => (
                     <li
                        key={index}
                        onClick={() => onSelectShowType(item.type)}
                        className={`min-w-fit md:px-10 px-5 py-4 border-b-2 hover:text-primary ${
                           selectShowType === item.type
                              ? "text-primary border-b-primary"
                              : "border-b-transparent"
                        } cursor-pointer`}>
                        {item.title}
                     </li>
                  ))}
               </ul>
               <div className="mt-2">
                  <InputText
                     name="order_id"
                     placeholder="Tìm kiếm với ID đơn hàng..."
                     className="pl-5 pr-10 py-2 outline-none border rounded-md"
                     enableEnter={true}
                     onChange={(e) => onSearch(e.currentTarget.value)}
                     value={search}
                  />
               </div>
            </div>
         </div>

         <div className="container__cus">
            {!loading && orders && (
               <div className="flex flex-col mt-5 gap-8">
                  {orders.map((order: IOrder) => (
                     <OrderItem key={order.order_id} order={order} />
                  ))}
               </div>
            )}

            {!loading && pagination.total > pagination.take && (
               <Pagination
                  current={paramater.page}
                  className="pagination"
                  onChange={(page) => {
                     router.replace({
                        query: { ...router.query, page },
                     });
                     setParamter({ ...paramater, page });
                  }}
                  total={pagination.total}
                  pageSize={pagination.take}
               />
            )}

            {(loading || !orders) && (
               <div className="relative w-full h-[120px] flex items-center justify-center bg-white mt-4">
                  <SpinLoading className="h-8 w-8" />
               </div>
            )}

            {!loading && orders && orders.length === 0 && (
               <div className="w-full min-h-[120px] flex flex-col items-center justify-center bg-white mt-4 p-5">
                  <div className="w-28 h-28">
                     <img
                        title="Image"
                        alt="Image"
                        src="/images/order/no_order.png"
                        className="w-full h-full object-contain"
                     />
                  </div>
                  <p className="text-base font-medium mt-2">
                     Không có đơn hàng
                  </p>
               </div>
            )}
         </div>

         <section className="container__cus py-10">
            <ListProducts
               title="Có thể bạn thích"
               isLoading={loadingProducts}
               items={products}
            />
         </section>

         {showClerk && (
            <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
               <LayoutClose handleClose={onShowClerk} disableScroll={true} />

               <div className="scroll relative flex items-center justify-center overflow-y-auto z-40 ">
                  <button
                     className="absolute top-11 right-16 z-10"
                     onClick={onShowClerk}>
                     <AiOutlineClose className="w-5 h-5 hover:text-primary" />
                  </button>
                  <UserProfile />
               </div>
            </div>
         )}
      </div>
   );
};

export default AccountPage;

AccountPage.getLayout = function getLayout(page: ReactElement) {
   return <Layout>{page}</Layout>;
};
