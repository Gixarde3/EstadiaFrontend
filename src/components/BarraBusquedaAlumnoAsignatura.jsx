import BarraBusqueda from "./BarraBusqueda";
function BarraBusquedaAlumnosAsignaturas(props) {
    const onSelect = props.onSelect || null;
    const onSelectString = props.onSelectString || null;
    const seleccionable = props.seleccionable;
    const defaultId = props.defaultId;
    const idGrupo = props.idGrupo;
    const filtros = [
        {
            name: "Nombre",
            filter: "nombre"
        },
        {
            name: "Apellido Paterno",
            filter: "apellido_paterno"
        },
        {
            name: "Apellido Materno",
            filter: "apellido_materno"
        },
        {
            name: "Clave de identificación",
            filter: "clave_identificacion"
        },
        {
            name: "Privilegios (1-3)",
            filter: "privilege"
        }
    ]
    return (
        <BarraBusqueda filters={filtros} campoTitulo={"clave_identificacion"} modeloBuscar = "alumnoAsignatura" onSelect={onSelect} seleccionable={seleccionable} defaultId={defaultId} onSelectString = {onSelectString} idGrupo={idGrupo}/>
    );
}

export default BarraBusquedaAlumnosAsignaturas;