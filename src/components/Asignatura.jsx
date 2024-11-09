import { Link } from "react-router-dom";
import "../assets/css/asignatura.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config.json";
function Asignatura({idGrupoMateria, nombre, nombreProfesor, cuatrimestre, letra}) {
    const [color, setColor] = useState(0);
    const [evidenciasProximas, setEvidenciasProximas] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        setColor(Math.floor(Math.random() * 8) + 1);
        const getEvidenciasProximas = async () => {
            try{
                const response = await axios.get(`${config.endpoint}/grupomateria/${idGrupoMateria}/proximas-entregas`);
                console.log(response.data);
                setEvidenciasProximas(response.data);
            }catch(error){
                console.error(error);
            }
        }
        getEvidenciasProximas();
    }, []);
    return (
        <button className={`asignatura color-${color}`} onClick={() => navigate(`/home/asignatura/${idGrupoMateria}`, {
                                                                                        state:{
                                                                                            nombre,
                                                                                            nombreProfesor,
                                                                                        }
                                                                                    }
                                                                                )
                                                                            }>
            <div className="nombre-materia">
                <h2 className="titulo-materia">{nombre} - {cuatrimestre}° {letra} - {nombreProfesor}</h2>
            </div>
            <div className="evidencias-proximas">
                <img src="/img/tarea.png" alt="Próximas tarea"/>
                {evidenciasProximas.length <= 0 && <p>No hay evidencias próximas a entregar. ¡Felicidades!</p>}
                <ul>
                    {evidenciasProximas.map((evidencia, index) => <li key={index}><Link to={`/home/evidencia/${evidencia.idEvidencia}`}>{evidencia.nombre} - {new Date(evidencia.fechaLimite).toLocaleString('es-MX', {
                                                                                                                                                                                                                        year: 'numeric',
                                                                                                                                                                                                                        month: '2-digit',
                                                                                                                                                                                                                        day: '2-digit',
                                                                                                                                                                                                                    }
                                                                                                                                                                                                                )
                                                                                                                                                                                                            }</Link></li>)}
                </ul>
            </div>
        </button>
    );
}

export default Asignatura;