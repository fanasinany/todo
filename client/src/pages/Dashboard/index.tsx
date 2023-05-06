import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import Header from "../../components/Header";
import FormCreateTodo from "../../components/FormCreateTodo";
import ListCreatedTodo from "../../components/ListCreatedTodo";
import axios from "axios";
import config from "../../config";
import { UserContext } from "../../App";
import CardTodo from "../../components/CardTodo";

const Dashboard = () => {
    const value = React.useContext(UserContext)

    const [todos, setTodos] = useState([]);
    const [todoInProgress, setTodoInProgress] = useState([]);
    const [todoDones, setTodoDones] = useState([]);

    useEffect(() => {
        axios.get(`${config.url_api}todos-assigned/${value.id}`)
            .then((res) => {
                setTodos(res.data.filter((item: { status: string; }) => item.status === "TODO"))
                setTodoInProgress(res.data.filter((item: { status: string; }) => item.status === "INPROGRESS"))
                setTodoDones(res.data.filter((item: { status: string; }) => item.status === "DONE"))
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <div className="Dashboard">
            <Header />
            <div className="body-wrapper container">
                <div className="add-todo-wrapper">
                    <FormCreateTodo />
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