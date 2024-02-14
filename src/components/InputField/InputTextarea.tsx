import { FC, FormEvent, KeyboardEvent, memo } from "react";
import { TippyInfor } from "../Tippy";
import { ITextarea } from "~/interfaces";

const InputTextareaField: FC<ITextarea> = (props: ITextarea) => {
  const {
    id,
    title,
    className,
    name,
    placeholder,
    value,
    width,
    cols = 30,
    rows = 6,
    infor = null,
    readonly = false,
    required = false,
    enableEnter = false,
    error,
    onEnter,
    getValue,
  } = props;

  const handleChangeValue = (e: FormEvent<HTMLTextAreaElement>) => {
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

  const onKeyUp = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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

      <textarea
        required={required}
        className={`w-full ${className ? className : ""} ${
          error && "border-error"
        } ${
          readonly ? "pointer-events-none cursor-not-allowed opacity-80" : ""
        }`}
        name={name}
        value={value}
        onInput={handleChangeValue}
        onKeyUp={(e) => {
          if (enableEnter) {
            onKeyUp(e);
          }
        }}
        placeholder={placeholder}
        cols={cols}
        rows={rows}
      ></textarea>
    </div>
  );
};

export default memo(InputTextareaField);
