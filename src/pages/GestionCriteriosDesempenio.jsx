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