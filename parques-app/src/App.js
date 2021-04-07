import './App.css';
import { ThemeProvider as MuithemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import RegistrarUsuario from './Componentes/Seguridad/RegistrarUsuario';
import Login from './Componentes/Seguridad/Login';
import { PerfilUsuario } from './Componentes/Seguridad/PerfilUsuario';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Grid, Snackbar } from '@material-ui/core';
import AppNavbar from './Componentes/navegacion/AppNavbar';
import { useStateValue } from './contexto/store';
import React, { useEffect, useState } from 'react';
import { obtenerUsuarioActual } from './actions/UsuarioAction';
import Home from './Componentes/Home/Home';
import NuevoParque from './Componentes/parque/NuevoParque';
import NuevoCar from './Componentes/car/NuevoCar';
import { PaginadorParque } from './Componentes/parque/PaginadorParque';
import NuevaFauna from './Componentes/Fauna/NuevaFauna';
import { PaginadorFauna } from './Componentes/Fauna/PaginadorFauna';
function App() {
  /* Obtener referencia de la sesion de usuario */   /* referencia global al snackbar */
  const [{ sesionUsuario, openSnackbar }, dispatch] = useStateValue();

  /* variable de estado local que permita si el request fue o no fue echo al server */
  const [iniciaApp, setIniciaApp] = useState(false);
  useEffect(() => {
    /* ejecuta si iniciap es falso*/
    if (!iniciaApp) {
      /* valla al server y me obtenga al usuario actual */
      obtenerUsuarioActual(dispatch).then(response => {
        setIniciaApp(true);
      }).catch(error => {
        setIniciaApp(true);
      });
    }
  }, [iniciaApp]);
  return iniciaApp === false ? null : (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={
          <span id="message-id">{openSnackbar ? openSnackbar.mensaje : ""}</span>
        }
        /* onClose llama al dispatch para actualizar el reducer e indicar la accion que se debe realizar */
        onClose={() =>
          dispatch({
            type: "OPEN_SNACKBAR",
            openMensaje: {
              open: false,
              mensaje: ""
            }
          })}
      >

      </Snackbar>
      <Router>
        <MuithemeProvider theme={theme}>
          <AppNavbar />
          <Grid container>
            <Switch>
              <Route exact path="/auth/login" component={Login} />
              <Route exact path="/auth/registrar" component={RegistrarUsuario} />
              <Route exact path="/auth/perfil" component={PerfilUsuario} />
              <Route exact path="/" component={Home} />
              <Route exact path="/parque/registrar" component={NuevoParque} />
              <Route exact path="/car/registrar" component={NuevoCar} />
              <Route exact path="/parque/lista" component={PaginadorParque} />
              <Route exact path="/fauna/registrar" component={NuevaFauna} />
              <Route exact path="/fauna/lista" component={PaginadorFauna} />
            </Switch>
          </Grid>
        </MuithemeProvider>
      </Router>
    </React.Fragment>

  );
}
export default App;
