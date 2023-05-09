import { ForwardedRef, HTMLAttributes, forwardRef } from "react";

export interface Option {
  label: string;
  value: string;
}

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error: string | undefined;
}

const Select = forwardRef(
  (
    { label, options, error, ...otherProps }: SelectProps,
    ref: ForwardedRef<HTMLSelectElement>,
  ) => {
    return (
      <div className="w-full mb-4">
        <p className="mb-2 ml-2 text-zinc-300 text-sm">{label}</p>
        <select
          ref={ref}
          {...otherProps}
          className="block pl-2 w-full rounded-md border-0 py-2.5 text-gray-900 bg-zinc-300
          shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
           sm:text-sm sm:leading-6"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm ml-2 mt-1">{error}</p>}
      </div>
    );
  },
);

export default Select;
