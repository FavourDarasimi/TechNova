"use client";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: string;
  onClick?: () => void;
};

const Button = ({ children, type, className, onClick }: ButtonProps) => {
  if (type == "primary") {
    return (
      <button
        onClick={onClick}
        className={`bg-[#3055D4] text-white px-10 py-3 font-bold rounded-md text-[18px] ${className}`}
      >
        {children}
      </button>
    );
  } else if (type == "white-outline") {
    return (
      <button
        onClick={onClick}
        className={`bg-transparent border border-white text-white px-10 py-3 font-bold rounded-md text-[18px] ${className}`}
      >
        {children}
      </button>
    );
  } else if (type == "dark-outline") {
    return (
      <button
        onClick={onClick}
        className={`bg-transparent border border-black text-black px-10 py-3 font-bold rounded-md text-[18px] ${className}`}
      >
        {children}
      </button>
    );
  }
};

export default Button;
