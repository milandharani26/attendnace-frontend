import React, { FC, ReactNode } from 'react';
import { Button } from '@mui/material';  // Assuming you are using MUI's Button

// button proptypes options
// variant = flat | outlined | normal
// icon = add | update | delete | "dont use icon prop if no icon"

interface ButtonCustomProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  variant?: 'text' | 'outlined' | 'contained' | 'flat'; // Adjust based on your UI library
  customClassName?: string;
  disabled?: boolean;
  [key: string]: any;  // For any additional props
}

const ButtonCustom: FC<ButtonCustomProps> = ({
  onClick,
  type = 'submit',
  children,
  variant = 'flat',
  customClassName = '',
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      //   variant={variant}
      type={type}
      className={`${customClassName}`}
      disabled={disabled}
      onClick={onClick}
      // color="black"
      sx={{ backgroundColor: "black", color: "white" }}
      {...rest}
      variant="contained"
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;

