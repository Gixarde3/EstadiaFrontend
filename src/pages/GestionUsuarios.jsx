import { useNavigate } from "react-router-dom";
import BarraBusquedaUsuarios from "../components/BarraBusquedaUsuarios";
function GestionUsuarios() {
    const navigate = useNavigate();
    return (
        <>
            
            <section id="principal">
                <h1>Gestión de Usuarios</h1>
                <BarraBusquedaUsuarios />
                <button id="agregar" onClick={() => navigate("/home/usuario/nuevo", {
                                                                                        state: [
                                                                                                {
                                                                                                    clave: 'nombre',
                                                                                                    tipo: "text"
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'apellido_paterno',
                                                                                                    tipo: "text"
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'apellido_materno',
                                                                                                    tipo: "text"
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'email_personal',
                                                                                                    tipo: "email"
                                                                                                },
                                                                                                {
                                                                                                    clave: 'clave_identificacion',
                                                                                                    tipo: "text"
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'password',
                                                                                                    tipo: "password"
                                                                                                },
                                                                                                {
                                                                                                    clave: 'privilege',
                                                                                                    tipo: "number"
                                                                                                }
                                                                                            ]
                                                                                        }
                                                                                    )
                                                                                } className="button">Crear nuevo usuario</button>
            </section>
        </>
    );
}

export default GestionUsuarios;