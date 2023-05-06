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

const Dashboard = () => {
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
        axios.get(`${config.url_api}todos-assigned/${value.id}`)
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
                    <ListCreatedTodo />
                </div>
                <div className="todo-wrapper">
                    <h1>Vos taches</h1>
                    <div className="todo-section">
                        <div className="todo-card-wrapper">
                            <span>à FAIRE ({todos.length})</span>
                            <div>
                                {todos.map((item: any) => {
                                    return <CardTodo key={item._id} id={item._id} title={item.title} status={item.status} description={item.description} />
                                })}
                            </div>
                        </div>
                        <div className="todo-card-wrapper">
                            <span>EN COURS ({todoInProgress.length})</span>
                            <div>
                                {todoInProgress.map((item: any) => {
                                    return <CardTodo key={item._id} id={item._id} title={item.title} status={item.status} description={item.description} />
                                })}
                            </div>
                        </div>
                        <div className="todo-card-wrapper">
                            <span>TERMINé ({todoDones.length})</span>
                            <div>
                                {todoDones.map((item: any) => {
                                    return <CardTodo key={item._id} id={item._id} title={item.title} status={item.status} description={item.description} />
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