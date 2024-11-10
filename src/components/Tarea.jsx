import { Link } from "react-router-dom";
import {useState, useEffect, useContext} from 'react';
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";
import config from "../config.json";
function Tarea({titulo, nombre, fechaLimite, idEvidencia, getEvidencias}) {
    const [color, setColor] = useState(0);
    const { user } = useContext(UserContext);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const navigate = useNavigate();
    useEffect(() => {
        setColor(Math.floor(Math.random() * 8) + 1);
    }, []);

    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    const askEliminar = async () => {
        showAlert("Eliminar", "¿Estás seguro de que deseas eliminar este elemento?", "question", null, true, eliminar);
    }
    const eliminar = async () => {
        try{
            const response = await axios.delete(`${config.endpoint}/evidencia/${idEvidencia}`);
            showAlert("Eliminado", "Elemento eliminado correctamente", "success");
            getEvidencias();
        }catch(error){
            console.error(error);
            
            if(error.response.status === 404){
                showAlert("Error", "No se encontraron resultados", "error");
            }
            else if(error.response.status === 401){
                showAlert("Error", "No tienes permiso para realizar esta acción", "error");
            }
            else if(error.response.status === 500){
                if(error.response.data.error){
                    showAlert("Error", error.response.data.error, "error");
                }
                else{
                    showAlert("Error", "Error en el servidor", "error");
                }
            }
        }
        setIdEliminar(false);
    }
    return (
        <article className="tarea">
            {
                user.privilege >= 2 &&
                        <div className="operation-buttons">
                            <button className="opcion editar"
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Editar'
                                data-tooltip-place='top'
                                type="button"
                                onClick={() => navigate(`/home/evidencia/editar/${idEvidencia}`)}
                            >
                                <img src="/img/edit.png" alt="Botón de editar" />
                            </button>
                            <button className="opcion eliminar"
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Eliminar'
                                data-tooltip-place='top'
                                type="button"
                                onClick={askEliminar}
                            >
                                <img src="/img/close.png" alt="Botón de eliminar" />
                            </button>

                        </div>
            }
            <button onClick={() => navigate(`/home/evidencia/${idEvidencia}`)} style={
                {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                }
            }>
                <div className="info">
                    <div className={`icono color-${color}`}>
                        <img src="/img/tarea_outline.png" alt="Ícono de tarea" />
                    </div>
                    <h3>{nombre}</h3>
                </div>
                <div className="info-extra">
                    <p>{new Date(fechaLimite).toLocaleString('es-MX', {
                                                                                year: 'numeric',
                                                                                month: '2-digit',
                                                                                day: '2-digit',
                                                                            }
                                                                        )}</p>
                </div>
            </button>
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
        </article>
    );
}

export default Tarea;