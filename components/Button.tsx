"use client";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  type?: "primary" | "secondary" | "white-outline" | "dark-outline";
  size?: "small" | "medium" | "large";
  onClick?: () => void;
};

const Button = ({
  children,
  type = "primary",
  className = "",
  size = "medium",
  onClick,
}: ButtonProps) => {
  // Base styles applied to all buttons
  const baseStyles =
    "font-bold rounded-md transition-all duration-200 active:scale-95";

  // Size styles with responsive breakpoints
  const sizeStyles = {
    small: "px-4 py-1.5 text-xs sm:text-sm",
    medium: "px-5 py-2 text-sm sm:text-base",
    large: "px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 text-base sm:text-lg",
  };

  // Type styles with hover effects
  const typeStyles = {
    primary: "bg-[#3055D4] text-white hover:bg-[#2544b8] active:bg-[#1d3a9e]",
    secondary: "bg-white text-black hover:bg-gray-100 active:bg-gray-200",
    "white-outline":
      "bg-transparent border-2 border-white text-white hover:bg-white hover:text-black",
    "dark-outline":
      "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
  };

  // Combine all classes
  const buttonClasses = `${baseStyles} ${sizeStyles[size]} ${typeStyles[type]} ${className}`;

  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;
