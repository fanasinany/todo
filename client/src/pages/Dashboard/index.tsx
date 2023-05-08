import React, { useEffect, useState } from "react";
import "./Dashboard.scss";
import ListCreatedTodo from "../../components/ListCreatedTodo";
import axios from "axios";
import config from "../../config";
import { UserContext } from "../../App";
import CardTodo from "../../components/CardTodo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../../components/Header";
import Cookies from "universal-cookie";
import FormCreateTodo from "../../components/FormCreateTodo";
import Modal from "react-modal";
import Button from "../../components/Button";
import GridiconsPlus from "../../assets/Icons/GridiconsPlus";
import GridiconsAlignLeft from "../../assets/Icons/GridiconsAlignLeft";
const cookies = new Cookies();

const Dashboard = () => {

    const headers = {
        Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
    }
    const value = React.useContext(UserContext)

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

    const [addModalIsOpen, setIsOpen] = React.useState(false);
    const [listModalIsOpen, setListIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function listOpenModal() {
        setListIsOpen(true);
    }

    function listCloseModal() {
        setListIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            border: 'none',
            borderRadius: '8px',
        },
    };
    return (
        <div className="Dashboard">
            <Header />
            <div className="body-wrapper container">
                <Modal
                    isOpen={addModalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Modal add Todo"
                >
                    <FormCreateTodo fetchAllToDo={fetchAllToDo} closeModal={closeModal} />
                </Modal>
                <Modal
                    isOpen={listModalIsOpen}
                    onRequestClose={listCloseModal}
                    style={customStyles}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Liste des taches"
                >
                    <ListCreatedTodo fetchAllToDo={fetchAllToDo} closeModal={listCloseModal} />
                </Modal>
                <div className="todo-wrapper">
                    <div className="title-buttons">
                        <h1>Vos taches</h1>
                        <div className="group-button">
                            <Button icon={<GridiconsAlignLeft />} onClick={listOpenModal} label="Liste des taches crées" deco="dark" />
                            <Button icon={<GridiconsPlus />} onClick={openModal} label="Creer un tache" deco="blue" />
                        </div>
                    </div>
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
    );
};

export default Dashboard;