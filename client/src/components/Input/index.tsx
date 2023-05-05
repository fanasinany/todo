import React, { FC, InputHTMLAttributes } from 'react'
import "./Input.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input:FC<InputProps> = ({name, ...rest}) => {
  return (
    <div className='input-wrapper'>
      <input {...rest}/>
    </div>
  )
}

export default Input;