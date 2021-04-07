import { CardActions } from '@material-ui/core';
import HttpCliente from '../servicios/HttpCliente';
export const guardarFauna = async (fauna, imagen) => {
    //Definir el endpoint
    const endPointFauna = "/ecosistemas";
    const promesaFauna = HttpCliente.post(endPointFauna, fauna);
    //si existe...
    if (imagen) {
        const endPointImagen = "/documento";
        const promesaImagen = HttpCliente.post(endPointImagen, imagen);
        return await Promise.all([promesaFauna, promesaImagen]);
    } else {
        //si es nula la imagen
        return await Promise.all([promesaFauna]);
    }
};
export const paginacionFauna = (paginador) => {
    return new Promise((resolve, eject) => {
        HttpCliente.post('/ecosistemas/report', paginador).then(response => {
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