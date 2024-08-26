import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaCarreras(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    const filtros = [
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Identificador del director",
            filter: "idDirector"
        },
        {
            name: "Abreviatura de la carrera",
            filter: "abreviatura"
        }
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"nombre"} modeloBuscar = "carrera" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaCarreras;