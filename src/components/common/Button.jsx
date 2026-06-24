import { forwardRef } from "react";

const Button = forwardRef(
  (
    {
      children,
      type = "button",
      variant = "primary",
      size = "md",
      className = "",
      startIcon = null,
      endIcon = null,
      ...props
    },
    ref,
  ) => {
    // <-- 1. Catch the ref argument here
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-[100px] transition-colors duration-200 focus:outline-none font-montserrat font-semibold leading-[150%] text-center";

    const variants = {
      primary: "bg-primary text-white-100 hover:bg-opacity-90",
      secondary: "bg-secondary text-white-100 hover:bg-opacity-90",
      outline:
        "border-2 border-primary text-primary hover:bg-primary hover:text-white-100",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-sm",
    };

    return (
      <button
        ref={ref} // <-- 2. Attach it to the native HTML button element
        type={type}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}>
        {startIcon && (
          <span className="flex shrink-0 items-center justify-center">
            {startIcon}
          </span>
        )}

        <span>{children}</span>

        {endIcon && (
          <span className="flex shrink-0 items-center justify-center">
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

// 3. Set a clean display name for dev tools troubleshooting
Button.displayName = "Button";

export default Button;
