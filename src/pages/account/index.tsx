import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import ImageCus from "~/components/Image";
import { useUser, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import LayoutClose from "~/components/Layout/LayoutClose";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "~/api-client";
import { Order, TypeShowOrder } from "~/interfaces/order";
import { EOrderStatus, ESelectOrderStatus } from "~/enums";
import Link from "next/link";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import PrimaryButton from "~/components/Button/PrimaryButton";
import { getOrdersByUserId } from "~/api-client/order";
import { useAppSelector } from "~/store/hooks";
import { useOrders } from "~/hooks/useOrder";
import OrderItem from "~/components/Order/OrderItem";

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
  const currentPage = page ? Number(page) : 1;

  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { infor } = useAppSelector((state) => state.user);

  // const [orders, setOrders] = useState<Order[]>([]);

  const [showClerk, setShowClerk] = useState<boolean>(false);
  const [showType, setShowType] = useState<TypeShowOrder[]>(typeList);
  const [selectShowType, setSelectShowType] = useState<TypeShowOrder>(
    typeList[0]
  );

  const { orders, loadingOrders, mutate, pagination } = useOrders(
    !!infor._id,
    infor._id as string,
    selectShowType.type,
    currentPage
  );

  // console.log(orders, loadingOrders, pagination);

  const onShowClerk = () => {
    setShowClerk(!showClerk);
  };

  const onSelectShowType = async (item: TypeShowOrder) => {
    setSelectShowType(item);
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
        <div className="container__cus bg-white">
          <div className="flex items-center py-10 gap-5">
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
        <ul className="scrollHidden flex items-center w-fit text-base mt-10 bg-white mx-auto rounded-md overflow-x-auto">
          {showType.map((item: TypeShowOrder, index: number) => (
            <li
              key={index}
              onClick={() => onSelectShowType(item)}
              className={`min-w-fit px-10 py-4 border-b-2 hover:text-primary ${
                selectShowType.type === item.type
                  ? "text-primary border-b-primary"
                  : "border-b-transparent"
              } cursor-pointer`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="container__cus">
        <div className="flex flex-col mt-5 gap-8">
          {orders.map((order: Order) => (
            <OrderItem key={order.order_id} order={order} />
          ))}
        </div>
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
