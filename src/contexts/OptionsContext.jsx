import React, {createContext, useState} from "react";

const OptionsContext = createContext();

const OptionsContextProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <OptionsContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </OptionsContext.Provider>
    );
}

export { OptionsContext, OptionsContextProvider };