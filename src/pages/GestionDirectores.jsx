import { useNavigate } from "react-router-dom";
import BarraBusquedaDirectores from "../components/BarraBusquedaDirectores";
function GestionDirectores() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Directores</h1>
                <BarraBusquedaDirectores />
                <button id="agregar" onClick={() => navigate("/home/director/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idUsuario',
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area_especializacion',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'grado_escolar',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'email_profesional',
                                                                                                tipo: "email",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area_cargo',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo director</button>
            </section>
        </>
    );
}

export default GestionDirectores;