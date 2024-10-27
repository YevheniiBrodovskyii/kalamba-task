import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline-primary" | "outline-secondary" | "outline";
  size?: "sm" | "lg";
  position?: "pull-xs-right";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  variant = "outline-primary",
  position = "pull-xs-right",
  size = "sm",
  icon,
  children,
  ...props
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${position}`;

  return (
    <button className={buttonClass} onClick={onClick} disabled={disabled} {...props}>
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};
