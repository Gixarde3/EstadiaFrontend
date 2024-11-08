import axios from "axios";
import config from "../config.json";
import Alert from "./Alert";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BarraBusquedaSeleccionar from "./BarraBusquedaSeleccionar";
function Resultado(props) {
    const modelo = props.modelo;
    const seleccionable = props.seleccionable;
    const onSelect = props.onSelect;
    const onSelectString = props.onSelectString;
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [idEliminar, setIdEliminar] = useState(false);
    const closeAlert = () => setAlert(null);
    const [selectGroupId, setSelectGroupId] = useState(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    useEffect(() => {
        if(idEliminar) {
            eliminar(idEliminar);
        }
    }, [idEliminar]);

    const askEliminar = async (id) => {
        
        if(modelo === "grupo"){
            showAlert("Seleccionar grupo de reemplazo", 
            <>
                <p>Selecciona el grupo al que se reasignarán los elementos de este grupo</p>
                <BarraBusquedaSeleccionar modelo="grupo" onSelect={setSelectGroupId}/>
            </>, "question", null, true, () => showAlert("Eliminar", "¿Estás seguro de que deseas eliminar este elemento?", "question", null, true, () => setIdEliminar(id)));
        }else{
            showAlert("Eliminar", "¿Estás seguro de que deseas eliminar este elemento?", "question", null, true, () => setIdEliminar(id));
        }
    }
    const eliminar = async (id) => {
        try{
            const response = await axios.delete(`${config.endpoint}/${modelo}/${id}${selectGroupId ? `/${selectGroupId}` : ''}`);
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
    function separarMayusculas(palabra) {
        return palabra.replace(/([A-Z])/g, ' $1').trim();
    }
    return (
        <>
        <div className="resultado">
            <div className="operation-buttons">
                {
                    !seleccionable &&
                    (
                        <>
                            <button className="opcion eliminar"
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Eliminar'
                                data-tooltip-place='top'
                                type="button"
                                onClick={() => {askEliminar(props.datosVer[`id${modelo.charAt(0).toUpperCase() + modelo.slice(1)}`])}}
                            >
                                <img src="/img/close.png" alt="Botón de eliminar" />
                            </button>
                            <button className="opcion editar"
                                data-tooltip-id='tooltip'
                                data-tooltip-content='Editar'
                                data-tooltip-place='top'
                                type="button"
                                onClick={() => navigate(`/home/${modelo}/editar/${props.datosVer['id'+modelo.charAt(0).toUpperCase() + modelo.slice(1)]}`)}
                            >
                                <img src="/img/edit.png" alt="Botón de editar" />
                            </button>
                        </>
                        )
                    }
                {
                    seleccionable &&
                    <button className="opcion seleccionar"
                        data-tooltip-id='tooltip'
                        data-tooltip-content='Seleccionar este elemento'
                        data-tooltip-place='top'
                        type="button"
                        onClick={() => {
                            
                            
                            onSelect(props.datosVer[`id${modelo.charAt(0).toUpperCase() + modelo.slice(1)}`]);
                            onSelectString(`${separarMayusculas(modelo)} actual: ${props.datosVer[props.campoTitulo]}`);
                        } }
                    >
                        <img src="/img/select.png" alt="Botón de seleccionar" />
                    </button>
                }
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