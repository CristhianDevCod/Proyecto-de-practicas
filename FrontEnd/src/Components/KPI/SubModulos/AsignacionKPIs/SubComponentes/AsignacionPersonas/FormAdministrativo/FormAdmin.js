import { Autocomplete, TextField, Tooltip } from "@mui/material";
// import { useRef, useState } from "react";

const options = [
    { id: 1, label: 'Opción 123456789-10-11-12-13-14-15-16-17-18-19-20' },
    { id: 2, label: 'Opción B' },
    { id: 3, label: 'Opción C' },
];


// // Estado inicial del formulario
// const initialFormState = {
//     asignacion: 'adm',
//     proceso: null,
//     ara: null
// };

const FormAdmin = ({ setformIsComplete }) => {
    // const [form, setForm] = useState(initialFormState);
    // const fileInputRef = useRef(null);
    // const [isLoading, setIsLoading] = useState(false);
    // const [isValidForm, setIsValidForm] = useState(false)

    // Ejemplo de manejo de cambios en un campo de tipo radio
    // const handleRadioChange = (e) => {
    //     const updatedForm = { ...form, asignacion: e.target.value };
    //     setForm(updatedForm);
    //     // validateForm(updatedForm);
    // };


    // Función para manejar cambios en los campos del formulario
    // const handleAutoComplete = (field) => (e, value) => {
    //     const updatedForm = { ...form, [field]: value };
    //     setForm(updatedForm);
    //     validateForm(updatedForm);
    // };

    // Validar si el formulario está completo
    // const validateForm = (currentForm) => {
    //     // Claves relevantes para la validación
    //     const requiredFields = ['proceso', 'area'];

    //     // Verificar que todos los campos requeridos tengan valores
    //     const isValid = requiredFields.every(field => {
    //         return currentForm[field] !== null && currentForm[field] !== ''
    //     })

    //     // setIsValidForm(isValid);
    //     setformIsComplete(isValid);
    // };

    // Estilos
    const stylePadre = { position: 'relative', flex: 1 }
    const styleToolTip = {
        position: 'absolute',
        top: '-20px',
        left: '0px',
        margin: 0,
        fontWeight: 'bolder',
        fontSize: 20,
        color: 'red',
        cursor: 'pointer'
    }

    return (
        <>
            {/* Operación */}
            <Autocomplete
                style={stylePadre}
                options={options}
                getOptionLabel={(opt) => opt.label}
                // value={form.ara}
                // onChange={handleAutoComplete('area')}
                // disabled={!form.ara}
                renderInput={(params) => (
                    <>
                        <TextField {...params} label="Área" variant="outlined" />
                        <Tooltip title="Este campo es obligatorio" placement="top-start" >
                            <p style={styleToolTip}>*</p>
                        </Tooltip>
                    </>
                )}
            />
            {/* Colaborador (opcional) */}
            <Autocomplete
                style={stylePadre}
                options={options}
                getOptionLabel={(opt) => opt.label}
                // value={form.colaborador}
                // onChange={handleAutoComplete('colaborador')}
                // disabled={!form.servicio}
                renderInput={(params) => (
                    <TextField {...params} label="Colaborador" variant="outlined" />
                )}
            />
        </>
    )
}
export default FormAdmin;