import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#ece5dd]">
      {/* <section className="container__cus flex flex-col md:items-center items-start justify-center px-5 gap-3">
        <Link href="/" className="md:w-[200px] w-[180px] mb-5 md:mx-0 mx-auto">
          <img src="/images/logo.webp" alt="logo image" className="w-100" />
        </Link>
        <div className="flex items-start md:text-lg text-base">
          <span className="font-medium md:w-auto w-[60px]">Address: </span>
          <p className="pl-2">55 Nguyễn Kiệm, phường 3, Quận Gò Vấp, TP.HCM</p>
        </div>
        <div className="flex items-start md:text-lg text-base">
          <span className="font-medium md:w-auto w-[60px]">Phone: </span>
          <a href="tel:0946003423" className="pl-2 hover:underline">
            0946003423
          </a>
        </div>
        <div className="flex items-start md:text-lg text-base">
          <span className="font-medium md:w-auto w-[60px]">Email: </span>
          <a
            href="mailto:phamtrangiaan27@gmail.com"
            className="pl-2 hover:underline"
          >
            phamtrangiaan27@gmail.com
          </a>
        </div>
      </section> */}
      {/* <section className="mt-10 py-10 border-t border-white">
        <div className="container__cus">
          <p className="md:text-lg text-base text-center">
            Copyright<strong> ©Antrandev </strong> All Right Reserved.
          </p>
        </div>
      </section> */}

      <div className="container__cus py-10">
        <Link href="/" className="block w-[140px] pb-5">
          <img src="/images/logo.webp" alt="logo image" className="w-full" />
        </Link>

        <div className="flex lg:flex-nowrap flex-wrap items-start justify-between gap-5">
          <div className="sm:block hidden lg:w-3/12 sm:w-4/12 w-full">
            <div>
              <p className="text-base text-justify">
                Thương hiệu thời trang MARC - CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG
                MẠI NÉT VIỆT
              </p>
              <p className="text-base text-justify">
                Địa chỉ: Tầng 15.06 Tòa nhà Văn phòng Golden King, Số 15 Nguyễn
                Lương Bằng, Phường Tân Phú, Quận 7, Tp. HCM
              </p>
            </div>
          </div>
          <div className="lg:w-2/12 sm:w-4/12 w-full">
            <h3 className="text-lg font-medium mb-2">Về chúng tôi</h3>

            <ul>
              <li>
                <Link
                  href={"/"}
                  className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}
                >
                  Giới thiệu MARC
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-2/12 sm:w-4/12 w-full">
            <h3 className="text-lg font-medium mb-2">Hỗ trợ khách hàng</h3>

            <ul>
              <li>
                <Link
                  href={"/"}
                  className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}
                >
                  Hướng dẫn tạo tài khoản
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-3/12 sm:w-4/12 w-full">
            <h3 className="text-lg font-medium mb-2">Liên lạc</h3>

            <ul>
              <li>
                <span>Đặt hàng: </span>
                <Link
                  href={"tel:0946003423"}
                  className={`text-base text-primary whitespace-nowrap transition-all ease-linear duration-100`}
                >
                  0946003423
                </Link>
              </li>
              <li>
                <span>Email: </span>
                <Link
                  href={"mailto:phamtrangiaan27@gmail.com"}
                  className="text-base text-primary whitespace-nowrap transition-all ease-linear duration-100"
                >
                  phamtrangiaan27@gmail.com
                </Link>
              </li>
              <li className="flex items-center my-2 gap-2">
                <Link href={"/"}>
                    <FaFacebook className="text-2xl"/>
                </Link>
                <Link href={"/"}>
                    <FaInstagram className="text-2xl"/>
                </Link>
                <Link href={"/"}>
                    <FaYoutube className="text-2xl"/>
                </Link>
              </li>
            </ul>
          </div>
          <div className="sm:hidden block w-full">
            <div>
              <p className="text-base text-justify">
                Thương hiệu thời trang MARC - CÔNG TY CỔ PHẦN SẢN XUẤT THƯƠNG
                MẠI NÉT VIỆT
              </p>
              <p className="text-base text-justify">
                Địa chỉ: Tầng 15.06 Tòa nhà Văn phòng Golden King, Số 15 Nguyễn
                Lương Bằng, Phường Tân Phú, Quận 7, Tp. HCM
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
