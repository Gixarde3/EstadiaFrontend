import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import axios from "axios";
import config from "../config.json";
function Login() {
    const [identificacion, setIdentificacion] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>
        {
            if(user)
            {
                navigate("/home");
            }
        },
    [user]);
    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.endpoint}/login`, {
                clave_identificacion: identificacion,
                password
            });
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    return (
    <main>
        <img src="/img/logo.webp" alt="Logo de upemor" className="logo-upemor"/>
        <form onSubmit={login} className="login">
            <label>
                Clave de identificación
                <div className="input-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-user">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                    </svg>
                    <input type="text" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)}/>
                </div>
            </label>
            <label>
                Contraseña
                <div className="input-row">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                    </svg>
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="password"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {
                        showPassword ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                            <path d="M3 3l18 18" />
                        </svg>
                        }
                    </button>
                </div>
            </label>
            <button className="button">Iniciar sesión</button>
        </form>
    </main>);
}

export default Login;