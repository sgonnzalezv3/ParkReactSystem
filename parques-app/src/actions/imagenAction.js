//los action son para funciones globales
import HttpCliente from '../servicios/HttpCliente';

export const obtenerDataImagen = (imagen) => {
  return new Promise((resolve, eject) => {
    const nombre = imagen.name;
    const extension = imagen.name.split(".").pop();

    //convertir file a base 64

    //leer la data ingresando
    const lector = new FileReader();
    lector.readAsDataURL(imagen);
    //cargue dentro de la funcion y que devuelva el resultado
    lector.onload = () =>
      resolve({
        //divite el texto en arreglos dividido en las comas encontrada y
        //toma el primer arreglo
        data: lector.result.split(",")[1],
        nombre: nombre,
        extension: extension,
      });

    // si hay error que lo devuelva.
    lector.onerror = (error) => PromiseRejectionEvent(error);
  });
};
export const obtenerImagenes = (parque) => {
  return new Promise((resolve, eject) => {
    HttpCliente.get(`/documento/${parque}`).then((response) => {
      if (response.data) {
        let fotoParque = response.data;
        const nuevoFile = 'data:image/' + fotoParque.extension + ';base64,' + fotoParque.data;
        response.data = nuevoFile;
      }
      resolve(response);
    }).catch((error) => {
      resolve(error);
    })
  })
}

