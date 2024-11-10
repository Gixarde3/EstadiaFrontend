import axios from "axios";
import config from "../config.json";
import Alert from "../components/Alert";
import "../assets/css/login.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, memo, useCallback } from "react";
import BarraBusquedaSeleccionar from "../components/BarraBusquedaSeleccionar";

// Componente para campo de texto
const TextField = memo(({ fieldKey, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(fieldKey, newValue);
    };

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return (
        <div className="input-row">
            <input
                value={value || ''}
                onChange={handleChange}
            />
        </div>
    );
});

// Componente para campo de búsqueda
const SearchField = memo(({ fieldKey, modelo, defaultId, onChange }) => {
    const handleSelect = (value) => {
        onChange(fieldKey, value);
    };

    return (
        <BarraBusquedaSeleccionar
            modelo={modelo}
            onSelect={handleSelect}
            defaultId={defaultId}
        />
    );
});

// Componente para campo de archivo
const FileField = memo(({ fieldKey, initialValue, onChange }) => {
    return (
        <div style={{display: 'flex', flexDirection:'column', alignItems: 'center'}}>
            <label className="button" htmlFor={fieldKey}>
                Seleccionar archivo
            </label>
            <input
                type="file"
                id={fieldKey}
                style = {
                    {
                        display: "none"
                    }
                }
                onChange={(e) => onChange(fieldKey, e.target.files[0])}
            />
            <p>Archivo seleccionado: {initialValue?.name ?? initialValue}</p>
        </div>
    );
});

// Componente para campo form
const FormField = memo(({ 
    fieldKey, 
    fieldValue, 
    isIdField, 
    isFileField, 
    modelo, 
    onChange,
    formatFieldName 
}) => {
    return (
        <label>
            {formatFieldName(fieldKey)}
            {isFileField ? (
                <FileField
                    fieldKey={fieldKey}
                    initialValue={fieldValue}
                    onChange={onChange}
                />
            ) : isIdField ? (
                <SearchField
                    fieldKey={fieldKey}
                    modelo={fieldKey.slice(2)}
                    defaultId={fieldValue}
                    onChange={onChange}
                />
            ) : (
                <TextField
                    fieldKey={fieldKey}
                    initialValue={fieldValue}
                    onChange={onChange}
                />
            )}
        </label>
    );
});

function Editar() {
    const { modelo, id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({
        isOpen: false,
        title: '',
        message: '',
        kind: '',
        redirectRoute: '',
        asking: false,
        onAccept: () => {}
    });

    const closeAlert = useCallback(() => {
        setAlert(prev => ({ ...prev, isOpen: false }));
    }, []);

    const showAlert = useCallback((title, message, kind, redirectRoute = '', asking = false, onAccept = () => {}) => {
        setAlert({
            title,
            message,
            kind,
            isOpen: true,
            redirectRoute,
            asking,
            onAccept
        });

        if (redirectRoute && !asking) {
            setTimeout(() => {
                navigate(redirectRoute);
            }, 2000);
        }
    }, [navigate]);

    const separarMayusculas = useCallback((palabra) => {
        return palabra.replace(/([A-Z])/g, ' $1').trim();
    }, []);

    const formatFieldName = useCallback((key) => {
        if (key.substring(0, 2) === "id" && key.charAt(2) === key.charAt(2).toUpperCase()) {
            return separarMayusculas(key.slice(2));
        }
        return separarMayusculas(key.replace("_", " ")
                 .split(' ')
                 .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                 .join(' '));
    }, []);

    useEffect(() => {
        const getValores = async () => {
            try {
                const response = await axios.get(`${config.endpoint}/${modelo}/${id}`);
                setFormData(response.data);
            } catch (error) {
                const errorMessage = {
                    404: "No se encontraron resultados",
                    401: "No tienes permiso para realizar esta acción",
                    500: "Error en el servidor"
                }[error.response?.status] || "Error desconocido";
                
                showAlert("Error", errorMessage, "error");
            }
        };

        getValores();
    }, [modelo, id, showAlert]);

    const handleFieldChange = useCallback((key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            showAlert("Editando", "Editando elemento", "loading");
            
            const submitFormData = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                submitFormData.append(key, value);
            });

            await axios.put(
                `${config.endpoint}/${modelo.toLowerCase()}/${id}`,
                submitFormData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            showAlert("Editado", "Elemento editado correctamente", "success", "/home");
        } catch (error) {
            const errorMessage = {
                404: "No se encontraron resultados",
                401: "No tienes permiso para realizar esta acción",
                500: "Error en el servidor"
            }[error.response?.status] || "Error desconocido";
            
            showAlert("Error", errorMessage, "error");
        } finally {
            setIsLoading(false);
        }
    };

    const shouldRenderField = useCallback((key) => {
        const excludedFields = ['password', `id${modelo.charAt(0).toUpperCase() + modelo.slice(1)}`, 'idGrupoMateria'];
        return !excludedFields.includes(key);
    }, [modelo]);

    return (
        <>
            <section id="principal">
                <h1>Editar {separarMayusculas(modelo)}</h1>
                <form onSubmit={handleSubmit} className="login">
                    {Object.entries(formData)
                        .filter(([key]) => shouldRenderField(key))
                        .map(([key, value]) => (
                            <FormField
                                key={key}
                                fieldKey={key}
                                fieldValue={value}
                                isIdField={key.substring(0, 2) === "id" && key.charAt(2) === key.charAt(2).toUpperCase()}
                                isFileField={key.toLowerCase().includes("archivo")}
                                modelo={modelo}
                                onChange={handleFieldChange}
                                formatFieldName={formatFieldName}
                            />
                        ))}
                    <button 
                        className="button" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Editando...' : `Editar ${separarMayusculas(modelo)}`}
                    </button>
                </form>
            </section>
            <Alert {...alert} closeAlert={closeAlert} />
        </>
    );
}

export default Editar;