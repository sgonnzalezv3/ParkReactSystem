import React, { useEffect, useState } from 'react'
import { obtenerDataImagen } from '../../actions/imagenAction';
import { useStateValue } from '../../contexto/store'
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Button, Checkbox, Container, container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import style from '../Tool/Style';
import { obtenerCars } from '../../actions/carAction';
import ImageUploader from 'react-images-upload';
import reactFoto from '../../logo.svg';
import { guardarParque } from "../../actions/parqueAction";
import { withRouter } from 'react-router';






const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const NuevoParque = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [parque, setParque] = useState({
        nombre: '',
        extension: '',
        descripcion: '',
    });
    const [imagenParque, setImagenParque] = useState(null);

    const [carSeleccionada, setCarSeleccionada] = useState('');

    const [car, setCar] = useState([]);

    React.useEffect(() => {
        obtenerDatos();
    }, []);

    const obtenerDatos = () => {
        obtenerCars().then((respuestas) => {
            setCar(respuestas.data);
        })
    }
    const classes = useStyles();
    const [foto, setFoto] = useState({
        foto: '',
        fotoUrl: '',
    })

    const subirFoto = imagenes => {
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);
        obtenerDataImagen(foto).then((respuesta) => {
            setImagenParque(respuesta);
            setFoto({
                foto: foto,
                fotoUrl: fotoUrl
            });


        })

    }
    const fotoKey = uuidv4();

    const [checked, setChecked] = useState(true);

    const cambioActivo = (event) => {
        setChecked(event.target.checked);
    };

    const ingresarValores = e => {
        const { name, value } = e.target;
        setParque((anterior) => ({
            ...anterior,
            [name]: value
        }))
    }
    const cambioCar = (event) => {
        setCarSeleccionada(event.target.value);
    };
    const resetearForm = () => {
        setCarSeleccionada('');
        setImagenParque(null);
        setParque({
            nombre: '',
            extension: '',
            descripcion: '',
        });
    };
    const guardarParqueBoton = e => {
        e.preventDefault();
        const parqueId = uuidv4();
        const objetoParque = {
            nombre: parque.nombre,
            extension: parque.extension,
            descripcion: parque.descripcion,
            parqueId: parqueId,
            activo: checked || false,
            carId: carSeleccionada
        };
        let objetoImagen = null;

        //si existe la imagen, de lo contrario el guardarCurso no lo enviaria
        //debido a que es null
        if (imagenParque) {
            //si no hay, no lo enviaria al servidor...
            objetoImagen = {
                nombre: imagenParque.nombre,
                data: imagenParque.data,
                extension: imagenParque.extension,
                objetoReferencia: parqueId,
            };
        }
        //...solo se enviaria el objetoCurso
        guardarParque(objetoParque, objetoImagen).then((respuestas) => {
            const responseParque = respuestas[0];
            const responseImagen = respuestas[1];
            //mensaje que se pinta en el snackbar
            let mensaje = "";
            // evaluando la respuesta respecto a responseCurso
            if (responseParque.status === 200) {
                mensaje += "se ha guardado exitosamente el Parque ";
                props.history.push("/parque/lista");
                resetearForm();
            } else {
                console.log("mensaje", mensaje);
                mensaje += "Errores :" + Object.keys(responseParque.data.errors);
            }
            //evaluar existencia de imagen
            if (responseImagen) {
                if (responseImagen.status === 200) {
                    mensaje += "se ha guardado exitosamente la imagen ";
                    props.history.push("/parque/lista");

                } else {
                    mensaje +=
                        "Errores en imagen" + Object.keys(responseImagen.data.errors);
                }
            }
            dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                    open: true,
                    mensaje: mensaje,
                },
            });
        });
    }
    return (
        <Container component="main" maxWidth="md" justify="center">

            <div style={style.paper}>
                <Avatar style={style.avatarP} src={foto.fotoUrl || reactFoto}>

                </Avatar>
                <Typography component="h1" variant="h5">
                    Agregar Nuevo Parque
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            {parque.nombre &&
                                <TextField
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese nombre del parque"
                                    value={parque.nombre}
                                    onChange={ingresarValores}
                                />
                                ||
                                <TextField
                                    error
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese nombre del parque"
                                    value={parque.nombre}
                                    onChange={ingresarValores}
                                />

                            }

                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                type="number"
                                name="extension"
                                variant="outlined"
                                fullWidth
                                label="Ingrese extensión del parque (Hectareas)"
                                value={parque.extension}
                                onChange={ingresarValores}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="descripcion"
                                variant="outlined"
                                fullWidth
                                label="Ingrese descripción del parque"
                                value={parque.descripcion}
                                onChange={ingresarValores}

                            />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Grid style={{ textAlign: 'center' }}>
                                ¿Desea que el parque esté activo?
                            </Grid>
                            <Grid style={{ textAlign: 'center' }} >
                                <Checkbox
                                    checked={checked}
                                    onChange={cambioActivo}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                    color="primary"
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6} md={6} style={{ textAlign: 'center' }}>
                            {carSeleccionada &&
                                <FormControl className={classes.formControl} >
                                    <InputLabel htmlFor="age-native-simple">CAR</InputLabel>
                                    <Select
                                        onChange={cambioCar}
                                        value={carSeleccionada}
                                    >
                                        {
                                            car.map(item => (
                                                < MenuItem key={item.carId} value={item.carId}>{item.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                                ||
                                <FormControl error className={classes.formControl} >
                                    <InputLabel error htmlFor="age-native-simple">CAR</InputLabel>
                                    <Select
                                        onChange={cambioCar}
                                        value={carSeleccionada}
                                        error
                                    >
                                        {
                                            car.map(item => (
                                                < MenuItem key={item.carId} value={item.carId}>{item.nombre}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            }

                        </Grid>
                        <Grid item xs={12} md={12} style={{ textAlign: 'center' }}>
                            <ImageUploader
                                withIcon={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccion imagen del parque"
                                onChange={subirFoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            {((carSeleccionada) && (parque.nombre)) &&
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={style.submit}
                                    onClick={guardarParqueBoton}
                                >
                                    Guardar Parque
                                </Button>
                                ||
                                <Button
                                    disabled
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={style.submit}
                                    onClick={guardarParqueBoton}
                                >
                                    Guardar Parque
                                </Button>

                            }

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    )
}
export default withRouter(NuevoParque);
