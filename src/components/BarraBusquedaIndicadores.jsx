import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaIndicadores(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    
    const filtros = [
        {
            name: "Idenficiador",
            filter: "identificador"
        },
        {
            name: "Título",
            filter: "titulo"
        },
        {
            name: "Descripción",
            filter: "descripcion"
        },
        {
            name: "Meta",
            filter: "meta"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"titulo"} modeloBuscar = "indicador" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaIndicadores;