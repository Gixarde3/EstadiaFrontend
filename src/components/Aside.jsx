import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Aside() {
    const { user } = useContext(UserContext);
    const opciones = [
        "Gestión de usuarios",
        "Gestión de planes educativos",
        "Gestión de atributos de egreso",
        "Gestión de criterios de desempeño",
        "Gestión de indicadores",
        "Gestión de cohortes estudiantiles",
        "Gestión de grupos",
        "Gestión de asignaturas",
        "Reportes",
    ]
    return (
    <aside>
        <div className="anti-shadow-div">
            <h2>
                <Link to={"/home/" + user.privilege === 1 ? "alumno" : user.privilege === 2 ? "profesor" : "director"}>
                    <img src="/img/home.webp" alt="Icono hogar" />
                {
                    user.privilege <= 2 ? "Asignaturas" : "Opciones"
                }
                </Link>
            </h2>    
        </div>
        <section id="nav-options">
            {
                user.privilege <= 2 ?
                    <p>Pronto disponible</p> :
                    (
                        opciones.map((opcion, index) => {
                            let link = "";
                            let partes = opcion.split(" ");
                            let linkPartes = [];
                            for(let i = 2; i < partes.length; i++){
                                linkPartes.push(partes[i]);
                            }
                            link = linkPartes.join('-').toLowerCase();
                            if(partes.length == 2){
                                link = partes[1].toLowerCase();
                            }
                            if(partes.length == 1){
                                link = partes[0].toLowerCase();
                            }
                            
                            return <Link to={link} key={index}>{opcion}</Link>
                        })
                    )
            }
        </section>
    </aside>);
}

export default Aside;