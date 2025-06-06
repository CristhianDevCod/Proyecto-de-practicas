
export function capitalizeFirstLetterInArrays(obj) {
    // Se recorre cada propiedad del objeto
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            //Verificar si el valor es un arreglo
            if (Array.isArray(value)) {
                //Recorre cada elemento del arreglo
                obj[key] = value.map((item) => {
                    //Verificar si el elemento es un string
                    if (typeof item === "string" && item.length > 0) {
                        //Capitalizar la primera leta 
                        return item.charAt(0).toUpperCase() + item.slice(1);
                    }
                    return item; //Si no es string se devuelve sin cambios
                });
            }
            // Si el valor es un objeto, llamar recursivamente a la funcion 
            else if (typeof value === "object" && value !== null) {
                capitalizeFirstLetterInArrays(value);
            }
            //Si el valor es un string, capitalizar la primera letra
            else if (typeof value === "string" && value.length > 0) {
                obj[key] = value.charAt(0).toUpperCase() + value.slice(1);
            }
        }
    }
    return obj; //Devuelve un objeto modificado
}

export default capitalizeFirstLetterInArrays;