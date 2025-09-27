import React from "react";
import { clsx } from "clsx";

type ButtonProps = {
  children?: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "small" | "medium" | "large";
  customStyle?: string;
  onClick?: () => void;
};

const baseStyle =
  "text-sm w-full text-center font-medium rounded-md transition-colors duration-150 cursor-pointer";
const variants = {
  default: "bg-blue-800 text-white hover:bg-blue-600",
  outline: "border border-black-800 text-black-800 hover:bg-black-50",
  ghost: "bg-transparent text-blue-800 hover:bg-blue-100",
  destructive: "bg-rose-500 text-white hover:bg-rose-600",
};
const sizes = {
  small: "px-3 py-2 text-xs",
  medium: "p-4 text-sm",
  large: "px-6 py-3 text-base",
};

function Button({
  children,
  variant = "default",
  size = "medium",
  customStyle,
  onClick,
}: ButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(baseStyle, variants[variant], sizes[size], customStyle)}
    >
      {children}
    </div>
  );
}

export default Button;
