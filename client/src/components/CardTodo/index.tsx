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
            <h4>{title}</h4>
            <p>{description}</p>
            <p className='created-by'>Crée par <span>{value.name !== nameCreated ? nameCreated : "vous"}</span></p>
        </div>
    )
}

export default CardTodo