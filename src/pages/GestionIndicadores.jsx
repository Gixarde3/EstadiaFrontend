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
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'identificador',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'titulo',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'descripcion',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'meta',
                                                                                                tipo: "text"
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