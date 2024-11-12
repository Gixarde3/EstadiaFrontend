import Grafica from "../components/Grafica";
import { useEffect, useState, Fragment } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import Alert from "../components/Alert";
import axios from "axios";
import config from "../config.json";
function GraficaPorcentajesNoEntrega() {
    const [titulos, setTitulos] = useState([]);
    const [resultados, setResultados] = useState([]);
    const [idGrupoMateria, setIdGrupoMateria] = useState(0);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }

    useEffect(() => {
        console.log(titulos, resultados);
    }, [titulos, resultados]);

    useEffect(() => {
        const getNoEntregas = async () => {
            try{
                const response = await axios.get(`${config.endpoint}/grupomateria/porcentajesNoEntrega/${idGrupoMateria}`);
                const titulosActuales = [];
                const resultadosActuales = [];
                console.log(response.data);
                for(const noEntrega of response.data){
                    const evidencia = await axios.get(`${config.endpoint}/evidencia/${noEntrega.idEvidencia}`);
                    titulosActuales.push(evidencia.data.nombre);
                    resultadosActuales.push(noEntrega.Porcentaje);
                }
                setTitulos(titulosActuales);
                setResultados(resultadosActuales);
            }catch(e){
                console.error(e);
            }
        }
        getNoEntregas();
    }, [idGrupoMateria]);

    
    return (
        <section id="principal">
            <h1>Gráfica comparativa entre resultados de alumnos entre grupos</h1>
            <form className="login">
                <label>
                    Grupo
                    <BarraBusquedaSeleccionar modelo="grupoMateria" onSelect={(id) => setIdGrupoMateria(id)}/>
                </label>
            </form>
            {titulos.length > 0 && resultados.length > 0 && <Grafica labels={titulos} data={resultados} title={"Gráfica comparativa de falta de entrega de evidencias del grupo"} tituloLocal={"Porcentaje de falta de entrega"}/>}
            <Alert 
                title={alert?.title} 
                message={alert?.message} 
                kind={alert?.kind} 
                isOpen={alert?.isOpen} 
                closeAlert={() => closeAlert()} 
                redirectRoute={alert?.redirectRoute} 
                asking={alert?.asking} 
                onAccept={alert?.onAccept}
            />
        </section>
    );
}

export default GraficaPorcentajesNoEntrega;