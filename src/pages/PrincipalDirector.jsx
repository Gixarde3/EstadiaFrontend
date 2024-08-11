import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
function PrincipalDirector() {
    const { user } = useContext(UserContext);
    return (  
        <>
            <h1>Bienvenido director@ {user.nombre} {user.apellido_paterno} {user.apellido_materno}</h1>
            <p>Seleccione una de las opciones para comenzar</p>
        </>
    );
}

export default PrincipalDirector;