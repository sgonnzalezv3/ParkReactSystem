/* almacenar la data del usuario que está en sesion */

/*
REDUCER:
    pasos:
        1) Definir valores a almacenar
        2) ejecutar logica depende de lo que pida el usuario
        3) exportar la funcion
*/
export const initialState = {
    usuario: {
        nombreCompleto: '',
        email: '',
        username: '',
        foto: ''
    },
    autenticado: false
}
/* Manejar data que va modificarse */
/* action define lo que se va hacer con la data */
const sesionUsuarioReducer = (state = initialState, action) => {
    switch (action.type) {
        case "INICIAR_SESION":
            return {
                ...state,
                usuario: action.sesion, //Action.sesion trae el json con la data ya llena del usuario.
                autenticado: action.autenticado // true - false
            };
        case "SALIR_SESION" :
            return {
                ...state,
                usuario : action.nuevoUsuario,
                autenticado : action.autenticado
            };
        case "ACTUALIZAR_USUARIO" :
            return {
                ...state,
                usuario : action.nuevoUsuario,
                autenticado : action.autenticado
            }
        default : return state;
    }
};
export default sesionUsuarioReducer;