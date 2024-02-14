import { FC, FormEvent, KeyboardEvent, memo } from "react";
import { TippyInfor } from "../Tippy";
import { IInputText } from "~/interfaces";

const InputEmail: FC<IInputText> = (props: IInputText) => {
  const {
    id,
    title,
    width,
    className,
    name,
    placeholder,
    value,
    infor = null,
    readonly = false,
    required = false,
    enableEnter = false,
    error,
    onEnter,
    getValue,
  } = props;

  const handleChangeValue = (
    e: FormEvent<HTMLInputElement>
  ) => {
    if (readonly) return;

    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    if (getValue && id) {
      getValue(name, value, id);
    }

    if (getValue) {
      getValue(name, value);
    }
  };

  const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (readonly) return;

    const key = e.key;
    if (key === "Enter" && onEnter) {
      onEnter();
    }
  };

  return (
    <div className={`${width ? width : "w-full"}`}>
      {title && (
        <div className="flex items-center mb-1 gap-2">
          <span
            id={name}
            className="block text-base text-[#1E1E1E] font-medium"
          >
            {title}
          </span>

          {infor && <TippyInfor content={infor} />}
        </div>
      )}

      <input
        required={required}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readonly}
        onKeyUp={(e) => {
          if (enableEnter) {
            onKeyUp(e);
          }
        }}
        onChange={handleChangeValue}
        type="email"
        className={`w-full ${className ? className : ""} ${
          error && "border-error"
        } ${
          readonly ? "pointer-events-none cursor-not-allowed opacity-80" : ""
        }`}
      />
    </div>
  );
};

export default memo(InputEmail);
