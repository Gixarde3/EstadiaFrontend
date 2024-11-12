import axios from "axios";
import config from "../config.json";
import { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
function ActividadesEspeciales() {
    const [archivoRespaldo, setArchivoRespaldo] = useState(null);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const { user } = useContext(UserContext);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const cargarRespaldo = async () => {
        try{
            const formData = new FormData();
            formData.append('sql', archivoRespaldo);
            showAlert("Cargando", "Cargando respaldo de la base de datos", "loading");
            const response = await axios.post(`${config.endpoint}/backup`, formData ,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setArchivoRespaldo(null);
            showAlert("Éxito", "Respaldo cargado correctamente", "success", null, false, null);
        }catch(e){
            showAlert("Error", "Hubo un error al cargar el respaldo de la base de datos", "error");
        }
    }
    return (
    <section id="principal">
        <h1>Acciones especiales</h1>
        {user.privilege === 3 &&
        <form className="login">
            <h2>Respaldo y recuperación de la base de datos</h2>
            <a href={`${config.endpoint}/backup`} className="button" download>Generar respaldo de la base de datos</a>
            {archivoRespaldo && <p>Archivo seleccionado: {archivoRespaldo.name}</p>}
            <label className="button">
                Importar archivo de respaldo
                <input type="file" style={{display: "none"}} onChange={(e) => setArchivoRespaldo(e.target.files[0])}/>
            </label>
            {archivoRespaldo && <button type="button" className="button" onClick={cargarRespaldo}>Cargar respaldo</button>}
        </form>}
        <Link to="/home/grafica-evidencias" className="button">Gráfica comparativa entre resultados de evidencias entre grupos</Link>
        <Link to="/home/grafica-alumnos" className="button">Gráfica comparativa entre alumnos</Link>
        {user.privilege === 3 && <Link to="/home/grafica-cohortes" className="button">Gráfica comparativa en el cumplimiento de atributos de egreso entre cohortes</Link>}
        <Link to="/home/grafica-no-entrega" className="button">Gráfica de comparación de porcentajes de no entrega</Link>
        <Alert 
            title={alert?.title} 
            message={alert?.message} 
            kind={alert?.kind} 
            isOpen={alert?.isOpen} 
            closeAlert={() => closeAlert()} 
            redirectRoute={alert?.redirectRoute} 
            asking={alert?.asking} 
            onAccept={alert?.onAccept}
        />
    </section>
    );
}

export default ActividadesEspeciales;