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
                                                                                                clave: 'tipo_contrato',
                                                                                                tipo: "text",
                                                                                                obligatorio: true,
                                                                                                regex: /^(Tiempo Completo|Por Asignatura)+$/
                                                                                            },
                                                                                            {
                                                                                                clave:"elemento_cargo",
                                                                                                tipo:"text",
                                                                                                obligatorio:true
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