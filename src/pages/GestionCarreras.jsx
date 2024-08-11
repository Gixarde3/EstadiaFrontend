import BarraBusqueda from "../components/BarraBusqueda";
import { useNavigate } from "react-router-dom";
function GestionCarreras() {
    const navigate = useNavigate();
    const filtros = [
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Identificador del director",
            filter: "idDirector"
        },
        {
            name: "Abreviatura de la carrera",
            filter: "abreviatura"
        }
    ]
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Carreras</h1>
                <BarraBusqueda filters={filtros} campoTitulo={"nombre"} modeloBuscar = "carrera"/>
                <button id="agregar" onClick={() => navigate("/home/carrera/nuevo", {state: ['idDirector', 'nombre', 'abreviatura']})} className="button">Crear nueva carrera</button>
            </section>
        </>
    );
}

export default GestionCarreras;