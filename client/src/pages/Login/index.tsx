import React, { useState } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import axios from "axios";
import config from "../../config";
import Cookies from "universal-cookie";
import Button from "../../components/Button";
const cookies = new Cookies();

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailInvalidError, setEmailInvalidError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loading, setLoading] = useState(false);

    function ValidateEmail(email: string) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setEmailError(email === "");
            setPasswordError(password === "");
        }
        else {
            if (ValidateEmail(email)) {
                setLoading(true)
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
                    .finally(() => setLoading(false))
            }
            else {
                setEmailInvalidError(true)
            }
        }
    }

    return (
        <div className="Login">
            <div className="bg-fond">
            </div>
            <div className="login-form">
                <div>
                    <h1>Connexion</h1>
                    <p>Connectez-vous en entrant votre email et mot de passe.</p>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        {error && (
                            <p className="incorrect-info">Email ou mot de passe incorrect.</p>
                        )}
                        <Input name="email" type="email" value={email} onChange={(e) => { setEmailError(false); setEmailInvalidError(false); setEmail(e.target.value) }} placeholder="Email" error={emailError} invalidMailError={emailInvalidError} />
                        <Input name="password" type="password" value={password} onChange={(e) => { setPasswordError(false); setPassword(e.target.value) }} placeholder="Password" error={passwordError} />
                        <Button type="submit" onClick={(e) => handleSubmit(e)} deco="dark" label="Se connecter" loading={loading} disabled={loading} />
                    </form>
                    <div className="create-account">
                        <span>ou</span>
                        <Link to="/register">Créer un compte</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;