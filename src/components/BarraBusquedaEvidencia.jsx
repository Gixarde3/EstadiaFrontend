import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaEvidencias(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    const idGrupo = props.idGrupo;
    
    const filtros = [
        {
            name: "Título de la evidencia",
            filter: "nombre"
        },
        {
            name: "Tipo",
            filter: "tipo"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"nombre"} modeloBuscar = "evidencia" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString} idGrupo={idGrupo}/>
    );
}

export default BarraBusquedaEvidencias;