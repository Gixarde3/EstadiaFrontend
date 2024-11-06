import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaAsignaturas(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    console.log(defaultId)
    const filtros = [
        {
            name: "Código",
            filter: "codigo"
        },
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Área",
            filter: "area"
        },
        {
            name: "Academia",
            filter: "academia"
        },
        {
            name: "Cuatrimestre",
            filter: "cuatrimestre"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"nombre"} modeloBuscar = "asignatura" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaAsignaturas;