import React, { FC, InputHTMLAttributes } from 'react'
import "./Input.scss"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  error?: boolean;
  invalidMailError?: boolean;
}

const Input: FC<InputProps> = ({ name, error, invalidMailError, ...rest }) => {
  return (
    <div className='input-wrapper'>
      {error && <span className='error-input'>* Le champ {name} est requis.</span>}
      {invalidMailError && <span className='error-input'>* Votre email est invalide.</span>}
      <input {...rest} />
    </div>
  )
}

export default Input;