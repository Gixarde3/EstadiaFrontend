import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from "axios";
import config from "../config.json";
import Tarea from '../components/Tarea';
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import {jsPDF} from 'jspdf';
import Markdown from 'react-markdown';
function Asignatura() {
    const [evidencias, setEvidencias] = useState([]);
    const { idGrupoMateria } = useParams();
    const {user} = useContext(UserContext);
    console.log(user);
    const location = useLocation();
    const objeto = location.state || {};
    const [color, setColor] = useState(0);
    const [retroalimentacion, setRetroalimentacion] = useState("");
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    const navigate = useNavigate();
    const getEvidencias = async () => {
        try{
            setColor(Math.floor(Math.random() * 8) + 1);
            const formData = new FormData();
            formData.append('idGrupoMateria', idGrupoMateria);
            const response = await axios.post(`${config.endpoint}/evidencias/findAll`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            
            setEvidencias(response.data);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        getEvidencias();
    }, []);

    const generarRetroalimentacion = async () => {
        try{
            showAlert("Generando retroalimentación", "Generando retroalimentación", "loading");
            const alumno = await axios.post(`${config.endpoint}/alumno/find`, {idUsuario: user.idUsuario});
            console.log(alumno)
            const response = await axios.get(`${config.endpoint}/grupomateria/retroalimentacion/${idGrupoMateria}/${alumno.data.idAlumno}`);
            setRetroalimentacion(response.data);
            showAlert("Retroalimentación generada", "Retroalimentación generada", "success");
            showAlert("¿Deseas descargar un reporte con la retroalimentación generada?", "", "question", null, true, generarPDF);
        }catch(error){
            console.error(error);
        }
    }
    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(`Reporte de retroalimentación`, 10, 10);
        doc.html(document.getElementById('retroalimentacion'), {
            x: 10,
            y: 20,
            html2canvas: {
                scale: 0.2
            },
            callback: function (doc) {
                doc.save('retroalimentacion.pdf');
            }
        });
    }
    return (
        <div className='contenedor'>
            <button type="button" className="button" style={{
                position: 'fixed',
                bottom: '1rem',
                right: '1rem',
                zIndex: 2
            }} onClick={generarRetroalimentacion}>Generar retroalimentación</button>
            <div id={`header-materia`} className={`color-${color}`}>
                <h1>{objeto.nombre}</h1>
                <h2>Profesor: {objeto.nombreProfesor}</h2>
            </div>
            <h3 className='titulo'>Evidencias</h3>
            
            {
                user.privilege >= 2 && <button className='tarea' style = {{cursor: 'pointer'}} onClick={() => navigate("/home/evidencia/nuevo", 
                    {
                        state: {
                            campos: [
                                {
                                    clave: 'nombre',
                                    tipo: "text",
                                    obligatorio: true
                                }, 
                                {
                                    clave: 'descripcion',
                                    tipo: "text",
                                    obligatorio: true
                                }, 
                                {
                                    clave: 'idAtributoEgreso',
                                    tipo: "text",
                                }, 
                                {
                                    clave: 'idAtributoEgreso',
                                    tipo: "text",
                                },
                                {
                                    clave: 'idIndicador',
                                    tipo: "text",
                                }, 
                                {
                                    clave: 'archivoDescripcion',
                                    tipo: "file",
                                }, 
                                {
                                    clave: 'idIndicador',
                                    tipo: "text",
                                }, 
                                {
                                    clave: 'objetivo',
                                    tipo: "text",
                                    obligatorio: true
                                }, 
                                {
                                    clave: 'momento',
                                    tipo: "text",
                                    obligatorio: true
                                }, 
                                {
                                    clave: 'tipo',
                                    tipo: "text",
                                    regex: /^(Producto|Desempeño|Conocimiento|Formativa)$/,
                                    obligatorio: true
                                }, 
                                {
                                    clave: 'fechaLimite',
                                    tipo: "date",
                                }
                            ],
                            idAdicional: idGrupoMateria
                        }
                    }
                )}>

                    <div className="info">
                        <div className={`icono color-${color}`}>
                            <img src="/img/add.png" alt="Ícono de agregar" />
                        </div>
                        <h3>Crear nueva tarea</h3>
                    </div>
                </button>
            }

            {user.privilege >= 2 && <Link className="tarea" style={{marginTop: '1rem'}} to={`/home/evidencia/generar/${idGrupoMateria}`}>
                <div className="info">
                    <div className={`icono color-${color}`}>
                        <img src="/img/stars.svg" alt="Ícono de agregar" />
                    </div>
                    <h3>Generar sugerencia de evidencia con IA</h3>
                </div>
            </Link>}
            <div className="tareas">
                {
                    evidencias.map((evidencia, index) => {
                        return (
                        <Tarea
                            key={index}
                            idEvidencia={evidencia.idEvidencia}
                            nombre={evidencia.nombre}
                            fechaLimite={evidencia.fechaLimite}
                            getEvidencias={getEvidencias}
                        />
                    )})
                }
                <div id="retroalimentacion" style={{maxWidth: "800px"}}>
                    <Markdown>{retroalimentacion}</Markdown>            
                </div>
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
        </div>
    );
}

export default Asignatura;