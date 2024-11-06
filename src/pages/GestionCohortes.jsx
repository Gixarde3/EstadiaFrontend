import { useNavigate } from "react-router-dom";
import BarraBusquedaCohortes from "../components/BarraBusquedaCohortes";
function GestionCohortes() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Cohortes</h1>
                <BarraBusquedaCohortes />
                <button id="agregar" onClick={() => navigate("/home/Cohorte/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idPlanEducativo',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'anio',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'periodo',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo cohorte</button>
            </section>
        </>
    );
}

export default GestionCohortes;