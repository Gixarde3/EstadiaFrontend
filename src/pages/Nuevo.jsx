import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import "../assets/css/login.css";
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
function Nuevo() {
    const location = useLocation();
    const objeto = location.state.campos ? location.state.campos : location.state;
    const idAdicional = location.state.idAdicional ?? null
    const {modelo} = useParams();
    const [valores, setValores] = useState({});
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const cambiarValor = (key, value) => {
        valores[key].valor = value;
        setValores({...valores});
    }

    function separarMayusculas(palabra) {
        return palabra.replace(/([A-Z])/g, ' $1').trim();
    }

    useEffect(() => {
        objeto.map(val => {
            valores[val.clave] = {valor: '', obligatorio: val.obligatorio ?? false, regex: val.regex ?? /^.*$/, tipo: val.tipo ?? 'text'};
        })
        setValores({...valores});
    }, []);

    const crear = async (e) => {
        e.preventDefault();
        try {
            showAlert("Creando", "Creando elemento", "loading");
            const formData = new FormData();
            let valido = true;
            Object.keys(valores).forEach(key => {
                
                if(valores[key].obligatorio && valores[key].valor === '' || valores[key].valor === null){
                    showAlert("Error", "Llena todos los campos obligatorios", "error");
                    valido = false;
                    return;
                }
                if(valores[key].regex !== null && !valores[key].regex.test(valores[key].valor)){
                    showAlert("Error", "Llena todos los campos con el formato correcto", "error");
                    valido = false;
                    return;
                }
                formData.append(key, valores[key].valor);
            });
            idAdicional && formData.append('idGrupoMateria', idAdicional);
            if(!valido) return;
            const response = await axios.post(`${config.endpoint}/${modelo}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            showAlert("Creado", "Elemento creado correctamente", "success", `/home`);
        } catch (error) {
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
    return (
        <>
            <section id="principal">
                <h1>Crear {separarMayusculas(modelo)}</h1>
                <form onSubmit={crear} className="login">
                    {
                        Object.keys(valores).map((key, index) => {
                            return (
                                key.substring(0,2) === "id" && key.charAt(2) == key.charAt(2).toUpperCase() ? 
                                <Fragment key={index}> 
                                    <label  style={{marginBottom: 0}}>
                                        {
                                            key.substring(0, 2) === "id" ? separarMayusculas(key.slice(2)) : (
                                            key === 'anio' ?  "Año" : 
                                                                        key.replace("_", " ").split(' ')
                                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                        .join(' '))                                            
                                        }
                                        {
                                            valores[key].obligatorio && <span style={{color: "red"}}>*</span>
                                        }
                                    </label>
                                    <BarraBusquedaSeleccionar modelo={key.slice(2)} onSelect={(id) => cambiarValor(key, id)}/>
                                </Fragment>
                                :
                                <label key={index}>
                                    {
                                        key === 'anio' ?  "Año" : 
                                                                    separarMayusculas(key.replace("_", " ").split(' ')
                                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                                    .join(' '))
                                    }
                                    {
                                        valores[key].obligatorio && <span style={{color: "red"}}>*</span>
                                    }
                                    {
                                        valores[key].tipo === "file" ?
                                        (
                                            <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
                                                <label className="button" htmlFor={key}>Seleccionar archivo</label>
                                                <input type="file" style={{display:"none"}} onChange={(e) => {cambiarValor(key, e.target.files[0]); }} id={key}/>
                                                {valores[key].valor && (<p>Archivo seleccionado: {valores[key].valor.name}</p>)}
                                            </div>
                                        )
                                        :
                                        (<div className="input-row">    
                                            <input type={valores[key].tipo} value={valores[key].valor} onChange={(e) => cambiarValor(key, e.target.value)}/>
                                        </div>)
                                    }
                                </label>
                            );
                        })
                    }
                    <button className="button" style={{marginTop: '1rem'}}>Crear {separarMayusculas(modelo)}</button>
                </form>
                <p className="aclaracion">Todos los campos con <span style={{color: "red"}}>*</span> son obligatorios</p>
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