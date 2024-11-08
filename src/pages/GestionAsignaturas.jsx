import { useNavigate } from "react-router-dom";
import BarraBusquedaAsignaturas from "../components/BarraBusquedaAsignaturas";
function GestionAsignaturas() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Asignaturas</h1>
                <BarraBusquedaAsignaturas />
                <button id="agregar" onClick={() => navigate("/home/Asignatura/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idProfesor',
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'codigo',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'nombre',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'academia',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            },
                                                                                            {
                                                                                                clave: 'cuatrimestre',
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            },
                                                                                            {
                                                                                                clave: 'descripcion',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            },
                                                                                            {
                                                                                                clave: 'proposito_aprendizaje',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            },
                                                                                            {
                                                                                                clave: 'idPlanEducativo',
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nueva asignatura</button>
            </section>
        </>
    );
}

export default GestionAsignaturas;