import { useNavigate } from "react-router-dom";
import Asignatura from "../components/Asignatura";
import {useEffect, useState, useContext} from "react";
import axios from "axios";
import config from "../config.json";
import { UserContext } from "../contexts/UserContext";
import Alert from "../components/Alert";
import { MateriasContext } from "../contexts/MateriasContext";
function Materias() {
    const navigate = useNavigate();
    const [asignaturas, setAsignaturas] = useState([]);
    const { user } = useContext(UserContext);
    const {setMaterias} = useContext(MateriasContext);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    useEffect(() => {
        const getAsignaturas = async () => {
            try{
                if(!user){
                    showAlert("Error", "Inicia sesión para ver tus materias", "error", "/login");
                    return;
                }
                const response = await axios.get(`${config.endpoint}/asignaturas/findbyusuario/${user.idUsuario}`);
                
                setAsignaturas(response.data);
                setMaterias(response.data);
            }catch(error){
                if(!error.response){
                    showAlert("Error", "Ocurrió un error inesperado. Por favor contacta a soporte.", "error");
                    return;
                }
                if(error.response.status === 404){
                    showAlert("Error", "No se encontraron resultados", "error");
                }
                else if(error.response.status === 401){
                    showAlert("Error", "No tienes permiso para realizar esta acción", "error");
                }
                else if(error.response.status === 500){
                    showAlert("Error", error.response.data.error ?? "Error en el servidor", "error");
                }else{
                    showAlert("Error", "Ocurrió un error inesperado. Por favor contacta a soporte.", "error");
                }
            }
        }
        getAsignaturas();
    }, [])
    return (
        <>
            <section id="principal" className="materias">
                {
                    asignaturas.map((asignatura, index) => {
                        return <Asignatura 
                            key={index}
                            idGrupoMateria={asignatura.idGrupoMateria}
                            nombre={asignatura.nombre}
                            nombreProfesor={asignatura.nombreProfesor}
                            cuatrimestre={asignatura.cuatrimestre}
                            letra={asignatura.letra}
                        />
                    })
                }
            </section>
            <Alert 
                isOpen={alert ? alert.isOpen : false}
                title={alert ? alert.title : ''}
                message={alert ? alert.message : ''}
                kind={alert ? alert.kind : ''}
                closeAlert={closeAlert}
                redirectRoute={alert ? alert.redirectRoute : ''}
                asking={alert ? alert.asking : false}
                onAccept={alert ? alert.onAccept : () => {}}
            />
        </>
        
    );
}

export default Materias;