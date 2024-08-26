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
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area_especializacion',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'grado_escolar',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'email_profesional',
                                                                                                tipo: "email"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area_cargo',
                                                                                                tipo: "text"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionDirectores;