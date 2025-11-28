"use client";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

const Button = ({ children, type, className, size, onClick }: ButtonProps) => {
  if (type == "primary") {
    return (
      <button
        onClick={onClick}
        className={`bg-[#3055D4] text-white  font-bold rounded-md ${
          size == "large"
            ? " px-10 py-3 text-[18px]"
            : size == "medium"
            ? "text-[14px] px-5 py-2"
            : ""
        } ${className}`}
      >
        {children}
      </button>
    );
  } else if (type == "white-outline") {
    return (
      <button
        onClick={onClick}
        className={`bg-transparent border border-white text-white font-bold rounded-md ${
          size == "large"
            ? " px-10 py-3 text-[18px]"
            : size == "medium"
            ? "text-[14px] px-5 py-2"
            : ""
        } ${className}`}
      >
        {children}
      </button>
    );
  } else if (type == "dark-outline") {
    return (
      <button
        onClick={onClick}
        className={`bg-transparent border border-black text-black  font-bold rounded-md ${
          size == "large"
            ? " px-10 py-3 text-[18px]"
            : size == "medium"
            ? "text-[14px] px-5 py-2"
            : ""
        }${className}`}
      >
        {children}
      </button>
    );
  } else if (type == "secondary") {
    return (
      <button
        onClick={onClick}
        className={`bg-white text-black font-bold rounded-[10px]  ${
          size == "large"
            ? " px-10 py-3 text-[18px]"
            : size == "medium"
            ? "text-[14px] px-5 py-2"
            : ""
        } ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
