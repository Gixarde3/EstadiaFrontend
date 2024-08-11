import BarraBusqueda from "../components/BarraBusqueda";
import { useNavigate } from "react-router-dom";
function GestionDirectores() {
    const navigate = useNavigate();
    const filtros = [
        {
            name: "Área de especialización",
            filter: "area_especializacion"
        },
        {
            name: "Grado escolar",
            filter: "grado_escolar"
        },
        {
            name: "Email profesional",
            filter: "email_profesional"
        },
        {
            name: "Área a cargo",
            filter: "area_cargo"
        },
    ]
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Directores</h1>
                <BarraBusqueda filters={filtros} campoTitulo={"idDirector"} modeloBuscar = "director"/>
                <button id="agregar" onClick={() => navigate("/home/director/nuevo", {state: ['idUsuario', 'area_especializacion', 'grado_escolar', 'email_profesional', 'area_cargo']})} className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionDirectores;