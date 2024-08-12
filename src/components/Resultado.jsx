import axios from "axios";
import config from "../config.json";
import Alert from "./Alert";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Resultado(props) {
    const modelo = props.modelo;
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const askEliminar = async (id) => {
        showAlert("Eliminar", "¿Estás seguro de que deseas eliminar este elemento?", "question", null, true, () => eliminar(id));
    }
    const eliminar = async (id) => {
        try{
            const response = await axios.delete(`${config.endpoint}/${modelo.toLoweCase()}/${id}`);
            showAlert("Eliminado", "Elemento eliminado correctamente", "success");
            props.search();
        }catch(error){
            console.error(error);
            if(error.response.status === 404){
                showAlert("Error", "No se encontraron resultados", "error");
            }
            else if(error.response.status === 401){
                showAlert("Error", "No tienes permiso para realizar esta acción", "error");
            }
            else if(error.response.status === 500){
                showAlert("Error", "Error en el servidor", "error");
            }
        }
    }
    return (
        <>
        <div className="resultado">
            <div className="operation-buttons">
                <button className="opcion eliminar"
                    data-tooltip-id='tooltip'
                    data-tooltip-content='Eliminar'
                    data-tooltip-place='top'
                    onClick={() => {askEliminar(props.datosVer[`id${modelo.charAt(0).toUpperCase() + modelo.slice(1)}`])}}
                >
                    <img src="/img/close.png" alt="Botón de eliminar" />
                </button>
                <button className="opcion editar"
                    data-tooltip-id='tooltip'
                    data-tooltip-content='Editar'
                    data-tooltip-place='top'
                    onClick={() => navigate(`/home/${modelo}/editar/${props.datosVer['id'+modelo.charAt(0).toUpperCase() + modelo.slice(1)]}`)}
                >
                    <img src="/img/edit.png" alt="Botón de editar" />
                </button>
            </div>
            <h2>{props.titulo}</h2>
            {
                Object.keys(props.datosVer).map((key, index) => {
                    if(key === props.campoTitulo) return null;
                    if(key === 'password') return null;
                    return <p key={index}>
                        <span style={{fontWeight: 'bold'}}>
                        {
                            key.replace("_", " ").split(' ')
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')
                        }
                        </span>: {props.datosVer[key]}</p>
                })
            }
        </div>
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

export default Resultado;