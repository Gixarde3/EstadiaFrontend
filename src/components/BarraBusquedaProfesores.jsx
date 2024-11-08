import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaProfesores(props) {
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
        {
            name: "Tipo de contrato",
            filter: "tipo_contrato"
        }
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"idProfesor"} modeloBuscar = "profesor" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString}/>
    );
}

export default BarraBusquedaProfesores;