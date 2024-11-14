import axios from "axios";
import config from "../config.json"
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
function Notificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const {user} = useContext(UserContext);
    const getNotificaciones = async () => {
        try{
            const response = await axios.post(`${config.endpoint}/notificacions/findall`,{
                idUsuario:user.idUsuario
            });
            setNotificaciones(response.data);
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
        getNotificaciones();
    }, []);
    return (
    <section id="principal">
        <h1>Tus notificaciones</h1>
        {
            notificaciones.map((notificacion, index) => {
                return (
                    <div key={index} className="notificacion">
                        <h2>{notificacion.titulo}</h2>
                        <p>{notificacion.contenido}</p>
                        <p className="fecha">{new Date(notificacion.fechaCreacion).toLocaleDateString()}</p>
                    </div>
                )
            })
        }
    </section>);
}

export default Notificaciones;