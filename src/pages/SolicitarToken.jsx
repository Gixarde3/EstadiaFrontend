import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../assets/css/login.css";
import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import {Tooltip} from "react-tooltip";
function SolicitarToken() {
    const [identificacion, setIdentificacion] = useState("");
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const requestToken = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.endpoint}/solicitar-cambio-contrasena`, {
                identificador: identificacion,
            });
            if(response.status === 200){
                showAlert("Solicitud enviada", "Se ha enviado un correo con las instrucciones para recuperar tu contraseña", "success", "/", false, null);            
            }
        } catch (error) {
            console.error(error);
            if(error.response.status === 404){
                showAlert("Error al iniciar sesión", "Usuario no encontrado", "error");
            }else if(error.response.status === 500){
                showAlert("Error al iniciar sesión", "Error en el servidor", "error");
            }else{
                showAlert("Error al iniciar sesión", "Error de conexión", "error");
            }

        }
    }
    return (
    <>
        <main style={{marginLeft: 0}}>
            <img src="/img/logo.webp" alt="Logo de upemor" className="logo-upemor"/>
            <form onSubmit={requestToken} className="login">
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
                <button className="button">Solicitar recuperación de contraseña</button>
            </form>
        </main>
        <Tooltip id="tooltip"></Tooltip>
        <Alert 
            isOpen={alert && alert.isOpen}
            title={alert &&alert.title}
            message={alert && alert.message}
            kind={alert && alert.kind}
            closeAlert={closeAlert}
            redirectRoute={alert && alert.redirectRoute}
            asking={alert && alert.asking}
            onAccept={alert && alert.onAccept}
        />
    </>
    );
}

export default SolicitarToken;