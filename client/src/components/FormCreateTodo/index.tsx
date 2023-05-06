import React, { useEffect, useState } from 'react'
import "./FormCreateTodo.scss";
import Input from '../Input';
import Button from '../Button';
import Select from 'react-select';
import axios from 'axios';
import config from '../../config';
import { UserContext } from '../../App';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const FormCreateTodo = () => {

  const value = React.useContext(UserContext);
  const optionStatus = [
    { value: 'TODO', label: 'A faire' },
    { value: 'INPROGRESS', label: 'En cours' },
    { value: 'DONE', label: 'Términé' }
  ]

  const [optionUser, setOptionUser] = useState([])

  const [status, setStatus] = useState({ value: 'TODO', label: 'A faire' });
  const [assigned, setAssigned] = useState({ value: value.id, label: value.name });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeStatus(status: any) {
    setStatus(status);
  }

  function handleChangeAssigned(assigned: any) {
    setAssigned(assigned);
  }

  useEffect(() => {
    axios.get(`${config.url_api}users`)
      .then((res) => {
        const newTab = res.data.map((item: { _id: any; name: any; }) => {
          return { value: item._id, label: item.name }
        })
        setOptionUser(newTab)
      })
      .catch(() => {

      })
  }, [])

  const createTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    axios.post(`${config.url_api}todos`, { title: title, description: description, status: status.value, assigned: assigned.value, created: value.id })
      .then(() => {
        toast.success("Tache crée avec succes");
      })
      .catch((error) => {
        toast.error("Erreur lors de la creation de tache");
      })
  }


  return (
    <div className='FormCreateTodo'>
      <p>Creer une nouvelle tache</p>
      <form>
        <Input name='title' type='text' placeholder='Titre' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea rows={4} name='description' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        <Select options={optionStatus} placeholder="Status" value={status}
          onChange={handleChangeStatus} />
        <Select options={optionUser} placeholder="Assigné" value={assigned}
          onChange={handleChangeAssigned} />
        <Button type='submit' onClick={(e) => createTodo(e)} label='Créer la tache' deco='blue' />
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
      />
    </div>
  )
}

export default FormCreateTodo