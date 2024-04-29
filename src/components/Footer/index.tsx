import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { LOGO } from "~/configs/images";

function Footer() {
    return (
        <footer className="bg-[#ece5dd]">
            <div className="container__cus py-10">
                <Link href="/" className="block w-[140px] pb-5">
                    <img
                        src={LOGO}
                        alt="Logo"
                        title="Logo"
                        className="w-100"
                        width="auto"
                        height="auto"
                        loading="lazy"
                    />
                </Link>

                <div className="flex lg:flex-nowrap flex-wrap items-start justify-between gap-5">
                    <div className="sm:block hidden lg:w-3/12 sm:w-4/12 w-full">
                        <div>
                            <p className="text-base text-justify">
                                Thương hiệu thời trang MARC - CÔNG TY CỔ PHẦN
                                SẢN XUẤT THƯƠNG MẠI NÉT VIỆT
                            </p>
                            <p className="text-base text-justify">
                                Địa chỉ: Tầng 15.06 Tòa nhà Văn phòng Golden
                                King, Số 15 Nguyễn Lương Bằng, Phường Tân Phú,
                                Quận 7, Tp. HCM
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-2/12 sm:w-4/12 w-full">
                        <h3 className="text-lg font-medium mb-2">
                            Về chúng tôi
                        </h3>

                        <ul>
                            <li>
                                <Link
                                    href={"/"}
                                    className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}>
                                    Giới thiệu MARC
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}>
                                    Tuyển dụng
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:w-2/12 sm:w-4/12 w-full">
                        <h3 className="text-lg font-medium mb-2">
                            Hỗ trợ khách hàng
                        </h3>

                        <ul>
                            <li>
                                <Link
                                    href={"/"}
                                    className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}>
                                    Câu hỏi thường gặp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={"/"}
                                    className={`block text-base text-[#1e1e1e] hover:text-primary whitespace-nowrap transition-all ease-linear duration-100`}>
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
                                    className={`text-base text-[#1e1e1e] hover:text-primary hover:underline whitespace-nowrap transition-all ease-linear duration-100`}>
                                    0946003423
                                </Link>
                            </li>
                            <li>
                                <span>Email: </span>
                                <Link
                                    href={"mailto:phamtrangiaan27@gmail.com"}
                                    className="text-base text-[#1e1e1e] hover:text-primary hover:underline whitespace-nowrap transition-all ease-linear duration-100">
                                    phamtrangiaan27@gmail.com
                                </Link>
                            </li>
                            <li className="flex items-center my-2 gap-2">
                                <Link href={"/"}>
                                    <FaFacebook className="text-2xl hover:text-primary" />
                                </Link>
                                <Link href={"/"}>
                                    <FaInstagram className="text-2xl hover:text-primary" />
                                </Link>
                                <Link href={"/"}>
                                    <FaYoutube className="text-2xl hover:text-primary" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sm:hidden block w-full">
                        <div>
                            <p className="text-base text-justify">
                                Thương hiệu thời trang MARC - CÔNG TY CỔ PHẦN
                                SẢN XUẤT THƯƠNG MẠI NÉT VIỆT
                            </p>
                            <p className="text-base text-justify">
                                Địa chỉ: Tầng 15.06 Tòa nhà Văn phòng Golden
                                King, Số 15 Nguyễn Lương Bằng, Phường Tân Phú,
                                Quận 7, Tp. HCM
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
