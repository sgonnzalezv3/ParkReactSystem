import { CardActions } from '@material-ui/core';
import HttpCliente from '../servicios/HttpCliente';
export const guardarParque = async (parque, imagen) => {
    //Definir el endpoint
    const endPointParque = "/Parques";
    const promesaParque = HttpCliente.post(endPointParque, parque);
    //si existe...
    if (imagen) {
        const endPointImagen = "/documento";
        const promesaImagen = HttpCliente.post(endPointImagen, imagen);
        return await Promise.all([promesaParque, promesaImagen]);
    } else {
        //si es nula la imagen
        return await Promise.all([promesaParque]);
    }
};
export const obtenerParques = (dispatch) => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/parques').then((response) => {
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        })
    })
}

export const paginacionParque = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/parques/report', paginador).then(response => {
            response.data.listaObjetos.map(data=> {
                if(data.Contenido){
                    const nuevoFile = "data:image/" + data.ExtensionD + ";base64," + data.Contenido;
                    data.Contenido = nuevoFile;
                }
            })
            resolve(response);
        })
    })
}