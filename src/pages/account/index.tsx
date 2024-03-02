import { ReactElement, useCallback, useEffect, useState } from "react";
import { NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import ImageCus from "~/components/Image";
import { useUser, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import LayoutClose from "~/components/Layout/LayoutClose";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "~/api-client";
import { Order, TypeShowOrder } from "~/interfaces/order";
import { ESelectOrderStatus } from "~/enums";
import { useAppSelector } from "~/store/hooks";
import { useOrders } from "~/hooks/useOrder";
import OrderItem from "~/components/Order/OrderItem";
import Pagination from "rc-pagination";
import { SpinLoading } from "~/components/Loading";
import { InputText } from "~/components/InputField";

const Layout = DefaultLayout;

const typeList: TypeShowOrder[] = [
  {
    title: "Tất cả",
    type: ESelectOrderStatus.ALL,
  },
  {
    title: "Đang chờ xác nhận",
    type: ESelectOrderStatus.PENDING,
  },
  {
    title: "Đang chuẩn bị hàng",
    type: ESelectOrderStatus.PROCESSING,
  },
  {
    title: "Giao thành công",
    type: ESelectOrderStatus.DELIVERED,
  },
  {
    title: "Đã hủy",
    type: ESelectOrderStatus.CANCLE,
  },
];

const AccountPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { page } = router.query;
  const [currentPage, setCurrentPage] = useState<number>(
    page ? Number(page) : 1
  );

  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { infor } = useAppSelector((state) => state.user);

  const [showClerk, setShowClerk] = useState<boolean>(false);
  const [selectShowType, setSelectShowType] = useState<TypeShowOrder>(
    typeList[0]
  );

  const [filter, setFilter] = useState<
    Partial<Pick<Order, "order_id"> & { status: ESelectOrderStatus }>
  >({ status: selectShowType.type });
  const [orderId, setOrderId] = useState<string | null>(null);

  const { orders, loadingOrders, pagination } = useOrders(
    !!infor._id,
    infor._id as string,
    filter,
    currentPage
  );

  const onShowClerk = () => {
    setShowClerk(!showClerk);
  };

  const onSearch = useCallback(
    (name: string, value: string) => {
      if (!value) {
        setFilter({ status: ESelectOrderStatus.ALL });
        setOrderId(null);
      } else {
        setOrderId(value);
      }

      if (router.query.page && router.query.page !== "1") {
        router.replace({ query: {} });
        setCurrentPage(1);
      }
    },
    [orderId]
  );

  const handleSearch = useCallback(() => {
    if (!orderId) return;

    setFilter({ status: ESelectOrderStatus.ALL, order_id: orderId });
  }, [orderId, filter]);

  const onSelectShowType = async (item: TypeShowOrder) => {
    setSelectShowType(item);
    setFilter({ ...filter, status: item.type });

    if (router.query.page && router.query.page !== "1") {
      router.replace({ query: {} });
      setCurrentPage(1);
    }
  };

  const onLogout = () => {
    logout();
    signOut();
  };

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
                onClick={onShowClerk}
              >
                Chỉnh sửa thông tin
              </button>
              <button
                className="block hover:text-primary hover:underline"
                onClick={onLogout}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container__cus">
        <div className="w-fit mx-auto">
          <ul className="scrollHidden flex items-center text-base mt-5 bg-white mx-auto rounded-md overflow-x-auto">
            {typeList.map((item: TypeShowOrder, index: number) => (
              <li
                key={index}
                onClick={() => onSelectShowType(item)}
                className={`min-w-fit md:px-10 px-5 py-4 border-b-2 hover:text-primary ${
                  selectShowType.type === item.type
                    ? "text-primary border-b-primary"
                    : "border-b-transparent"
                } cursor-pointer`}
              >
                {item.title}
              </li>
            ))}
          </ul>
          {selectShowType.type === ESelectOrderStatus.ALL && (
            <div className="mt-2">
              <InputText
                name="order_id"
                placeholder="Tìm kiếm với ID đơn hàng..."
                className="pl-5 pr-10 py-2 outline-none border rounded-md"
                enableEnter={true}
                enableClearAll={orderId ? true : false}
                getValue={onSearch}
                value={orderId || ""}
                onEnter={handleSearch}
              />
            </div>
          )}
        </div>
      </div>

      <div className="container__cus">
        {!loadingOrders && orders && (
          <div className="flex flex-col mt-5 gap-8">
            {orders.map((order: Order) => (
              <OrderItem key={order.order_id} order={order} />
            ))}
          </div>
        )}

        {!loadingOrders && pagination.totalItems > pagination.pageSize && (
          <Pagination
            current={currentPage}
            className="pagination"
            onChange={(page) => {
              router.replace({ query: { ...router.query, page } });
              setCurrentPage(page);
            }}
            total={pagination.totalItems}
            pageSize={pagination.pageSize}
          />
        )}

        {(loadingOrders || !orders) && (
          <div className="w-full h-[120px] flex items-center justify-center bg-white mt-4">
            <SpinLoading className="h-8 w-8" />
          </div>
        )}

        {!loadingOrders && orders && orders.length === 0 && (
          <div className="w-full min-h-[120px] flex flex-col items-center justify-center bg-white mt-4 p-5">
            <div className="w-28 h-28">
              <img
                title="Image"
                alt="Image"
                src="/images/order/no_order.png"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-base font-medium mt-2">Không có đơn hàng</p>
          </div>
        )}
      </div>

      {showClerk && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center z-50">
          <LayoutClose handleClose={onShowClerk} disableScroll={true} />

          <div className="scroll relative flex items-center justify-center overflow-y-auto z-40 ">
            <button
              className="absolute top-11 right-16 z-10"
              onClick={onShowClerk}
            >
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
