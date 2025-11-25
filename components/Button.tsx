"use client";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#3055D4] text-white px-10 py-2 rounded-md text-[18px] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
