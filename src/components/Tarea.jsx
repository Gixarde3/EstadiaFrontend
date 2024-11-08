import { Link } from "react-router-dom";
import {useState, useEffect} from 'react';
function Tarea({titulo, nombre, fechaLimite, idEvidencia}) {
    const [color, setColor] = useState(0);
    useEffect(() => {
        setColor(Math.floor(Math.random() * 8) + 1);
    }, []);
    return (
        <Link to={`/home/evidencia/${idEvidencia}`} className="tarea">
            <div className="info">
                <div className={`icono color-${color}`}>
                    <img src="/img/tarea_outline.png" alt="Ícono de tarea" />
                </div>
                <h3>{nombre}</h3>
            </div>
            <div className="info-extra">
                <p>{new Date(fechaLimite).toLocaleString('es-MX', {
                                                                            year: 'numeric',
                                                                            month: '2-digit',
                                                                            day: '2-digit',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                            hour12: false
                                                                        }
                                                                    )}</p>
            </div>
        </Link>
    );
}

export default Tarea;