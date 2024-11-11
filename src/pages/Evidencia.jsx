import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import "../assets/css/evidencia.css";
import Alert from "../components/Alert";
import CriterioEvaluacion from "../components/CriterioEvaluacion";
function Evidencia() {
    const [evidencia, setEvidencia] = useState({});
    const [evidenciasEntregadas, setEvidenciasEntregadas] = useState([]);
    const [evidenciaEntregada, setEvidenciaEntregada] = useState(false);
    const [criterios, setCriterios] = useState([]);
    const [calificacion, setCalificacion] = useState(0);
    const { idEvidencia } = useParams();
    const { user } = useContext(UserContext);
    const [archivos, setArchivos] = useState([]);
    const [archivosYaEntregados, setArchivosYaEntregados] = useState([]);
    const [alert, setAlert] = useState({message: "", type: ""});
    const navigate = useNavigate();
    const closeAlert = () => {
        setAlert(null)
    }
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const getCriterios = async () => {
        try {
            const response = await axios.post(`${config.endpoint}/criterioevaluacions/findall`, {
                idEvidencia
            });
            setCriterios(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const getEvidencia = async () => {
            try {
                const response = await axios.get(`${config.endpoint}/evidencia/${idEvidencia}`);
                console.log(response.data);
                setEvidencia(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        getEvidencia();
        const getEvidenciasEntregadas = async () => {
            try {
                const response = await axios.post(`${config.endpoint}/evidenciaentregadas/findall`, {
                    idEvidencia
                });
                setEvidenciasEntregadas(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        const getArchivosEvidencia = async () => {
            try {
                const alumno = await axios.post(`${config.endpoint}/alumno/find`,{
                    idUsuario: user.idUsuario
                });
                if (!alumno.data.idAlumno) {
                    return;
                }
                const evidenciaEntregada = await axios.post(`${config.endpoint}/evidenciaentregadas/findAll`, {
                    idEvidencia,
                    idAlumno: alumno.data.idAlumno
                });
                if (evidenciaEntregada.data.length === 0) {
                    return;
                }
                setEvidenciaEntregada(evidenciaEntregada.data[0]);
                const archivos = await axios.post(`${config.endpoint}/archivoevidenciaentregadas/findall`, {
                    idEvidenciaEntregada: evidenciaEntregada.data[0].idEvidenciaEntregada
                });
                setArchivosYaEntregados(archivos.data);
            } catch (error) {
                console.error(error);
            }
        }
        if(user.privilege >= 2){
            getEvidenciasEntregadas();
        }else{
            getArchivosEvidencia();
        }
        getCriterios();
    }, []);

    const addCalificacion = (cal) => {
        setCalificacion(calificacion + cal);
        console.log(calificacion);
    }

    useEffect(() => {
        const getCalificaciones = async () => {
            if(user.privilege === 1){
                setCalificacion(0);
                let calificacionLocal = 0;
                const alumno = await axios.post(`${config.endpoint}/alumno/find`, {
                    idUsuario: user.idUsuario
                });
                for(const criterio of criterios){
                    const response = await axios.post(`${config.endpoint}/criterioevaluacionpuntajes/find`,
                        {
                            idCriterioEvaluacion: criterio.idCriterioEvaluacion,
                            idAlumno: alumno.data.idAlumno
                        }
                    );
                    if(response.data.puntaje){
                        calificacionLocal +=  response.data.puntaje * criterio.porcentaje_al_final / 100;
                        console.log(response.data.puntaje * criterio.porcentaje_al_final / 100)
                    }
                }
                console.log(calificacionLocal);
                setCalificacion(calificacionLocal);
            }
        }
        getCalificaciones();
    }, [criterios]);
    const handleLoadFile = (e) => {
        const file = e.target.files[0];
        if(file.size > 5242880){
            alert("El archivo excede el tamaño máximo permitido");
            return;
        }
        archivos.push(file);
        setArchivos([...archivos]);
    }

    const eliminarArchivo = (index) => {
        archivos.splice(index, 1);
        setArchivos([...archivos]);
    }

    const eliminarArchivoEntregado = (index) => {
        archivosYaEntregados.splice(index, 1);
        setArchivosYaEntregados([...archivosYaEntregados]);
    }

    const entregarEvidencia = async () => {
        try {
            const alumno = await axios.post(`${config.endpoint}/alumno/find`,{
                idUsuario: user.idUsuario
            });
            if (!alumno.data.idAlumno) {
                return;
            }
            const formData = new FormData();
            formData.append("idEvidencia", idEvidencia);
            formData.append("idAlumno", alumno.data.idAlumno);
            archivos.forEach(archivo => {
                formData.append("archivos", archivo);
            });
            archivosYaEntregados.forEach(archivo => {
                formData.append("archivosYaEntregados", archivo.nombre_original);
            });
            const response = await axios.post(`${config.endpoint}/evidenciaentregada`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
            showAlert("Evidencia entregada", "Evidencia entregada correctamente", "success", "/home");
        } catch (error) {
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
                showAlert("Error", error.response.data.error ?? "Error en el servidor", "error");
                if(error.response.data.error){
                    console.log(error.response.data.error);
                }
            }
        }
    }
    return (
    <div id="evidencia">
        <section id="titulo-evidencia">
            <h1>{evidencia.nombre}</h1>
            <div id="info-entrega">
                <p>Entrega: {new Date(evidencia.fechaLimite).toLocaleDateString()}</p>
                {user.privilege === 1 && <p>{calificacion}/100</p>}
            </div>
        </section>
        <div id="info-evidencia">
            <div id="datos-evidencia">
                <section id="descripcion-evidencia">
                    <p>{evidencia.descripcion}</p>
                </section>
                {evidencia.archivoDescripcion &&
                <section id="archivo-evidencia">
                    <a className="button" href={`${config.endpoint}/descripciones/${evidencia.archivoDescripcion}`} download>Descripción de evidencia</a>
                </section>}
                <section id="criterios">
                    <h2>Criterios de evaluación</h2>
                    {user.privilege >= 2 && <button type="button" className="button" onClick={() => navigate("/home/CriterioEvaluacion/nuevo", {
                                                                                        state: {
                                                                                                campos: [
                                                                                                {
                                                                                                    clave: 'titulo',
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'descripcion',
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true,
                                                                                                },  
                                                                                                {
                                                                                                    clave: 'porcentaje_al_final',
                                                                                                    tipo: "number",
                                                                                                    obligatorio: true,
                                                                                                }, 
                                                                                            ],
                                                                                            idEvidencia: idEvidencia
                                                                                        }
                                                                                    }
                                                                                )
                                                                            } >Crear criterio de evaluación</button>}
                    {criterios.length === 0 && <p>No hay criterios de evaluación</p>}
                    {criterios.map(criterio => {
                        return (
                            <CriterioEvaluacion criterio={criterio} key={criterio.idCriterio} getCriterios={getCriterios}/>
                        );
                    })}
                </section>
            </div>
            <aside id="entrega-evidencia">
                <div id="carga-archivo">
                    {user.privilege === 1 ?
                        (
                            <>
                                <h2>Entregar</h2>
                                {archivos.length > 0 && archivos.map((archivo, index) => {
                                    return (
                                    <div className="info-archivo" key={archivo.name}>
                                        <p className="nombre-archivo">{archivo.name}</p>
                                        <button type="button" onClick={() => eliminarArchivo(index)}><img src="/img/close.png" alt="Botón de eliminar archivo" /></button> 
                                    </div>)
                                })}
                                {archivosYaEntregados.length > 0 && archivosYaEntregados.map((archivo, index) => {
                                    return (
                                    <div className="info-archivo" key={archivo.nombre_original}>
                                        <p className="nombre-archivo">{archivo.nombre_original}</p>
                                        <div className="botones">
                                            <a href={`${config.endpoint}/descripciones/${archivo.archivo}`} download><img src="/img/download.svg" alt="Descargar documento" /></a>
                                            <button type="button" onClick={() => eliminarArchivoEntregado(index)}><img src="/img/close.png" alt="Botón de eliminar archivo" /></button> 
                                        </div>
                                    </div>)
                                })}
                                
                                <label htmlFor="evidencia-entregada" className="button" style={{textAlign:"center"}}>
                                    Cargar archivo
                                    <input type="file" id="evidencia-entregada" style={{display:'none'}} onChange={handleLoadFile}/>
                                </label>
                                <button className="button" onClick={entregarEvidencia}>{evidenciaEntregada ? "Volver a entregar evidencia" : "Entregar evidencia"}</button>
                            </>
                    )
                    :
                    (
                        <>
                            <h2>Evidencias entregadas</h2>
                            {
                                <>
                                {evidenciasEntregadas.length === 0 && <p>No hay evidencias entregadas aún</p>}
                                {evidenciasEntregadas.map((evidenciaEntregada, index) => {
                                    return (
                                        <div className="info-archivo" key={index}>
                                            <p className="nombre-archivo">{evidenciaEntregada.nombre}</p>
                                            <Link to={`/home/entrega/${evidenciaEntregada.idEvidenciaEntregada}`}><img src="/img/flecha.svg" alt="Ver entrega" /></Link>
                                        </div>
                                    )
                                })}
                                </>
                            }
                        </>
                    )
                }
                </div>
                    
                <div id="comentarios"></div>
                </aside>
        </div>
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
    </div>);
}

export default Evidencia;