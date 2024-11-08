import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaDirectores(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    
    const filtros = [
        {
            name: "Área de especialización",
            filter: "area_especializacion"
        },
        {
            name: "Grado escolar",
            filter: "grado_escolar"
        },
        {
            name: "Email profesional",
            filter: "email_profesional"
        },
        {
            name: "Área a cargo",
            filter: "area_cargo"
        },
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"idDirector"} modeloBuscar = "director" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaDirectores;