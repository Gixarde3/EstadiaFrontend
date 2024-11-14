import Grafica from "../components/Grafica";
import { useEffect, useState, Fragment } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import Alert from "../components/Alert";
import axios from "axios";
import config from "../config.json";
function GraficaAlumnos() {
    const [grupo, setGrupo] = useState(0);
    const [titulos, setTitulos] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [cantidadGrupos, setCantidadGrupos] = useState(0);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    useEffect(() => {
        if(cantidadGrupos){
            setAlumnos([]);
            setGrupo(0);
            setResultados([]);
            setTitulos([]);
        }
    }, [cantidadGrupos]);

    useEffect(() => {
        console.log(titulos, resultados);
    }, [titulos, resultados]);

    useEffect(() => {
        if(alumnos.length === cantidadGrupos){
            const fetchData = async () => {
                const resultadosActuales = [];
                const titulosActuales = [];
                try{
                    for(const alumno of alumnos){
                        const alumnoAsignaturaInfo = await axios.get(`${config.endpoint}/alumnoAsignatura/${alumno}`);
                        console.log(alumnoAsignaturaInfo);
                        const alumnoInfo = await axios.get(`${config.endpoint}/alumno/${alumnoAsignaturaInfo.data.idAlumno}`);
                        console.log(alumnoInfo);
                        const usuarioInfo = await axios.get(`${config.endpoint}/usuario/${alumnoInfo.data.idUsuario}`);
                        const response = await axios.get(`${config.endpoint}/grupomateria/${grupo}/calificaciones/${alumnoAsignaturaInfo.data.idAlumno}`);
                        console.log("Response", response);
                        if(response.data.calificacion){
                            resultadosActuales.push(response.data.calificacion);
                        }
                        if(alumnoInfo.data){
                            titulosActuales.push(`${usuarioInfo.data.clave_identificacion}`);
                        }
                    }
                    setResultados(resultadosActuales);
                    setTitulos(titulosActuales);
                }catch(e){
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [alumnos]);

    
    return (
        <section id="principal">
            <h1>Gráfica comparativa entre resultados de alumnos entre grupos</h1>
            <form className="login">
                <label>
                    Escribe la cantidad de alumnos a comparar
                    <input type="number" value={cantidadGrupos} onChange={(e) => {
                        setCantidadGrupos(parseInt('0' + e.target.value));
                    }}/>
                </label>
                <label>
                    Grupo
                    <BarraBusquedaSeleccionar modelo="grupoMateria" onSelect={(id) => {
                        setGrupo(id)
                    }}/>
                </label>
                {
                    [...Array(cantidadGrupos)].map((_, index) => {
                        console.log(index, cantidadGrupos);
                        return (
                            <Fragment key={index}>
                                <label>
                                    Alumno
                                    <BarraBusquedaSeleccionar modelo="alumnoAsignatura" onSelect={(id) => {
                                        const newAlumnos = [...alumnos];
                                        newAlumnos[index] = id;
                                        setAlumnos(newAlumnos);
                                    }} idGrupo = {grupo}/>
                                </label>
                            </Fragment>
                            
                        );
                    })
                }
            </form>
            {titulos.length > 0 && resultados.length > 0 && <Grafica labels={titulos} data={resultados} title={"Gráfica comparativa de resultados entre alumnos del mismo grupo"} tituloLocal={"Calificación total (Máximo 100)"}/>}
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

export default GraficaAlumnos;