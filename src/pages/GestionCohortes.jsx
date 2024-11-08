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
                                                                                                tipo: "number",
                                                                                                obligatorio: true
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'anio',
                                                                                                tipo: "number",
                                                                                                obligatorio: true,
                                                                                                regex: /^(20[2-9][0-9])$/
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'periodo',
                                                                                                tipo: "text",
                                                                                                obligatorio: true,
                                                                                                regex: /^(O|P|I)$/
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