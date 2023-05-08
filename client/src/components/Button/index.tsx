import React, { FC, ButtonHTMLAttributes } from 'react'
import "./Button.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  deco?: string;
  icon?: JSX.Element;
}

const Button: FC<ButtonProps> = ({ label, deco,icon, ...rest}) => {
  return (
    <button className={`Button ${deco}`} {...rest}>{icon} {label}</button>
  )
}

export default Button;