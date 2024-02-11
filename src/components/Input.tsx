import clsx from "clsx";
import { InputProps, TextAreaProps } from "../config/interface";

export function Input({ className, ...props }: InputProps) {
  return (
    <>
      <input
        {...props}
        className={clsx(
          "w-full rounded-md px-3 py-2 ring-1 ring-dark-300 outline-none focus:ring-primary duration-100",
          className
        )}
      />
    </>
  );
}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <>
      <textarea
        {...props}
        className={clsx(
          "w-full rounded-md px-3 py-2 ring-1 ring-dark-300 outline-none focus:ring-primary duration-100 resize-none h-40",
          className
        )}
      ></textarea>
    </>
  );
}
