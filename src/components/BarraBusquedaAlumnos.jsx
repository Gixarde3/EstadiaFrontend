import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaAlumnos(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    const idGrupo = props.idGrupo;

    
    const filtros = [
        {
            name: "Matrícula",
            filter: "clave_identificacion"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"clave_identificacion"} modeloBuscar = "alumno" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString} idGrupo={idGrupo}/>
    );
}

export default BarraBusquedaAlumnos;