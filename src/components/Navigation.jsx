import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OptionsContext } from "../contexts/OptionsContext";
function Navigation() {
    const { user } = useContext(UserContext);
    const { isOpen, setIsOpen } = useContext(OptionsContext);
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
            <button id="title" onClick={() => setIsOpen(!isOpen)}>
                <img src="/img/logo_pequeno.webp" alt="Logo upemor" className="logo"/>
                <h1>Sistema Upemor</h1>
            </button>
            <p><span id="matricula">{user.clave_identificacion} - </span>{user.nombre}</p>
            <img src={`/img/${roles[user.privilege-1]}.webp`} alt="Logo usuario" className="logo" />
        </header>
    }
    </>);
}

export default Navigation;