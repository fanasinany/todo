import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import Input from "../../components/Input";
import { Link } from "react-router-dom";
import config from "../../config";
import Button from "../../components/Button";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const [error, setError] = useState(false)
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (email === "" || password === "" || name === "") {
            setEmailError(email === "");
            setPasswordError(password === "");
            setNameError(name === "");
        }
        else {
            axios.post(`${config.url_api}register`, { name, email, password })
                .then(() => {
                    setRegister(true)
                })
                .catch((error) => {
                    setError(true)
                })
        }
    }
    return (
        <div className="Register">
            <h1>Créer votre compte</h1>
            <p>Veuillez remplir les champs en dessous pour vous inscire.</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                {register && (
                    <p className="notif-register">Compte crée avec succes! <Link to="/">Connectez-vous</Link></p>
                )}
                <Input name="name" type="text" value={name} onChange={(e) => { setNameError(false); setName(e.target.value) }} placeholder="Name" error={nameError} />
                <Input name="email" type="email" value={email} onChange={(e) => { setEmailError(false); setEmail(e.target.value) }} placeholder="Email" error={emailError} />
                <Input name="password" type="password" value={password} onChange={(e) => { setPasswordError(false); setPassword(e.target.value) }} placeholder="Password" error={passwordError} />
                <Button type="submit" onClick={(e) => handleSubmit(e)} deco="dark" label="Créer mon compte" />
            </form>
            {error && (
                <p className="already-have-account">Vous avez déja un compte liée à cette email. <Link to="/">Connectez-vous!</Link></p>
            )}
        </div>
    );
};

export default Register;