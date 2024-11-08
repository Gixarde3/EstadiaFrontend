import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios";
import config from "../config.json";
import Tarea from '../components/Tarea';
function Asignatura() {
    const [evidencias, setEvidencias] = useState([]);
    const { idGrupoMateria } = useParams();
    const location = useLocation();
    const objeto = location.state || {};
    const [color, setColor] = useState(0);

    useEffect(() => {
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
        getEvidencias();
    }, []);
    return (
        <div className='contenedor'>
            <div id={`header-materia`} className={`color-${color}`}>
                <h1>{objeto.nombre}</h1>
                <h2>Profesor: {objeto.nombreProfesor}</h2>
            </div>
            <h3 className='titulo'>Evidencias</h3>
            <div className="tareas">
                {
                    evidencias.map((evidencia, index) => {
                        return (
                        <Tarea
                            key={index}
                            idEvidencia={evidencia.idEvidencia}
                            nombre={evidencia.nombre}
                            fechaLimite={evidencia.fechaLimite}
                        />
                    )})
                }
            </div>
        </div>
    );
}

export default Asignatura;