import { useParams } from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import config from "../config.json";
import "../assets/css/evidencia.css";
import CriterioEvaluacion from "../components/CriterioEvaluacion";
import { toast, Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Markdown from "react-markdown";
import Alert from "../components/Alert";
import {jsPDF} from "jspdf"

function EvidenciaEntregada() {
    const {idEvidenciaEntregada} = useParams();
    const [archivosEntregados, setArchivosEntregados] = useState([]);
    const [evidenciaEntregada, setEvidenciaEntregada] = useState(null);
    const [criteriosEvaluacion, setCriteriosEvaluacion] = useState([]);
    const [retroalimentacion, setRetroalimentacion] = useState("");
    const [alumno, setAlumno] = useState(null);
    const [evidencia, setEvidencia] = useState(null);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
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
        const getRetroalimentacion = async () => {
            try{
                const response = await axios.post(`${config.endpoint}/retroalimentacionevidenciaentregada/find`, {
                    idEvidenciaEntregada,
                });
                setRetroalimentacion(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getRetroalimentacion();
    }, [evidenciaEntregada]);


    const generarReporteRetroalimentacion = async () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text("Reporte de Retroalimentación de Evidencia", 20, 20);

        // Información de la evidencia
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Evidencia: ${evidencia.idEvidencia}`, 20, 30);
        let yPosition = 40;
        doc.text(`ID Entrega: ${idEvidenciaEntregada}`, 20, yPosition);
        yPosition += 20;

        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Criterios de Evaluación", 20, 60);

        // Agregar criterios de evaluación
        criteriosEvaluacion.forEach((criterio, index) => {
            const yPositionLocal = yPosition + 10 + (index * 40);
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.text(`${criterio.titulo}:`, 20, yPositionLocal);
            doc.setFont("helvetica", "normal");
            doc.text(doc.splitTextToSize(criterio.descripcion, 160), 20, yPositionLocal + 10);
        });

        // Agregar nueva página
        doc.addPage();
        doc.setFont("helvetica", "bold");
        doc.text("Retroalimentación", 20, 10);

        // Obtener el contenido HTML
        const htmlContent = document.getElementById("retroalimentacion");
        console.log(htmlContent);

        // Usar doc.html para renderizar el contenido HTML en la segunda página
        doc.html(htmlContent, {
            x: 20,
            y: 310, // Asegúrate de que la posición y esté lo suficientemente baja para que no se sobreponga con el título
            html2canvas: {
                scale: 0.25, // Ajusta la escala según lo necesario
            },
            callback: function (doc) {
                // Guardar el PDF una vez generado
                doc.save("reporte_retroalimentacion_"+idEvidenciaEntregada+".pdf");
            },
        });

    }
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
            }catch(error){
                console.error(error);
            }
        }
        getEvaluaciones();
    }, [criteriosEvaluacion]);

    const generarRetroalimentacion = async () => {
        try{
            showAlert("Cargando", "Generando retroalimentación", "loading");
            const response = await axios.post(`${config.endpoint}/evidenciaentregada/retroalimentacion`, {
                idEvidenciaEntregada
            })
            notify("Retroalimentación generada", "success");
            window.location.reload();
        }catch(error){
            console.error(error);
        }
    }

    const cambiarRetroalimentacion = async () => {
        try{
            if(!retroalimentacion){
                await axios.post(`${config.endpoint}/retroalimentacionevidenciaentregada`, {
                    idEvidenciaEntregada,
                    retroalimentacion: retroalimentacion
                })
            }else{
                await axios.put(`${config.endpoint}/retroalimentacionevidenciaentregada/${retroalimentacion.idRetroalimentacionEvidenciaEntregada}`, {
                    retroalimentacion: retroalimentacion
                });
            }
            notify("Retroalimentación guardada", "success");
        }catch(error){
            notify("Ocurrió un error al guardar la retroalimentación", "error");
            console.error(error);
        }
    }

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
                <div id="comentarios">
                    <h2>Comentarios</h2>
                    <button type="button" className="button" onClick={generarRetroalimentacion}>Generar retroalimentacion con AI</button>
                    {retroalimentacion && <div id="retroalimentacion"><Markdown>{retroalimentacion.retroalimentacion}</Markdown></div>}
                    <h2>Ingresar o cambiar retroalimentación: </h2>
                    <textarea name="comentario" id="comentario" cols="30" rows="10" placeholder="Agrega un comentario" onChange={(e) => setRetroalimentacion(e.target.value)} value={retroalimentacion.retroalimentacion}></textarea>
                    <button type="button" className="button" onClick={cambiarRetroalimentacion}>{retroalimentacion ? "Cambiar retroalimentación" : "Guardar retroalimentación"}</button>
                    {retroalimentacion && <button type="button" className="button" onClick={generarReporteRetroalimentacion}>Generar reporte de retroalimentación</button>}
                </div>
            </aside>
        </div>
        <ToastContainer />
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

export default EvidenciaEntregada;