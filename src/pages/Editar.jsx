import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import "../assets/css/login.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
function Editar() {
    const { modelo, id } = useParams();
    const [valores, setValores] = useState({});
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    useEffect(() => {
        const getValores = async () => {
            try {
                const response = await axios.get(`${config.endpoint}/${modelo}/${id}`);
                setValores(response.data);
            } catch (error) {
                console.error(error);
                if(error.response.status === 404){
                    showAlert("Error", "No se encontraron resultados", "error");
                }
                else if(error.response.status === 401){
                    showAlert("Error", "No tienes permiso para realizar esta acción", "error");
                }
                else if(error.response.status === 500){
                    showAlert("Error", "Error en el servidor", "error");
                }
            }
        }
        getValores();
    }, [id]);

    const cambiarValor = (key, value) => {
        valores[key] = value;
        setValores({...valores});
    }

    const editar = async (e) => {
        e.preventDefault();
        try {
            showAlert("Editando", "Editando elemento", "loading");
            const formData = new FormData();
            Object.keys(valores).forEach(key => {
                formData.append(key, valores[key]);
            });
            const response = await axios.put(`${config.endpoint}/${modelo}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showAlert("Editado", "Elemento editado correctamente", "success", `/home`);
        } catch (error) {
            console.error(error);
            if(error.response.status === 404){
                showAlert("Error", "No se encontraron resultados", "error");
            }
            else if(error.response.status === 401){
                showAlert("Error", "No tienes permiso para realizar esta acción", "error");
            }
            else if(error.response.status === 500){
                showAlert("Error", "Error en el servidor", "error");
            }
        }
    }
    return (
        <>
            <section id="principal">
                <h1>Editar {modelo}</h1>
                <form onSubmit={editar} className="login">
                    {
                        Object.keys(valores).map((key, index) => {
                            if(key === 'password') return null;
                            if(key === `id${modelo.charAt(0).toUpperCase() + modelo.slice(1)}`) return null;
                            return (
                                <label key={index}>
                                    {key.replace("_", " ").split(' ')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')
                                    }
                                    <div className="input-row">    
                                        <input type="text" value={valores[key]} onChange={(e) => cambiarValor(key, e.target.value)}/>
                                    </div>
                                </label>
                            );
                        })
                    }
                    <button className="button">Editar {modelo}</button>
                </form>
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

export default Editar;