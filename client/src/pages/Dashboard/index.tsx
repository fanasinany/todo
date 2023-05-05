import React from "react";
import "./Dashboard.scss";
import Header from "../../components/Header";
import FormCreateTodo from "../../components/FormCreateTodo";
import ListCreatedTodo from "../../components/ListCreatedTodo";

const Dashboard = () => {
    return (
        <div className="Dashboard">
           <Header/>
           <div className="body-wrapper container">
                <div className="add-todo-wrapper">
                    <FormCreateTodo/>
                    <ListCreatedTodo/>
                </div>
                <div className="todo-wrapper">
                    <h1>Vos taches</h1>
                </div>
           </div>
        </div>
    );
};

export default Dashboard;