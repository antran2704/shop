import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "~/interfaces";
import DefaultLayout from "~/layouts/DefaultLayout";
import ImageCus from "~/components/Image";
import { useUser, UserProfile, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/router";
import LayoutClose from "~/components/Layout/LayoutClose";
import { AiOutlineClose } from "react-icons/ai";
import { logout } from "~/api-client";
import { TypeShowOrder } from "~/interfaces/order";
import { EOrderStatus } from "~/enums";
import Link from "next/link";
import { formatBigNumber } from "~/helpers/number/fomatterCurrency";
import PrimaryButton from "~/components/Button/PrimaryButton";

const Layout = DefaultLayout;

const typeList: TypeShowOrder[] = [
  {
    title: "Tất cả",
    type: "all",
  },
  {
    title: "Đang chờ xác nhận",
    type: EOrderStatus.PENDING,
  },
  {
    title: "Đang chuẩn bị hàng",
    type: EOrderStatus.PROCESSING,
  },
  {
    title: "Giao thành công",
    type: EOrderStatus.DELIVERED,
  },
  {
    title: "Đã hủy",
    type: EOrderStatus.CANCLE,
  },
];

const AccountPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const { isSignedIn, user } = useUser();

  const [showClerk, setShowClerk] = useState<boolean>(false);
  const [showType, setShowType] = useState<TypeShowOrder[]>(typeList);
  const [selectShowType, setSelectShowType] = useState<TypeShowOrder>(
    typeList[0]
  );
  const onShowClerk = () => {
    setShowClerk(!showClerk);
  };

  const onSelectShowType = (item: TypeShowOrder) => {
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
        <div className="container__cus">
          <div className="flex items-center gap-5">
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
        <div className="mt-5">
          <ul className="flex flex-col gap-5">
            <li className="w-full bg-white rounded-md gap-5">
              <div className="flex md:flex-row flex-col items-center justify-between lg:pb-5 p-5">
                <div className={`flex md:flex-row flex-col items-center gap-5`}>
                  <Link
                    href={`/collections/product`}
                    className="md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]"
                  >
                    <ImageCus
                      src={
                        "https://down-vn.img.susercontent.com/file/0f00b06285ba84d5499fc5c9fc249c03_tn"
                      }
                      title={"order"}
                      alt={"order"}
                      className="w-full h-full object-fill object-center rounded-md"
                    />
                  </Link>

                  <div>
                    <Link
                      href={`/collections/product`}
                      className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2"
                    >
                      product
                    </Link>
                    <p className="w-full text-sm md:text-start text-center">
                      Red
                    </p>
                  </div>
                </div>

                <p className="lg:text-base md:text-sm md:text-start text-center">
                  X 1
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  Đang chờ lấy hàng
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  {formatBigNumber(1230000 as number)}
                  {" VND"}
                </p>
              </div>

              <div className="flex items-center justify-end mt-5 p-5 border-t">
                <PrimaryButton
                  title="Mua lại"
                  type="LINK"
                  className="w-fit text-sm font-medium text-white whitespace-nowrap bg-primary px-5 py-2 border border-primary rounded"
                  path="/cart"
                />
              </div>
            </li>
            <li className="w-full bg-white rounded-md gap-5">
              <div className="flex md:flex-row flex-col items-center justify-between lg:pb-5 p-5">
                <div className={`flex md:flex-row flex-col items-center gap-5`}>
                  <Link
                    href={`/collections/product`}
                    className="md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]"
                  >
                    <ImageCus
                      src={
                        "https://down-vn.img.susercontent.com/file/0f00b06285ba84d5499fc5c9fc249c03_tn"
                      }
                      title={"order"}
                      alt={"order"}
                      className="w-full h-full object-fill object-center rounded-md"
                    />
                  </Link>

                  <div>
                    <Link
                      href={`/collections/product`}
                      className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2"
                    >
                      product
                    </Link>
                    <p className="w-full text-sm md:text-start text-center">
                      Red
                    </p>
                  </div>
                </div>

                <p className="lg:text-base md:text-sm md:text-start text-center">
                  X 1
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  Đang chờ lấy hàng
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  {formatBigNumber(1230000 as number)}
                  {" VND"}
                </p>
              </div>

              <div className="flex items-center justify-end mt-5 p-5 border-t">
                <PrimaryButton
                  title="Mua lại"
                  type="LINK"
                  className="w-fit text-sm font-medium text-white whitespace-nowrap bg-primary px-5 py-2 border border-primary rounded"
                  path="/cart"
                />
              </div>
            </li>
            <li className="w-full bg-white rounded-md gap-5">
              <div className="flex md:flex-row flex-col items-center justify-between lg:pb-5 p-5">
                <div className={`flex md:flex-row flex-col items-center gap-5`}>
                  <Link
                    href={`/collections/product`}
                    className="md:w-[100px] md:h-[100px] md:min-w-[100px] md:min-h-[100px] w-[120px] h-[120px] min-w-[120px] min-h-[120px]"
                  >
                    <ImageCus
                      src={
                        "https://down-vn.img.susercontent.com/file/0f00b06285ba84d5499fc5c9fc249c03_tn"
                      }
                      title={"order"}
                      alt={"order"}
                      className="w-full h-full object-fill object-center rounded-md"
                    />
                  </Link>

                  <div>
                    <Link
                      href={`/collections/product`}
                      className="md:text-base text-sm hover:text-primary md:text-start text-center line-clamp-2"
                    >
                      product
                    </Link>
                    <p className="w-full text-sm md:text-start text-center">
                      Red
                    </p>
                  </div>
                </div>

                <p className="lg:text-base md:text-sm md:text-start text-center">
                  X 1
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  Đang chờ lấy hàng
                </p>
                <p className="lg:text-base md:text-sm md:text-start text-center">
                  {formatBigNumber(1230000 as number)}
                  {" VND"}
                </p>
              </div>

              <div className="flex items-center justify-end mt-5 p-5 border-t">
                <PrimaryButton
                  title="Mua lại"
                  type="LINK"
                  className="w-fit text-sm font-medium text-white whitespace-nowrap bg-primary px-5 py-2 border border-primary rounded"
                  path="/cart"
                />
              </div>
            </li>
          </ul>
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
