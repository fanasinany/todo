import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [error, setError] = useState(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}register`, { name, email, password })
            .then(() => {
                setRegister(true)
            })
            .catch((error) => {
                setError(true)
            })
    }
    return (
        <div className="Register">
            <h1>Register Page</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                {register && (
                    <p className="notif-register">Compte crée avec succes! <Link to="/">Connectez-vous</Link></p>
                )}
                <Input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Créer mon compte</button>
            </form>
            {error && (
                <p className="already-have-account">Vous avez déja un compte liée à cette email. <Link to="/">Connectez-vous!</Link></p>
            )}
        </div>
    );
};

export default Register;