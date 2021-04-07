import HttpCliente from '../servicios/HttpCliente';


export const registrarCar = async car => {
    const endPointCar = "/Cars";
    const promesaCar = HttpCliente.post(endPointCar, car);
    return await Promise.all([promesaCar]);

}

export const obtenerCars = () => {
    return new Promise((resolve, eject) => {
        HttpCliente.get('/cars').then((response) => {
            resolve(response);
        }).catch((error) => {
            console.log(error);
            resolve(error);
        })
        
    })
}