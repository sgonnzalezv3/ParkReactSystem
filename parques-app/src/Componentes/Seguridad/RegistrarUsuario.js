import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import style from "../Tool/Style";
import { registrarUsuario } from '../../actions/UsuarioAction';



const RegistrarUsuario = () => {
    const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
    const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/i;

    const [usuario, setUsuario] = useState({
        NombreCompleto: '',
        Email: '',
        Password: '',
        ConfirmarPassword: '',
        Username: ''
    });
    const ingresarValores = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }))
    }
    const registrarUsuarioBoton = e => {
        e.preventDefault();
        registrarUsuario(usuario).then(response => {
            console.log('se registro el usuario', response);
            window.localStorage.setItem('token_seguridad', response.data.token);
        });
    }

    return (
        <Container component="main" maxWidth="md" justify="center">
            <div style={style.paper}>
                <Typography component="h1" variant="h5">
                    Registro de Usuario
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            {usuario.NombreCompleto &&
                                <TextField name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su nombre completo" />
                                ||
                                <TextField error helperText="Complete el formulario" name="NombreCompleto" value={usuario.NombreCompleto} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su nombre completo" />
                            }
                        </Grid>

                        <Grid item xs={12} md={6}>
                            {(usuario.Email && regex.test(usuario.Email)) &&
                                <TextField name="Email" value={usuario.Email} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su email" />
                                ||
                                <TextField error helperText="Email no permitido" name="Email" value={usuario.Email} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su email" />
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {usuario.Username &&
                                <TextField name="Username" value={usuario.Username} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su username" />
                                ||
                                <TextField error helperText="Complete el formulario" name="Username" value={usuario.Username} onChange={ingresarValores} variant="outlined" fullWidth label="Ingrese su username" />
                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {(usuario.Password && regexPassword.test(usuario.Password)) &&
                                <TextField name="Password" value={usuario.Password} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Ingrese su password" />
                                ||
                                <TextField error helperText="Minimo 8 caracteres, mayuscula, número y alfanumerico incluidos. " name="Password" value={usuario.Password} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Ingrese su password" />

                            }
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {(usuario.ConfirmarPassword === usuario.Password) &&
                                <TextField name="ConfirmarPassword" value={usuario.ConfirmarPassword} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Porfavor confirme su password" />
                                ||
                                <TextField name="ConfirmarPassword" error helperText="Las contraseñas no coinciden" value={usuario.ConfirmarPassword} onChange={ingresarValores} type="password" variant="outlined" fullWidth label="Porfavor confirme su password" />
                            }
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item xs={12} md={6}>
                            {(usuario.NombreCompleto &&
                                (usuario.Email && regex.test(usuario.Email)) &&
                                usuario.Username &&
                                (usuario.Password && regexPassword.test(usuario.Password)) &&
                                (usuario.ConfirmarPassword === usuario.Password)
                            ) &&
                                <Button type="submit" onClick={registrarUsuarioBoton} fullWidth variant="contained" color="primary" size="large" style={style.submit} >
                                    Enviar
                                </Button>
                                ||
                                <Button type="submit" onClick={registrarUsuarioBoton} disabled fullWidth variant="contained" color="primary" size="large" style={style.submit} >
                                Enviar
                                </Button>
                         }
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default RegistrarUsuario;
