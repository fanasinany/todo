import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import config from "../../config";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        axios.post(`${config.url_api}login`, { email, password })
            .then((result) => {
                cookies.set("TOKEN", result.data.token, {
                    path: "/",
                });
                window.location.href = "/"
            })
            .catch(() => {
                setError(true)
            })
    }
    return (
        <div className="Login">
            <h1>Connexion</h1>
            <p>Connectez-vous en entrant votre email et mot de passe.</p>
            <form onSubmit={(e) => handleSubmit(e)}>
                {error && (
                    <p className="incorrect-info">Email ou mot de passe incorrect.</p>
                )}
                <Input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" onClick={(e) => handleSubmit(e)}>Se connecter</button>
            </form>
            <div className="create-account">
                <span>ou</span>
                <Link to="/register">Créer un compte</Link>
            </div>
        </div>
    );
};

export default Login;