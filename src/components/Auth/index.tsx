import Link from "next/link";
import ImageCus from "~/components/Image";

const AuthNavbar = () => {
    return (
        <div className="group relative">
            <div className="cursor-pointer">
                <ImageCus
                    title="Avartar"
                    alt="Avartar"
                    src="https://i.pinimg.com/originals/d2/f1/ea/d2f1ea50a33eade221eae05c430a59eb.jpg"
                    className="min-w-10 w-10 h-10 rounded-full"
                />
            </div>

            <div className="absolute after:absolute after:-top-4 after:left-0 after:right-0 after:h-4 after:bg-transparent  bg-white -right-2 top-[110%] min-w-[150px] group-hover:top-full opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto rounded-md shadow-lg border transition-all ease-linear duration-100 ">
                <ul className="overflow-hidden">
                    <li className="w-full hover:bg-[#e5e5e5]">
                        <Link
                            href="/"
                            className="block w-full px-5 py-1 capitalize">
                            setting
                        </Link>
                    </li>
                    <li className="w-full hover:bg-[#e5e5e5]">
                        <Link
                            href="/"
                            className="block w-full px-5 py-1 capitalize">
                            setting
                        </Link>
                    </li>

                    <li className="w-full hover:bg-[#e5e5e5]">
                        <Link
                            href="/"
                            className="block w-full px-5 py-1 border-t capitalize">
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AuthNavbar;
