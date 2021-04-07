import HttpCliente from '../servicios/HttpCliente';
import axios from "axios";
//invacando axios para que permite hacer un request y response valido sin token
const instancia = axios.create();
instancia.CancelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;

export const registrarUsuario = usuario => {
    //Promesas
    return new Promise((resolve, eject) => {
        HttpCliente.post('/Usuario/registrar', usuario).then(response => {
            resolve(response);
        })
    })
}
export const obtenerUsuarioActual = (dispatch) => {
    return new Promise((resolve, eject) => {
      //invocar a un endpoint que devuelva la data del usuario
  
      // se envia un request dado el endpoint y la data (usuario) y devuele un objeto response
      HttpCliente.get("/usuario").then((response) => {
        //existe o no existe la data de imagenPerfil
        if (response.data && response.data.imagenPerfil) {
          //capturar la data de imgen perfil
          let fotoPerfil = response.data.imagenPerfil;
          //nueva representacion de la foto
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          //cargarlo
          response.data.imagenPerfil = nuevoFile;
        }
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      }).catch((error) => {
        resolve(error);
      })
    });
  };
  /* Tiene un paramaetro el cual es usuario */
  export const actualizarUsuario = (usuario, dispatch) => {
    return new Promise((resolve, eject) => {
      HttpCliente.put("/usuario", usuario)
        .then((response) => {
          //actualizar el reducer
  
          //evaluar la data aver si tiene la imagende perfil
          if (response.data && response.data.imagenPerfil) {
            let fotoPerfil = response.data.imagenPerfil;
            const nuevoFile =
              "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
            response.data.imagenPerfil = nuevoFile;
          }
          //refrescar la data del usuario actual
          dispatch({
            type: "INICIAR_SESION",
            sesion: response.data,
            autenticado: true,
          });
          resolve(response);
        })
        .catch((error) => {
          resolve(error.response);
        });
    });
  };
export const loginUsuario = (usuario,dispatch) => {
  return new Promise((resolve, eject) => {
    instancia.post("/usuario/login", usuario)
      .then((response) => {
        if (response.data && response.data.imagenPerfil) {
          let fotoPerfil = response.data.imagenPerfil;
          const nuevoFile =
            "data:image/" + fotoPerfil.extension + ";base64," + fotoPerfil.data;
          response.data.imagenPerfil = nuevoFile;
        }
        dispatch({
          type: "INICIAR_SESION",
          sesion: response.data,
          autenticado: true,
        });
        resolve(response);
      })
      .catch((error) => {
        resolve(error.response);
      });
  });
}