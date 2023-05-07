import React, { FC, TextareaHTMLAttributes } from 'react'
import "./Textarea.scss"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  error?: boolean;
}

const Textarea: FC<TextareaProps> = ({ name, error, ...rest }) => {
  return (
    <div className='Textarea'>
      {error && <span className='error-input'>* Le champ {name} est requis.</span>}
      <textarea {...rest} />
    </div>
  )
}

export default Textarea;