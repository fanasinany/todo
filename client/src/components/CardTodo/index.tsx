import React, { FC, useState } from 'react';
import "./CardTodo.scss";
import { UserContext } from '../../App';
import axios from 'axios';
import config from '../../config';
import { toast } from 'react-toastify';
import Cookies from "universal-cookie";
import Modal from 'react-modal';
import MaterialSymbolsClose from '../../assets/Icons/MaterialSymbolsClose';
const cookies = new Cookies();
interface CardTodoProps {
    id: string;
    title: string;
    description?: string;
    status: string;
    nameCreated: string;
    fetchAllToDo: () => void;
}

const CardTodo: FC<CardTodoProps> = ({ id, title, description, status, nameCreated, fetchAllToDo }) => {
    const value = React.useContext(UserContext)

    const headers = {
        Authorization: 'Bearer ' + cookies.get("TOKEN") || ""
    }

    const clickArrowToRight = () => {
        const statusUpdated = (status === "INPROGRESS" ? "TODO" : "INPROGRESS")
        changeStatusTodo(statusUpdated)
    }

    const clickArrowToLeft = () => {
        const statusUpdated = (status === "TODO" ? "INPROGRESS" : "DONE")
        changeStatusTodo(statusUpdated)
    }

    const changeStatusTodo = (statusUpdated: string) => {
        if (status !== statusUpdated) {
            axios.put(`${config.url_api}todos/${id}`, { status: statusUpdated }, { headers })
                .then(() => {
                    toast.success("Status d'une taché changée avec succes");
                    fetchAllToDo()
                })
                .catch((error) => {
                    console.log(error)
                    toast.error("Une erreur se produit");
                })
        }
    }

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            border: 'none',
            borderRadius: '8px',
        },
    };

    return (
        <>
            <div className='CardTodo' onClick={() => openModal()}>
                <div className='arrow-wrapper'>
                    {(status === "DONE" || status === "INPROGRESS") &&
                        <span onClick={() => clickArrowToRight()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z" /></svg>
                        </span>
                    }
                    {(status === "TODO" || status === "INPROGRESS") &&
                        <span onClick={() => clickArrowToLeft()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z" /></svg>
                        </span>
                    }
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
                <p className='created-by'>Crée par <span>{value.name !== nameCreated ? nameCreated : "vous"}</span></p>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                shouldCloseOnOverlayClick={false}
                contentLabel="Details d'un tache"
            >
                <div className='details-wrapper'>
                    <button className='close-modal' onClick={closeModal}><MaterialSymbolsClose /></button>
                    <h3>Tache {id}</h3>
                    <p><span>Title :</span> {title}</p>
                    <p><span>Description :</span> {description}</p>
                    <p><span>Crée par</span> <strong>{value.name !== nameCreated ? nameCreated : "vous"}</strong></p>
                    <div>
                        <p><span>Status :</span></p>
                        <div className='status-selector'>
                            <div onClick={() => changeStatusTodo("TODO")} className={`${status === "TODO" && "active"}`}>
                                à faire
                            </div>
                            <div onClick={() => changeStatusTodo("INPROGRESS")} className={`${status === "INPROGRESS" && "active"}`}>
                                En cours
                            </div>
                            <div onClick={() => changeStatusTodo("DONE")} className={`${status === "DONE" && "active"}`}>
                                Términé
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CardTodo