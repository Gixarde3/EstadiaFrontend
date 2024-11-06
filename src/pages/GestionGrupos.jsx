import { useNavigate } from "react-router-dom";
import BarraBusquedaGrupos from "../components/BarraBusquedaGrupo";
function GestionGrupos() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Grupos</h1>
                <BarraBusquedaGrupos />
                <button id="agregar" onClick={() => navigate("/home/Grupo/nuevo", {
                                                                                        state: [
                                                                                            {
                                                                                                clave: 'idCohorte',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'cantidad',
                                                                                                tipo: "number"
                                                                                            }, 
                                                                                            {
                                                                                                clave: 'letra_inicial',
                                                                                                tipo: "text"
                                                                                            }, 
                                                                                        ]
                                                                                    }
                                                                                )
                                                                            } 
                    className="button">Crear grupos</button>
            </section>
        </>
    );
}

export default GestionGrupos;