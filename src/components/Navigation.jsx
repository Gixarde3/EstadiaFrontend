import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Navigation() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if(!user) {
            navigate("/");
        }
    }, [user]);

    const roles = ["alumno", "profesor", "director"];
    return (<>
    {user &&
        <header>
            <div id="title">
                <img src="/img/logo_pequeno.webp" alt="Logo upemor" className="logo"/>
                <h1>Sistema Upemor</h1>
            </div>
            <p>{user.clave_identificacion} - {user.nombre}</p>
            <img src={`/img/${roles[user.privilege-1]}.webp`} alt="Logo usuario" className="logo" />
        </header>
    }
    </>);
}

export default Navigation;