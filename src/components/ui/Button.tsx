import React, { FC } from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline-primary" | "outline-secondary" | "outline";
  size?: "sm" | "lg";
  position?: "pull-xs-right" | "action-btn";
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  disabled = false,
  variant = "outline-primary",
  position = '',
  size = "sm",
  icon,
  children,
  ...props
}) => {
  const buttonClass = classNames(
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    position
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault();
    }
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      disabled={disabled}
      {...props}
      aria-disabled={disabled} // добавляем атрибут доступности
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </button>
  );
};
