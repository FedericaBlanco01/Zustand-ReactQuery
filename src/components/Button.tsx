import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

import { tw } from "../tw";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button = forwardRef(
  (
    { label, type = "button", className, ...otherProps }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <button
        ref={ref}
        {...otherProps}
        className={tw(
          "rounded-md bg-zinc-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm min-w-[15%] hover:text-green-500 hover:bg-zinc-500",
          className,
        )}
      >
        {label}
      </button>
    );
  },
);

export default Button;
