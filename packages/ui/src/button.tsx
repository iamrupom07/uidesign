import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "primary", size = "md", className = "", ...props }, ref) => {
    const baseStyle =
      "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none rounded-md disabled:opacity-50";

    const variantStyles = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-800 text-white hover:bg-gray-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
