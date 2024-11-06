import { useNavigate } from "react-router-dom";
import BarraBusquedaAtributosEgreso from "../components/BarraBusquedaAtributosEgreso";
function GestionAtributosEgreso() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Atributos de Egreso</h1>
                <BarraBusquedaAtributosEgreso />
                <button id="agregar" onClick={() => navigate("/home/AtributoEgreso/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idPlanEducativo',
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
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear nuevo atributo de egreso</button>
            </section>
        </>
    );
}

export default GestionAtributosEgreso;