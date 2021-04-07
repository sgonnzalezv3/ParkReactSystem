import { useEffect, useState } from "react";

export const ControlTyping = (texto, delay) => {
    const [textoValor, setTextoValor] = useState();
    useEffect(() => {
        /* Semaforo que indica si dejó de escribir */
        const manejador = setTimeout(() => {
            setTextoValor(texto);
        /* delay tiempo de espera*/
        }, delay)
        return () => {
        /* funcion que va reiniciar el valor del manejador que */
            clearTimeout(manejador);
        };
        /* Se ejecuta cada vez que se ingresa en el campo texto*/

    }, [texto]);
    return textoValor;
}