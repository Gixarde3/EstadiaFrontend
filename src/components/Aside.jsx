import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OptionsContext } from "../contexts/OptionsContext";
import { MateriasContext } from "../contexts/MateriasContext";
import Asignatura from "./Asignatura";
function Aside() {
    const { user, setUser } = useContext(UserContext);
    const { isOpen, setIsOpen } = useContext(OptionsContext);
    const { materias, setMaterias } = useContext(MateriasContext);
    const opciones = [
        "Gestión de usuarios",
        "Gestión de directores",
        "Gestión de alumnos",
        "Gestión de profesores",
        "Gestión de carreras",
        "Gestión de planes educativos",
        "Gestión de atributos de egreso",
        "Gestión de criterios de desempeño",
        "Gestión de asignaturas",
        "Gestión de indicadores",
        "Gestión de cohortes estudiantiles",
        "Gestión de grupos",
        "Asignar profesores a asignaturas",
        "Mis acciones como profesor",
        "Acciones especiales",
    ]
    return (
    <aside className={isOpen ? "active" : ""}>
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
                   materias.map((materia, index) => {
                        return <Asignatura key={index}
                            idGrupoMateria={materia.idGrupoMateria}
                            nombre={materia.nombre}
                            nombreProfesor={materia.nombreProfesor}
                            cuatrimestre={materia.cuatrimestre}
                            letra={materia.letra}
                            isOption={true}
                        />
                   }):
                    (
                        <>
                        {
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
                                
                                return <Link to={link} key={index} onClick={() => setIsOpen(!isOpen)}>{opcion}</Link>
                            })
                        }
                        
                        </>
                    )
            }
            <button onClick={() => setUser(null)} style={{cursor: "pointer"}}>Cerrar sesión</button>
        </section>
    </aside>);
}

export default Aside;