import { Controller, UseFormReturn } from "react-hook-form";
import { InputEmail, InputNumber, InputText } from "~/components/InputField";
import { IOrderAddress } from "~/interfaces/order";

interface Props {
   form: UseFormReturn<IOrderAddress, any, undefined>;
}

const InfoForm = (props: Props) => {
   const { form } = props;

   const {
      control,
      formState: { errors },
   } = form;

   return (
      <div className="flex flex-col gap-3">
         <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
            <Controller
               name="shipping_email"
               control={control}
               render={({ field }) => (
                  <InputEmail
                     placeholder="Email..."
                     error={!!errors.shipping_email}
                     className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                     width="lg:w-8/12 w-full"
                     required={true}
                     errorMsg={errors.shipping_email?.message}
                     {...field}
                  />
               )}
            />
            <Controller
               name="shipping_phone"
               control={control}
               render={({ field: { value, ...rest } }) => (
                  <InputNumber
                     error={!!errors.shipping_phone}
                     placeholder="Số điện thoại..."
                     className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                     width="lg:w-4/12 w-full"
                     value={!!value ? value : ""}
                     required={true}
                     errorMsg={errors.shipping_phone?.message}
                     {...rest}
                  />
               )}
            />
         </div>
         <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
            <Controller
               name="shipping_name"
               control={control}
               render={({ field }) => (
                  <InputText
                     placeholder="Tên..."
                     error={!!errors.shipping_name}
                     errorMsg={errors.shipping_name?.message}
                     className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                     width="w-full"
                     required={true}
                     {...field}
                  />
               )}
            />
         </div>
         <div className="flex lg:flex-nowrap flex-wrap w-full items-center justify-between gap-3">
            <Controller
               name="shipping_address"
               control={control}
               render={({ field }) => (
                  <InputText
                     placeholder="Địa chỉ..."
                     error={!!errors.shipping_address}
                     errorMsg={errors.shipping_address?.message}
                     className="h-10 px-4 border border-[#e5e5e5] rounded-md"
                     width="w-full"
                     required={true}
                     {...field}
                  />
               )}
            />
         </div>
      </div>
   );
};

export default InfoForm;
