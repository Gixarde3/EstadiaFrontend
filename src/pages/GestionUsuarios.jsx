import { useNavigate } from "react-router-dom";
import BarraBusquedaUsuarios from "../components/BarraBusquedaUsuarios";
function GestionUsuarios() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Usuarios</h1>
                <BarraBusquedaUsuarios />
                <button id="agregar" onClick={() => navigate("/home/usuario/nuevo", {state: ['nombre', 'apellido_paterno', 'apellido_materno', 'email_personal', 'clave_identificacion', 'password', 'privilege']})} className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionUsuarios;