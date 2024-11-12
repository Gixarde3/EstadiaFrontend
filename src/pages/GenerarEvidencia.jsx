import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";
import {jsPDF} from "jspdf";
function GenerarEvidencia() {
    const {idGrupoMateria} = useParams();
    const [atributoEgreso, setAtributoEgreso] = useState(null);
    const [criterioDesempenio, setCriterioDesempenio] = useState(null);
    const [indicador, setIndicador] = useState(null);
    const [tipoEvidencia, setTipoEvidencia] = useState("Producto");
    const [objetivo, setObjetivo] = useState(null);
    const [alert, setAlert] = useState(null);
    const [porcentajeFinal, setPorcentajeFinal] = useState(0);
    const [evidencia, setEvidencia] = useState(null);
    const closeAlert = () => setAlert(null);
    const showAlert = (title, message, kind, redirectRoute, asking, onAccept) => {
        setAlert({ title, message, kind, isOpen: true, redirectRoute, asking, onAccept });
    }
    const generar = async (e) => {
        e.preventDefault();
        try{
            console.log(tipoEvidencia);
            showAlert("Generando", "Generando evidencia", "loading");
            console.log({
                idGrupoMateria,
                idAtributoEgreso: atributoEgreso,
                idCriterioDesempenio: criterioDesempenio,
                idIndicador: indicador,
                tipoEvidencia,
                porcentajeFinal,
                objetivo
            })
            const response = await axios.post(`${config.endpoint}/evidencia/generar`, {
                idGrupoMateria,
                idAtributoEgreso: atributoEgreso,
                idCriterioDesempenio: criterioDesempenio,
                idIndicador: indicador,
                tipoEvidencia,
                porcentajeFinal,
                objetivo
            });
            showAlert("Evidencia generada", "Evidencia generada correctamente", "success", null, true, () => setEvidencia(response.data));
        }catch(error){
            console.error(error);
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
                if(error.response.data.error){
                    showAlert("Error", error.response.data.error, "error");
                }
                else{
                    showAlert("Error", "Error en el servidor", "error");
                }
            }

        }
    }

    const generarReporte = () => {
        const doc = new jsPDF();
        // Configuración inicial
        doc.setFontSize(14);
        doc.setTextColor(40, 40, 40);

        // Encabezado principal
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 51, 102); // Azul oscuro
        doc.text("Reporte de Evidencia Generada", 10, 15);

        // Información principal
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        let yPosition = 30;

        // Título de sección
        doc.setFont("helvetica", "bold");
        doc.text("Información General", 10, yPosition);
        yPosition += 10;

        // Detalles de la evidencia
        doc.setFont("helvetica", "normal");
        const informacionGeneral = [
            `Atributo de egreso: ${atributoEgreso}`,
            `Criterio de desempeño: ${criterioDesempenio}`,
            `Indicador: ${indicador}`,
            `Tipo de evidencia: ${tipoEvidencia}`,
            `Porcentaje final: ${porcentajeFinal}`,
        ];

        // Imprimir cada línea de información general
        informacionGeneral.forEach((linea) => {
            doc.text(linea, 10, yPosition);
            yPosition += 8;
        });

        // Ajuste de texto largo para "Objetivo"
        const objetivoTexto = doc.splitTextToSize(`Objetivo: ${objetivo}`, 180);
        objetivoTexto.forEach((linea) => {
            doc.text(linea, 10, yPosition);
            yPosition += 8;
        });

        // Título de la evidencia
        yPosition += 10;
        doc.setFont("helvetica", "bold");
        doc.text(`Título generado: ${evidencia.nombre}`, 10, yPosition);
        yPosition += 10;

        // Descripción de la evidencia
        doc.setFont("helvetica", "normal");
        const descripcionTexto = doc.splitTextToSize(`Descripción: ${evidencia.descripcion}`, 180);
        descripcionTexto.forEach((linea) => {
            doc.text(linea, 10, yPosition);
            yPosition += 8;
        });

        // Fechas
        yPosition += 10;
        doc.setFont("helvetica", "italic");
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() + evidencia.tiempoLimite);
        doc.text(`Fecha de entrega: ${fechaLimite.toLocaleDateString()}`, 10, yPosition);
        yPosition += 8;
        doc.text(`Fecha de creación: ${new Date().toLocaleDateString()}`, 10, yPosition);
        yPosition += 15;

        // Título de la sección de criterios
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 51, 102); // Azul oscuro
        doc.text("Criterios de Evaluación", 10, yPosition);
        yPosition += 10;

        // Configuración de cada criterio de evaluación en una línea
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0, 0, 0);

        evidencia.criteriosEvaluacion.forEach((criterioEvaluacion) => {
            // Título y porcentaje en negrita
            doc.setFont("helvetica", "bold");
            const tituloPorcentaje = `${criterioEvaluacion.titulo} (${criterioEvaluacion.porcentaje_al_final}%)`;
            doc.text(tituloPorcentaje, 10, yPosition);

            // Descripción en texto normal, en la misma línea que el título y porcentaje
            doc.setFont("helvetica", "normal");
            const descripcionTexto = doc.splitTextToSize(`: ${criterioEvaluacion.descripcion}`, 150);
            
            // Imprimir la descripción a continuación del título y porcentaje
            descripcionTexto.forEach((linea, index) => {
                const xPosition = index === 0 ? 10 + doc.getTextWidth(tituloPorcentaje) + 2 : 10; // Alineación de la primera línea
                doc.text(linea, xPosition, yPosition);
                yPosition += 8;
            });

            yPosition += 5; // Espacio entre criterios
        });

        // Guardar el PDF
        doc.save(`Reporte_Evidencia_${evidencia.idEvidencia}.pdf`);

    }
    return (
        <section id="principal">
            <h1>Generar evidencia con IA</h1>
            <form onSubmit={generar} className="login">
                <label>
                    Atributo de egreso
                    <BarraBusquedaSeleccionar modelo="atributoEgreso" onSelect = {setAtributoEgreso}/>
                </label>
                <label>
                    Criterio de desempeño
                    <BarraBusquedaSeleccionar modelo="criterioDesempenio" onSelect = {setCriterioDesempenio}/>
                </label>
                <label>
                    Indicador
                    <BarraBusquedaSeleccionar modelo="indicador" onSelect = {setIndicador}/>
                </label>
                <label>
                    Tipo de evidencia <span style={{color:'red'}}>*</span>
                    <select onChange={(e) => setTipoEvidencia(e.target.value)}>
                        <option value="Producto">Evidencia de producto (EP)</option>
                        <option value="Desarrollo">Evidencia de desarrollo (ED)</option>
                        <option value="Conocimiento">Evidencia de conocimiento (EC)</option>
                    </select>
                </label>
                <label>
                    Objetivo <span style={{color:'red'}}>*</span>
                    <textarea style={{resize: 'vertical'}} onChange={(e) => setObjetivo(e.target.value)}></textarea>
                </label>
                <label>
                    ¿Cuánto porcentaje aporta a la calficación final de la asignatura? <span style={{color:'red'}}>*</span>
                    <input type="number" min="0" max="100" onChange={(e) => setPorcentajeFinal(e.target.value)}/>
                </label>
                <div className="buttons" style={{display: "flex", width:"100%", alignItems:"center", justifyContent: "space-evenly", gap: "1rem"}}>
                    {!evidencia && <button className="button">Generar evidencia</button>}
                    {evidencia && <Link className="button" to={`/home/evidencia/${evidencia.idEvidencia}`}>Ver evidencia generada</Link>}
                    {evidencia && <button className="button" type="button" onClick={generarReporte}>Generar reporte de evidencia</button>}
                </div>
            </form>
            <p className="aclaracion">Todos los campos con <span style={{color: "red"}}>*</span> son obligatorios</p>
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
        </section>
    );
}

export default GenerarEvidencia;