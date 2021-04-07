import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

/* Almacena variables globales */
import { initialState } from './contexto/initialState';
/* provider suscribe todos los compoenntes react hooks en el proyect */
import { StateProvider } from './contexto/store';
/*Reducers que tienen acceso a todas las variables globlaes. */
import { mainReducer } from './contexto/reducers';
ReactDOM.render(
  <React.StrictMode>
    {/* Implementando el provider */}
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
