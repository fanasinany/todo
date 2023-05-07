import React, { FC, InputHTMLAttributes } from 'react'
import "./Input.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
}

const Input: FC<InputProps> = ({ name, error, ...rest }) => {
  return (
    <div className='input-wrapper'>
      {error && <span className='error-input'>* Le champ {name} est requis.</span>}
      <input {...rest} />
    </div>
  )
}

export default Input;