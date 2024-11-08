import { useNavigate } from "react-router-dom";
import BarraBusquedaIndicadores from "../components/BarraBusquedaIndicadores";
function GestionIndicadores() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Indicadores</h1>
                <BarraBusquedaIndicadores />
                <button id="agregar" onClick={() => navigate("/home/Indicador/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idAsignatura',
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'identificador',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'titulo',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'descripcion',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'meta',
                                                                                                tipo: "text",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo indicador</button>
            </section>
        </>
    );
}

export default GestionIndicadores;