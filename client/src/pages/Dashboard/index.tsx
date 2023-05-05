import React from "react";
import "./Dashboard.scss";
import Header from "../../components/Header";
import FormCreateTodo from "../../components/FormCreateTodo";
import ListCreatedTodo from "../../components/ListCreatedTodo";

const Dashboard = () => {
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
                        <div>
                            <span>TODO</span>
                        </div>
                        <div>
                            <span>IN PROGRESS</span>
                        </div>
                        <div>
                            <span>DONE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;