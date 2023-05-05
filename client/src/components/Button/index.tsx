import React, { FC, ButtonHTMLAttributes } from 'react'
import "./Button.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  deco: string;
}

const Button: FC<ButtonProps> = ({ label, deco, ...rest }) => {
  return (
    <button className={`Button ${deco}`} {...rest}>{label}</button>
  )
}

export default Button;