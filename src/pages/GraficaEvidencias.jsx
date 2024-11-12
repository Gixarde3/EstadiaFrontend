import Grafica from "../components/Grafica";
import { useEffect, useState, Fragment } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import Alert from "../components/Alert";
import axios from "axios";
import config from "../config.json";
function GraficaEvidencias() {
    const [grupos, setGrupos] = useState([]);
    const [titulos, setTitulos] = useState([]);
    const [evidencias, setEvidencias] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [cantidadGrupos, setCantidadGrupos] = useState(0);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    useEffect(() => {
        if(cantidadGrupos){
            setEvidencias([]);
            setGrupos([]);
            setResultados([]);
            setTitulos([]);
        }
    }, [cantidadGrupos]);

    useEffect(() => {
        console.log(titulos, resultados);
    }, [titulos, resultados]);

    useEffect(() => {
        console.log(evidencias, grupos);
        if(evidencias.length === cantidadGrupos){
            const fetchData = async () => {
                const resultadosActuales = [];
                try{
                    for(const evidencia of evidencias){
                        const response = await axios.get(`${config.endpoint}/evidencia/promedio/${evidencia}`);
                        if(response.data.promedioGrupal){
                            resultadosActuales.push(response.data.promedioGrupal);
                        }
                    }
                    setResultados(resultadosActuales);
                }catch(e){
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [evidencias]);

    useEffect(() => {
        if(grupos.length === cantidadGrupos){
            const fetchData = async () => {
                try{
                    const titulosActuales = [];
                    for(const grupo of grupos){
                        const response = await axios.get(`${config.endpoint}/grupoMateria/${grupo}`);
                        if(response.data){
                            const materia = await axios.get(`${config.endpoint}/asignatura/${response.data.idAsignatura}`);
                            console.log("Materia", materia.data, response.data);
                            const grupoInformacion = await axios.get(`${config.endpoint}/grupo/${response.data.idGrupo}`);
                            console.log("Grupo", grupoInformacion.data);
                            titulosActuales.push(`${materia.data.cuatrimestre}° ${grupoInformacion.data.letra}`);
                        }
                    }
                    setTitulos(titulosActuales);
                }catch(e){
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [grupos]);

    
    return (
        <section id="principal">
            <h1>Gráfica comparativa entre resultados de evidencias entre grupos</h1>
            <form className="login">
                <label>
                    Escribe la cantidad de grupos a comparar
                    <input type="number" value={cantidadGrupos} onChange={(e) => {
                        setCantidadGrupos(parseInt('0' + e.target.value));
                    }}/>
                </label>
                {
                    [...Array(cantidadGrupos)].map((_, index) => {
                        console.log(index, cantidadGrupos);
                        return (
                            <Fragment key={index}>
                                <label>
                                    Grupo {index + 1}
                                    <BarraBusquedaSeleccionar modelo="grupoMateria" onSelect={(id) => {
                                        if(grupos.includes(id)){
                                            showAlert("Error", "No puedes seleccionar el mismo grupo más de una vez", "error");
                                            return;
                                        }
                                        const newGrupos = [...grupos];
                                        newGrupos[index] = id;
                                        setGrupos(newGrupos);
                                    }}/>
                                </label>
                                <label>
                                    Evidencia
                                    <BarraBusquedaSeleccionar modelo="evidencia" onSelect={(id) => {
                                        const newEvidencias = [...evidencias];
                                        newEvidencias[index] = id;
                                        setEvidencias(newEvidencias);
                                    }} idGrupo = {grupos[index]}/>
                                </label>
                            </Fragment>
                            
                        );
                    })
                }
            </form>
            {titulos.length > 0 && resultados.length > 0 && <Grafica labels={titulos} data={resultados} title={"Gráfica comparativa de resultados de evidencia entre grupos"} tituloLocal={"Calificación promedio"}/>}
            <Alert 
                title={alert?.title} 
                message={alert?.message} 
                kind={alert?.kind} 
                isOpen={alert?.isOpen} 
                closeAlert={() => closeAlert()} 
                redirectRoute={alert?.redirectRoute} 
                asking={alert?.asking} 
                onAccept={alert?.onAccept}
            />
        </section>
    );
}

export default GraficaEvidencias;