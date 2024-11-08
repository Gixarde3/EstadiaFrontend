import { useNavigate } from "react-router-dom";
import BarraBusquedaAlumnos from "../components/BarraBusquedaAlumnos";
import BarraBusquedaGrupoMaterias from "../components/BarraBusquedaGrupoMaterias";
function GestionGrupoMaterias() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de grupos de cada materia</h1>
                <p className="aclaracion">Para asignar a un profesor, busca la materia por nombre y edita la relación</p>
                <BarraBusquedaGrupoMaterias />
            </section>
        </>
    );
}

export default GestionGrupoMaterias;