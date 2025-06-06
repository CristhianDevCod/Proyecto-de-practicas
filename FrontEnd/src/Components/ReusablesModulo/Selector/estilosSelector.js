export const getAutocompleteProsition = (autocompleteRef) => {
    if (autocompleteRef.current) {
        //Se verifica que autocompleteRef.current no sea null
        const rect = autocompleteRef.current.getBoundingClientRect();
        return {
            top: rect.bottom + window.scrollY, //posición debajo del autocomplete
            left: rect.left + window.scrollX, //Misma posición horizontal
        };
    }
    return { top: 0, left: 0 };
};

// Estilos base
export const baseStyle = {
    position: "absolute",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #929292",
    boxShadow: 24,
    borderRadius: 3,
    pt: 2,
    px: 4,
    pb: 3,
};

export const posicionCentral = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
}

export const posicionDinamica = (top, left) => {
    return ({
        top: `${top}px`, //Posición debajo del autocomplete
        left: `${left + 475}px`, //420px a la derecha del autocomplete
        transform: "translate(2rem, -20rem)"
    })
}

export const estilosLi = { display: 'flex', alignItems: 'center', justifyContent: 'space-between' };

export const estilosCheck = { display: 'flex', alignItems: 'center' };

export const estilosDetalles = { marginLeft: "10px", padding: "2px", minWidth: "32px", alignSelf: "end", };