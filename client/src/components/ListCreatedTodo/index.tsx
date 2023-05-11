import React, { FC, useEffect, useState } from 'react'
import "./ListCreatedTodo.scss";
import axios from 'axios';
import config from '../../config';
import { UserContext } from '../../App';
import Cookies from "universal-cookie";
import MaterialSymbolsClose from '../../assets/Icons/MaterialSymbolsClose';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';
import Task from '../../interfaces/task';
const cookies = new Cookies();

interface ListCreatedTodoProps {
  closeModal?: () => void;
  setTodos: React.Dispatch<React.SetStateAction<Task[]>>;
}

const ListCreatedTodo: FC<ListCreatedTodoProps> = ({ setTodos, closeModal }) => {
  const headers = {
    Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
  }
  const value = React.useContext(UserContext)

  const [todoCreated, setTodoCreated] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingDel, setLoadingDel] = useState(false)

  const fetchAllToDoCreated = () => {
    setLoading(true)
    axios.get(`${config.url_api}todos-created/${value.id}`, { headers })
      .then((res) => {
        setTodoCreated(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAllToDoCreated()
  }, [])

  const deleteTodo = (id: any) => {
    setLoadingDel(true)
    axios.delete(`${config.url_api}todos/${id}`, { headers })
      .then((res) => {
        setTodos(current => current.filter(item => item._id != id))
        setTodoCreated(todoCreated.filter((item: any) => item._id !== res.data._id))
        toast.success("Tache supprimé avec succes")
      })
      .catch((error) => {
        toast.error(`Une erreur se produit ${error}`)
      })
      .finally(() => {
        setLoadingDel(false)
      })
  }

  return (
    <div className='ListCreatedTodo'>
      <p>Taches que vous avez crées ({todoCreated.length})</p>
      <button className='close-modal' onClick={closeModal}><MaterialSymbolsClose /></button>
      <div className='lc-wrapper'>
        {!loading ?
          todoCreated.map((item: any) => {
            return (
              <div key={item._id} className='card-created-todo'>
                {!loadingDel ?
                  <>
                    <div>
                      <p className='title'>{item.title} <span className={`status ${item.status}`}>{item.status === "DONE" && "Términé"}{item.status === "TODO" && "A faire"}{item.status === "INPROGRESS" && "En cours"}</span></p>
                      <p className='description'>{item.description}</p>
                      <p className='assigned'>Assigné à <span>{value.name !== item.assigned.name ? item.assigned.name : "vous"}</span></p>
                    </div>
                    <button onClick={() => deleteTodo(item._id)}>
                      <MaterialSymbolsClose />
                    </button>
                  </> :
                  <div className='load-del'>
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="20"
                      visible={true}
                    />
                  </div>
                }

              </div>
            )
          })
          :
          <div className='loading-content-created'>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          </div>}

      </div>
    </div >
  )
}

export default ListCreatedTodo