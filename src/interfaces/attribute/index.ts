interface IAttributeChild {
   _id: string;
   name: string;
}

interface IAttribute {
   _id: string;
   children: IAttributeChild[];
   code: string;
   name: string;
}

export type { IAttribute, IAttributeChild };
