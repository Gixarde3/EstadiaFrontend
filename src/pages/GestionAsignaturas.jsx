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
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'codigo',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'nombre',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'area',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'academia',
                                                                                                tipo: "text"
                                                                                            },
                                                                                            {
                                                                                                clave: 'cuatrimestre',
                                                                                                tipo: "number"
                                                                                            },
                                                                                            {
                                                                                                clave: 'descripcion',
                                                                                                tipo: "text"
                                                                                            },
                                                                                            {
                                                                                                clave: 'proposito_aprendizaje',
                                                                                                tipo: "text"
                                                                                            },
                                                                                            {
                                                                                                clave: 'idPlanEducativo',
                                                                                                tipo: "number"
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