import { useLocation, useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import axios from "axios";
import config from "../config.json";
import Tarea from '../components/Tarea';
import { Link } from 'react-router-dom';
function Asignatura() {
    const [evidencias, setEvidencias] = useState([]);
    const { idGrupoMateria } = useParams();
    const {user} = useContext(UserContext);
    console.log(user);
    const location = useLocation();
    const objeto = location.state || {};
    const [color, setColor] = useState(0);
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
    return (
        <div className='contenedor'>
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
            </div>
        </div>
    );
}

export default Asignatura;