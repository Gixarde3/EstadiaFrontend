import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaCohortes(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    
    const filtros = [
        {
            name: "Año",
            filter: "anio"
        },
        {
            name: "Periodo",
            filter: "periodo"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"anio"} modeloBuscar = "cohorte" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaCohortes;