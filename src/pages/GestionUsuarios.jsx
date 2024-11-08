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
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'apellido_paterno',
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'apellido_materno',
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'email_personal',
                                                                                                    tipo: "email",
                                                                                                    obligatorio: true
                                                                                                },
                                                                                                {
                                                                                                    clave: 'clave_identificacion',
                                                                                                    tipo: "text",
                                                                                                    obligatorio: true
                                                                                                }, 
                                                                                                {
                                                                                                    clave: 'password',
                                                                                                    tipo: "password",
                                                                                                    obligatorio: true
                                                                                                },
                                                                                                {
                                                                                                    clave: 'privilege',
                                                                                                    tipo: "number",
                                                                                                    obligatorio: true
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