import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-[#ece5dd] pt-14">
      <section className="container__cus flex flex-col md:items-center items-start justify-center px-5 gap-3">
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
      </section>
      <section className="mt-10 py-10 border-t border-white">
        <div className="container__cus">
          <p className="md:text-lg text-base text-center">
            Copyright<strong> ©Antrandev </strong> All Right Reserved.
          </p>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
