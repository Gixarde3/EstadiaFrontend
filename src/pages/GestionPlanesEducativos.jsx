import BarraBusqueda from "../components/BarraBusqueda";
import { useNavigate } from "react-router-dom";
import BarraBusquedaPlanesEducativos from "../components/BarraBusquedaPlanesEducativos";
function GestionPlanesEducativos() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de planes educativos</h1>
                <BarraBusquedaPlanesEducativos />
                <button id="agregar" onClick={() => navigate("/home/PlanEducativo/nuevo", {
                                                                                            state: 
                                                                                                [
                                                                                                    {
                                                                                                        clave: 'idCarrera',
                                                                                                        tipo: "number",
                                                                                                        obligatorio: true
                                                                                                    }, 
                                                                                                    {
                                                                                                        clave: 'nombre',
                                                                                                        tipo: "text",
                                                                                                        obligatorio: true
                                                                                                    }, 
                                                                                                    {
                                                                                                        clave: 'abreviatura',
                                                                                                        tipo: "text",
                                                                                                        obligatorio: true
                                                                                                    }, 
                                                                                                    {
                                                                                                        clave: 'clave',
                                                                                                        tipo: "text",
                                                                                                        obligatorio: true
                                                                                                    }, 
                                                                                                    {
                                                                                                        clave: 'anio',
                                                                                                        tipo: "number",
                                                                                                        obligatorio: true
                                                                                                    }
                                                                                                ]
                                                                                            })} 
                    className="button">Crear nuevo plan educativo</button>
            </section>
        </>
    );
}

export default GestionPlanesEducativos;