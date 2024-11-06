import { useNavigate } from "react-router-dom";
import BarraBusquedaCriteriosDesempenio from "../components/BarraBusquedaCriteriosDesempenio";
function GestionCriteriosDesempenio() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Criterios de Desempeño</h1>
                <BarraBusquedaCriteriosDesempenio />
                <button id="agregar" onClick={() => navigate("/home/CriterioDesempenio/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idAtributoEgreso',
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
                                                                                            }
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo criterio de desempeño</button>
            </section>
        </>
    );
}

export default GestionCriteriosDesempenio;