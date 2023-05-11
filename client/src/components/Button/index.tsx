import React, { FC, ButtonHTMLAttributes } from 'react';
import "./Button.scss";
import { ThreeDots } from 'react-loader-spinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  deco?: string;
  icon?: JSX.Element;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({ label, deco, icon, loading, ...rest }) => {
  return (
    <button className={`Button ${deco}`} {...rest}>
      {loading ? <ThreeDots
        height="40"
        width="40"
        radius="9"
        color="#ffffff"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      /> : <>{icon} {label}</>}
    </button>

  )
}

export default Button;