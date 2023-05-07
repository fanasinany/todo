import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import ListCreatedTodo from "../../components/ListCreatedTodo";
import axios from "axios";
import config from "../../config";
import { UserContext } from "../../App";
import CardTodo from "../../components/CardTodo";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from 'react-select';
import Header from "../../components/Header";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Dashboard = () => {

    const headers = {
        Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
    }
    const value = React.useContext(UserContext)

    /* Create Todo */
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
        axios.get(`${config.url_api}users`, { headers })
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
        axios.post(`${config.url_api}todos`, { title: title, description: description, status: status.value, assigned: assigned.value, created: value.id }, { headers })
            .then(() => {
                toast.success("Tache crée avec succes");
                fetchAllToDo()
            })
            .catch((error) => {
                toast.error("Erreur lors de la creation de tache");
            })
    }

    /*List todo */
    const [todos, setTodos] = useState([]);
    const [todoInProgress, setTodoInProgress] = useState([]);
    const [todoDones, setTodoDones] = useState([]);

    const fetchAllToDo = () => {
        axios.get(`${config.url_api}todos-assigned/${value.id}`, { headers })
            .then((res) => {
                setTodos(res.data.filter((item: { status: string; }) => item.status === "TODO"))
                setTodoInProgress(res.data.filter((item: { status: string; }) => item.status === "INPROGRESS"))
                setTodoDones(res.data.filter((item: { status: string; }) => item.status === "DONE"))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchAllToDo()
    }, [])

    return (
        <div className="Dashboard">
            <Header />
            <div className="body-wrapper container">
                <div className="add-todo-wrapper">
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
                            autoClose={2000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss={false}
                            draggable={false}
                            pauseOnHover={false}
                        />
                    </div>
                    <ListCreatedTodo />
                </div>
                <div className="todo-wrapper">
                    <h1>Vos taches</h1>
                    <div className="todo-section">
                        <div className="todo-card-wrapper">
                            <span>à FAIRE ({todos.length})
                                <div className="box-todo">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 9h6M4 5h4M6 5v11a1 1 0 0 0 1 1h5m0-9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1zm0 8a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1z" /></svg>
                                </div>
                            </span>
                            <div>
                                {todos.map((item: any) => {
                                    return <CardTodo key={item._id} fetchAllToDo={fetchAllToDo} id={item._id} title={item.title} status={item.status} description={item.description} nameCreated={item.created.name} />
                                })}
                            </div>
                        </div>
                        <div className="todo-card-wrapper">
                            <span>EN COURS ({todoInProgress.length})
                                <div className="box-inprogress">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M24 4v4m10-1.32l-2 3.464M41.32 14l-3.464 2M44 24h-4m1.32 10l-3.464-2M34 41.32l-2-3.464M24 44v-4m-10 1.32l2-3.464M6.68 34l3.464-2M4 24h4M6.68 14l3.464 2M14 6.68l2 3.464" /></svg>
                                </div>
                            </span>
                            <div>
                                {todoInProgress.map((item: any) => {
                                    return <CardTodo key={item._id} fetchAllToDo={fetchAllToDo} id={item._id} title={item.title} status={item.status} description={item.description} nameCreated={item.created.name} />
                                })}
                            </div>
                        </div>
                        <div className="todo-card-wrapper">
                            <span>TERMINé ({todoDones.length})
                                <div className="box-done">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#ffffff" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z" /></svg>
                                </div>
                            </span>
                            <div>
                                {todoDones.map((item: any) => {
                                    return <CardTodo key={item._id} fetchAllToDo={fetchAllToDo} id={item._id} title={item.title} status={item.status} description={item.description} nameCreated={item.created.name} />
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;