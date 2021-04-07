import { Avatar, Button, Drawer, IconButton, List, ListItem, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useStateValue } from '../../../contexto/store';
import FotoUsuarioTemp from "../../../logo.svg";
import { MenuIzquierda } from './MenuIzquierda';
const useStyles = makeStyles((theme) => ({
    seccionDesktop: {
        display: "none",
        [theme.breakpoints.up("md")]: {
            display: "flex"
        }
    },
    seccionMobile: {
        display: "flex",
        [theme.breakpoints.up("md")]: {
            display: "none"
        }
    },
    grow: {
        flexGrow: 1
    },
    avatarSize: {
        width: 40,
        height: 40
    },
    list: {
        width: 250
    },
    ListItemText: {
        fontSize: "14px",
        fontWeight: 600,
        paddingLeft: "15px",
        color: "#212121"
    }
}))

export const BarSesion = () => {
    /* Consumir useStyles */
    const classes = useStyles();
    /* invocar variable global de estado */
    const [{ sesionUsuario }, dispatch] = useStateValue();
    const [abrirMenuIzquierda, setAbrirMenuIzquierda] = useState(false);
    const cerrarMenuIzquierda = () => {
        setAbrirMenuIzquierda(false);
    }
    const abrirMenuIzquierdaAction = () => {
        setAbrirMenuIzquierda(true);
    }
    return (
        <React.Fragment>
            <Drawer
                open={abrirMenuIzquierda}
                onClose={cerrarMenuIzquierda}
                anchor="left"
            >
                <div className={classes.list} onKeyDown={cerrarMenuIzquierda} onClick={cerrarMenuIzquierda}>
                    <MenuIzquierda classes={classes} />
                </div>
            </Drawer>
            <Toolbar>
                <IconButton color="inherit" onClick={abrirMenuIzquierdaAction}>
                    <i className="material-icons"> menu </i>
                </IconButton>
                <Typography variant="h6"> Parques Colombia </Typography>
                {/* Elementos de la parte derecha extrema */}
                <div className={classes.grow}></div>

                {/* Solo se verá en modo desktop */}
                <div className={classes.seccionDesktop}>
                    {/* Agregar los botones */}
                    <Button color="inherit">
                        Salir
                </Button>
                    <Button color="inherit">
                        {sesionUsuario ? sesionUsuario.usuario.nombreCompleto : ""}
                    </Button>
                    <Avatar src={sesionUsuario ? sesionUsuario.usuario.imagenPerfil : FotoUsuarioTemp }></Avatar>
                </div>
                <div className={classes.seccionMobile}>
                    <IconButton color="inherit">
                        <i className="material-icons">more_vert</i>
                    </IconButton>
                </div>
            </Toolbar>
        </React.Fragment>
    )
}
