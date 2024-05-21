import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", autoFocus, defaultValue, ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`focus-input px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 focus:border-gray-600 duration-200 border-2 border-gray-300 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
      />
    </div>
  );
});

export default Input;
