import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaPlanesEducativos(props) {
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
            name: "Identificador de la carrera",
            filter: "idCarrera"
        },
        {
            name: "Abreviatura",
            filter: "abreviatura"
        },
        {
            name: "Clave",
            filter: "clave"
        },
        {
            name: "Año",
            filter: "anio"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"abreviatura"} modeloBuscar = "planEducativo" seleccionable={seleccionable} onSelect={onSelect} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaPlanesEducativos;