import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = forwardRef(
  (
    { label, ...otherProps }: InputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="w-full mb-4">
        <p className="mb-2 ml-2 text-zinc-300 text-sm">{label}</p>
        <input
          ref={ref}
          {...otherProps}
          className="block pl-3 w-full rounded-md border-0 py-1.5 text-gray-900 
          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-zinc-300 
           sm:text-sm sm:leading-6"
        />
      </div>
    );
  },
);

export default Input;
