import React from "react"
import { Button } from "@mui/joy";

const recursivelyAddDisabled = (child, disabled) => {
    if (React.isValidElement(child)) {
        if (child.type === Button) {
            return child; //Excluimos botones de la deshabilitación global.
        }

        //Preparar nuevas propiedades 
        const newProps = { disabled };

        //Si el elemento tiene eventos interactivos, los anulamos si esta deshabilitado.
        if (disabled) {
            newProps.onClick = undefined;
            newProps.onChange = undefined;
            newProps.onKeyDown = undefined;
        }

        // Si el elemento tiene hijos, aplicamos la lógica recursivamente.
        if (child.props.children) {
            newProps.children = React.Children.map(child.props.children, (c) => (
                recursivelyAddDisabled(c, disabled)
            ));
        }
        return React.cloneElement(child, newProps);
    }
    return child;
};

const DisableWrapper = ({ disabled, children }) => {
    return React.Children.map(children, child => (
        recursivelyAddDisabled(child, disabled)
    ));
};

export default DisableWrapper;