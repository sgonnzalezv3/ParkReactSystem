/* Agregar y extraer data del intialState */
/*Context api variable de contexto:
  Crea un contexto global, cualquier componente puede acceder a la variables
  necesitamos crear context   */
import React, { createContext, useContext, useReducer } from 'react';
/* Creando el contexto */
export const StateContext = createContext();

/* usamos el context para extraer e ingresar valores
    Provider : Crear proceso de suscripcion, suscribir a todos los componentes hooks del proyecto para ello se usa el Reducer(permite hacer cambios globales)
    Consumer : useContext permite dar acceso a la variable global 
*/
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
/* Acceso a todas las variables que se encuentren en el contexto */
export const useStateValue = () => useContext(StateContext);

