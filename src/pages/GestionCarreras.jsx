import { useNavigate } from "react-router-dom";
import BarraBusquedaCarreras from "../components/BarraBusquedaCarreras";
function GestionCarreras() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Carreras</h1>
                <BarraBusquedaCarreras />
                <button id="agregar" onClick={() => navigate("/home/carrera/nuevo", {
                    state: [
                        {
                            clave: 'idDirector',
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
                        }
                    ]})} className="button">Crear nueva carrera</button>
            </section>
        </>
    );
}

export default GestionCarreras;