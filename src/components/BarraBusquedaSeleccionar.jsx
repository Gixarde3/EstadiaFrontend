import BarraBusquedaCarreras from "./BarraBusquedaCarreras";
import BarraBusquedaDirectores from "./BarraBusquedaDirectores";
import BarraBusquedaPlanesEducativos from "./BarraBusquedaPlanesEducativos";
import BarraBusquedaUsuarios from "./BarraBusquedaUsuarios";
import BarraBusquedaProfesores from "./BarraBusquedaProfesores";
import BarraBusquedaAsignaturas from "./BarraBusquedaAsignaturas";
import BarraBusquedaCohortes from "./BarraBusquedaCohortes";
import BarraBusquedaGrupo from "./BarraBusquedaGrupo";
import BarraBusquedaAlumnos from "./BarraBusquedaAlumnos";
import {useState} from "react";
import BarraBusquedaAtributosEgreso from "./BarraBusquedaAtributosEgreso";
function BarraBusquedaSeleccionar(props) {
    const modelo = props.modelo.charAt(0).toLowerCase() + props.modelo.slice(1);
    const onSelect = props.onSelect;
    const defaultId = props.defaultId;
    const [selectedString, setSelectedString] = useState(null);
    const BarraSeleccionada = () => {
        if (modelo === "carrera") {
            return (
                <BarraBusquedaCarreras onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        } else if (modelo === "director") {
            return (
                <BarraBusquedaDirectores onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "planEducativo") {
            return (
                <BarraBusquedaPlanesEducativos onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "usuario") {
            return (
                <BarraBusquedaUsuarios onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "profesor") {
            return (
                <BarraBusquedaProfesores onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "atributoEgreso"){
            return (
                <BarraBusquedaAtributosEgreso onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "criterioDesempenio"){
            return (
                <BarraBusquedaCriteriosDesempenio onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "indicador"){
            return (
                <BarraBusquedaIndicadores onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "asignatura"){
            return (
                <BarraBusquedaAsignaturas onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "cohorte"){
            return (
                <BarraBusquedaCohortes onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "grupo"){
            return (
                <BarraBusquedaGrupo onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else if (modelo === "alumno"){
            return (
                <BarraBusquedaAlumnos onSelect={onSelect} seleccionable={true} defaultId={defaultId} onSelectString = {setSelectedString}/>
            );
        }
        else {
            return (
                <h1>Modelo no encontrado</h1>
            );
        }
    }

    return (
        <>
            <BarraSeleccionada/>
            {
                selectedString !== null ? (
                    <div className="item-seleccionado">
                        <h2>{selectedString.charAt(0).toUpperCase() + selectedString.slice(1)}</h2>
                    </div>
                ) : null
            }
        </>
    );
}

export default BarraBusquedaSeleccionar;