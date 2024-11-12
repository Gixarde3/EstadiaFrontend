import Grafica from "../components/Grafica";
import { useEffect, useState, Fragment } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import Alert from "../components/Alert";
import axios from "axios";
import config from "../config.json";
function GraficaCumplimientoCohortes() {
    const [cohortes, setCohortes] = useState([]);
    const [titulos, setTitulos] = useState([]);
    const [atributoEgreso, setAtributoEgreso] = useState(0);
    const [resultados, setResultados] = useState([]);
    const [cantidadCohortes, setCantidadCohortes] = useState(0);
    const [alert, setAlert] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    useEffect(() => {
        if(cantidadCohortes){
            setAtributoEgreso(0);
            setCohortes([]);
            setResultados([]);
            setTitulos([]);
        }
    }, [cantidadCohortes]);

    useEffect(() => {
        console.log(titulos, resultados);
    }, [titulos, resultados]);

    useEffect(() => {
        if(cohortes.length === cantidadCohortes){
            const fetchData = async () => {
                try{
                    const titulosActuales = [];
                    const resultadosActuales = [];
                    for(const cohorte of cohortes){
                        const cohorteResponse = await axios.get(`${config.endpoint}/cohorte/${cohorte}`);
                        const response = await axios.get(`${config.endpoint}/cohorte/cumplimieto/${cohorte}/${atributoEgreso}`);   
                        resultadosActuales.push(response.data.promedio);
                        if(cohorteResponse.data){
                            titulosActuales.push(`${cohorteResponse.data.periodo}${cohorteResponse.data.anio}`);
                        }
                    }
                    setTitulos(titulosActuales);
                    setResultados(resultadosActuales);
                }catch(e){
                    console.error(e);
                }
            }
            fetchData();
        }
    }, [cohortes]);

    
    return (
        <section id="principal">
            <h1>Gráfica comparativa entre resultados de atributos de egreso entre cohortes</h1>
            <form className="login">
                <label>
                    Escribe la cantidad de cohortes a comparar
                    <input type="number" value={cantidadCohortes} onChange={(e) => {
                        setCantidadCohortes(parseInt('0' + e.target.value));
                    }}/>
                </label>
                <label>
                    Atributo De Egreso
                    <BarraBusquedaSeleccionar modelo="atributoEgreso" onSelect={(id) => {
                        setAtributoEgreso(id);
                    }}/>
                </label>
                {
                    [...Array(cantidadCohortes)].map((_, index) => {
                        console.log(index, cantidadCohortes);
                        return (
                            <Fragment key={index}>
                                <label>
                                    Cohorte {index + 1}
                                    <BarraBusquedaSeleccionar modelo="cohorte" onSelect={(id) => {
                                        if(cohortes.includes(id)){
                                            showAlert("Error", "No puedes seleccionar el mismo cohorte más de una vez", "error");
                                            return;
                                        }
                                        const newCohortes = [...cohortes];
                                        newCohortes[index] = id;
                                        setCohortes(newCohortes);
                                    }}/>
                                </label>
                            </Fragment>
                            
                        );
                    })
                }
            </form>
            {titulos.length > 0 && resultados.length > 0 && <Grafica labels={titulos} data={resultados} title={"Gráfica comparativa de resultados de atributo de egreso entre cohortes"} tituloLocal={"Calificación promedio"}/>}
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

export default GraficaCumplimientoCohortes;