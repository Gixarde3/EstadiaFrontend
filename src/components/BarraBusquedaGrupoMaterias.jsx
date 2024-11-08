import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaGrupoMaterias(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    console.log(defaultId)
    const filtros = [
        {
            name: "Nombre de la asignatura",
            filter: "nombre"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"nombre"} modeloBuscar = "grupoMateria" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaGrupoMaterias;