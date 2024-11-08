import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaCriteriosDesempenio(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    console.log(defaultId)
    const filtros = [
        {
            name: "Atributo de Egreso",
            filter: "idAtributoEgreso"
        },
        {
            name: "Identificador",
            filter: "identificador"
        },
        {
            name: "Título",
            filter: "titulo"
        },
        {
            name: "Descripción",
            filter: "descripcion"
        }
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"identificador"} modeloBuscar = "criterioDesempenio" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaCriteriosDesempenio;