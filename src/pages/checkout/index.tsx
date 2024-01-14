import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";

import { IOrderProduct } from "~/interfaces/apiResponse";

import { AppDispatch, RootState } from "~/store";

import Header from "~/components/Header";

interface IInforCustomer {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  address: string;
  district: string;
}

const initInforCustomer: IInforCustomer = {
  email: "",
  phoneNumber: "",
  firstName: "",
  lastName: "",
  address: "",
  district: "",
};

const CheckOut: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { listCarts, totalPrice } = useSelector(
    (state: RootState) => state.data
  );

  const [inforCusomer, setInforCustomer] =
    useState<IInforCustomer>(initInforCustomer);
  const [isSaveInfor, setSaveInfor] = useState<boolean>(false);

  console.log(isSaveInfor)

  const handleChangeInforCus = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    setInforCustomer({ ...inforCusomer, [name]: value });
  };

  const handleSelectInforCus = (e: ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInforCustomer({ ...inforCusomer, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(isSaveInfor) {
      localStorage.setItem("inforCus", JSON.stringify(inforCusomer));
    }
  };

  useEffect(() => {
    const inforCus: IInforCustomer = JSON.parse(localStorage.getItem("inforCus") || "{}");
    if(inforCus) {
      setInforCustomer(inforCus);
      setSaveInfor(true);
    }
  }, [])

  return (
    <div>
      <Header
        title={"Payment"}
        listBackLinks={[{ title: "Home", link: "/" }]}
      />

      <div className="container__cus">
        <div className="flex lg:flex-row flex-col-reverse items-start justify-between mt-10 gap-10">
          <div className="lg:w-6/12 w-full">
            <h3 className="lg:text-2xl md:text-xl text-lg font-medium mb-3">
              Contact
            </h3>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-3"
            >
              <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                <input
                  type="email"
                  name="email"
                  value={inforCusomer.email}
                  placeholder="Email..."
                  className="lg:w-8/12 w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  required
                  onChange={(e) => handleChangeInforCus(e)}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={inforCusomer.phoneNumber}
                  placeholder="Phone number..."
                  className="lg:w-4/12 w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  required
                  onChange={(e) => handleChangeInforCus(e)}
                />
              </div>
              <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                <input
                  type="text"
                  name="firstName"
                  value={inforCusomer.firstName}
                  placeholder="First name..."
                  className="lg:w-6/12 w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  required
                  onChange={(e) => handleChangeInforCus(e)}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name..."
                  value={inforCusomer.lastName}
                  className="lg:w-6/12 w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  required
                  onChange={(e) => handleChangeInforCus(e)}
                />
              </div>
              <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                <input
                  type="text"
                  name="address"
                  value={inforCusomer.address}
                  placeholder="Address..."
                  className="w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  required
                  onChange={(e) => handleChangeInforCus(e)}
                />
              </div>
              <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
                <select
                  defaultValue={inforCusomer.district}
                  name="district"
                  className="lg:w-full w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                  onChange={(e) => handleSelectInforCus(e)}
                >
                  <option disabled value="District...">
                    Choose your district
                  </option>
                  <option value="test">test</option>
                </select>
                {/* <select
                  defaultValue="District..."
                  className="lg:w-6/12 w-full h-12 px-4 border border-[#e5e5e5] rounded-md"
                >
                  <option disabled value="District...">
                    Choose your district
                  </option>
                  <option value="test">test</option>
                </select> */}
              </div>
              <div className="flex items-center w-full mt-3 cursor-pointer gap-2">
                <input
                  onChange={(e) => setSaveInfor(e.target.checked)}
                  checked={isSaveInfor}
                  type="checkbox"
                  id="checkSaveInfor"
                />
                <label className="cursor-pointer" htmlFor="checkSaveInfor">
                  Save this information for next time
                </label>
              </div>

              <div className="flex lg:flex-nowrap flex-wrap items-center w-full mt-4 sm:gap-5 gap-2">
                <Link
                  href={"/cart"}
                  className="flex items-center justify-center sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap hover:text-dark bg-primary hover:bg-white px-8 py-2 gap-2 border border-primary hover:border-dark transition-all ease-linear duration-100"
                >
                  Return your cart
                </Link>
                <button
                  type="submit"
                  className="flex items-center justify-center sm:w-auto w-full text-lg font-medium text-white whitespace-nowrap bg-dark hover:bg-primary px-8 py-2 transition-all ease-linear border border-transparent duration-100 gap-2"
                >
                  Continute payment
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-5/12 w-full">
            <ul className="scroll flex flex-col lg:max-h-[600px] max-h-[400px] pt-5 overflow-auto gap-6">
              {listCarts.map((cart: IOrderProduct, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between w-full pb-5 border-b border-borderColor gap-4"
                >
                  <div className="flex items-center gap-5">
                    <Link href={cart.slug} className="relative">
                      <span className="flex items-center justify-center absolute -top-2 -right-2 md:w-5 md:h-5 w-4 h-4 text-xs text-white bg-primary rounded-full z-10">
                        {cart.count}
                      </span>
                      <img
                        src={cart.avatarProduct}
                        alt={cart.name}
                        className="w-[60px] h-[60px] border border-borderColor rounded-xl"
                      />
                    </Link>
                    <Link href={cart.slug} className="w-8/12">
                      <h3 className="sm:text-base text-sm font-medium my-0">
                        {cart.name}
                      </h3>
                      <p className="sm:text-sm text-xs">${cart.price}.00</p>
                    </Link>
                  </div>
                  <p className="sm:text-base text-sm font-medium">
                    ${cart.price * cart.count}.00
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between mt-5 gap-5">
              <p className="text-base font-medium">Total:</p>
              <p className="text-base font-medium">${totalPrice}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
