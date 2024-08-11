import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
function PrincipalProfesor() {
    const { user } = useContext(UserContext);
    return (  
        <>
            <h1>Bienvenido profesor@ {user.nombre} {user.apellido_paterno} {user.apellido_materno}</h1>
            <p>Seleccione una de sus materias para comenzar</p>
        </>
    );
}

export default PrincipalProfesor;