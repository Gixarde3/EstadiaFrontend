import React, { createContext, useState, useEffect } from "react";

const MateriasContext = createContext();

const MateriasContextProvider = ({ children }) => {
    const [materias, setMaterias] = useState(() => {
        const savedMaterias = localStorage.getItem('materias');
        return savedMaterias ? JSON.parse(savedMaterias) : [];
    });

    useEffect(() => {
        localStorage.setItem('materias', JSON.stringify(materias));
    }, [materias]);
    return (
        <MateriasContext.Provider value={{ materias, setMaterias }}>
            {children}
        </MateriasContext.Provider>
    );
}

export { MateriasContext, MateriasContextProvider };
