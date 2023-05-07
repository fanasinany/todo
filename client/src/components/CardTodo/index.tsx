import React, { FC } from 'react';
import "./CardTodo.scss";
import { UserContext } from '../../App';
interface CardTodoProps {
    id: string;
    title: string;
    description?: string;
    status: string;
    nameCreated: string
}

const CardTodo: FC<CardTodoProps> = ({ id, title, description, status, nameCreated }) => {
    const value = React.useContext(UserContext)
    return (
        <div className='CardTodo'>
            <div className='arrow-wrapper'>
                {(status === "DONE" || status === "INPROGRESS") &&
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20v-2z" /></svg>
                    </span>
                }
                {(status === "TODO" || status === "INPROGRESS") &&
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8l-8-8z" /></svg>
                    </span>
                }
            </div>
            <h4>{title}</h4>
            <p>{description}</p>
            <p className='created-by'>Crée par <span>{value.name !== nameCreated ? nameCreated : "vous"}</span></p>
        </div>
    )
}

export default CardTodo