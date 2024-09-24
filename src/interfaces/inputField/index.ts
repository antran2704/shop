import { FormEvent } from "react";

interface IInput {
   title?: string;
   width?: string;
   className?: string;
   name: string;
   defaultValue?: string;
   placeholder?: string;
   value?: string;
   error?: boolean;
   errorMsg?: string;
   readonly?: boolean;
   enableEnter?: boolean;
   enableClearAll?: boolean;
   required?: boolean;
   infor?: string | null;
   onClear?: () => void;
   onEnter?: () => void;
}

interface IInputText extends IInput {
   onChange?: (e: FormEvent<HTMLInputElement>) => void;
}

interface IInputNumber extends IInput {
   onChange?: (value: number) => void;
}

interface ITextarea extends IInput {
   cols?: number;
   rows?: number;
   onChange?: (e: FormEvent<HTMLTextAreaElement>) => void;
}

export type { IInputText, IInputNumber, ITextarea };
