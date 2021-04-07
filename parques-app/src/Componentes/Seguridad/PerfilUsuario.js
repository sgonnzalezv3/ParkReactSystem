import { Avatar, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { actualizarUsuario, obtenerUsuarioActual } from '../../actions/UsuarioAction';
import { useStateValue } from '../../contexto/store';
import style from "../Tool/Style";
import reactFoto from '../../logo.svg';
import { v4 as uuidv4 } from 'uuid';
import ImageUploader from 'react-images-upload';
import { obtenerDataImagen, obtenerImagenes } from '../../actions/imagenAction';

export const PerfilUsuario = () => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;
    //regex.test(palabra)
    const [{ sesionUsuario }, dispatch] = useStateValue();

    const [usuario, setUsuario] = useState({
        nombreCompleto: '',
        email: '',
        password: '',
        confirmarPassword: '',
        username: '',
        imagenPerfil: null,
        fotoUrl: ''
    });
    const ingresarValores = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }
    useEffect(() => {
        setUsuario(sesionUsuario.usuario);
        setUsuario(anterior => ({
            ...anterior,
            fotoUrl: sesionUsuario.usuario.imagenPerfil,
            imagenPerfil: null
        }));
    }, [])

    const guardarUsuario = e => {
        e.preventDefault();
        actualizarUsuario(usuario, dispatch).then(response => {
            if (response.status === 200) {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Se han guardado los cambios del perfil exitosamente!"
                    }
                });
                window.localStorage.setItem("token_seguridad", response.data.token);
            } else {
                dispatch({
                    type: "OPEN_SNACKBAR",
                    openMensaje: {
                        open: true,
                        mensaje: "Errores al intentar guardar en : " + Object.keys(response.data.errors),
                    }
                })
            }
        })
    }
    const subirFoto = imagenes => {
        /* convertir usuario.foto en url local */
        const foto = imagenes[0];
        const fotoUrl = URL.createObjectURL(foto);
        obtenerDataImagen(foto).then(respuesta => {
            setUsuario(anterior => ({
                ...anterior,
                imagenPerfil: respuesta, //respuesta json proveniente del action obtenerImagen
                fotoUrl: fotoUrl //formato Url
            }));
        })
    }
    const fotoKey = uuidv4();


    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>


                <Avatar style={style.avatar} src={usuario.fotoUrl || reactFoto}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Perfil de Usuario
                </Typography>

                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField name="nombreCompleto" value={usuario.nombreCompleto} onChange={ingresarValores} variant="outlined" fullWidth label="Nombre Completo" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="username" value={usuario.username} variant="outlined" fullWidth label="Username" />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {regex.test(usuario.email) && <TextField name="email" value={usuario.email} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese email" />
                                || <TextField
                                    error
                                    name="email"
                                    value={usuario.email}
                                    id="outlined-error-helper-text"
                                    label="Ingrese email"
                                    helperText="Email no valido."
                                    variant="outlined"
                                    fullWidth
                                    onChange={ingresarValores}
                                />
                            }

                        </Grid>
                        <Grid item xs={6} md={6}>
                            <TextField name="password" value={usuario.Password} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Ingrese Password" />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            {usuario.password == usuario.confirmarPassword && <TextField name="confirmarPassword" value={usuario.ConfirmarPassword} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Confirmar password" />
                                || <TextField
                                    error
                                    name="confirmarPassword"
                                    id="outlined-error-helper-text"
                                    label="Confirmar password"
                                    value={usuario.confirmarPassword}
                                    helperText="Las contraseñas no coinciden."
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    onChange={ingresarValores}
                                />}
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ImageUploader
                                withIcon={false}
                                key={fotoKey}
                                singleImage={true}
                                buttonText="Seleccione una imagen de Perfil"
                                onChange={subirFoto}
                                imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
                                maxFileSize={5242880}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            {((usuario.password == usuario.confirmarPassword) && (regex.test(usuario.email) && (regexPassword.test(usuario.password)))) && 
                            <Button type="submit" onClick={guardarUsuario} fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                                Guardar Datos
                            </Button>
                            ||
                            <Button type="submit" onClick={guardarUsuario} disabled fullWidth variant="contained" size="large" color="primary" style={style.submit}>
                                Guardar Datos
                            </Button>
                            
                            }

                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
