import React, { createContext, useState } from "react";

const MateriasContext = createContext();

const MateriasContextProvider = ({ children }) => {
    const [materias, setMaterias] = useState([]);
    return (
        <MateriasContext.Provider value={{ materias, setMaterias }}>
            {children}
        </MateriasContext.Provider>
    );
}

export { MateriasContext, MateriasContextProvider };
