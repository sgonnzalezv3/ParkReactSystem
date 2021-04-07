import React, { useEffect, useState } from 'react'
import { obtenerDataImagen } from '../../actions/imagenAction';
import { useStateValue } from '../../contexto/store'
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Button, Checkbox, Container, container, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, Switch, TextField, Typography } from '@material-ui/core';
import style from '../Tool/Style';
import ImageUploader from 'react-images-upload';
import reactFoto from '../../logo.svg';
import { guardarFauna } from "../../actions/faunaAction";
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

const NuevaFauna = (props) => {
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [fauna, setFauna] = useState({
        nombre: '',
        nombreCientifico: '',
        descripcion: '',
    });
    const [imagenFauna, setImagenFauna] = useState(null);

    const classes = useStyles();
    const [foto, setFoto] = useState({
        foto: '',
        fotoUrl: '',
    })

    const subirFoto = imagenes => {
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);
        obtenerDataImagen(foto).then((respuesta) => {
            setImagenFauna(respuesta);
            setFoto({
                foto: foto,
                fotoUrl: fotoUrl
            });


        })

    }
    const fotoKey = uuidv4();

    const ingresarValores = e => {
        const { name, value } = e.target;
        setFauna((anterior) => ({
            ...anterior,
            [name]: value
        }))
    }

    const guardarFaunaBoton = e => {
        e.preventDefault();
        const faunaId = uuidv4();
        const objetoFauna = {
            nombre: fauna.nombre,
            nombreCientifico: fauna.nombreCientifico,
            descripcion: fauna.descripcion,
            ecosistemaId: faunaId,
        };
        let objetoImagen = null;

        //si existe la imagen, de lo contrario el guardarCurso no lo enviaria
        //debido a que es null
        if (imagenFauna) {
            //si no hay, no lo enviaria al servidor...
            objetoImagen = {
                nombre: imagenFauna.nombre,
                data: imagenFauna.data,
                extension: imagenFauna.extension,
                objetoReferencia: faunaId,
            };
        }
        console.log("aver",objetoFauna);
        console.log("aver",objetoImagen);
        
        //...solo se enviaria el objetoCurso
        guardarFauna(objetoFauna, objetoImagen).then((respuestas) => {
            console.log(respuestas,"aver");

            const responseFauna = respuestas[0];
            const responseImagen = respuestas[1];

            //mensaje que se pinta en el snackbar
            let mensaje = "";
            // evaluando la respuesta respecto a responseCurso
            if (responseFauna.status === 200) {
                mensaje += "se ha guardado exitosamente la fauna ";
                props.history.push("/fauna/lista");
            } else {
                mensaje += "Errores :" + Object.keys(responseFauna.data.errors);
            }
            //evaluar existencia de imagen
            if (responseImagen) {
                if (responseImagen.status === 200) {
                    mensaje += "se ha guardado exitosamente la imagen ";
                    props.history.push("/fauna/lista");

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
                    Agregar Nueva Fauna
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            {fauna.nombre &&
                                <TextField
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese nombre de la fauna"
                                    value={fauna.nombre}
                                    onChange={ingresarValores}
                                />
                                ||
                                <TextField
                                    error
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    label="Ingrese nombre de la fauna"
                                    value={fauna.nombre}
                                    onChange={ingresarValores}
                                />

                            }
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                type="text"
                                name="nombreCientifico"
                                variant="outlined"
                                fullWidth
                                label="Ingrese el nombre Cientifico de la fauna"
                                value={fauna.nombreCientifico}
                                onChange={ingresarValores}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                multiline
                                rowsMax={4}
                                name="descripcion"
                                variant="outlined"
                                fullWidth
                                label="Ingrese descripción de la fauna"
                                value={fauna.descripcion}
                                onChange={ingresarValores}

                            />
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
                            {((fauna.nombre)) &&
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={style.submit}
                                    onClick={guardarFaunaBoton}
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
                                    onClick={guardarFaunaBoton}
                                >
                                    Guardar Fauna
                                </Button>

                            }

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    )
}
export default withRouter(NuevaFauna);
