import BarraBusqueda from "../components/BarraBusqueda";
import { useNavigate } from "react-router-dom";
function GestionUsuarios() {
    const navigate = useNavigate();
    const filtros = [
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Apellido Paterno",
            filter: "apellido_paterno"
        },
        {
            name: "Apellido Materno",
            filter: "apellido_materno"
        },
        {
            name: "Clave de identificación",
            filter: "clave_identificacion"
        },
        {
            name: "Privilegios (1-3)",
            filter: "privilege"
        }
    ]
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Usuarios</h1>
                <BarraBusqueda filters={filtros} campoTitulo={"clave_identificacion"} modeloBuscar = "usuario"/>
                <button id="agregar" onClick={() => navigate("/home/usuario/nuevo", {state: ['nombre', 'apellido_paterno', 'apellido_materno', 'email_personal', 'clave_identificacion', 'password', 'privilege']})} className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionUsuarios;