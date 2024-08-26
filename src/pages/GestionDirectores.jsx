import { useNavigate } from "react-router-dom";
import BarraBusquedaDirectores from "../components/BarraBusquedaDirectores";
function GestionDirectores() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Directores</h1>
                <BarraBusquedaDirectores />
                <button id="agregar" onClick={() => navigate("/home/director/nuevo", {state: ['idUsuario', 'area_especializacion', 'grado_escolar', 'email_profesional', 'area_cargo']})} className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionDirectores;