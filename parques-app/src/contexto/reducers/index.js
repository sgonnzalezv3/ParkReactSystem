/* Importar los reducers */
import sesionUsuarioReducer from './sesionUsuarioReducer';
import openSnackbarReducer from './openSnackbarReducer';

/* Unificar los reducers */
export const mainReducer = ({ sesionUsuario, openSnackbar }, action) => {
    /* retornar objeto por cada uno de los reducers */
    return {
        sesionUsuario: sesionUsuarioReducer(sesionUsuario, action),
        openSnackbar: openSnackbarReducer(openSnackbar, action),
    }
}