import React from 'react'
import "./FormCreateTodo.scss";
import Input from '../Input';
import Button from '../Button';

const FormCreateTodo = () => {
  return (
    <div className='FormCreateTodo'>
      <p>Creer une nouvelle tache</p>
      <form>
        <Input name='title' type='text' placeholder='Titre'/>
        <textarea rows={4} name='description' placeholder='Description'/>
        <Input name='status' type='text' placeholder='Status'/>
        <Input name='assigned' type='text' placeholder='Assigné'/>
        <Button label='Créer la tache' deco='blue'/>
      </form>
    </div>
  )
}

export default FormCreateTodo