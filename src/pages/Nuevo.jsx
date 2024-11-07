import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import "../assets/css/login.css";
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
function Nuevo() {
    const location = useLocation();
    const objeto = location.state || {};
    const {modelo} = useParams();
    const [valores, setValores] = useState({});
    const [tipos, setTipos] = useState([]);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const cambiarValor = (key, value) => {
        valores[key] = value;
        setValores({...valores});
    }

    function separarMayusculas(palabra) {
        return palabra.replace(/([A-Z])/g, ' $1').trim();
    }

    useEffect(() => {
        console.log(objeto);
        objeto.map(val => {
            valores[val.clave] = '';
            tipos.push(val.tipo);
        })
        setValores({...valores});
    }, []);

    const crear = async (e) => {
        e.preventDefault();
        try {
            showAlert("Creando", "Creando elemento", "loading");
            const formData = new FormData();
            Object.keys(valores).forEach(key => {
                formData.append(key, valores[key]);
            });
            const response = await axios.post(`${config.endpoint}/${modelo}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showAlert("Creado", "Elemento creado correctamente", "success", `/home`);
        } catch (error) {
            console.error(error);
            if(error.response.status === 404){
                showAlert("Error", "No se encontraron resultados", "error");
            }
            else if(error.response.status === 401){
                showAlert("Error", "No tienes permiso para realizar esta acción", "error");
            }
            else if(error.response.status === 500){
                showAlert("Error", error.response.data.message ?? "Error en el servidor", "error");
            }else{
                showAlert("Error", "Ocurrió un error inesperado. Por favor contacta a soporte.", "error");
            }
        }
    }
    return (
        <>
            <section id="principal">
                <h1>Crear {separarMayusculas(modelo)}</h1>
                <form onSubmit={crear} className="login">
                    {
                        Object.keys(valores).map((key, index) => {
                            return (
                                key.substring(0,2) === "id" && key.charAt(2) == key.charAt(2).toUpperCase() ? 
                                <> 
                                    <label key={index} style={{marginBottom: 0}}>
                                        {
                                            key.substring(0, 2) === "id" ? separarMayusculas(key.slice(2)) : (
                                            key === 'anio' ?  "Año" : 
                                                                        key.replace("_", " ").split(' ')
                                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                        .join(' '))
                                        }
                                    </label>
                                    <BarraBusquedaSeleccionar modelo={key.slice(2)} onSelect={(id) => cambiarValor(key, id)}/>
                                </>
                                :
                                <label key={index}>
                                    {
                                        key === 'anio' ?  "Año" : 
                                                                    separarMayusculas(key.replace("_", " ").split(' ')
                                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(' '))
                                    }
                                    {
                                        tipos[index] === "file" ?
                                        (
                                            <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                                                <label className="button" for={key}>Seleccionar archivo</label>
                                                <input type="file" style={{display:"none"}} onChange={(e) => {cambiarValor(key, e.target.files[0]); }} id={key}/>
                                                {valores[key] && (<p>Archivo seleccionado: {valores[key].name}</p>)}
                                            </div>
                                        )
                                        :
                                        (<div className="input-row">    
                                            <input type={tipos[index]} value={valores[key]} onChange={(e) => cambiarValor(key, e.target.value)}/>
                                        </div>)
                                    }
                                </label>
                            );
                        })
                    }
                    <button className="button">Crear {separarMayusculas(modelo)}</button>
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

export default Nuevo;