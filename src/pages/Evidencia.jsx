import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {Link} from "react-router-dom";
import axios from "axios";
import config from "../config.json";
import "../assets/css/evidencia.css";
function Evidencia() {
    const [evidencia, setEvidencia] = useState({});
    const [evidenciasEntregadas, setEvidenciasEntregadas] = useState([]);
    const { idEvidencia } = useParams();
    const { user } = useContext(UserContext);
    const [archivos, setArchivos] = useState([]);
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
        if(user.privilege >= 2){
            getEvidenciasEntregadas();
        }
    }, []);

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
    return (
    <div id="evidencia">
        <section id="titulo-evidencia">
            <h1>{evidencia.nombre}</h1>
            <div id="info-entrega">
                <p>Entrega: {new Date(evidencia.fechaLimite).toLocaleDateString()}</p>
                <p>10/100</p>
            </div>
        </section>
        <div id="info-evidencia">
            <div id="datos-evidencia">
                <section id="descripcion-evidencia">
                    <p>{evidencia.descripcion}</p>
                </section>
                <section id="archivo-evidencia">
                    <a className="button" href={`${config.endpoint}/descripciones/${evidencia.archivoDescripcion}`} download>Descripción de evidencia</a>
                </section>
                <section id="criterios">
                    <h2>Criterios de evaluación</h2>
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
                                
                                <label htmlFor="evidencia-entregada" className="button" style={{textAlign:"center"}}>
                                    Cargar archivo
                                    <input type="file" id="evidencia-entregada" style={{display:'none'}} onChange={handleLoadFile}/>
                                </label>
                                {archivos.length > 0 && <button className="button">Entregar evidencia</button>}
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
    </div>);
}

export default Evidencia;