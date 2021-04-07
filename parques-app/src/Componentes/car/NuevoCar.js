import { registrarCar } from '../../actions/carAction';
import React, { useState } from 'react'
import { useStateValue } from '../../contexto/store'
import { v4 as uuidv4 } from 'uuid';
import { Button, Checkbox, Container, container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import style from '../Tool/Style';
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

const NuevoCar = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [car, setCar] = useState({
        nombre: '',
        descripcion: '',
    });

    const classes = useStyles();
    const [checked, setChecked] = useState(true);
    const cambioActivo = (event) => {
        setChecked(event.target.checked);
    };
    const ingresarValores = e => {
        const { name, value } = e.target;
        setCar((anterior) => ({
            ...anterior,
            [name]: value
        }))
    }
    const resetearForm = () => {
        setCar({
            nombre: '',
            descripcion: '',
        });
    };
    const guardarParqueBoton = e => {
        e.preventDefault();
        const carId = uuidv4();
        const objetoCar = {
            nombre: car.nombre,
            descripcion: car.descripcion,
            carId: carId,
            activo: checked || false,
        };
        //...solo se enviaria el objetoCurso
        registrarCar(objetoCar).then((respuestas) => {
            const responseCar = respuestas[0];
            //mensaje que se pinta en el snackbar
            let mensaje = "";
            // evaluando la respuesta respecto a responseCurso
            if (responseCar.status === 200) {
                mensaje += "se ha guardado exitosamente la CAR ";
                resetearForm();
            } else {
                mensaje += "Errores :" + Object.keys(responseCar.data.errors);
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

                <Typography component="h1" variant="h5">
                    Agregar Nueva CAR
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="nombre"
                                variant="outlined"
                                fullWidth
                                label="Ingrese nombre del parque"
                                value={car.nombre}
                                onChange={ingresarValores}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                name="descripcion"
                                variant="outlined"
                                fullWidth
                                label="Ingrese descripción de la CAR"
                                value={car.descripcion}
                                onChange={ingresarValores}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Grid style={{ textAlign: 'center' }}>
                                ¿Desea que la CAR esté activa?
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
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                style={style.submit}
                                onClick={guardarParqueBoton}
                            >
                                Guardar CAR
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    )
}
export default withRouter(NuevoCar);
