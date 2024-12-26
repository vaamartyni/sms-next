// components/Button.tsx
import React from "react";
import styles from "./button.module.scss";

type ButtonProps = {
    onClick?: () => void;
    children: React.ReactNode;
    size?: "small" | "medium" | "large"; // Button sizes
    variant?: "primary" | "secondary"; // Button variants
    className?: string; // Additional class names
    type?: "submit" | "reset" | "button";
    disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           children,
                                           size = "large",
                                           variant = "primary",
                                           className,
    disabled,
    type
                                       }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={`${styles.button} ${styles[size]} ${styles[variant]} ${
                className || ""
            }`}
        >
            {children}
        </button>
    );
};

export default Button;
