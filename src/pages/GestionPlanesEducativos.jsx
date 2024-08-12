import BarraBusqueda from "../components/BarraBusqueda";
import { useNavigate } from "react-router-dom";
function GestionPlanesEducativos() {
    const navigate = useNavigate();
    const filtros = [
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Identificador de la carrera",
            filter: "idCarrera"
        },
        {
            name: "Abreviatura",
            filter: "abreviatura"
        },
        {
            name: "Clave",
            filter: "clave"
        },
        {
            name: "Año",
            filter: "anio"
        },
    ]
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de planes educativos</h1>
                <BarraBusqueda filters={filtros} campoTitulo={"abreviatura"} modeloBuscar = "PlanEducativo"/>
                <button id="agregar" onClick={() => navigate("/home/PlanEducativo/nuevo", {state: ['idCarrera', 'nombre', 'abreviatura', 'clave', 'anio']})} className="button">Crear nuevo plan educativo</button>
            </section>
        </>
    );
}

export default GestionPlanesEducativos;