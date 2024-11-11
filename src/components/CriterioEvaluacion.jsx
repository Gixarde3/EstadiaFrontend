import { useContext, useState, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";
import config from "../config.json";
import "../assets/css/criterioevaluacion.css";
function CriterioEvaluacion({criterio, getCriterios}) {
    const navigate = useNavigate();
    console.log(criterio);
    const { user } = useContext(UserContext);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const [open, isOpen] = useState(false);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    const askEliminar = async () => {
        showAlert("Eliminar", "¿Estás seguro de que deseas eliminar este elemento?", "question", null, true, eliminar);
    }
    const eliminar = async () => {
        try{
            const response = await axios.delete(`${config.endpoint}/criterioEvaluacion/${criterio.idCriterioEvaluacion}`);
            showAlert("Eliminado", "Elemento eliminado correctamente", "success");
            getCriterios();
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
    }
    return (
        <div className="criterio-evaluacion">
            <button className = {`abrir ${open ? "open" : ""}`} type="button" onClick={() => isOpen(!open)}>
                <h3>{criterio.titulo}</h3>
                <img src="/img/close.png" alt="Icono desplegar descipción" />
            </button>
            <div className="descripcion-criterio">
                <p>{criterio.descripcion}</p>
                <p className="porcentaje">{criterio.porcentaje_al_final}%</p>
            </div>
            {
                user.privilege >= 2 &&
                <div className="operation-buttons">
                    <button className="opcion editar"
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Editar'
                        data-tooltip-place='top'
                        type="button"
                        onClick={() => navigate(`/home/criterioEvaluacion/editar/${criterio.idCriterioEvaluacion}`)}
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
            <Alert 
                isOpen={alert ? alert.isOpen : false}
                title={alert ? alert.title : ''}
                message={alert ? alert.message : ''}
                kind={alert ? alert.kind : ''}
                closeAlert={closeAlert}
                redirectRoute={alert ? alert.redirectRoute : ''}
                asking={alert ? alert.asking : false}
                onAccept={alert ? alert.onAccept : () => {}}
            />
        </div>
    );
}

export default CriterioEvaluacion;