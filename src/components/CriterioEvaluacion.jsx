import { useContext, useState, useEffect} from "react";
import { UserContext } from "../contexts/UserContext";
function CriterioEvaluacion() {
    const { user } = useContext(UserContext);
    return (
        <div className="criterio-evaluacion">

        </div>
    );
}

export default CriterioEvaluacion;