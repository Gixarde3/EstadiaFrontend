import { useNavigate } from "react-router-dom";
import BarraBusquedaProfesores from "../components/BarraBusquedaProfesores";
function GestionProfesores() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Profesores</h1>
                <BarraBusquedaProfesores />
                <button id="agregar" onClick={() => navigate("/home/profesor/nuevo", {
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
                                                                                                clave: 'tipo_contrato',
                                                                                                tipo: "text"
                                                                                            },
                                                                                            {
                                                                                                clave:"elemento_cargo",
                                                                                                tipo:"text"
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo profesor</button>
            </section>
        </>
    );
}

export default GestionProfesores;