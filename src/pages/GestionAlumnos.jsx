import { useNavigate } from "react-router-dom";
import BarraBusquedaAlumnos from "../components/BarraBusquedaAlumnos";
function GestionAlumnos() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Alumnos</h1>
                <BarraBusquedaAlumnos />
                <button id="agregar" onClick={() => navigate("/home/Alumno/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idCohorte',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'CrearPorLote',
                                                                                                tipo: "file"
                                                                                            },
                                                                                            {
                                                                                                clave: 'idCarrera',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'idGrupo',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'idUsuario',
                                                                                                tipo: "number"
                                                                                            },
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear alumnos</button>
            </section>
        </>
    );
}

export default GestionAlumnos;