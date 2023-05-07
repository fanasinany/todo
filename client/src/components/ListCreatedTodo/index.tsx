import React, { useEffect, useState } from 'react'
import "./ListCreatedTodo.scss";
import axios from 'axios';
import config from '../../config';
import { UserContext } from '../../App';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ListCreatedTodo = () => {
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

  return (
    <div className='ListCreatedTodo'>
      <p>Taches que vous avez crées :</p>
      <div className='lc-wrapper'>
        {todoCreated.map((item: any) => {
          return (<div>{item.title}</div>)
        })}
      </div>
    </div>
  )
}

export default ListCreatedTodo