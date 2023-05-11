import React, { FC, useState, useEffect } from 'react';
import Select from 'react-select';
import Input from '../Input';
import "./FormCreateTodo.scss";
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';
import Button from '../Button';
import Cookies from 'universal-cookie';
import Textarea from '../Textarea';
import MaterialSymbolsClose from '../../assets/Icons/MaterialSymbolsClose';
import Task from '../../interfaces/task';
const cookies = new Cookies();

interface FormCreateTodoProps {
  closeModal?: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

const FormCreateTodo: FC<FormCreateTodoProps> = ({ setTodos, closeModal }) => {

  const headers = {
    Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
  }
  const value = React.useContext(UserContext)
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
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChangeStatus(status: any) {
    setStatus(status);
  }

  function handleChangeAssigned(assigned: any) {
    setAssigned(assigned);
  }

  useEffect(() => {
    axios.get(`${config.url_api}users`, { headers })
      .then((res) => {
        const newTab = res.data.map((item: { _id: any; name: any; }) => {
          return { value: item._id, label: item.name }
        })
        setOptionUser(newTab)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const createTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (title === "" || description === "") {
      setTitleError(title === "");
      setDescriptionError(description === "");
    } else {
      setLoading(true)
      axios.post(`${config.url_api}todos`, { title: title, description: description, status: status.value, assigned: assigned.value, created: value.id }, { headers })
        .then((res) => {
          closeModal && closeModal()
          if (assigned.value === value.id) {
            setTodos(current => [...current, res.data])
          }
          toast.success("Tache crée avec succes");
        })
        .catch((error) => {
          toast.error("Erreur lors de la creation de tache");
        })
        .finally(() => setLoading(false))
    }

  }
  return (
    <div className='FormCreateTodo'>
      <button className='close-modal' onClick={closeModal}><MaterialSymbolsClose /></button>
      <p>Creer une nouvelle tache</p>
      <form>
        <Input name='title' type='text' placeholder='Titre' value={title} onChange={(e) => { setTitleError(false); setTitle(e.target.value) }} error={titleError} />
        <Textarea rows={4} name='description' placeholder='Description' value={description} onChange={(e) => { setDescriptionError(false); setDescription(e.target.value) }} error={descriptionError} />
        <Select options={optionStatus} placeholder="Status" value={status}
          onChange={handleChangeStatus} />
        <Select maxMenuHeight={180} menuPlacement='top' options={optionUser} placeholder="Assigné" value={assigned}
          onChange={handleChangeAssigned} />
        <Button type='submit' onClick={(e) => createTodo(e)} label='Créer la tache' deco='blue' loading={loading} disabled={loading} />
      </form>
    </div>
  )
}

export default FormCreateTodo;