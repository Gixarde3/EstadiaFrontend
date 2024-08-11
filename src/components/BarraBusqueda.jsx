import React, { useState, useEffect } from 'react';
import Alert from './Alert';
import axios from 'axios';
import config from '../config.json';
import Resultado from './Resultado';
function BarraBusqueda(props) {
    const filters = props.filters;
    const modeloBuscar = props.modeloBuscar;
    const campoTitulo = props.campoTitulo;
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const [resultados, setResultados] = useState([]);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    const search = async () => {
        if(busqueda === ""){
            showAlert("Error", "Debes ingresar un término de búsqueda", "error");
            return;
        }
        try{
            showAlert("Buscando", "Buscando resultados", "loading");
            const formData = new FormData();
            formData.append(filtro, busqueda);
            const response = await axios.post(`${config.endpoint}/${modeloBuscar}s/findAll`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResultados(response.data);
            closeAlert();
        }catch(error){
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
            <search id="search">
                <button id="filters" type='button' onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    <img src="/img/filter.png" alt="Icono de filtros" />
                </button>
                <input type="text" id="search-input" placeholder="Buscar..." onChange={(e) => setBusqueda(e.target.value)}/>
                <button id="search-button" type='button' onClick={() => search()}>
                    <img src="/img/search.png" alt="Icono de búsqueda" />
                </button>
                <div id="filtros" style={{display: mostrarFiltros ? "flex" : "none"}}>
                    {
                        filters.map((filter, index) => {
                            return (
                                <button className="filtro" key={index} onClick={() => {setFiltro(filter.filter); setMostrarFiltros(false)}}>{filter.name}</button>
                            );
                        })   
                    }
                </div>
            </search>
            <div id="resultados">
                {
                    resultados.map((resultado, index) => {
                        return (
                            <Resultado key={index} titulo={resultado[campoTitulo]} datosVer={{...resultado}} campoTitulo={campoTitulo} modelo={modeloBuscar} search={search}/>
                        );
                    })
                }
            </div>
            <Alert 
                isOpen={alert && alert.isOpen}
                title={alert &&alert.title}
                message={alert && alert.message}
                kind={alert && alert.kind}
                closeAlert={closeAlert}
                redirectRoute={alert && alert.redirectRoute}
                asking={alert && alert.asking}
                onAccept={alert && alert.onAccept}
            />
        </>
    );
}

export default BarraBusqueda;