import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import config from "../config.json";
import "../assets/css/evidencia.css";
import CriterioEvaluacion from "../components/CriterioEvaluacion";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function EvidenciaEntregada() {
    const {idEvidenciaEntregada} = useParams();
    const [archivosEntregados, setArchivosEntregados] = useState([]);
    const [evidenciaEntregada, setEvidenciaEntregada] = useState(null);
    const [criteriosEvaluacion, setCriteriosEvaluacion] = useState([]);
    const [calificaciones, setCalificaciones] = useState([]);
    const [alumno, setAlumno] = useState(null);
    const [evidencia, setEvidencia] = useState(null);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const notify = (message, kind) => {
        console.log("Notificando", message, kind);
        if(kind === "error"){
            toast.error(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
        if(kind === "success"){
            toast.success(message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
    }
    useEffect(() => {
        const getEvidenciaEntregada = async () => {
            try{
                const response = await axios.get(`${config.endpoint}/evidenciaentregada/${idEvidenciaEntregada}`);
                setEvidenciaEntregada(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getEvidenciaEntregada();
        const getArchivosEntregados = async () => {
            try{
                const response = await axios.post(`${config.endpoint}/archivoevidenciaentregadas/findall`, {
                    idEvidenciaEntregada,
                });
                setArchivosEntregados(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getArchivosEntregados();
    }, []);

    useEffect(() => {
        const getCriteriosEvaluacion = async () => {
            try{
                const response = await axios.post(`${config.endpoint}/criterioevaluacions/findall`, {
                    idEvidencia: evidenciaEntregada?.idEvidencia,
                });
                setCriteriosEvaluacion(response.data);
                console.log(response.data);
            }catch(error){
                console.error(error);
            }
        }
        
        const getAlumno = async () => {
            try{
                const response = await axios.get(`${config.endpoint}/alumno/${evidenciaEntregada?.idAlumno}`);
                if(!response.data){
                    throw new Error("No se encontró el alumno");
                }
                const alumno = await axios.post(`${config.endpoint}/usuario/find`, {
                    idUsuario: response.data.idUsuario,
                });
                setAlumno(alumno.data);
            }catch(error){
                console.error(error);
            }
        }
        const getEvidencia = async () => {
            try{
                const response = await axios.get(`${config.endpoint}/evidencia/${evidenciaEntregada?.idEvidencia}`);
                setEvidencia(response.data);
                console.log("Evidencia", response.data);    
            }catch(error){
                console.error(error);
            }
        }
        if(evidenciaEntregada){
            getCriteriosEvaluacion();
            getAlumno();
            getEvidencia();
        }
    }, [evidenciaEntregada]);

    const addCalificacion = async (idCriterioEvaluacion, calificacion) => {
        try{
            const response = await axios.post(`${config.endpoint}/criterioevaluacionpuntajes/find`, {
                idCriterioEvaluacion: idCriterioEvaluacion,
                idAlumno: evidenciaEntregada.idAlumno,
            });
            const calificacionCriterio = response.data;
            if(!calificacionCriterio){
                await axios.post(`${config.endpoint}/criterioevaluacionpuntajes`, {
                    idCriterioEvaluacion: idCriterioEvaluacion,
                    idAlumno: evidenciaEntregada.idAlumno,
                    puntaje: calificacion,
                });
            }else{
                console.log(calificacionCriterio);
                await axios.put(`${config.endpoint}/criterioevaluacionpuntajes/${calificacionCriterio.idCriterioEvaluacionPuntajes}`, {
                    puntaje: calificacion.puntaje ?? calificacion,
                });
            }
            notify("Calificación guardada", "success");
        }catch(error){
            notify("Ocurrió un error al guardar la calificación", "error");
            console.error(error);
        }
    }

    useEffect(() => {
        const getEvaluaciones = async () => {
            try{
                const evaluaciones = [];
                for(let criterio of criteriosEvaluacion){
                    const response = await axios.post(`${config.endpoint}/criterioevaluacionpuntajes/find`, {
                        idCriterioEvaluacion: criterio.idCriterioEvaluacion,
                        idAlumno: evidenciaEntregada.idAlumno,
                    });
                    evaluaciones[criterio.idCriterioEvaluacion] = response.data;
                }
                console.log(evaluaciones);
                setEvaluaciones(evaluaciones);
            }catch(error){
                console.error(error);
            }
        }
        getEvaluaciones();
    }, [criteriosEvaluacion]);

    return (
    <div id="evidencia">
        <section id="titulo-evidencia">
            <h1>{evidencia?.nombre}</h1>
            <div id="info-entrega">
                <p>Entregada por: {alumno?.clave_identificacion.toUpperCase()} | {alumno?.nombre} {alumno?.apellido_paterno} {alumno?.apellido_materno}</p>
                <p>Entregada el: {new Date(evidenciaEntregada?.fecha_entrega).toLocaleDateString()}</p>
            </div>
        </section>
        <div id="info-evidencia">
            <div id="datos-evidencia" style={{gap: "1rem"}}>
                {
                    criteriosEvaluacion.map(criterio => (
                        <CriterioEvaluacion key={criterio.idCriterioEvaluacion} criterio={criterio} calificando={true} idAlumnoEnviado={evidenciaEntregada.idAlumno} addCalificacion={addCalificacion}/>
                    ))
                }
            </div>
            <aside id="entrega-evidencia">
                <h2>Archivos en la entrega</h2>
                <div id="carga-archivo">
                    {archivosEntregados.length === 0 && <p>No se entregaron archivos</p>}
                    {archivosEntregados.map((archivo, index) => (
                    <div className="info-archivo" key={archivo.nombre_original}>
                        <p className="nombre-archivo">{archivo.nombre_original}</p>
                        <div className="botones">
                            <a href={`${config.endpoint}/descripciones/${archivo.archivo}`} download><img src="/img/download.svg" alt="Descargar documento" /></a>
                        </div>
                    </div>))}
                </div>
            </aside>
        </div>
        <ToastContainer />
    </div>);
}

export default EvidenciaEntregada;