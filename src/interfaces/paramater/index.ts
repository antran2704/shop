import { ORDER_PARAMATER_ENUM } from "~/enums/paramater";

interface ISearch {
   search?: string;
   page: number;
   take: number;
   order: ORDER_PARAMATER_ENUM;
}

export type { ISearch };
