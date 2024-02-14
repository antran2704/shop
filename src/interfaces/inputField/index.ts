interface IInput {
    id?: string | null;
    title?: string;
    width?: string;
    className?: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    value?: string;
    error?: boolean;
    readonly?: boolean;
    enableEnter?: boolean;
    required?: boolean;
    infor?: string | null;
    onEnter?: () => void;
  }
  
  interface IInputText extends IInput {
    getValue?: (name: string, value: string, id?: string) => void;
  }
  
  interface IInputNumber extends IInput {
    getValue?: (name: string, value: number, id?: string) => void;
  }
  
  interface ITextarea extends IInput {
    cols?: number;
    rows?: number;
    getValue?: (name: string, value: string, id?: string) => void;
  }
  
  export type { IInputText, IInputNumber, ITextarea };
  