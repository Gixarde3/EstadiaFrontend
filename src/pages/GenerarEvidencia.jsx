import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
function GenerarEvidencia() {
    const {idGrupoMateria} = useParams();
    const [atributoEgreso, setAtributoEgreso] = useState(null);
    const [criterioDesempenio, setCriterioDesempenio] = useState(null);
    const [indicador, setIndicador] = useState(null);
    const [tipoEvidencia, setTipoEvidencia] = useState("Producto");
    const [objetivo, setObjetivo] = useState(null);
    const [alert, setAlert] = useState(null);
    const [porcentajeFinal, setPorcentajeFinal] = useState(0);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const generar = async (e) => {
        e.preventDefault();
        try{
            console.log(tipoEvidencia);
            showAlert("Generando", "Generando evidencia", "loading");
            console.log({
                idGrupoMateria,
                idAtributoEgreso: atributoEgreso,
                idCriterioDesempenio: criterioDesempenio,
                idIndicador: indicador,
                tipoEvidencia,
                porcentajeFinal,
                objetivo
            })
            const response = await axios.post(`${config.endpoint}/evidencia/generar`, {
                idGrupoMateria,
                idAtributoEgreso: atributoEgreso.idAtributoEgreso,
                idCriterioDesempenio: criterioDesempenio.idCriterioDesempenio,
                idIndicador: indicador.idIndicador,
                tipoEvidencia,
                porcentajeFinal,
                objetivo
            });
            showAlert("Evidencia generada", "Evidencia generada correctamente, para verla, presiona \"aceptar\"", "success", "/home/evidencia/" + response.data.idEvidencia);
        }catch(error){
            console.error(error);
            if(!error.response){
                showAlert("Error", "Ocurrió un error inesperado. Por favor contacta a soporte.", "error");
                return;
            }
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
        <section id="principal">
            <h1>Generar evidencia con IA</h1>
            <form onSubmit={generar} className="login">
                <label>
                    Atributo de egreso
                    <BarraBusquedaSeleccionar modelo="atributoEgreso" onSelect = {setAtributoEgreso}/>
                </label>
                <label>
                    Criterio de desempeño
                    <BarraBusquedaSeleccionar modelo="criterioDesempenio" onSelect = {setCriterioDesempenio}/>
                </label>
                <label>
                    Indicador
                    <BarraBusquedaSeleccionar modelo="indicador" onSelect = {setIndicador}/>
                </label>
                <label>
                    Tipo de evidencia <span style={{color:'red'}}>*</span>
                    <select onChange={(e) => setTipoEvidencia(e.target.value)}>
                        <option value="Producto">Evidencia de producto (EP)</option>
                        <option value="Desarrollo">Evidencia de desarrollo (ED)</option>
                        <option value="Conocimiento">Evidencia de conocimiento (EC)</option>
                    </select>
                </label>
                <label>
                    Objetivo <span style={{color:'red'}}>*</span>
                    <textarea style={{resize: 'vertical'}} onChange={(e) => setObjetivo(e.target.value)}></textarea>
                </label>
                <label>
                    ¿Cuánto porcentaje aporta a la calficación final de la asignatura? <span style={{color:'red'}}>*</span>
                    <input type="number" min="0" max="100" onChange={(e) => setPorcentajeFinal(e.target.value)}/>
                </label>
                <button className="button">Generar evidencia</button>
            </form>
            <p className="aclaracion">Todos los campos con <span style={{color: "red"}}>*</span> son obligatorios</p>
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
        </section>
    );
}

export default GenerarEvidencia;