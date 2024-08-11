import { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/login.css";
import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import {Tooltip} from "react-tooltip";
function CambiarContrasenia() {
    const {token} = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const changePassword = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            showAlert("Error", "Las contraseñas no coinciden", "error");
            return;
        }
        try {
            const response = await axios.post(`${config.endpoint}/cambiar-contrasena`, {
                password: password,
                token
            });
            if(response.status === 200){
                showAlert("Solicitud enviada", "Se cambió la contraseña con éxito", "success", "/", false, null);            
            }
        } catch (error) {
            console.error(error);
            if(error.response.status === 401){
                showAlert("Error al iniciar sesión", "El token no es válido o ya se venció", "error");
            }
            else if(error.response.status === 404){
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
            <form onSubmit={changePassword} className="login">
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
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                data-tooltip-id='tooltip'
                                data-tooltip-content={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                data-tooltip-place='top'
                            >
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
                <label>
                    Confirmar contraseña
                    <div className="input-row">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
                            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
                            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
                        </svg>
                        <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="password"/>
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                data-tooltip-id='tooltip'
                                data-tooltip-content={showPassword ? 'Ocultar contraseña de confirmación' : 'Mostrar contraseña de confirmación'}
                                data-tooltip-place='top'
                            >
                            {
                            showConfirmPassword ?
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
                <button className="button">Cambiar contraseña</button>
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

export default CambiarContrasenia;