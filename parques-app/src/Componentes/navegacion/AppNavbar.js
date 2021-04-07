import { AppBar } from '@material-ui/core';
import React from 'react'
import { BarSesion } from './bar/BarSesion';
/* Componente que te reserva el espacio */
/* En este componente se pone el Toolbar que es donde se pone toda la grafica */
const AppNavbar = () => {
    return (
        <AppBar position = "static">
            <BarSesion />
        </AppBar>
    );
}
export default AppNavbar;
