import React, { FC, useEffect, useState } from 'react'
import "./ListCreatedTodo.scss";
import axios from 'axios';
import config from '../../config';
import { UserContext } from '../../App';
import Cookies from "universal-cookie";
import MaterialSymbolsClose from '../../assets/Icons/MaterialSymbolsClose';
import { toast } from 'react-toastify';
const cookies = new Cookies();

interface ListCreatedTodoProps {
  fetchAllToDo: () => void;
  closeModal?: () => void;
}

const ListCreatedTodo: FC<ListCreatedTodoProps> = ({ fetchAllToDo, closeModal }) => {
  const headers = {
    Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
  }
  const value = React.useContext(UserContext)

  const [todoCreated, setTodoCreated] = useState([])

  const fetchAllToDoCreated = () => {
    axios.get(`${config.url_api}todos-created/${value.id}`, { headers })
      .then((res) => {
        setTodoCreated(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchAllToDoCreated()
  }, [])

  const deleteTodo = (id: any) => {
    axios.delete(`${config.url_api}todos/${id}`, { headers })
      .then((res) => {
        fetchAllToDo()
        setTodoCreated(todoCreated.filter((item: any) => item._id != res.data._id))
        toast.success("Tache supprimé avec succes")
      })
      .catch((error) => {
        toast.error(`Une erreur se produit ${error}`)
      })
  }

  return (
    <div className='ListCreatedTodo'>
      <p>Taches que vous avez crées</p>
      <button className='close-modal' onClick={closeModal}><MaterialSymbolsClose /></button>
      <div className='lc-wrapper'>
        {todoCreated.map((item: any) => {
          return (
            <div key={item._id} className='card-created-todo'>
              <div>
                <p className='title'>{item.title}</p>
                <p className='description'>{item.description}</p>
                <p className='assigned'>Assigné à <span>{value.name !== item.assigned.name ? item.assigned.name : "vous"}</span></p>
              </div>
              <button onClick={() => deleteTodo(item._id)}>
                <MaterialSymbolsClose />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListCreatedTodo