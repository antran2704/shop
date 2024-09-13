interface IUserInfor {
   _id: string | null;
   name: string;
   email: string;
   avartar: string | null;
}

interface IInforCheckout {
   email: string;
   phoneNumber: string;
   name: string;
   address: string;
}

export type { IUserInfor, IInforCheckout };
