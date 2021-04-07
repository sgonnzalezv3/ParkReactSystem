import { Avatar, Button, Container, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react'
import style from "../Tool/Style";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { loginUsuario } from '../../actions/UsuarioAction';
import { withRouter } from 'react-router';
import { useStateValue } from '../../contexto/store';
const Login = (props) => {
    const[{usuarioSesion},dispatch] =useStateValue();
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });
    const ingresarValores = e => {
        const { name, value } = e.target;
        setUsuario(anterior => ({
            ...anterior,
            [name]: value
        }))
    }
    const loginUsuarioBoton= e => {
        e.preventDefault();
        loginUsuario(usuario, dispatch).then((response) => {
            if (response.status === 200) {
              //si es exitoso, setear la variable del local storage
              window.localStorage.setItem("token_seguridad", response.data.token);
              //redireccionar a la pagina principal como logeado
              props.history.push("/auth/perfil");

              dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: "Bienvenido",
                }
              })
            } else {
              dispatch({
                type: "OPEN_SNACKBAR",
                openMensaje: {
                  open: true,
                  mensaje: "Credenciales de usuario incorrectas",
                }
              })
            }
          })
    }
    return (
        <Container maxWidth="xs">
            <div style={style.paper}>
                <Avatar style={style.avatar}>
                    <LockOutlinedIcon style={style.icon} />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login de usuario
                </Typography>
                <form style={style.form}>
                    <TextField name="email" value={usuario.email} onChange={ingresarValores} variant="outlined" label="Email" fullWidth margin="normal" />
                    <TextField name="password" value={usuario.password} onChange={ingresarValores} variant="outlined" type="password" label="Password" fullWidth margin="normal" />
                    <Button type="submit" onClick={loginUsuarioBoton} fullWidth variant="contained" color="primary" style={style.submit}>
                        Enviar
                    </Button>
                </form>
            </div>
        </Container>
    );

}
export default withRouter(Login);
