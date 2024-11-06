import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaAtributosEgreso(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    const filtros = [
        {
            name: "Plan Educativo",
            filter: "idPlanEducativo"
        },
        {
            name: "Identificador",
            filter: "identificador"
        },
        {
            name: "Título",
            filter: "titulo"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"identificador"} modeloBuscar = "AtributoEgreso" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaAtributosEgreso;