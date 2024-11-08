import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaGrupos(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    
    const filtros = [
        {
            name: "Letra",
            filter: "letra"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"letra"} modeloBuscar = "grupo" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaGrupos;