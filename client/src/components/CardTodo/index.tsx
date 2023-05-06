import React, { FC } from 'react';
import "./CardTodo.scss";

interface CardTodoProps {
    id: string;
    title: string;
    description?: string;
    status: string;
}

const CardTodo: FC<CardTodoProps> = ({ id, title, description, status }) => {
    return (
        <div className='CardTodo'>
            <h4>{title}</h4>
            <p>{description}</p>
            <span className={`box box-${status.toLowerCase()}`}></span>
        </div>
    )
}

export default CardTodo