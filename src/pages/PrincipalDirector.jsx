import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
function PrincipalDirector() {
    const { user } = useContext(UserContext);
    return (  
        <>
            <h1>Bienvenido director@ {user.nombre} {user.apellido_paterno} {user.apellido_materno}</h1>
            <Outlet/>
        </>
    );
}

export default PrincipalDirector;